import React from "react";
import LayerRenderer from "./components/LayerRenderer.jsx";
import FontLoader from "./shared/FontLoader.js";
import Elements from "./components/Elements.jsx";
import ExternalElementHelper from "./shared/ExternalElementHelper.js";
import SerializationHelper from "./shared/SerializationHelper.js";
import ScriptingContext from "./shared/ScriptingContext.js";
//import "./OverlayRenderer.scss";

class OverlayRenderer extends React.Component {

  _fontLoader;
  _scriptingContext;

  constructor(props) {
    super(props);
    // props.width
    // props.height
    // props.layers
    // props.zIndex
    // props.hidden
    // props.script

    this._fontLoader = new FontLoader();

    this._scriptingContext = new ScriptingContext({
      onLayersUpdated: (layers) => { this.forceUpdate(); }
    });

    this.state = {
      loaded: false,
      elements: {} // will be loaded shortly, asynchronously
    };

    this.loadElementsFromLayers();
  }

  componentDidMount() {
    if (this.props.script && !this.props.hidden) {
      this._scriptingContext.execute(this.props.layers, this.props.script);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.layers != prevProps.layers) {
      this.setState({ layers: this.props.layers });
    }

    // execute scripts when the overlay is hidden/shown
    if (this.props.hidden != prevProps.hidden) {
      if (this.props.hidden)
        this._scriptingContext.reset();
      else
        this._scriptingContext.execute(this.props.layers, this.props.script);
    }
  }

  loadElementsFromLayers = async () => {
    let externalElements = await ExternalElementHelper.LoadFromLayers(this.props.layers, this.state.elements);
    this.setState({
      loaded: true,
      elements: {...Elements.Builtin, ...this.props.elements, ...externalElements}
    })
  }

  render() {
    if (!this.state.loaded) { return null; }

    // default the z-index to 10000
    let zIndex = this.props.zIndex || 10000;

    let layers = (this._scriptingContext.hasModifiedLayers() ? this._scriptingContext.getLayers() : this.props.layers);

    return (
      <LayerRenderer
        elements={this.state.elements}
        layers={layers}
        fontLoader={this._fontLoader}
        zIndex={zIndex}
        hidden={this.props.hidden}
        scriptingContext={this._scriptingContext}
        runScriptsOnShow={true} />
    );
  }
}

// export to window to allow this to be consumed in the browser easily
window.OverlayRenderer = OverlayRenderer;

export default OverlayRenderer;