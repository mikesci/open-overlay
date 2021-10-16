import "./OpenOverlayIframe.js";
import "./OpenOverlayImage.js";
import "./OpenOverlayRectangle.js";
import "./OpenOverlayText.js";
import "./OpenOverlayVideo.js";

export default {
    rectangle: {
        createDOM: () => document.createElement("openoverlay-rectangle"),
        elementName: "rectangle",
        name: "Rectangle",
        icon: "square",
        preserveAspect: false,
        defaults: {
            top: 0,
            left: 0,
            width: 640,
            height: 360,
            backgroundColor: "#FF0000"
        }
    },
    image: {
        createDOM: () => document.createElement("openoverlay-image"),
        elementName: "image",
        name: "Image",
        icon: "media",
        preserveAspect: true,
        editors: {
            image: {
                type: "config-form",
                label: "Image",
                permanent: true,
                configFormParameters: [
                    { name: "src", displayName: "Url/Asset", type: "assetUrl", accept: "image/*", inline: true }
                ],
                mapPropsFromLayer: ({ src }) => ({ src }),
                mapPropsToLayer: ({ src }) => ({ src })
            }
        },
        defaults: {
            top: 0,
            left: 0,
            width: 400,
            height: 400
        }
    },
    iframe: {
        createDOM: () => document.createElement("openoverlay-iframe"),
        elementName: "iframe",
        name: "Iframe",
        icon: "globe-network",
        preserveAspect: false,
        editors: {
            iframe: {
                type: "config-form",
                label: "Iframe",
                permanent: true,
                configFormParameters: [
                    { name: "src", type: "assetUrl", displayName: "Url/Asset", accept: "text/html" }
                ],
                mapPropsFromLayer: ({ src }) => ({ src }),
                mapPropsToLayer: ({ src }) => ({ src })
            }
        },
        defaults: {
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            backgroundColor: "#FF0000"
        }
    },
    text: {
        createDOM: () => document.createElement("openoverlay-text"),
        elementName: "text",
        name: "Text",
        icon: "new-text-box",
        preserveAspect: false,
        usesFont: true,
        editors: {
            text: {
                type: "config-form",
                label: "Text",
                permanent: true,
                configFormParameters: [
                    { name: "text", type: "textarea", immediate: true }
                ],
                mapPropsFromLayer: ({ text }) => ({ text }),
                mapPropsToLayer: ({ text }) => ({ text })
            }
        },
        defaults: {
            top: 0,
            left: 0,
            width: 400,
            height: 400,
            font: "Arial",
            fontSize: 60,
            fontColor: "rgba(255,255,255,1)",
            wrap: false,
            hAlign: "left",
            vAlign: "top",
            letterSpacing: 0,
            lineHeight: 0,
            text: "text"
        }
    },
    video: {
        createDOM: () => document.createElement("openoverlay-video"),
        elementName: "video",
        name: "Video",
        icon: "video",
        preserveAspect: true,
        usesMediaControls: true,
        editors: {
            video: {
                type: "config-form",
                label: "Video",
                permanent: true,
                configFormParameters: [
                    { name: "src", type: "assetUrl", displayName: "Url/Asset",  accept: "video/*", inline: true },
                    { name: "volume", type: "slider", displayName: "Volume", min: 0, max: 100, step: 1, inline: true, immediate: true },
                    { name: "autoplay", type: "buttongroup", displayName: "Autoplay", inline: true, options: [
                        { label: "On", value: true },
                        { label: "Off", value: false }
                    ]},
                    { name: "loop", type: "buttongroup", displayName: "Looping", inline: true, options: [
                        { label: "On", value: true },
                        { label: "Off", value: false }
                    ]}
                ],
                mapPropsFromLayer: ({ src, volume, autoplay, loop }) => ({ src, volume: volume * 100, autoplay, loop }),
                mapPropsToLayer: ({ src, volume, autoplay, loop }) => ({ src, volume: volume / 100, autoplay, loop })
            }
        },
        defaults: {
            top: 0,
            left: 0,
            width: 1280,
            height: 720,
            autoplay: true,
            loop: false,
            volume: 1
        }
    }
};