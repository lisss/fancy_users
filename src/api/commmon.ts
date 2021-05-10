export const fetchData = <T extends unknown>(path: string, options?: RequestInit) => {
    return fetch(`${process.env.SERVER_URL}/${path}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        ...options,
    })
        .then<T>(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error(`${resp.status}: ${resp.statusText}`);
        })
        .catch(e => {
            throw new Error(`Failed to fetch: ${e}`);
        });
};
