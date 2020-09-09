import React from "react";
import { Popover, Position, Intent, PopoverInteractionKind, Menu, MenuItem, MenuDivider, ContextMenu } from "@blueprintjs/core";
import Dispatcher from "../shared/dispatcher.js";

export default class ElementMenuPopover extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        isMenuLockedOpen: false
      };
    }
  
    onRemoveExternalElement = element => {
      Dispatcher.Dispatch("REMOVE_EXTERNAL_ELEMENT", element);
    }
  
    onElementMenuItemClick = (evt, elementName) => {
      Dispatcher.Dispatch("CREATE_LAYERS", [{ elementName }]);
    }
  
    onElementMenuItemContextMenu = (evt, elementName) => {
      evt.preventDefault();
      let element = this.props.elements[elementName];
      if (!element.isExternal) { return; }
      let contents = (
        <Menu>
          {element.manifest.description ? <MenuItem key="desc" disabled={true} text={element.manifest.description} /> : null}
          {element.manifest.author ? <MenuItem key="author" disabled={true} text="Author" label={element.manifest.author} /> : null}
          {element.manifest.width && element.manifest.height ? <MenuItem key="dimensions" disabled={true} text="Dimensions" label={`${element.manifest.width}x${element.manifest.height}px`} /> : null}
          <MenuDivider key="divider" />
          <MenuItem key="delete" icon="delete" text="Remove" intent={Intent.DANGER} onClick={() => this.onRemoveExternalElement(elementName)} />
        </Menu>
      );
  
      ContextMenu.show(contents, { left: evt.clientX, top: evt.clientY });
    }
  
    render() {
      let menuEntries = [];
      for(let [name, element] of Object.entries(this.props.elements)) {
        if (element.manifest.hideInMenu) { continue; }
        menuEntries.push(
          <MenuItem
            key={name}
            text={element.manifest.name}
            onContextMenu={evt => this.onElementMenuItemContextMenu(evt, name)}
            onClick={evt => this.onElementMenuItemClick(evt, name)}
          />
        );
      }

      return (
        <Popover position={Position.RIGHT_BOTTOM} interactionKind={PopoverInteractionKind.CLICK} boundary={"window"} isOpen={this.state.isMenuLockedOpen ? true : undefined}>
          {this.props.children}
          <Menu>{menuEntries}</Menu>
        </Popover>
      );
    }
  }