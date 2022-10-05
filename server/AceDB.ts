import { AceBase, AceBaseLocalSettings, DataSnapshot } from "acebase"
import { getJSON } from "./apiUtils"
import { GameData } from "../utils/intefaces"

const DB_NAME = "GamesLib"
const REF = "games"

const options: AceBaseLocalSettings = { logLevel: 'error', storage: { path: '.' } };
const db = new AceBase(DB_NAME, options); // Creates or opens a database with name "GamesLib"

const populateDB = async () => {
  await db.ready()
  const snapshot = await db.ref(REF).get()
  if (snapshot.exists()) return

  const data = await getJSON()
  await db.ref(REF).set(data.games);
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



export const getGameData = async () => {
  await db.ready()
  const dataSnapshot = await db.ref(REF).get()
  const data: GameData[]  = dataSnapshot.val()
  return data
}

export const getGameById = async (id: string): Promise<DataSnapshot> => {
  await db.ready()
  const snapshotsArray = await db.query(REF).filter("id", "matches", new RegExp(id)).get()
  return snapshotsArray.getValues()[0]
}


export const getGameDataBrief = async (ids?: string[]) => {
  await db.ready()
  let result: GameData[] = []
  if (ids) {
    const snapshotsArray = await db.query(REF).filter("id", "in", ids).get()
    result = snapshotsArray.getValues()
  }
  else {
    const snapshot = await db.ref(REF).get()
    result = snapshot.val()
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
