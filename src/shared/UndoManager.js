import bson from "bson";
import SerializationHelper from "./SerializationHelper.js";

export default class UndoManager {

    static UNDO_HISTORY_SIZE = 40;
    _layerUndoHistory = [];
    _undoPointer = 0;

    constructor(options) {
        
    }
    
    /* NOTE: The undo pointer counts BACKWARD from the end of the undo history */

    createUndoPoint = (layers) => {
        // clear out undo history AFTER the pointer if we have a non-zero undo pointer
        if (this._undoPointer > 0) {
          let truncateIndex = this._layerUndoHistory.length - this._undoPointer;
          this._layerUndoHistory.splice(truncateIndex, this._undoPointer);
          this._undoPointer = 0;
        }
    
        // deep copy layer data
        let entry = SerializationHelper.modelToString(layers);
    
        // trim the history to keep it in size
        if (this._layerUndoHistory.length > UndoManager.UNDO_HISTORY_SIZE) {
          this._layerUndoHistory.splice(0, 1); // delete the oldest element
        }
    
        this._layerUndoHistory.push(entry);

        return entry;
    }
    
    restoreUndoPoint = (redo) => {
        if (this._layerUndoHistory.length == 0) { return; }
        let newUndoPointer = this._undoPointer + (redo ? -1 : 1);
        if (newUndoPointer > this._layerUndoHistory.length - 1 || newUndoPointer < 0) { return; } // don't allow the pointer to go past the beginning or end of the history
        this._undoPointer = newUndoPointer;
        let undoIndex = this._layerUndoHistory.length - 1 - this._undoPointer;
        if (undoIndex < 0 || undoIndex > this._layerUndoHistory.length - 1) { return; }
        let entry = this._layerUndoHistory[undoIndex];

        let layers = SerializationHelper.stringToModel(entry);

        return {
            layers: layers,
            entry: entry
        };
    }

    canUndo = () => {
        return (this._layerUndoHistory.length > 0 && this._undoPointer < this._layerUndoHistory.length - 1);
    }

    canRedo = () => {
        return (this._layerUndoHistory.length > 0 && this._undoPointer > 0);
    }
}