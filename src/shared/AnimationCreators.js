const items = {
    fadein: {
        displayName: "Fade In",
        create: (layer) => ({
            phase: "entry",
            preset: "fade",
            config: { from: 0, to: 100 }
        })
    },
    fadeout: {
        displayName: "Fade Out",
        create: (layer) => ({
            phase: "exit",
            preset: "fade",
            config: { from: 100, to: 0 }
        })
    },
    slidedown: {
        displayName: "Slide Down",
        create: (layer) => ({
            phase: "entry",
            preset: "slide",
            config: { absolute: false, fromLeft: 0, fromTop: -1080, toLeft: 0, toTop: 0 }
        })
    },
    slideup: {
        displayName: "Slide Up",
        create: (layer) => ({
            phase: "exit",
            preset: "slide",
            config: { absolute: false, fromLeft: 0, fromTop: 0, toLeft: 0, toTop: -1080 }
        })
    }
};

const AnimationCreators = {
    "entry": [items.fadein, items.slidedown],
    "exit": [items.fadeout, items.slideup]
};

export default AnimationCreators;