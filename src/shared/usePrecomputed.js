import Transitions from "./Transitions.js";

const translateKeyframes = (keyframes) => {
    return keyframes.reduce((outputKeyframes, keyframe, index) => {
        // easing is very weird.  our easing property is applied as if it applies retroactively to the segment ENDING with the keyframe's offset
        // but the CSS spec is different - it applies in the future to the next segment.  very strange.

        // we might have to inject an output frame at position 0 to handle easing on the first frame
        if (index == 0 && keyframe.offset > 0)
            outputKeyframes.push({ offset: 0, easing: keyframe.easing });
        
        // now add the keyframe we want
        let outputKeyframe = keyframe.style;
        //let outputKeyframe = buildLayerStyle(keyframe);
        outputKeyframe.offset = keyframe.offset;
        if (index < animation.keyframes.length - 1)
            outputKeyframe.easing = animation.keyframes[index + 1].easing;
        outputKeyframes.push(outputKeyframe);
        return outputKeyframes;
    }, [])
}

/*
const precomputeAnimations =  (animations, layer) => {
    if (!animations)
        return {};

    if (!layer.animations)
     return {};
    
    
    return animations.reduce((computedAnimations, animation) => {
        // if this is not part of the layer's animations, skip
        if (!layer.animations.includes(animation.id))
            return computedAnimations;

        // animation must define delay
        if (animation.delay === undefined) {
            console.log("Animation does not define a delay", animation);
            return computedAnimations;
        }

        // animation must define a duration
        if (animation.duration === undefined) {
            console.log("Animation does not define a duration", animation);
            return computedAnimations;
        }

        // animation must define .preset or .keyframes
        let keyframes;
        if (animation.preset) {
            const animationPreset = AnimationPresets[animation.preset];
            if (!animationPreset) {
                console.log("Animation preset not found", animation);
                return computedAnimations;
            }
            keyframes = animationPreset.keyframes(animation.config, layer);
        } else if (animation.keyframes) {
            // custom keyframes have to be translated from our style defs to CSS defs
            keyframes = translateKeyframes(animation.keyframes);
        } else {
            // neither preset nor keyframes is defined - error
            console.log("Animation defines neither preset nor keyframes", animation);
            return computedAnimations;
        }

        let phaseAnimations = computedAnimations[animation.phase]
        if (!phaseAnimations)
            phaseAnimations = computedAnimations[animation.phase] = [];

        // now, compute the animation
        phaseAnimations.push({
            delay: animation.delay,
            duration: animation.duration,
            easing: animation.easing,
            keyframes: keyframes
        });

        return computedAnimations;
    }, {});
}
*/

const precomputeAnimations =  (layer) => {
    
    if (!layer.transitions)
        return {};

    return Object.entries(layer.transitions).reduce((computedAnimations, [transitionKey, transitionConfig]) => {

        const transition = Transitions[transitionKey];

        if (!transition) {
            console.log("Unknown transition.", transitionKey);
            return computedAnimations;
        }

        let phaseAnimations = computedAnimations[transition.phase];
        if (!phaseAnimations)
            phaseAnimations = computedAnimations[transition.phase] = [];

        // get keyframes
        let keyframes = transition.keyframes(transitionConfig, layer);

        // store the animation
        phaseAnimations.push({
            delay: transitionConfig.delay,
            duration: transitionConfig.duration,
            easing: transitionConfig.easing,
            keyframes: keyframes
        });

        return computedAnimations;
    }, {});
}

export {
    precomputeAnimations
};