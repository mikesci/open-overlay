class _AnimationControllerBase {

    _registered = [];
    _phase;
    _offset;
    _isPlaying;

    register(element, phases) {
        const item = { element, phases };
        const index = this._registered.findIndex(r => r.element == element);
        if (index == -1)
            this._registered.push(item);
        else
            this._registered[index] = item;
    }

    unregister(element) {
        this._registered = this._registered.filter(r => r.element != element);
    }

    setState(phase, offset, isPlaying) {

    }
}

class AutomaticAnimationController extends _AnimationControllerBase {
    setHidden(element) {
        
    }
}

class ManualAnimationController extends _AnimationControllerBase {

}

export {
    AutomaticAnimationController,
    ManualAnimationController
};