import { useEffect, useState } from "react";

const useDynamicOptions = (options) => {
    const optionsAreDynamic = (typeof options === "function");
    const [dynamicOptions, setDynamicOptions] = useState(() => optionsAreDynamic ? [] : null);

    useEffect(() => {
        if (!optionsAreDynamic)
            return;
        Promise.resolve(options()).then(setDynamicOptions);
    }, []);

    return (dynamicOptions || options || []);
};

export default useDynamicOptions;