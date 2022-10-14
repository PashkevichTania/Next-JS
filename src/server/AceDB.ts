import { AceBase, AceBaseLocalSettings } from "acebase"
import { getJSON } from "./apiUtils"
import { GameData, GameDataBrief } from "src/utils/intefaces"
import { FiltersState } from "src/RTK/filtersSlice"

const DB_NAME = "GamesLib"
const REF = "games"

const options: AceBaseLocalSettings = { logLevel: "error", storage: { path: "." } }
const db = new AceBase(DB_NAME, options) // Creates or opens a database with name "GamesLib"

const prepareDB = async () => {
  await db.ready()
  const snapshot = await db.ref(REF).get()
  if (snapshot.exists()) return

  console.debug("DB DOESNT EXISTS")

  const data = await getJSON()
  let games: any = {}
  data.games.forEach((game) => db.ref(`${REF}/${game.id}`).set(game))

  await db.ref(REF).update(games)
  await db.indexes.create(REF, "id")
  await db.schema.set("games/$uid", {
    id: "string",
    name: "string",
    developers: "string[]",
    publisher: "string",
    platforms: "string[]",
    genres: "string[]",
    description: "string",
    releaseDate: "Date",
    ratingCritics: "number",
    ratingUsers: "number",
    ratingAge: "string",
    tags: "string[]",
    cover: "string",
    bg: "string",
  })
}

prepareDB()

export const getGameData = async (): Promise<GameData[]> => {
  await prepareDB()
  const dataSnapshot = await db.ref(REF).get()
  return Object.values(dataSnapshot.val())
}

export const getGameById = async (id: string): Promise<GameData> => {
  await prepareDB()
  const snapshot = await db.ref(`${REF}/${id}`).get()
  return snapshot.val()
}

export const getGameDataBrief = async (ids?: string[]): Promise<GameDataBrief[]> => {
  await prepareDB()
  let result: GameData[] = []
  if (ids) {
    const snapshotsArray = await db.query(REF).filter("id", "in", ids).get()
    result = snapshotsArray.getValues()
  } else {
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

export type FilterProps = Partial<FiltersState>

export const filterGamesData = async ({
  title,
  ratingUsers,
  ratingCritics,
  releaseDate,
  sort,
}: FilterProps): Promise<GameDataBrief[]> => {
  await prepareDB()
  let snapshotsArray = await db.query(REF)

  if (title) snapshotsArray = snapshotsArray.filter("name", "like", title + "*")
  if (ratingCritics) snapshotsArray = snapshotsArray.filter("ratingCritics", ">=", ratingCritics)
  if (ratingUsers) snapshotsArray = snapshotsArray.filter("ratingUsers", ">=", ratingUsers)
  if (sort) snapshotsArray = snapshotsArray.sort("ratingCritics", false)

  const result = await snapshotsArray.get()
  let values: GameData[] = result.getValues()

  if (releaseDate) {
    values = values.filter((game) => new Date(game.releaseDate) >= new Date(releaseDate))
  }

  return values.map((game) => {
    return {
      id: game.id,
      name: game.name,
      cover: game.cover,
      rating: game.ratingCritics,
      ratingAge: game.ratingAge,
    }
  })
}
