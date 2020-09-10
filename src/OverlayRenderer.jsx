import React from "react";
import LayerRenderer from "./components/LayerRenderer.jsx";
import Elements from "./components/Elements.jsx";
import ScriptingContext from "./shared/ScriptingContext.js";

class OverlayRenderer extends React.Component {

  _scriptingContext = new ScriptingContext({ onUpdated: () => { this.forceUpdate(); } });

  constructor(props) {
    super(props);
    // props.id
    // props.overlay
    // props.zIndex
    // props.hidden
    // props.wireframeMode
    // props.elements
    // props.elementProps

    // if an id is not provided, generate one
    let id = (this.props.id || Math.random().toString());

    // merge elements
    let elements = {...Elements.Builtin};
    if (this.props.elements) { Object.assign(elements, this.props.elements); }
    
    this.state = {
      id,
      elements
    };
  }

  componentDidMount() {
    if (this.props.script && !this.props.hidden) {
      this._scriptingContext.execute(this.props.overlay);
    }
  }

  componentDidUpdate(prevProps) {
    // execute scripts when the overlay is hidden/shown
    if (this.props.overlay.script && this.props.hidden != prevProps.hidden) {
        if (this.props.hidden) {
          this._scriptingContext.reset();
          this.forceUpdate();
        }
        else {
          this._scriptingContext.execute(this.props.overlay);
        }
    }
  }

  render() {
    // default the z-index to 10000
    let zIndex = (this.props.zIndex == null ? 10000 : this.props.zIndex);

    // use the script context's layers if it has them
    let layers = (this._scriptingContext.hasModifiedLayers ? this._scriptingContext.layers : this.props.overlay.layers);

    return (
      <LayerRenderer
        id={this.state.id}
        elements={this.state.elements}
        elementProps={{ assets: this.props.overlay.assets, ...(this.props.elementProps || {})}}
        layers={layers}
        zIndex={zIndex}
        hidden={this.props.hidden}
        scriptingContext={this._scriptingContext}
        runScriptsOnShow={true}
        wireframeMode={this.props.wireframeMode} />
    );
  }
}

export default OverlayRenderer;