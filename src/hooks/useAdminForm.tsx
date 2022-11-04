import React, { useState } from "react"
import { API } from "@/server/api"
import { useDispatch } from "react-redux"
import { fetchGame, gameEditActions } from "@/store/gameEditSlice"
import { filtersActions } from "@/store/filtersSlice"

export const useAdminForm = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement & {
      title: { value: string }
      developers: { value: string }
      publisher: { value: string }
      description: { value: string }
      releaseDate: { value: Date }
      ratingCritics: { value: number }
      ratingUsers: { value: number }
      ratingAge: { value: string }
      tags: { value: string }
      cover: { files: File[] }
      bg: { files: File[] }
    }

    // console.debug(values)
    const form = new FormData(target)
    form.set("tags", JSON.stringify([]))
    form.set("platforms", JSON.stringify(selectedPlatforms))
    form.set("genres", JSON.stringify(selectedGenres))

    // @ts-ignore
    console.debug(...form)



    const result = await API.createGame(form)
    console.debug(result)
  }

  return {
    selectedPlatforms,
    setSelectedPlatforms,
    selectedGenres,
    setSelectedGenres,
    submitHandler
  }
}

export const useAdminEdit = () => {
  const dispatch = useDispatch()

  const editGame = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const gameId = event.currentTarget.id

    dispatch(fetchGame(gameId))

    console.debug(event.currentTarget.id)
  }

  const deleteGame = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const gameId = event.currentTarget.id

    console.debug(gameId)
    const result = await API.deleteGame(gameId)
    console.debug(result)
  }

  return {
    deleteGame,
    editGame
  }
}
