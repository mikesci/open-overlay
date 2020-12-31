import React, { useEffect, useState, useMemo, useRef } from "react";
import BuiltinElements from "./elements/_All.jsx";
import { precomputeAnimations } from "./shared/usePrecomputed.js";
import { effects } from "./components/Effects.jsx";
import AnimationPhase from "./shared/AnimationPhase.js";
import AnimationState from "./shared/AnimationState.js";
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
    if (layer.style.fontFamily)
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

const useAnimations = (layer, targetRef, animationContext) => {
    // memoize animations
    const animations = useMemo(() => {
        return precomputeAnimations(layer);
    }, [layer]);

    useEffect(() => {
        const target = targetRef.current;

        let animationsCreated = [];

        // apply animations if we have them for this phase
        const phaseAnimations = animations[animationContext.phase.key];
        if (phaseAnimations) {
            const globalDelay = (animationContext.state == AnimationState.PAUSED ? animationContext.offset : 0);

            for(const animation of phaseAnimations) {
                const anim = target.animate(animation.keyframes, {
                    delay: animation.delay - globalDelay,
                    duration: animation.duration,
                    easing: animation.easing,
                    fill: "both"
                });

                if (animationContext.state == AnimationState.PAUSED)
                    anim.pause();
                else
                    anim.play();

                    animationsCreated.push(anim);
            }
        }

        return () => {
            // if there are any non-transition animations on the element, cancel them
            // these are css transitions, not our "transitions" which are really just animations
            if (animationsCreated.length > 0) {
                for(const existingAnimation of animationsCreated) {
                    if (!existingAnimation.transitionProperty) {
                        existingAnimation.cancel();
                    }
                }
            }
        };
    }, [targetRef, animations, animationContext]);
};

const OverlayRenderer = ({
    overlay,                                    // the overlay to render
    elements,                                   // an additional elements object to add to the built-in elements
    zIndex = 10000,                             // stacking order of this overlay
    animationContext = {
        phase: AnimationPhase.STATIC,
        state: AnimationState.PAUSED,
        offset: 0
    },                                          // the animation context, for controlling animations externally
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

const LayerWrapper = ({ element, overlay, layer, index, animationContext, ElementRenderer }) => {

    // memoize style
    const layerHidden = (animationContext.phase == AnimationPhase.HIDDEN || overlay.hidden || layer.hidden);
    const style = useMemo(() => ({
        ...layer.style,
        zIndex: 1000 - index,
        display: (layerHidden ? "none" : "block")
    }), [layer.style, index, layerHidden]);

    // use animations (incl. transitions)
    const wrapperRef = useRef();
    useAnimations(layer, wrapperRef, animationContext);

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