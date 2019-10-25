import React from "react";
import { effects } from "../shared/effects.js";
import "./LayerRenderer.css";

class Layer extends React.Component {

  //_entryAnimation = [];

  constructor(props) {
    super(props);
    // props.layer
    // props.element
    // props.index
  }

  /*
  componentDidMount() {
    this._entryAnimation = this.buildAnimations(this.props.layer.keyframes);
  }

  componentDidUpdate() {
    // clear out the animations
    if (this._entryAnimation) { this._entryAnimation.cancel(); }
    this._entryAnimation = this.buildAnimations(this.props.layer.keyframes);
  }

  buildAnimations = (keyframes) => {
    if (!keyframes) { return null; }
    let animation = this.refs.el.animate(keyframes, {
      duration: 2000,
      iterations: Infinity
    });
    animation.pause();
    return animation;
  }
  */

  render() {
    let style = {
      top: this.props.layer.top + "px",
      left: this.props.layer.left + "px",
      height: this.props.layer.height + "px",
      width:this.props.layer.width + "px",
      zIndex: (10000 - this.props.index),
      transform: (this.props.layer.rotation ? `rotate(${this.props.layer.rotation}deg)` : null)
    };

    if (this.props.layer.effects) {
      Object.entries(this.props.layer.effects).forEach(([effectName, config]) => {
        let effect = effects[effectName];
        if (!effect) { return; }
        effect.apply(style, config);
      });
    }

    return (
      <div className="layer-container" data-id={this.props.layer.id} style={style} ref="el">
        <this.props.Element {...this.props.layer.config} layer={this.props.layer} onRegisterKnockout={this.props.onRegisterKnockout} onUpdateKnockout={this.props.onUpdateKnockout} onRemoveKnockout={this.props.onRemoveKnockout} />
      </div>
    );
  }
}

export default class LayerRenderer extends React.Component {

  _knockoutIdCounter = 0;

  constructor(props) {
    super(props);
    // props.layers
    // props.elements
    // props.fontLoader

    this.state = {
      knockouts: {}
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

    let renderedLayers = this.props.layers.map((layer, index) => {
      
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

      if (isLoading) { return null; }

      return (
        <Layer
          key={layer.id}
          layer={layer}
          Element={Element}
          index={index}
          onRegisterKnockout={this.onRegisterKnockout}
          onRemoveKnockout={this.onRemoveKnockout}
          onUpdateKnockout={this.onUpdateKnockout} />
      );
    });

    return (
      <div className="knockout-wrapper" ref="knockoutWrapper" style={style}>
        {svg}
        {renderedLayers}
      </div>
    );
  }
}