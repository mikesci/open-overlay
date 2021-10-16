import image from "./image.js";
import video from "./video.js";
import html from "./html.js";
import script from "./script.js";
//import audio from "./audio.js";

const contentTypeHandlers = [
    image,
    script,
    video,
    html // html needs to come after video to let it have a crack at grabbing youtube URLs
    //audio // audio disabled for the time being
];

const getContentTypeHandler = (contentType, data) => {
    return contentTypeHandlers.find(handler => handler.match(contentType, data));
}

export { getContentTypeHandler };