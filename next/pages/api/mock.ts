// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getJSON, MOCK_BD_DATA} from "../../utils/apiUtils";

type DataResponse = {
    result: MOCK_BD_DATA
}

type Message = {
    message: string
}

type Error = {
    error: string
    detail: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataResponse | Message | Error>
) {
    try {
        const result = await getJSON()
        switch (req.method) {
            case "GET":
                res.status(200).json({result})
                break
            case "POST":
                const {tags}: {tags: string[]} = req.body
                if (!tags?.length) res.status(400).json({message: `wrong request body; ${req.body}`})
                const newResult = result.games.filter(game => game.tags.some((value)=> tags.includes(value)))
                res.status(200).json({result: {games: newResult}})
                break
            default:
                res.status(400).json({message: `unsupported method ${req.method}`})
        }
    } catch (err) {
        res.status(500).json({error: 'failed to load data', detail: JSON.stringify(err)})
    }
}