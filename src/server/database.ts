import { connect, Schema, model, models } from "mongoose"
import { GameData } from "@/utils/intefaces"

const MODEL_NAME = "Games"

export const gameSchema = new Schema<GameData>(
  {
    title: { type: String, unique: true, required: true, dropDups: true },
    developers: [String],
    publisher: String,
    platforms: [String],
    genres: [String],
    description: String,
    releaseDate: Date,
    ratingCritics: Number,
    ratingUsers: Number,
    ratingAge: String,
    tags: [String],
    cover: String,
    bg: String,
  },
  {
    toObject: { getters: true, virtuals: true },
  }
)

// mongoBD connection
export const connectDB = async () => {
  await connect(process.env.DB_URL!)
  console.debug("DB connected")
}

export const gamesModel = models[MODEL_NAME] || model(MODEL_NAME, gameSchema)
