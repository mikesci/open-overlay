import React from "react";
import { Toaster, Toast, Position, ProgressBar } from "@blueprintjs/core";
import { useOverlayEditorContext } from "../shared/OverlayEditorContext.js";

const AppToaster = ({ props }) => {
    const [[toasts], dispatch] = useOverlayEditorContext(s => s.toasts);

    return (
        <Toaster position={Position.BOTTOM} usePortal={false} className="app-toaster">
            {toasts.map(toast => {
                let message;
                if (toast.progress != undefined) {
                    message = (
                        <>
                            <ProgressBar intent={toast.progress < 1 ? "primary" : "success"} stripes={toast.progress < 1 ? true : false} value={toast.progress} />
                            <div>{toast.message}</div>
                        </>
                    );
                }
                else {
                    message = toast.message;
                }
                return (
                    <Toast key={toast.id} {...toast} message={message} onDismiss={() => dispatch("DismissToast", toast)} />
                );
            })}
        </Toaster>
    );
}

export default AppToaster;