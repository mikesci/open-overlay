const useDynamicOptions = (options) => {
    const optionsAreDynamic = (typeof options === "function");
    const [dynamicOptions, setDynamicOptions] = useState(() => optionsAreDynamic ? [] : null);
    if (optionsAreDynamic)
        Promise.resolve(options()).then(setDynamicOptions);
    return (dynamicOptions || options);
};

export default useDynamicOptions;