function CopyToClipboard(dataString) {
    let textarea = document.createElement("textarea");
    textarea.style["position"] = "absolute";
    textarea.style["top"] = "-99999px";
    textarea.value = dataString;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    setTimeout(() => {
        document.body.removeChild(textarea);
    }, 100);
}

export default {
    CopyToClipboard
};