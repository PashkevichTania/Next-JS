import {NextApiRequest, NextApiResponse} from 'next'
import {getGameById} from "../../../utils/apiUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    if(typeof req.query.id === "string"){
        const gameData = await getGameById(id as string)
        console.log(gameData)
        res.status(200).json({response: gameData})
    } else  res.status(400).json({message: "no id"})
}