import SerializationHelper from "./SerializationHelper.js";

export default class UndoManager {

    static UNDO_HISTORY_SIZE = 40;
    _undoHistory = [];
    _undoPointer = 0;
    
    /* NOTE: The undo pointer counts BACKWARD from the end of the undo history */

    createUndoPoint = (overlay) => {
        // clear out undo history AFTER the pointer if we have a non-zero undo pointer
        if (this._undoPointer > 0) {
          let truncateIndex = this._undoHistory.length - this._undoPointer;
          this._undoHistory.splice(truncateIndex, this._undoPointer);
          this._undoPointer = 0;
        }
    
        // deep copy overlay
        let entry = SerializationHelper.modelToString(overlay);
    
        // trim the history to keep it in size
        if (this._undoHistory.length > UndoManager.UNDO_HISTORY_SIZE) {
          this._undoHistory.splice(0, 1); // delete the oldest element
        }
    
        this._undoHistory.push(entry);

        return entry;
    }
    
    restoreUndoPoint = (redo) => {
        if (this._undoHistory.length == 0) { return; }
        let newUndoPointer = this._undoPointer + (redo ? -1 : 1);
        if (newUndoPointer > this._undoHistory.length - 1 || newUndoPointer < 0) { return; } // don't allow the pointer to go past the beginning or end of the history
        this._undoPointer = newUndoPointer;
        let undoIndex = this._undoHistory.length - 1 - this._undoPointer;
        if (undoIndex < 0 || undoIndex > this._undoHistory.length - 1) { return; }
        let entry = this._undoHistory[undoIndex];

        let overlay = SerializationHelper.stringToModel(entry);

        return {
            overlay,
            entry
        };
    }

    canUndo = () => {
        return (this._undoHistory.length > 0 && this._undoPointer < this._undoHistory.length - 1);
    }

    canRedo = () => {
        return (this._undoHistory.length > 0 && this._undoPointer > 0);
    }
}