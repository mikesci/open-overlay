import React from "react";
import { effects } from "../shared/effects.js";
import "./LayerRenderer.css";
import AnimationHelper from "../shared/AnimationHelper.js";
import ScriptingContext from "../shared/ScriptingContext.js";

function transformsListToString(list) {
  let finalTransform = {};
  for(let transform of list) {
    for(let [key, value] of Object.entries(transform)) {
      switch (key) {
        case "rotate":
        case "translate": // rotate and translate are 3d vectors that get added
          if (!finalTransform[key]) { finalTransform[key] = [0,0,0]; }
          finalTransform[key][0] += value[0];
          finalTransform[key][1] += value[1];
          finalTransform[key][2] += value[2];
          break;
        default:
          finalTransform[key] = value; // overwrite as the default
      }
    }
  }

  let returnVal = "";
  if (finalTransform.perspective != undefined)
    returnVal += ` perspective(${finalTransform.perspective}px)`;
  if (finalTransform.rotate)
    returnVal += ` rotateX(${finalTransform.rotate[0]}deg) rotateY(${finalTransform.rotate[1]}deg) rotateZ(${finalTransform.rotate[2]}deg)`;
  if (finalTransform.translate)
    returnVal += ` translate3d(${finalTransform.translate[0]}px,${finalTransform.translate[1]}px,${finalTransform.translate[2]}px)`;
  if (finalTransform.translateZ != undefined)
    returnVal += ` translateZ(${finalTransform.translateZ}px)`;
  return returnVal;
}

function animationsListToString(list) {

  let animations = [];

  for(let item of list) {

    // ensure keyframes are loaded
    AnimationHelper.ensureKeyframes(item.name, item.keyframes, item.overwrite);

    // apply defaults
    if (item.duration == undefined) { item.duration = "500"; }
    if (item.timing == undefined) { item.timing = "ease"; }
    if (item.delay == undefined) { item.delay = "0"; }
    if (item.iterations == undefined) { item.iterations = "1"; }
    if (item.direction == undefined) { item.direction = "normal"; }

    animations.push(`${item.name} ${item.duration}ms ${item.timing} ${item.delay}ms ${item.iterations} ${item.direction} both`);
  }

  return animations.join(",");
}

function maxEffectDurationReducer(a, c) {
  let duration = parseInt(c.duration || 0) + parseInt(c.delay || 0);
  return (a < duration ? duration : a);
}

const DISPLAY_PHASE = {
  ENTERING: "entering",
  VISIBLE: "visible",
  EXITING: "exiting",
  HIDDEN: "hidden",
  STATIC: "static"
};

class Layer extends React.PureComponent {

  _phaseChangeTimeout;

  constructor(props) {
    super(props);
    // props.layer
    // props.element
    // props.index
    // props.forcePhase
    // props.zIndex
    // props.scriptingContext

    this.state = {
      isExiting: false,
      phase: DISPLAY_PHASE.HIDDEN,
      computedEffects: this.computeEffects(this.props.layer, this.props.zIndex, this.props.hidden)
    };
  }

  componentDidMount() {
    this.componentDidUpdate({});
  }

