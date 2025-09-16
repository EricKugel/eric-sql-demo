import {query} from "../../helpers/eric-sql"

export default async function handler(req, res) {
    if (req.method == "POST") {
        const query_string = req.body.query
        const result = await query(query_string);
        try {
            res.status(200).json({result});
        } catch(e) {
            console.error(e);
            res.status(500).json({message: "Something went wrong"});
        }
    }
}