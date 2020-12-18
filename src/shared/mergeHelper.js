const MERGE_CONFLICT = {};

const mergeObject = (base, incoming) => {
    for(const [key, value] of Object.entries(base)) {
        if (incoming[key] != value) {
            base[key] = MERGE_CONFLICT;
        }
    }
};

export {
    MERGE_CONFLICT,
    mergeObject
};

