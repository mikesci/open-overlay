import React, { useEffect, useState, useMemo, useRef } from "react";
import BuiltinElements from "./elements/_All.jsx";
import { useTransitions } from "./shared/Transitions.js";
import { effects } from "./components/Effects.jsx";
import AnimationPhase from "./shared/AnimationPhase.js";
import useScriptingContext from "./shared/useScriptingContext.js";
import FontLoader from "./shared/FontLoader.js";
import "./OverlayRenderer.css";

const extractPreloadPromise = (element, layer) => {
    let preloads = [];
    if (element.manifest.preload) {
        const preloadResult = element.manifest.preload(layer.config);
        if (preloadResult)
            preloads.push(preloadResult);
    }

    // additionally, we'll preload fonts if the style includes a fontFamily definition
    if (layer.style && layer.style.fontFamily)
        preloads.push(FontLoader.LoadFont(layer.style.fontFamily));

    if (preloads.length == 0)
        return null;
    
    return Promise.all(preloads);
}

const defaultElementRenderer = ({ element, layer, style, assets, wrapperRef }) => {
    const [preloading, setPreloading] = useState();
    
    // extract preloads
    const preloadPromise = useMemo(() => extractPreloadPromise(element, layer), [element, layer]);

    // if we have preloads
    // set preloading to true
    // and set to false once the preloading is done
    if (preloadPromise && preloading == null) {
        setPreloading(true);
        preloadPromise.finally(r => setPreloading(false));
        return null;
    }

    // if preloading, don't show anything
    if (preloading)
        style = {...style, visibility: "hidden"};

    let styleEffects = [];
    let wrapperEffects = [];
    if (layer.effects) {
        for(const [effectName, effectConfig] of Object.entries(layer.effects)) {
            const effect = effects[effectName];

            if (!effect) {
                console.log("Unknown effect", effectName);
                continue;
            }

            // skip hidden effects
            if (effectConfig.hidden) { continue; }

            if (effect.type == "style")
                styleEffects.push({ effect, effectConfig });
            else if (effect.type == "wrapper")
                wrapperEffects.push({ effect, effectConfig });
        }
    }

    // if there are any STYLE effects, apply them now
    for(const styleEffect of styleEffects)
        style = styleEffect.effect.apply(layer, style, styleEffect.effectConfig);
    
    let component = (
        <div data-id={layer.id} className="layer-wrapper" style={style} ref={wrapperRef}>
            <element.component {...layer.config} layer={layer} assets={assets} ElementRenderer={defaultElementRenderer} />
        </div>
    );

    // if there are any WRAPPER effects, apply them now
    for(const wrapperEffect of wrapperEffects) {
        component = <wrapperEffect.effect.component {...wrapperEffect.effectConfig} layer={layer}>{component}</wrapperEffect.effect.component>
    }

    return component;
}

const applyTransitions = (phaseTransitions, targetDOM, animationContext) => {

    // if we don't have an animation context, throw an error
    // (this should never really happen)
    if (!animationContext) {
        console.log("Could not apply transitions - animationContext is not set.");
        return;
    }

    const globalDelay = (animationContext.playing ? 0 : animationContext.offset || 0);

    // if we're transitioning, we know the layer needs to be visible
    targetDOM.style.display = "block";

    const animationHandles = phaseTransitions.map(animation => {
        const animationHandle = targetDOM.animate(animation.keyframes, {
            delay: animation.delay - globalDelay,
            duration: animation.duration,
            easing: animation.easing,
            fill: "both"
        });

        // pause if necessary
        if (!animationContext.playing)
            animationHandle.pause();

        return animationHandle;
    });

    return () => {
        // if there are any non-css-transition animations on the element, cancel them
        if (animationHandles && animationHandles.length > 0) {
            for(const animationHandle of animationHandles) {
                if (!animationHandle.transitionProperty) {
                    animationHandle.cancel();
                }
            }
        }
    };
};

