import {query} from "../../helpers/eric-sql"

export default async function handler(req, res) {
    const result = await query("BACKUP");
    res.status(200).json({result})
}