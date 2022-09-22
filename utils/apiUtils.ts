import path from "path";
import fsPromises from "fs/promises";
import {GameData} from "./intefaces";

export type MOCK_BD_DATA = {
    games: GameData[]
}

export type GameDataBrief = {
    id: string
    name: string
    cover: string
}


export const getJSON:() => Promise<MOCK_BD_DATA> = async () => {
    const filePath = path.join(process.cwd(), 'db.json');
    const jsonData = await fsPromises.readFile(filePath, "utf-8")
    return JSON.parse(jsonData)
}

export const getGameDataBrief:() => Promise<GameDataBrief[]> = async () => {
    const gamesData = await getJSON()
    return gamesData.games.map(game => {
        return {id: game.id, name: game.name, cover: game.cover}
    })
}

export const getGameById:(id: string) => Promise<GameData | undefined> = async (id: string) => {
    const gamesData = await getJSON()
    return gamesData.games.find((game) => game.id === id)
}
