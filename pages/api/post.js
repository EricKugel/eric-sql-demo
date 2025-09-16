import {query, sanitize_string as ss} from "../../helpers/eric-sql";

export default async function handler(req, res) {
    if (req.method == "POST") {
        try {
            const content = ss(req.body.content);
            const name = ss(req.body.name);
            const timestamp = Date.now();

            const query_string = `
                INSERT INTO Board
                VALUES ("${content}", "${name}", ${timestamp})
            `;


            await query(query_string);

            res.status(200);
        } catch (e) {
            res.status(500).json({message: "Something went wrong"});
        }
    }
}