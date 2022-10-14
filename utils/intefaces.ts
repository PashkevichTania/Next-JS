export interface GameData {
  id: string
  name: string
  developers: string[]
  publisher: string
  platforms: string[]
  genres: string[]
  description: string
  releaseDate: string | Date
  ratingCritics: number
  ratingUsers: number
  ratingAge: string
  tags: string[]
  cover: string
  bg: string
}

export type GameDataBrief = {
  id: string
  name: string
  cover: string
  rating: number
  ratingAge: string
}
