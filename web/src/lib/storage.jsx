const SetItem = (key, value) => {
    if (typeof window !== 'undefined') {
        if (typeof value === 'object') {
            return localStorage.setItem(key, JSON.stringify(value));
        }

        return localStorage.setItem(key, value);
    }
};

const GetItem = (key) => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);

        if (value) {
            try {
                if (typeof value !== 'string') {
                    return JSON.parse(value);
                }

                return value
            } catch (error) {
                return error;
            }
        }

        return null;
    }

    return null;
};

const RemoveItem = (key) => {
    if (typeof window !== 'undefined') {
        return localStorage.removeItem(key);
    }
};

const AppStorage = {
    SetItem,
    GetItem,
    RemoveItem
};

export default AppStorage;
