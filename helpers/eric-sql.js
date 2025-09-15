export const query = async (query) => {
    if (!process.env.ERIC_SQL_URI) {
        throw "Missing ERIC_SQL_URI in env"
    }

    const response = await fetch(process.env.ERIC_SQL_URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    });
    
    return response
}