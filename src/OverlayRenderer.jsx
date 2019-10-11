import React from "react";
import LayerRenderer from "./components/LayerRenderer.jsx";
import FontLoader from "./shared/FontLoader.js";
import Elements from "./components/Elements.jsx";
import ExternalElementHelper from "./shared/ExternalElementHelper.js";
//import "./OverlayRenderer.scss";

class OverlayRenderer extends React.Component {

  _fontLoader;

  constructor(props) {
    super(props);
    // props.width
    // props.height
    // props.layers

    this._fontLoader = new FontLoader();

    this.state = {
      loaded: false,
      elements: Elements.Builtin
    };

    this.loadElementsFromLayers();
  }

  loadElementsFromLayers = async () => {
    let externalElements = await ExternalElementHelper.LoadFromLayers(this.props.layers, this.state.elements);
    this.setState({
      loaded: true,
      elements: {...Elements.Builtin, ...externalElements}
    })
  }

  render() {
    if (!this.state.loaded) { return null; }

    return (
      <LayerRenderer elements={this.state.elements} layers={this.props.layers} fontLoader={this._fontLoader} />
    );
  }
}

// export to window to allow this to be consumed in the browser easily
window.OverlayRenderer = OverlayRenderer;

export default OverlayRenderer;