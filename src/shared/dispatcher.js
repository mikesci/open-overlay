
export default class Dispatcher {

    _callbacks = {};

    Register(eventName, callback) {
        let callbacksForEvent = this._callbacks[eventName];
        if (!callbacksForEvent) { 
            callbacksForEvent = [];
            this._callbacks[eventName] = callbacksForEvent;
        }
        callbacksForEvent.push(callback);
    }

    Unregister(eventName, callback) {
        let callbacksForEvent = this._callbacks[eventName];
        if (!callbacksForEvent) { return; }

        let index = callbacksForEvent.indexOf(callback);
        if (index > -1) {
            callbacksForEvent.splice(index, 1);
        }
    }

    Dispatch(eventName, ...eventArguments) {
        let callbacksForEvent = this._callbacks[eventName];
        if (callbacksForEvent) {
            for(let callback of callbacksForEvent) {
                callback(...eventArguments);
            }
        }
    }
}