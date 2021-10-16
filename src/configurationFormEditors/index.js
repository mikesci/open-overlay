import ColorEditor from "./ColorEditor.jsx";
import CheckboxEditor from "./CheckboxEditor.jsx";
import SelectEditor from "./SelectEditor.jsx";
import RadioGroupEditor from "./RadioGroupEditor.jsx";
import ButtonGroupEditor from "./ButtonGroupEditor.jsx";
import SliderEditor from "./SliderEditor.jsx";
import AssetUrlEditor from "./AssetUrlEditor.jsx";
import TextAreaEditor from "./TextAreaEditor.jsx";
import AngleEditor from "./AngleEditor.jsx";
import EasingEditor from "./EasingEditor.jsx";
import ButtonEditor from "./ButtonEditor.jsx";
import TextBoxEditor from "./TextBoxEditor.jsx";

const editors = {
    "color": ColorEditor,
    "checkbox": CheckboxEditor,
    "select": SelectEditor,
    "radiogroup": RadioGroupEditor,
    "buttongroup": ButtonGroupEditor,
    "slider": SliderEditor,
    "assetUrl": AssetUrlEditor,
    "textarea": TextAreaEditor,
    "angle": AngleEditor,
    "easing": EasingEditor,
    "button": ButtonEditor,
    "text": TextBoxEditor
};

const getEditorComponentByKey = (key) => {
    return editors[key] || TextBoxEditor; // default to TextBoxEditor
}

export {
    editors,
    getEditorComponentByKey
};