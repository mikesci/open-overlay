import React, { useCallback, useMemo } from "react";
import { Button, ButtonGroup, ControlGroup, FormGroup, HTMLSelect, Switch, Tag } from "@blueprintjs/core";
import CollapsiblePanel from "../ui/CollapsiblePanel.jsx";
import FontColorInput from "../ui/FontColorInput.jsx";
import DraggableNumberInput from "../ui/DraggableNumberInput.jsx";
import fonts from "../fonts";

const TEXT_SHADOW_REGEXP = /(rgba?\([\. ,0-9]+\)|(?:#[0-9A-Fa-f]{3,8})) (\-?[\.0-9]+)px (\-?[\.0-9]+)px \-?([\.0-9]+)px/;

const textShadowStringToObject = (textShadowString) => {
    if (!textShadowString) { return { color: "rgba(0,0,0,1)", offsetx: 0, offsety: 0, size: 0 }; }
    const matches = textShadowString.match(TEXT_SHADOW_REGEXP);
    if (!matches) { return { color: "rgba(0,0,0,1)", offsetx: 0, offsety: 0, size: 0 }; }
    return {
        color: matches[1],
        offsetx: parseFloat(matches[2]),
        offsety: parseFloat(matches[3]),
        size: parseFloat(matches[4])
    };
};

const textShadowObjectToString = ({ color, offsetx, offsety, size }) => {
    return `${color || "#000000"} ${offsetx || 0}px ${offsety || 0}px ${size || 0}px`
};

const updateWhenRelevantPropertiesChange = (prevProps, nextProps) => {
    if (prevProps.onPropertiesChanged != nextProps.onPropertiesChanged) { return false; }
    if (!prevProps.layer || !nextProps.layer) { return false; }

    if (prevProps.layer.font != nextProps.layer.font) { return false };
    if (prevProps.layer.fontSize != nextProps.layer.fontSize) { return false };
    if (prevProps.layer.fontColor != nextProps.layer.fontColor) { return false };
    if (prevProps.layer.italic != nextProps.layer.italic) { return false };
    if (prevProps.layer.underline != nextProps.layer.underline) { return false };
    if (prevProps.layer.hAlign != nextProps.layer.hAlign) { return false };
    if (prevProps.layer.vAlign != nextProps.layer.vAlign) { return false };
    if (prevProps.layer.wrap != nextProps.layer.wrap) { return false };
    if (prevProps.layer.letterSpacing != nextProps.layer.letterSpacing) { return false };
    if (prevProps.layer.lineHeight != nextProps.layer.lineHeight) { return false };
    if (prevProps.layer.textShadow != nextProps.layer.textShadow) { return false };

    return true;
}

const FontPropertyEditor = ({ onPropertiesChanged, layer }) => {

    const { font, fontSize, fontColor, bold, italic, underline, hAlign, vAlign, wrap, letterSpacing, lineHeight, textShadow } = layer;
        
    const onFontChanged = useCallback(evt => {
        const fontSrc = fonts[evt.target.value];
        onPropertiesChanged({ font: evt.target.value, fontSrc: fontSrc }, true);
    }, []);

    const onFontSizeChanged = useCallback((value, commit) => {
        onPropertiesChanged({ fontSize: value }, commit);
    }, []);

    const onFontColorChanged = useCallback((value, commit) => {
        onPropertiesChanged({ fontColor: value }, commit);
    }, []);

    const onBoldClick = useCallback(() => {
        onPropertiesChanged({ bold: (bold ? undefined : true) }, true);
    }, [ bold ]);

    const onItalicClick = useCallback(() => {
        onPropertiesChanged({ italic: (italic ? undefined : true) }, true);
    }, [ italic ]);

    const onUnderlineClick = useCallback(() => {
        onPropertiesChanged({ underline: (underline ? undefined : true) }, true);
    }, [ underline ]);

    const onHAlignClick = useCallback((value) => {
        onPropertiesChanged({ hAlign: (value == hAlign ? undefined : value) }, true);
    }, [ hAlign ]);

    const onTextWrapClick = useCallback(() => {
        onPropertiesChanged({ wrap: (wrap ? undefined : true)}, true);
    }, [ wrap ]);

    const onVAlignClick = useCallback((value) => {
        onPropertiesChanged({ vAlign: (value == vAlign ? undefined : value) }, true);
    }, [ vAlign ]);

    const onLetterSpacingChanged = useCallback((value, commit) => {
        onPropertiesChanged({ letterSpacing: (value == letterSpacing ? undefined : value) }, commit);
    }, [ letterSpacing ]);

    const onLineHeightChanged = useCallback((value, commit) => {
        onPropertiesChanged({ lineHeight: (value == lineHeight ? undefined : value) }, commit);
    }, [ lineHeight ]);

    const textShadowObject = useMemo(() => textShadowStringToObject(textShadow), [ textShadow ]);

    const onTextShadowXChanged = useCallback((value, commit) => {
        const textShadow = textShadowObjectToString({...textShadowObject, offsetx: value });
        onPropertiesChanged({ textShadow }, commit);
    }, [ textShadowObject ]);

    const onTextShadowYChanged = useCallback((value, commit) => {
        const textShadow = textShadowObjectToString({...textShadowObject, offsety: value });
        onPropertiesChanged({ textShadow }, commit);
    }, [ textShadowObject ]);

    const onTextShadowSizeChanged = useCallback((value, commit) => {
        const textShadow = textShadowObjectToString({...textShadowObject, size: value });
        onPropertiesChanged({ textShadow }, commit);
    }, [ textShadowObject ]);

    const onTextShadowColorChanged = useCallback((value, commit) => {
        const textShadow = textShadowObjectToString({...textShadowObject, color: value });
        onPropertiesChanged({ textShadow }, commit);
    }, [ textShadowObject ]);

    const fontOptions = useMemo(() => Object.keys(fonts), []);

    return (
        <div className="font-editor">
            <CollapsiblePanel label="Font" defaultIsOpen={true}>
                <ControlGroup fill={true}>
                    <HTMLSelect value={font} onChange={onFontChanged} options={fontOptions} className="font-family" fill={true} />
                    <DraggableNumberInput fill={true} value={fontSize} onChange={onFontSizeChanged} className="font-size" unit="px" />
                    <FontColorInput value={fontColor} onChanged={onFontColorChanged} className="font-color" />
                </ControlGroup>
                <ButtonGroup fill={true} className="button-row-2">
                    <Button icon="bold" active={bold} onClick={onBoldClick}></Button>
                    <Button icon="italic" active={italic} onClick={onItalicClick}></Button>
                    <Button icon="underline" active={underline} onClick={onUnderlineClick}></Button>
                    <Button icon="align-left" active={hAlign == "left"} onClick={() => onHAlignClick("left")}></Button>
                    <Button icon="align-center" active={hAlign == "center"} onClick={() => onHAlignClick("center")}></Button>
                    <Button icon="align-right" active={hAlign == "right"} onClick={() => onHAlignClick("right")}></Button>
                </ButtonGroup>
                <ButtonGroup fill={true}>
                    <Switch checked={wrap} label="Text Wrap" onChange={onTextWrapClick} className="text-wrap" />
                    <Button icon="alignment-top" active={vAlign == "top"} onClick={() => onVAlignClick("top")}></Button>
                    <Button icon="alignment-horizontal-center" active={vAlign == "center"} onClick={() => onVAlignClick("center")}></Button>
                    <Button icon="alignment-bottom" active={vAlign == "bottom"} onClick={() => onVAlignClick("bottom")}></Button>
                </ButtonGroup>
            </CollapsiblePanel>
            <CollapsiblePanel label="Paragraph">
                <ControlGroup fill={true}>
                    <FormGroup label="Letter Spacing">
                        <DraggableNumberInput leftIcon="horizontal-distribution" title="Letter Spacing" value={letterSpacing} onChange={onLetterSpacingChanged} className="letter-spacing" unit="px" />
                    </FormGroup>
                    <FormGroup label="Line Height">
                        <DraggableNumberInput leftIcon="vertical-distribution" title="Line Height" value={lineHeight} onChange={onLineHeightChanged} className="line-height" unit="px" />
                    </FormGroup>
                </ControlGroup>
            </CollapsiblePanel>
            <CollapsiblePanel label="Text Shadow">
                <ControlGroup fill={true}>
                    <DraggableNumberInput leftElement={<Tag>x</Tag>} title="X offset" value={textShadowObject.offsetx} onChange={onTextShadowXChanged} unit="px" />
                    <DraggableNumberInput leftElement={<Tag>y</Tag>} title="Y offset" value={textShadowObject.offsety} onChange={onTextShadowYChanged} unit="px" />
                    <DraggableNumberInput leftElement={<Tag>size</Tag>} title="Size" value={textShadowObject.size} onChange={onTextShadowSizeChanged} unit="px" />
                    <FontColorInput value={textShadowObject.color} onChanged={onTextShadowColorChanged} />
                </ControlGroup>
            </CollapsiblePanel>
        </div>
    );
}

export default React.memo(FontPropertyEditor, updateWhenRelevantPropertiesChange);