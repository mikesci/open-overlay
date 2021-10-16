import React, { useState, useCallback } from "react";
import { DragAndDropTypes } from "../shared/DragAndDropTypes.js";
import "./ReorderableList.css";

const ReorderableItem = ({ index, dragging, onDragStart, child }) => {
    const onDragStartCallback = useCallback(evt => {
        if (!onDragStart) { evt.preventDefault(); return; }
        onDragStart(evt, child.key, index);
    }, [ onDragStart, child.key, index ]);

    return (
        <div className="item" data-id={child.key} data-index={index} dragging={dragging} draggable={true} onDragStart={onDragStartCallback}>
            {child}
        </div>
    );
}

const ReorderableList = ({ itemType, onReorderItem, children }) => {
    // onReorderItem = (id, newIndex) => ...
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [draggedItemKey, setDraggedItemKey] = useState(null);

    const onItemDragEnd = useCallback((evt) => {
        window.removeEventListener("dragend", onItemDragEnd);
        setDraggedItemIndex(null);
        setDraggedItemKey(null);
    }, []);

    const onItemDragStart = useCallback((evt, key, index) => {
        if (evt.target.name == "INPUT") {
            evt.preventDefault();
            return;
        }

        // listen for drag end events in the whole window
        window.addEventListener("dragend", onItemDragEnd);

        evt.dataTransfer.setData(itemType, key);
        setDraggedItemIndex(index);
        setDraggedItemKey(key);
    }, [ ]);

    const onDragOver = useCallback(evt => {
        // only handle this data
        if (!DragAndDropTypes.EventHasType(evt, itemType)) { return; }

        // tell the browser we're handling it
        evt.preventDefault();
        evt.stopPropagation();

        // set the drop effect
        evt.dataTransfer.dropEffect = "move";

        if (evt.target.matches(".reorderable-list")) {
            // if we're over the container, and not any item, then set the positioner index to the end of the list
            if (draggedItemIndex != children.length)
                setDraggedItemIndex(children.length);

            return;
        }

        // all other cases, we should be over an item
        let target = evt.target.closest(".item");
        if (target) {
            // grab the index attribute
            const index = parseInt(target.getAttribute("data-index"));

            // don't do anything if over the dragged item
            if (target.getAttribute("dragging") == "true") { return; }

            // calculate if we're over the top or bottom of this item
            let rect = target.getBoundingClientRect();
            let isOverBottom = (evt.nativeEvent.clientY > (rect.top + (rect.height / 2)));

            // set the positioner
            let newIndex = (isOverBottom ? index + 1 : index);
            // do nothing if we'd be put back in the same spot
            if (draggedItemIndex != newIndex)
                setDraggedItemIndex(newIndex);
        }
    }, [ draggedItemIndex ]);

    const onDrop = useCallback(evt => {
        if (!DragAndDropTypes.EventHasType(evt, itemType)) { return; }

        evt.preventDefault();
        evt.stopPropagation();

        // pull the id from the drag data
        let id = evt.dataTransfer.getData(itemType);

        // dispatch the onReorderItem event
        onReorderItem(id, draggedItemIndex);

        // clear the positioner
        setDraggedItemIndex(null);
        setDraggedItemKey(null);
    }, [ onReorderItem, draggedItemIndex ]);

    let draggedItem = null;
    if (draggedItemKey != null) {
        const draggedChild = children.find(r => r.key == draggedItemKey);
        draggedItem = (<ReorderableItem
            key={draggedItemKey}
            index={draggedItemIndex}
            child={draggedChild}
            dragging="true"
        />);
    }

    const reorderableItems = children.reduce((reorderableItems, child, index) => {
        // render the dragged item if necessary
        if (index == draggedItemIndex)
            reorderableItems.push(draggedItem);

        // don't render the item being dragged
        if (child.key != draggedItemKey) {
            // render to the stack
            reorderableItems.push(<ReorderableItem
                key={child.key}
                index={index}
                child={child}
                onDragStart={onItemDragStart}
            />);
        }

        // lastly, if we're on the last item in the list and
        // our draggedItemIndex is greater than it, add the dragged item at the end
        if (index == (children.length - 1) && draggedItemIndex > index)
            reorderableItems.push(draggedItem);

        return reorderableItems;
    }, []);

    return (
        <div className="reorderable-list" onDragOver={onDragOver} onDrop={onDrop}>
            {reorderableItems}
        </div>
    );
}

export default ReorderableList;