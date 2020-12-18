import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const ConfigurationFormContext = React.createContext();

const ConfigurationFormContextProvider = function({ parameterValues, onParameterValuesChanged, onHandleUpload, reportAllValues, ...props }) {

    const contextRef = useRef(null);

    if (!contextRef.current) {
        let subscribers = [];
        let lastParameterValues = parameterValues;
        contextRef.current = {
            subscribe: (callback) => { subscribers.push(callback); },
            unsubscribe: (callback) => { subscribers = subscribers.filter(r => r != callback); },
            getValue: (parameter) => { return lastParameterValues[parameter.name]; },
            notifyForChanges: (newParameterValues) => {
                lastParameterValues = newParameterValues;
                for(const callback of subscribers)
                    callback();
            },
            onParameterValueChanged: (parameter, value, createUndoEntry) => {
                const reportedValue = (reportAllValues ? {...lastParameterValues, [parameter.name]: value} : { [parameter.name]: value });
                contextRef.current.onParameterValuesChanged(reportedValue, createUndoEntry);
            }
        };
    }

    useMemo(() => {
        contextRef.current.onParameterValuesChanged = onParameterValuesChanged;
        return onParameterValuesChanged;
    }, [onParameterValuesChanged]);

    useMemo(() => {
        contextRef.current.onHandleUpload = onHandleUpload;
        return onHandleUpload;
    }, [onHandleUpload]);

    useEffect(() => {
        contextRef.current.notifyForChanges(parameterValues);
    }, [parameterValues]);

    return <ConfigurationFormContext.Provider value={contextRef.current} {...props} />;
}

const useConfigurationFormContext = function(parameter) {
    const context = useContext(ConfigurationFormContext);
    const [payload, setPayload] = useState(() => context.getValue(parameter));

    const onNotifyForChanges = useCallback(() => {
        const newParameterValue = context.getValue(parameter);
        // setPayload doesn't trigger a re-render if the previous value is returned
        setPayload(prevPayload => {
            if (prevPayload != newParameterValue)
                return newParameterValue;
            else
                return prevPayload;
        });
    }, [context]);

    useEffect(() => {
        context.subscribe(onNotifyForChanges);
        return () => context.unsubscribe(onNotifyForChanges);
    }, [context, onNotifyForChanges]);

    return [payload, context.onParameterValueChanged, context.onHandleUpload];
}

export {
    ConfigurationFormContextProvider,
    useConfigurationFormContext
};
