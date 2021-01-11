const UNDO_HISTORY_SIZE = 40;

const storeActions = {
    UNDO: "__undo",
    REDO: "__redo"
};

const createStore = (initialState, reducers, extractUndoEntry, applyUndoEntry) => {
    let state = {...initialState};
    let subscriptions = [];

    let undo = {
        pointer: 0,
        history: []
    };

    const select = (selectors) => {
        return selectors.map(selector => selector(state));
    };

    const subscribe = (callback) => {
        subscriptions.push(callback);
    };

    const unsubscribe = (callback) => {
        subscriptions = subscriptions.filter(r => r != callback);
    };

    const dispatch = (type, args, trackUndo = true) => {

        // handle store actions
        if (type == storeActions.UNDO) {
            restoreUndoPoint(false);
        } else if (type == storeActions.REDO) {
            restoreUndoPoint(true);
        } else {
            const reducer = reducers[type];
            if (!reducer) { console.log("Unknown reducer method:" + type); return; }

            const newPartialState = reducer(state, args);
            if (!newPartialState) { return; } // if the reducer returned nothing, do no state update

            // if mergeProps returns a FUNCTION, then this is a "thunk".  we need to call the returned function with the dispatcher as an argument
            if (typeof newPartialState === "function") {
                newPartialState(dispatch);
                return;
            }

            // handle undo tracking
            if (trackUndo)
                createUndoPoint(state, newPartialState);
            
            // otherwise, merge state
            state = Object.assign(state, newPartialState);
        }

        // and call any subscriptions
        for(const subscription of subscriptions)
            subscription();
    };

    const createUndoPoint = (state, newPartialState) => {
        // extract the entry via the provided function
        const undoEntry = extractUndoEntry(state, newPartialState);

        // it's possible the extract function will return null if we only changed
        // untracked data
        if (!undoEntry)
            return null;

        // now we know we need to create an entry.

        // clear out undo history AFTER the pointer if we have a non-zero undo pointer (in otherwords, we're not at the latest entry)
        if (undo.pointer > 0) {
            const truncateIndex = undo.history.length - undo.pointer;
            undo.history.splice(truncateIndex, undo.pointer);
            undo.pointer = 0;
        }
    
        // trim the history to keep it in size
        if (undo.history.length > UNDO_HISTORY_SIZE)
            undo.history.splice(0, 1); // delete the oldest element
    
        // insert the new entry at the end of the array.
        // (for reference, pointer position 0 always references the last element in this history.)
        undo.history.push(undoEntry);
    };

    const restoreUndoPoint = (redo) => {
        if (undo.history.length == 0) { return; }

        // move the pointer backwards or forwards by one
        const newUndoPointer = undo.pointer + (redo ? -1 : 1);
    
         // don't allow the pointer to go past the beginning or end of the history
        if (newUndoPointer > undo.history.length - 1 || newUndoPointer < 0) { return; }
    
        // put us at the new pointer
        undo.pointer = newUndoPointer;
    
        // grab the entry at the new pointer
        const undoEntry = undo.history[undo.history.length - 1 - newUndoPointer];
    
        // apply the entry to the current state
        applyUndoEntry(state, undoEntry);
    };

    return {
        _state: state,
        select,
        subscribe,
        unsubscribe,
        dispatch
    };
}

export {
    createStore,
    storeActions
};