  componentDidUpdate(prevProps) {

    let computedEffects = this.state.computedEffects;
    if (prevProps.layer != this.props.layer || prevProps.hidden != this.props.hidden || prevProps.zIndex != this.props.zIndex) {
      // recompute effects if needed
      computedEffects = this.computeEffects();
      this.setState({ computedEffects });
    }

    // handle forced phase changes.  this disables automatic phase changes
    if (prevProps.forcePhase != this.props.forcePhase) {
      this.setState({ phase: this.props.forcePhase });
      return;
    }

    // handle phase changes automatically
    if (prevProps.layer != this.props.layer || prevProps.hidden != this.props.hidden) {
      let prevLayer = prevProps.layer || {};
      let newLayer = this.props.layer || {};

      if (!prevProps.layer || prevLayer.hidden != newLayer.hidden || prevProps.hidden != this.props.hidden) {
        if (computedEffects.hidden) { // if flipping from visible to hidden
          if (computedEffects.exitAnimation) {
            // render the exit animation, and flip to HIDDEN automatically when it's done
            this.setState({ phase: DISPLAY_PHASE.EXITING }, () => {
              if (this._phaseChangeTimeout) { clearTimeout(this._phaseChangeTimeout); }
              this._phaseChangeTimeout = setTimeout(() => { this.setState({ phase: DISPLAY_PHASE.HIDDEN }); }, computedEffects.exitAnimationDuration);
            });
          } else {
            // otherwise, go directly to hidden
            if (this._phaseChangeTimeout) { clearTimeout(this._phaseChangeTimeout); }
            this.setState({ phase: DISPLAY_PHASE.HIDDEN });
          }
        } else { // if flipping from hidden to visible
          if (computedEffects.entranceAnimation) {
            this.setState({ phase: DISPLAY_PHASE.ENTERING }, () => {
              if (this._phaseChangeTimeout) { clearTimeout(this._phaseChangeTimeout); }
              this._phaseChangeTimeout = setTimeout(() => { this.setState({ phase: DISPLAY_PHASE.VISIBLE }); }, computedEffects.entranceAnimationDuration);
            });
          } else {
            if (this._phaseChangeTimeout) { clearTimeout(this._phaseChangeTimeout); }
            this.setState({ phase: DISPLAY_PHASE.VISIBLE });
          }
        }
      }
    }
  }

  computeEffects = () => {
    let layer = this.props.layer;
    let zIndex = this.props.zIndex;

    let position = {
      top: layer.top + "px",
      left: layer.left + "px",
      height: layer.height + "px",
      width: layer.width + "px",
      transition: layer.transition,
      zIndex: zIndex
    };

    // if a style is set, override
    if (layer.style)
      position = {...position, ...layer.style};

    let style = {};
    let transforms = [];
    let entranceAnimations = [];
    let standardAnimations = [];
    let exitAnimations = [];

    if (layer.rotation)
      transforms.push({ rotate: [0, 0, layer.rotation] });

    if (layer.effects) {
      Object.entries(layer.effects).forEach(([effectName, config]) => {
        let effect = effects[effectName];
        if (!effect) { return; }

        switch (effect.type) {
          case "style": effect.apply(style, config, layer); break;
          case "transform": effect.apply(transforms, config, layer); break;
          case "animation":
            switch (effect.animationType) {
              case "entrance": effect.apply(entranceAnimations, config, layer); break;
              case "standard": effect.apply(standardAnimations, config, layer); break;
              case "exit": effect.apply(exitAnimations, config, layer); break;
              default: break;
            }
            break;
          default: break;
        }
      });
    }

    let layerWillChange = false;

    // process animations
    let entranceAnimation, entranceAnimationDuration = 0;
    if(entranceAnimations.length > 0) {
      entranceAnimation = animationsListToString(entranceAnimations);
      entranceAnimationDuration = entranceAnimations.reduce(maxEffectDurationReducer, 0);
      layerWillChange = true;
    }

    let standardAnimation, standardAnimationDuration = 0;
    if(standardAnimations.length > 0) {
      standardAnimation = animationsListToString(standardAnimations);
      standardAnimationDuration = standardAnimations.reduce(maxEffectDurationReducer, 0);
      layerWillChange = true;
    }

    let exitAnimation, exitAnimationDuration = 0;
    if(exitAnimations.length > 0) {
      exitAnimation = animationsListToString(exitAnimations);
      exitAnimationDuration = exitAnimations.reduce(maxEffectDurationReducer, 0);
      layerWillChange = true;
    }

    // force hardware rendering if we have any animations
    if (layerWillChange)
    {
      style.willChange = "transform, filter";
      transforms.translateZ = 0;
    }

    // if the style has any transforms, reduce them to a string to save rendering time
    let transform;
    if (transforms.length > 0)
      transform = transformsListToString(transforms);

    return {
      hidden: layer.hidden || this.props.hidden,
      position,
      style,
      transform,
      entranceAnimation,
      entranceAnimationDuration,
      standardAnimation,
      standardAnimationDuration,
      exitAnimation,
      exitAnimationDuration
    };
  }