const OverlayRenderer = ({
    overlay,                                    // the overlay to render
    elements,                                   // an additional elements object to add to the built-in elements
    zIndex = 10000,                             // stacking order of this overlay
    hidden = false,                             // forces all layers to be hidden if they're not already
    animationContext = null,                    // the animation context, for controlling animations externally - { phase (AnimationPhase), playing (bool), offset (int, milliseconds) }
    ElementRenderer = defaultElementRenderer,   // the component that renders elements.  can be overridden for "wireframe mode". leave undefined to render normally.
    executeScripts = true,                      // whether to execute scripts or not.  leave undefined to execute scripts automatically when shown.
    onOverlayDomReady,                          // occurs when the overlay's DOM element has been rendered and is ready
    onScriptStateChanged                        // occurs when a script executes and/or it's state changes
    }) => {

    // combine external elements and BuiltinElements and memoize for speed
    const combinedElements = useMemo(() => {
        if (elements)
            return {...BuiltinElements, ...elements};
        else    
            return BuiltinElements;
    }, [elements]);

    const overlayId = overlay.id || "default";
    const overlayDomRef = useRef();
    const scriptState = useScriptingContext(overlay, overlayDomRef, onScriptStateChanged, executeScripts);

    useEffect(() => {
        if (onOverlayDomReady) { onOverlayDomReady(overlayDomRef.current); }
    }, []);

    // if we have a scriptState, then we're executing a script
    // and we should use the overlay in that instead of the props overlay
    const sourceLayers = (scriptState ? scriptState.layers : overlay.layers) || [];

    const layers = sourceLayers.map((layer, index) => {
        const element = combinedElements[layer.elementName];

        // render nothing if the element is unknown
        if (!element)
            return null;

        return (
            <LayerWrapper
                key={layer.id}
                element={element}
                overlay={overlay}
                layer={layer}
                index={index}
                hidden={hidden || layer.hidden}
                animationContext={animationContext}
                ElementRenderer={ElementRenderer} />
        );
    });

    return (
        <div className="overlay" ref={overlayDomRef} data-overlayid={overlayId} style={{ zIndex }}>
            {layers}
        </div>
    );
}

const LayerWrapper = ({ element, overlay, layer, index, hidden, animationContext, ElementRenderer }) => {
    // a forward ref for the wrapper element
    const wrapperRef = useRef();

    // memoize style
    const style = useMemo(() => {
        let style = {
            ...layer.style,
            zIndex: 1000 - index
        };

        // additionally, if this the first time we're running (wrapperRef.current is null)
        // then hide by default.  this will get changed with the useEffect below.
        // the net effect is that there's no "first frame" of entry animations in the wrong place.
        if (!wrapperRef.current)
            style.display = "none";

        return style;
    }, [layer.style, index, wrapperRef.current]);

    // get memoized transitions
    const transitions = useTransitions(layer);

    // and we'll apply the animation context here
    useEffect(() => {
        let localAnimationContext = animationContext;

        // if we have no overriding animationContext,
        // determine it automatically based on if this layer is hidden or not
        if (!animationContext) {
            if (!hidden)
                localAnimationContext = { phase: AnimationPhase.ENTRY, playing: true };
            else
                localAnimationContext = { phase: AnimationPhase.EXIT, playing: true };
        }

        // now we know for sure that we have an animation context.  the next step is to see if we can play it
        // (we can't if there's no transitions for this phase)
        const phaseTransitions = (transitions ? transitions[localAnimationContext.phase.key] : null);

        // now we can finally apply styles and animations
        if (localAnimationContext.phase == AnimationPhase.STATIC || phaseTransitions == null || phaseTransitions.length == 0)
            wrapperRef.current.style.display = (hidden ? "none" : "block");
        else
            return applyTransitions(phaseTransitions, wrapperRef.current, localAnimationContext);

    }, [transitions, hidden, wrapperRef, animationContext]);
    
    return (
        <ElementRenderer
            key={layer.id}
            element={element}
            layer={layer}
            style={style}
            assets={overlay.assets} // always use the assets from the main overlay - they're immutable
            wrapperRef={wrapperRef} />
    );   
};

export default OverlayRenderer;