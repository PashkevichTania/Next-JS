import { AceBase, AceBaseLocalSettings, DataSnapshot } from "acebase"
import { getJSON } from "./apiUtils"
import { GameData, GameDataBrief } from "../utils/intefaces"

const DB_NAME = "GamesLib"
const REF = "games"

const options: AceBaseLocalSettings = { logLevel: 'error', storage: { path: '.' } };
const db = new AceBase(DB_NAME, options); // Creates or opens a database with name "GamesLib"

const populateDB = async () => {
  await db.ready()
  const snapshot = await db.ref(REF).get()
  if (snapshot.exists()) return

  const data = await getJSON()
  let games: any = {}
  data.games.forEach(game => db.ref(`${REF}/${game.id}`).set(game))

  await db.ref(REF).update(games)
  await db.indexes.create(REF, 'id')
  await db.schema.set('games/$uid', {
    id: 'string',
    name: 'string',
    developers: 'string[]',
    publisher: 'string',
    platforms: 'string[]',
    genres: 'string[]',
    description: 'string',
    releaseDate: 'string',
    ratingCritics: "number",
    ratingUsers: 'number',
    ratingAge: 'string',
    tags: 'string[]',
    cover: 'string',
    bg: 'string',
  });
}

populateDB()



export const getGameData = async (): Promise<GameData[]> => {
  await populateDB()
  const dataSnapshot = await db.ref(REF).get()
  return Object.values(dataSnapshot.val())
}

export const getGameById = async (id: string): Promise<GameData> => {
  await populateDB()
  const snapshot = await db.ref(`${REF}/${id}`).get()
  return snapshot.val()
}


export const getGameDataBrief = async (ids?: string[]): Promise<GameDataBrief[]> => {
  await populateDB()
  let result: GameData[] = []
  if (ids) {
    const snapshotsArray = await db.query(REF).filter("id", "in", ids).get()
    result = snapshotsArray.getValues()
  }
  else {
    const snapshot = await db.ref(REF).get()
    result = Object.values(snapshot.val())
  }

  return result.map((game) => {
    return {
      id: game.id,
      name: game.name,
      cover: game.cover,
      rating: game.ratingCritics,
      ratingAge: game.ratingAge,
    }
  })
}
