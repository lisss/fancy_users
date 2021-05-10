import { useEffect, useState } from 'react';

interface FetchState<T> {
    loading: boolean;
    data: T | null;
    error: Error | null;
}

export const useFetchData = <T extends unknown>(fetcher: () => Promise<T>) => {
    const [result, setResult] = useState<FetchState<T>>({
        loading: true,
        data: null,
        error: null,
    });

    useEffect(() => {
        fetcher()
            .then(data => {
                setResult(result => ({
                    ...result,
                    data,
                    loading: false,
                }));
            })
            .catch(e =>
                setResult(result => ({
                    ...result,
                    loading: false,
                    error: e,
                })),
            );
    }, [fetcher]);

    return {
        result,
    };
};