  emit = (eventName, eventArgs) => {
    this.props.scriptingContext.emitToOtherLayers(eventName, eventArgs, this.props.layer);
  }

  render() {

    // immediately return, render nothing
    if (this.state.phase == DISPLAY_PHASE.HIDDEN) { return null; }

    let computedEffects = this.state.computedEffects;

    let animation;
    switch (this.state.phase) {
      case DISPLAY_PHASE.ENTERING: animation = computedEffects.entranceAnimation; break;
      case DISPLAY_PHASE.VISIBLE: animation = computedEffects.standardAnimation; break;
      case DISPLAY_PHASE.EXITING: animation = computedEffects.exitAnimation; break;
      default: break;
    }

    return (
      <div className="layer-container" data-id={this.props.layer.id} style={{ ...computedEffects.position, animation }}>
        <div className="layer-container-inner" style={{ ...computedEffects.style, transform: computedEffects.transform }}>
          <this.props.Element
            {...this.props.layer.config}
            layer={this.props.layer}
            hidden={this.props.hidden}
            emit={this.emit}
            onRegisterKnockout={this.props.onRegisterKnockout}
            onUpdateKnockout={this.props.onUpdateKnockout}
            onRemoveKnockout={this.props.onRemoveKnockout} />
        </div>
      </div>
    );
  }
}

export default class LayerRenderer extends React.Component {

  _scriptingContext;
  _knockoutIdCounter = 0;

  constructor(props) {
    super(props);
    // props.layers
    // props.elements
    // props.fontLoader
    // props.zIndex
    // props.forcePhase
    // props.scriptingContext
    // props.runScriptsOnShow    

    this.state = {
      isLoadingFonts: false,
      knockouts: {},
    };
  }

  componentDidMount() {
    this.componentDidUpdate({});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layers != this.props.layers) {
      // and ensure that we have all the fonts loaded
      this.ensureFonts();
    }
  }

  ensureFonts = () => {
    if (this.props.fontLoader)
    {
      for(let layer of this.props.layers) {
        let Element = this.props.elements[layer.elementName];
        if (!Element) { continue; }
        for(var parameter of Element.manifest.parameters) {
          if (parameter.type == "font") {
            let font = layer.config[parameter.name];
            if (font && font.fontFamily) {
              let fontPromise = this.props.fontLoader.LoadFont(font.fontFamily); // this returns null if it's already loaded
              if (fontPromise) {
                this.setState({ isLoadingFonts: true })
                fontPromise.then(() => { this.setState({ isLoadingFonts: false }); });
              }
            }
          }
        }
      }
    }
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

  renderKnockouts(knockouts) {
    return (
      <svg style={{ position: "absolute", top: "-99999px" }} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="knockoutClippath">
            <path d={"M-10000 -10000 L10000 -10000 L10000 10000 L-10000 10000 L-10000 -10000 " + knockouts.join(" ") + "Z"} />
          </clipPath>
        </defs>
      </svg>
    );
  }

  render() {

    // render nothing if we're loading fonts
    if (this.state.isLoadingFonts) { return null; }

    let layers = this.props.layers;

    let renderedLayers = layers.map((layer, index) => {

      let Element = this.props.elements[layer.elementName];
      if (!Element) { return null; } // don't render anything if we don't recognize the element

      return (
        <Layer
          key={layer.id}
          hidden={this.props.hidden}
          layer={layer}
          forcePhase={this.props.forcePhase}
          Element={Element}
          zIndex={(this.props.zIndex || 0) - index}
          scriptingContext={this.props.scriptingContext}
          onRegisterKnockout={this.onRegisterKnockout}
          onRemoveKnockout={this.onRemoveKnockout}
          onUpdateKnockout={this.onUpdateKnockout} />
      );
    });

    let knockouts = Object.values(this.state.knockouts);

    return (
      <div className="knockout-wrapper" style={knockouts.length > 0 ? { "clipPath": "url(#knockoutClippath)" } : null}>
        {knockouts.length > 0 ? this.renderKnockouts(knockouts) : null}
        {renderedLayers}
      </div>
    );
  }
}