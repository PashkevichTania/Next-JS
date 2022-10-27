import { connect, Schema, model, models } from "mongoose"
import { GameData } from "src/utils/intefaces"

const MODEL_NAME = "Games"

export const gameSchema = new Schema<GameData>(
  {
    key: { type: String, unique: true, required: true, dropDups: true },
    title: String,
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
  await connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@gamescluster.pzrpfkz.mongodb.net/?retryWrites=true&w=majority`
  )
  console.debug("DB connected")
}

export const gamesModel = models[MODEL_NAME] || model(MODEL_NAME, gameSchema)
