export const query = async (query) => {
    if (!process.env.ERIC_SQL_URI) {
        throw "Missing ERIC_SQL_URI in env"
    }

    console.log(JSON.stringify({query}));

    const response = await fetch(process.env.ERIC_SQL_URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    });

    if (response?.ok) {
        return (await response.json()).result;
    } else {
        throw "EricSQL error";
    }
}

export const sanitize_string = (string) => {
    return string.replaceAll("\\", "\\\\").replaceAll("'", "\\'").replaceAll('"', '\\"');
}