import { useState } from "react";

const Write = () => {
    const [data, setData] = useState({query: "SELECT * FROM Customers", result: "No response yet"});
    const query = async () => {
        const response = await fetch("/api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "query": data.query
            })
        });

        console.log(response.body);
        const result = await response.json();
        console.log(result);

        if (response?.ok) {
            setData({...data, result});
        }
    }

    return (
        <>
            <textarea
                onChange = {(e) => {
                    setData({...data, query: e.target.value});
                }}
                value = {data.query}
            ></textarea>

            <button onClick={query}>Submit</button>

            <div>
                {JSON.stringify(data.result)}
            </div>
        </>
    )
}

export default Write;