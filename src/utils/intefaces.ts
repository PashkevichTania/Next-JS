export interface GameData {
  _id: string
  title: string
  developers: string[]
  publisher: string
  platforms: string[]
  genres: string[]
  description: string
  releaseDate: Date
  ratingCritics: number
  ratingUsers: number
  ratingAge: string
  tags: string[]
  cover: string
  bg: string
}

export interface GameDataClient extends Omit<GameData, "releaseDate"> {
  releaseDate: string
}

export type GameDataBrief = Pick<
  GameData,
  "_id" | "title" | "cover" | "ratingCritics" | "ratingAge"
>
