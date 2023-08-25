import { useCallback, useEffect, useState } from "react";

const baseUrl = "https://jsonplaceholder.typicode.com";

export default function CustomHook2() {
    const { data, fetchUrl } = useFetch(baseUrl, "users");

    return (
        <section>
            <h2>useFetch</h2>
            <button onClick={() => fetchUrl("users")}>Users</button>
            <button onClick={() => fetchUrl("posts")}>Posts</button>
            <button onClick={() => fetchUrl("todos")}>Todos</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>
    );
}

function useFetch(baseUrl: string, initialType: string) {
    const [data, setData] = useState(null);

    const fetchUrl = useCallback(
        (type: string) => {
            fetch(baseUrl + "/" + type)
                .then((res) => res.json())
                .then((res) => setData(res));
        },
        [baseUrl]
    );

    useEffect(() => {
        fetchUrl(initialType);
    }, [fetchUrl, initialType]);

    return {
        data,
        fetchUrl,
    };
}
