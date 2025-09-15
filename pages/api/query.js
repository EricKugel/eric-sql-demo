import {query} from "../../helpers/eric-sql"

export default async function handler(req, res) {
    if (req.method == "POST") {
        const query_string = req.body.query
        const response = await query(query_string);
        try {
            // console.log(response);
            if (response?.ok) {
                res.status(200).json({result: (await response.json()).result});
            } else {
                res.status(500).json({message: "Server error"});
            }
        } catch(e) {
            console.error(e);
            res.status(500).json({message: "Something went wrong"});
        }
    }
}