import React, { useEffect, useState, useMemo, useRef } from "react";
import Elements from "./elements/_All.jsx";
import { precomputeAnimations, precomputeLayerStyle } from "./shared/usePrecomputed.js";
import { effects } from "./components/Effects.jsx";
import AnimationPhase from "./shared/AnimationPhase.js";
import AnimationState from "./shared/AnimationState.js";
import useScriptingContext from "./shared/useScriptingContext.js";
import FontLoader from "./shared/FontLoader.js";
import "./OverlayRenderer.css";

const useAutomaticAnimation = (hidden, phaseDurations) => {
    const [animation, setAnimation] = useState({
        phase: AnimationPhase.HIDDEN,
        state: AnimationState.PLAYING,
        offset: 0
    });

    useEffect(() => {
        // change immediately to ENTERING if we're not hidden
        if (!hidden) {
            setAnimation(prev => ({...prev, phase: AnimationPhase.ENTRY }));
            return;
        }

        // we are hidden
        
        // if we don't have an exit duration, immediately flip to HIDDEN
        const exitDuration = phaseDurations[AnimationPhase.EXIT.key];
        if (!exitDuration)
        {
            setAnimation(prev => ({...prev, phase: AnimationPhase.HIDDEN }));
            return;
        }

        // if we DO, set a timeout to flip to hidden when it's over
        const stateChangeTimeout = setTimeout(() => {
            setAnimation(prev => ({...prev, phase: AnimationPhase.HIDDEN }));
        }, exitDuration);

        // and set the state to exiting
        setAnimation(prev => ({...prev, phase: AnimationPhase.EXIT }));

        return () => { clearTimeout(stateChangeTimeout) }; 
    }, [ hidden, phaseDurations ]);

    return animation;
}

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

const useDefaultElementRenderer = (additionalElements) => {
    return useMemo(() => {
        // merge elements
        const mergedElements = (additionalElements ? { ...Elements, ...additionalElements } : Elements);

        const DefaultElementRenderer = ({ layer, index, assets, wrapperRef }) => {
            let style = precomputeLayerStyle(layer, index);
            let [preloading, setPreloading] = useState();

            // render nothing if the element is unknown
            const element = mergedElements[layer.elementName];
            if (!element) { return null; }

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
                    <element.component {...layer.config} layer={layer} assets={assets} ElementRenderer={DefaultElementRenderer} />
                </div>
            );

            // if there are any WRAPPER effects, apply them now
            for(const wrapperEffect of wrapperEffects) {
                component = <wrapperEffect.effect.component {...wrapperEffect.effectConfig} layer={layer}>{component}</wrapperEffect.effect.component>
            }

            return component;
        };

        return DefaultElementRenderer;
    }, [additionalElements]);
}

const OverlayRenderer = ({
    overlay,                        // the overlay to render
    elements,                       // an additional elements object to add to the built-in elements
    zIndex = 10000,                 // stacking order of this overlay
    hidden = false,                 // controls if the entire overlay is visible or hidden.  changing affects automatic animation state changes and script execution.
    animationContext,               // animation properties.  leave blank to handle automatically.
    ElementRenderer,                // the component that renders elements.  can be overridden for "wireframe mode". leave undefined to render normally.
    executeScripts,                 // whether to execute scripts or not.  leave undefined to execute scripts automatically when shown.
    onLayerCreated,                 // occurs when the layer's DOM has been initially rendered
    onLayerRemoved                  // occurs when the layer has been removed from the DOM
    }) => {

    // use default renderer if not supplied
    if (ElementRenderer === undefined)
        ElementRenderer = useDefaultElementRenderer(elements);
    
    // automatically execute scripts when unhidden
    if (executeScripts === undefined)
        executeScripts = !hidden;

    const overlayId = overlay.id || "default";
    const overlayRef = useRef();

    const scriptingContext = useScriptingContext(overlay, executeScripts);

    // if we have a scriptState, then we're executing a script
    // and we should use the overlay in that instead of the props overlay
    const sourceLayers = scriptingContext ? scriptingContext.layers : overlay.layers;

    const layers = sourceLayers.map((layer, index) => (
        <LayerWrapper
            key={layer.id}
            overlayId={overlayId}
            overlay={overlay}
            layer={layer}
            index={index}
            animationContext={animationContext}
            ElementRenderer={ElementRenderer}
            onLayerCreated={onLayerCreated}
            onLayerRemoved={onLayerRemoved}
        />
    ));
    return (
        <div className="overlay" data-overlayid={overlayId} ref={overlayRef} style={{ zIndex }}>
            {layers}
        </div>
    );
}

const LayerWrapper = ({ overlay, layer, index, animationContext, onLayerCreated, onLayerRemoved, ElementRenderer }) => {
    const wrapperRef = useRef();
    const layerHidden = layer.hidden || overlay.hidden;

    if (!animationContext)
        animationContext = useAutomaticAnimation(layerHidden, overlay.phases);

    // handle onLayerCreated/removed
    useEffect(() => {
        if (onLayerCreated)
            onLayerCreated(layer, wrapperRef.current);
        if (onLayerRemoved)
            return (() => onLayerRemoved(layer, wrapperRef.current));
    }, []);

    // handle style application & animations
    useEffect(() => {
        const animations = precomputeAnimations(overlay.animations, layer);

        let target = wrapperRef.current;

        // handle hidden/visible
        target.style.display = (layerHidden ? "none" : "block");

        // if there are any non-transition animations on the element, cancel them
        for(const existingAnimation of target.getAnimations()) {
            if (!existingAnimation.transitionProperty) {
                existingAnimation.cancel();
            }
        }

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
            }
        }

    }, [ layerHidden, overlay.animations, layer, index, animationContext ]);

    return (
        <ElementRenderer
            key={layer.id}
            layer={layer}
            index={index}
            assets={overlay.assets} // always use the assets from the main overlay - they're immutable
            wrapperRef={wrapperRef} />
    );   
};

export default OverlayRenderer;