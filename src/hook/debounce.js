import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 200, exceptions = []) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        if (exceptions.find(exception => exception === value)) {
            setDebouncedValue(value);

            return () => {};
        }

        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};
