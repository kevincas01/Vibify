'use client'
import { useEffect, useState } from 'react'

export const useDebounce = <T,>(input: T, delay: number=300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(input);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(input);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [input, delay]);

    return debouncedValue;
};
