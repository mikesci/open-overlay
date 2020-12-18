import React, { useContext } from "react";
import { useOverlayEditorContext } from "./OverlayEditorContext.js";
import { mergeObject } from "./mergeHelper.js";

const AnimationSelectionContext = React.createContext();

function recalculate() {
    const [[animations, selectedAnimations], dispatch] = useOverlayEditorContext(
        state => state.overlay.animations,
        state => state.selectedAnimations);

    let mergedAnimation;

    if (selectedAnimations.length > 0) {
        mergedAnimation = animations.reduce((mergedAnimation, animation) => {
            if (selectedAnimations.includes(animation.id)) {
                if (mergedAnimation == null)
                    mergedAnimation = {...animation};
                else
                    mergeObject(mergedAnimation, animation);
            }
            return mergedAnimation;
        }, null);
    }

    return {
        mergedAnimation
    };
}

const AnimationSelectionContextProvider = function(props) {
    return <AnimationSelectionContext.Provider value={recalculate()} {...props} />
}

const useAnimationSelectionContext = function() {
    return useContext(AnimationSelectionContext);
}

export {
    AnimationSelectionContextProvider,
    useAnimationSelectionContext
};
