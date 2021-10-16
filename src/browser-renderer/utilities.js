function makeProperty(component, propName, defaultValue, getOverride, setOverride) {
    let existingValue;
    if (component.hasOwnProperty(propName)) {
        existingValue = component[propName];
        // try to delete the property, but it's ok if we can't
        delete component[propName];
    }

    // define the getters and setters
    const internalPropName = "_" + propName;
    Object.defineProperty(component, propName, {
        get() {
            return (getOverride ? getOverride() : component[internalPropName]);
        },
        set(value) {
            if (setOverride)
                setOverride(value);
            else
                component[internalPropName] = value;
        }
    });

    const initialValue = (existingValue != undefined ? existingValue : defaultValue);
    if (initialValue != undefined)
        component[propName] = initialValue;
}

async function loadFont(url) {
    await new Promise((resolve, reject) => {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.addEventListener("load", resolve);
        link.addEventListener("abort", reject);
        link.addEventListener("error", reject);
        document.head.appendChild(link);
    });
}

// merges array of json objects into the DOM
// each item must have an "id" property
function mergeDOM(parentDOM, items = [], onCreateUpdate) {
    // grab our DOM child elements
    let children = parentDOM.children;

    // speed optimization for items.length == 1 and children.length == 1
    // (this will be a very common case)
    if (children.length == 1 && items.length == 1) {

        const item = items[0];
        let itemDOM = children[0];

        // if the item id and the child's srcObject id match, then this is a quick update and we can dispense with everything else
        // otherwise, we'll fall through and go through the normal merge procedure
        if (itemDOM.srcObject && item.id == itemDOM.srcObject.id) {
            onCreateUpdate(item, itemDOM);
            itemDOM.srcObject = item;
            return;
        }
    }

    // check for array length matching up front
    // pruning up front will make adding/updating faster and the check is cheap.
    // note that when replacing items, this check will fail and pruning will happen AFTER adding/updating
    if (children.length > items.length)
        pruneChildren(children, items);

    // add or update each item
    items.forEach((item, arrayIndex) => {
        const domIndex = findChildIndexById(children, item.id);
        let itemDOM = (domIndex == -1 ? null : children[domIndex]);
        
        // if itemDOM's srcObject matches this item, it doesn't need an update
        // inversely, we need to update if itemDOM is null or the srcObject is different than item
        if (!itemDOM || itemDOM.srcObject != item) {
            itemDOM = onCreateUpdate(item, itemDOM);

            // if itemDOM is null after calling onCreateUpdate, there's an error.  bail out.
            if (!itemDOM)
                return;

            // otherwise, update srcObject
            itemDOM.srcObject = item;
        }

        if (domIndex == -1) {
            // if we're adding, ensure itemDOM has an ID specified
            itemDOM.id = item.id;
            // insert the new DOM element
            if (arrayIndex < children.length)
                parentDOM.insertBefore(itemDOM, children[arrayIndex]);
            else
                parentDOM.appendChild(itemDOM);
        } else if (domIndex != arrayIndex) {
            // we need to move the itemDOM to a new location
            // this one call will simultaneously remove and re-insert
            parentDOM.insertBefore(itemDOM, children[arrayIndex]);
        } else {
            // do nothing - itemDOM has been updated and doesn't need to be moved
        }
    });

    // check for array length again - if they don't match because we REPLACED an element, then we'll prune
    if (children.length > items.length)
        pruneChildren(children, items);
}

function pruneChildren(children, items) {
    // first, remove any items that are missing if necessary
    const idsToKeep = items.map(r => r.id);

    // collect the children to remove in an array (can't modify the array in this loop)
    let childrenToRemove = [];
    for(const child of children) {
        if (!child.srcObject || !idsToKeep.includes(child.srcObject.id)) {
            childrenToRemove.push(child);
        }
    }

    // and finally remove them from the DOM
    for(const child of childrenToRemove) {
        child.remove();
    }
}

function findChildById(parent, id) {
    for(const item of parent.children) {
        if (item.id == id) {
            return item;
        }
    }
    return null;
}

function findChildIndexById(nodeList, id) {
    for(let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].id == id)
            return i;
    }
    return -1;
}

export {
    makeProperty,
    loadFont,
    mergeDOM,
    pruneChildren,
    findChildById,
    findChildIndexById
};