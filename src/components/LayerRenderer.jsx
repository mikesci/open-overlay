import React from "react";
import FontLoader from "../shared/FontLoader.js";
import "./LayerRenderer.css";

export default class LayerRenderer extends React.Component {

  _knockoutIdCounter = 0;

  constructor(props) {
    super(props);
    // props.layers
    // props.elements
    // props.fontLoader

    this.state = {
      knockouts: {},
      hiddenLayerIds: []
    };
  }

  onRegisterKnockout = () => {
    let id = this._knockoutIdCounter++;
    this.setState(prevState => {
      let knockouts = Object.assign({}, prevState.knockouts);
      knockouts[id] = "";
      return { knockouts: knockouts };
    });
    return id;
  }

  onUpdateKnockout = (id, pathString) => {
    this.setState(prevState => {
      let knockouts = Object.assign({}, prevState.knockouts);
      knockouts[id] = pathString;
      return { knockouts: knockouts };
    });
  }

  onRemoveKnockout = id => {
    this.setState(prevState => {
      let knockouts = Object.assign({}, prevState.knockouts);
      delete knockouts[id];
      return { knockouts: knockouts };
    });
  }

  render() {

    let svg = null;
    let style = null;
    let knockouts = Object.values(this.state.knockouts);
    if (knockouts.length > 0) {
      style = { "clipPath": "url(#knockoutClippath)" };
      svg = (
        <svg style={{ position: "absolute", top: "-99999px" }} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="knockoutClippath">
              <path ref="knockoutPath" d={"M-10000 -10000 L10000 -10000 L10000 10000 L-10000 10000 L-10000 -10000 " + knockouts.join(" ") + "Z"} />
            </clipPath>
          </defs>
        </svg>
      );
    }

    return (
      <div className="knockout-wrapper" ref="knockoutWrapper" style={style}>
        {svg}
        {this.props.layers.map((layer, index) => {
         
          if (layer.hidden) { return null; } // don't render anything if the layer is hidden

          let Element = this.props.elements[layer.elementName];
          if (!Element) { return null; } // don't render anything if we don't recognize the element
      
          // check for fonts that need to be loaded
          let isLoading = false;
          if (this.props.fontLoader) {
            for(var parameter of Element.manifest.parameters) {
              if (parameter.type == "font") {
                let font = layer.config[parameter.name];
                if (font && font.fontFamily) {
                  let fontPromise = this.props.fontLoader.LoadFont(font.fontFamily);
                  if (fontPromise) {
                    isLoading = true;
                    // when the font is loaded, re-render
                    fontPromise.then(() => { this.forceUpdate() });
                  }
                }
              }
            }
          }

          let style = {
            top: layer.top + "px",
            left: layer.left + "px",
            height: layer.height + "px",
            width: layer.width + "px",
            zIndex: (10000 - index),
            visibility: (isLoading ? "hidden" : "visible")
          };

          if (layer.rotation) {
            style.transform = `rotate(${layer.rotation}deg)`;
          };

          return (
            <div className="layer-container" key={layer.id} data-id={layer.id} style={style}>
              <Element {...layer.config} layer={layer} onRegisterKnockout={this.onRegisterKnockout} onUpdateKnockout={this.onUpdateKnockout} onRemoveKnockout={this.onRemoveKnockout} />
            </div>
          );
        })}
      </div>
    );
  }
}