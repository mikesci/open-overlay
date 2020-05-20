import React from "react";
import { Button, Popover, Menu, MenuItem } from "@blueprintjs/core";

export default class BackgroundSelector extends React.PureComponent {
    constructor(props) {
        super(props);
        // props.backgroundImages
        // props.backgroundImage
        // props.onBackgroundImageChanged
    }

    onSelectBackground = name => {
        this.props.onBackgroundImageChanged(name);
    }

    render() {
        // render nothing if no backgroundImages are supplied
        if (!this.props.backgroundImages) { return null; }

        return (
            <Popover position="bottom-right">
                <Button text={this.props.backgroundImage || "No Background"} rightIcon="caret-down" />
                <Menu>
                    <MenuItem key="none" onClick={() => this.onSelectBackground(null)} text="No Background" />
                    {Object.keys(this.props.backgroundImages).map(name => (
                        <MenuItem key={name} onClick={() => this.onSelectBackground(name)} text={name}></MenuItem>
                    ))}
                </Menu>
            </Popover>
        );
    }
}
