import React from "react";
import { Popover, Position, Intent, PopoverInteractionKind, Menu, MenuItem } from "@blueprintjs/core";
import { categories, effects } from "../components/Effects.jsx";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";

const EffectMenuPopover = (props) => {
    const dispatch = useOverlayEditorContext();

    const renderCategoryMenu = list => {
        return (
            list.map(effectName => {
                let effect = effects[effectName];
                return (
                    <MenuItem
                        key={effectName}
                        text={effect.displayName}
                        onClick={evt => dispatch("CreateLayerEffect", { id: props.layer.id, effectName })}
                    />
                );
            })
        );
    }

    return (
        <Popover position={Position.RIGHT_BOTTOM} interactionKind={PopoverInteractionKind.CLICK} boundary={"window"}>
            {props.children}
            <Menu>
                {Object.entries(categories).map(pair => (
                    <MenuItem key={pair[0]} text={pair[0]} popoverProps={{ openOnTargetFocus: false }}>
                        {renderCategoryMenu(pair[1])}
                    </MenuItem>
                ))}
            </Menu>
        </Popover>
    );
}

export default EffectMenuPopover;
