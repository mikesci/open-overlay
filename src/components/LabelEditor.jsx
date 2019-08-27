import React from "react";
import { EditableText } from "@blueprintjs/core";

export default class LabelEditor extends React.Component {

  onKeyDown = evt => { 
    evt.stopPropagation();
  }

  render() {
    return (
      <span onKeyDown={this.onKeyDown}>
        {this.props.isEditing ? <EditableText {...this.props} /> : this.props.value}
      </span>
    );
  }
}