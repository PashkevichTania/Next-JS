// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {GameDataBrief, getGameDataBrief, getJSON, MOCK_BD_DATA} from "../../utils/apiUtils";

type DataResponse = {
    result: GameDataBrief[]
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
        const result = await getGameDataBrief()
        res.status(200).json({result})
    } catch (err) {
        res.status(500).json({error: 'failed to load data', detail: JSON.stringify(err)})
    }
}
