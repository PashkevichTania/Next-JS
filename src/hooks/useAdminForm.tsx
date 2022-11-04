import React, { useEffect, useState } from "react"
import { API } from "@/server/api"
import { clearState, fetchGame } from "@/store/gameEditSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { gameEditLoadingSelector, gameEditSelector } from "@/store/selectors"
import {useRouter} from "next/router"
import { CONST } from "@/utils/constants"
import dayjs from "dayjs"

type AdminForm = HTMLFormElement & {
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

export const useAdminForm = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const selectedGame = useAppSelector(gameEditSelector)
  const isLoading = useAppSelector(gameEditLoadingSelector)
  const dispatch = useAppDispatch()
  const router = useRouter();

  console.debug("selected", selectedGame)

  useEffect(()=> {
    const form = document.getElementById("form") as AdminForm
    if (!form) return
    if (selectedGame){
      form.title.value = selectedGame.title
      form.developers.value = selectedGame.developers.join(', ')
      form.publisher.value = selectedGame.publisher
      form.description.value = selectedGame.description
      form.releaseDate.value = dayjs(selectedGame.releaseDate).format("YYYY-MM-DD") as unknown as Date
      form.ratingCritics.value = selectedGame.ratingCritics
      form.ratingUsers.value = selectedGame.ratingUsers
      form.ratingAge.value = selectedGame.ratingAge
      // form.tags.value = selectedGame.tags.join(', ')

      setSelectedPlatforms(selectedGame.platforms)
      setSelectedGenres(selectedGame.genres)
      console.log(dayjs(selectedGame.releaseDate).format("MM/DD/YYYY"))
      console.log(form.releaseDate.value)
    } else {
      form.reset()
    }
  }, [selectedGame])

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as AdminForm

    // console.debug(values)
    const form = new FormData(target)
    form.set("tags", JSON.stringify([]))
    form.set("platforms", JSON.stringify(selectedPlatforms))
    form.set("genres", JSON.stringify(selectedGenres))

    // @ts-ignore
    console.debug(...form)

    if (!selectedGame){
      console.log("add")
      const result = await API.createGame(form)
      console.debug(result)
    }else {
      console.log("edit", form.get('bg'))
      const bg = form.get('bg') as File
      const cover = form.get('cover') as File
      if (!bg.name) form.set("prev_bg", selectedGame.bg)
      if (!cover.name) form.set("prev_cover", selectedGame.bg)
      const result = await API.updateGame(selectedGame._id, form)
      console.debug(result)
    }

    // dispatch(clearState())
    // target.reset()
  }

  const deleteGame = async (id: string) => {
    API.deleteGame(id)
  }

  const openGame = (id: string) => {
    router.push(`/games/${id}`)
  }

  const clearForm = () => {
    dispatch(clearState())
    const form = document.getElementById("form") as AdminForm
    form?.reset()
  }

  return {
    selectedPlatforms,
    setSelectedPlatforms,
    selectedGenres,
    setSelectedGenres,
    submitHandler,
    isLoading,
    selectedGame,
    deleteGame,
    openGame,
    clearForm
  }
}

