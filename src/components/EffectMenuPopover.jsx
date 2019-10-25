import React from "react";
import { Popover, Position, Intent, PopoverInteractionKind, Menu, MenuItem, MenuDivider, ContextMenu } from "@blueprintjs/core";
import { categories, effects } from "../shared/effects.js";

export default class EffectMenuPopover extends React.PureComponent {

    constructor(props) {
      super(props);
    }
  
    onMenuItemClick = (evt, effectName) => {
      this.props.dispatcher.Dispatch("ADD_EFFECT", this.props.layer.id, effectName);
    }

    renderCategoryMenu = list => {
      return (
        list.map(effectName => {
          let effect = effects[effectName];
          return (
            <MenuItem
              key={effectName}
              text={effect.displayName}
              onClick={evt => this.onMenuItemClick(evt, effectName)}
            />
          );
        })
      );
    }
  
    render() {
      return (
        <Popover position={Position.RIGHT_BOTTOM} interactionKind={PopoverInteractionKind.CLICK} boundary={"window"} fill={true}>
          {this.props.children}
          <Menu>
            {Object.entries(categories).map(pair => (
              <MenuItem key={pair[0]} text={pair[0]} popoverProps={{ openOnTargetFocus: false }}>
                {this.renderCategoryMenu(pair[1])}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      );
    }
  }