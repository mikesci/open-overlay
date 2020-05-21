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

    let layers = this.props.layers;
    if (!layers && window.location.hash.length > 1) // try to load layers from the window
    {
      let data = decodeURIComponent(window.location.hash.substring(1));
      // try to parse as JSON for legacy support
      try { layers = JSON.parse(data); }
      catch { }
      // if that failed, we can parse with the new method
      if (!layers)
        layers = SerializationHelper.stringToModel(data);
    }

    this._scriptingContext = new ScriptingContext({
      layers: layers,
      onLayersUpdated: (layers) => { 
        this.setState({ layers });
      }
    });

    this.state = {
      loaded: false,
      layers: layers,
      elements: {} // will be loaded shortly, asynchronously
    };

    this.loadElementsFromLayers();
  }

  componentDidMount() {
    if (this.props.script) {
      try
      {
        this._scriptingContext.execute(this.props.script);
      }
      catch (ex) {
        console.log({ error: "Overlay Script Exception", exception: ex });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.layers != prevProps.layers) {
      this.setState({ layers: this.props.layers });
      // we might need to reset the layers on the scripting context...
      //this._scriptingContext.setLayers(this.props.layers);
    }
  }

  loadElementsFromLayers = async () => {
    let externalElements = await ExternalElementHelper.LoadFromLayers(this.state.layers, this.state.elements);
    this.setState({
      loaded: true,
      elements: {...Elements.Builtin, ...this.props.elements, ...externalElements}
    })
  }

  render() {
    if (!this.state.loaded) { return null; }

    // default the z-index to 10000
    let zIndex = this.props.zIndex || 10000;

    //let layers = (this._scriptingContext.hasModifiedLayers() ? this._scriptingContext.getLayers() : this.state.layers);

    return (
      <LayerRenderer elements={this.state.elements} layers={this.state.layers} fontLoader={this._fontLoader} zIndex={zIndex} hidden={this.props.hidden} scriptingContext={this._scriptingContext} />
    );
  }
}

// export to window to allow this to be consumed in the browser easily
window.OverlayRenderer = OverlayRenderer;

export default OverlayRenderer;