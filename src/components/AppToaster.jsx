import React from "react";
import { Toaster, Toast, Position, ProgressBar, Intent } from "@blueprintjs/core";
import Dispatcher from "../shared/dispatcher.js";

export default class AppToaster extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            toasts: []
        };
    }

    componentDidMount() {
        Dispatcher.Register("SHOW_TOAST", this.onShowToast);
    }

    componentWillUnmount() {
        Dispatcher.Unregister("SHOW_TOAST", this.onShowToast);
    }

    onShowToast = (toast) => {
        this.setState(ps => {
            let toasts = [...ps.toasts];
            // update toast if id matches existing toast
            if (toast.id) {
                const index = toasts.findIndex(r => r.id == toast.id);
                if (index > -1) {
                    toasts[index] = {...toasts[index], ...toast};
                    return { toasts };
                }
            }
            toasts.push(toast);
            return { toasts };
        });
    }

    onDismiss = (toast) => {
        if (toast.onCancel) { toast.onCancel(); }
        this.setState(ps => {
            let toasts = [...ps.toasts];
            const index = toasts.indexOf(toast);
            if (index == -1) { return; }
            toasts.splice(index, 1);
            return { toasts };
        })
    }

    render() {
        return (
            <Toaster position={Position.BOTTOM} usePortal={false} className="app-toaster">
                {this.state.toasts.map(toast => (
                    <Toast
                        {...toast}
                        key={toast.id}
                        onDismiss={() => this.onDismiss(toast)} />
                ))}
            </Toaster>
        );
    }
}