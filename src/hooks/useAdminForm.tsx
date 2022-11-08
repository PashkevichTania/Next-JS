import React, { RefObject, useEffect, useState } from "react"
import { API } from "@/server/api"
import { clearState } from "@/store/gameEditSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { gameEditLoadingSelector, gameEditSelector } from "@/store/selectors"
import { useRouter } from "next/router"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { notifyError, notifySuccess } from "@/utils/notification"

export type AdminForm = HTMLFormElement & {
  title: { value: string }
  developers: { value: string }
  publisher: { value: string }
  description: { value: string }
  releaseDate: { value: Date }
  ratingCritics: { value: number }
  ratingUsers: { value: number }
  ratingAge: { value: string }
  tags: { value: string }
  cover: { files: FileList; value: string }
  bg: { files: FileList; value: string }
}

export const useAdminForm = (formElement: RefObject<AdminForm>) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const selectedGame = useAppSelector(gameEditSelector)
  const isLoading = useAppSelector(gameEditLoadingSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const clearForm = () => {
    formElement.current?.reset()
    setSelectedPlatforms([])
    setSelectedGenres([])

    dispatch(clearState())
  }

  const setFiles = async ({ form, bg, cover }: { form: AdminForm; bg: string; cover: string }) => {
    const bgResponse = await fetch(`/api/files?name=${bg}&type=bg`)
    const coverResponse = await fetch(`/api/files?name=${cover}&type=cover`)
    if (!bgResponse.ok || !coverResponse.ok) return

    const bgFile = await bgResponse.blob().then((blob) => new File([blob], bg))
    const coverFile = await coverResponse.blob().then((blob) => new File([blob], cover))

    const container1 = new DataTransfer()
    const container2 = new DataTransfer()
    container1.items.add(bgFile)
    container2.items.add(coverFile)
    form.bg.files = container1.files
    form.cover.files = container2.files
    container1.clearData()
    container2.clearData()
  }

  useEffect(() => {
    const form = document.getElementById("form") as AdminForm
    if (!form) return
    if (selectedGame) {
      form.title.value = selectedGame.title
      form.developers.value = selectedGame.developers.join(", ")
      form.publisher.value = selectedGame.publisher
      form.description.value = selectedGame.description
      form.releaseDate.value = dayjs(selectedGame.releaseDate).format(
        "YYYY-MM-DD"
      ) as unknown as Date
      form.ratingCritics.value = selectedGame.ratingCritics
      form.ratingUsers.value = selectedGame.ratingUsers
      form.ratingAge.value = selectedGame.ratingAge
      // form.tags.value = selectedGame.tags.join(', ')

      setSelectedPlatforms(selectedGame.platforms)
      setSelectedGenres(selectedGame.genres)

      setFiles({ form, bg: selectedGame.bg, cover: selectedGame.cover })
    } else {
      form.reset()
    }
  }, [selectedGame])

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as AdminForm

    const form = new FormData(target)
    //TODO: tags
    form.set("tags", JSON.stringify([]))
    form.set("platforms", JSON.stringify(selectedPlatforms))
    form.set("genres", JSON.stringify(selectedGenres))

    if (!selectedGame) {
      const { ok } = await API.createGame(form)
      if (ok) notifySuccess("Game added")
      else notifyError("Something went wrong")
    } else {
      console.log("edit", form.get("bg"))
      const bg = form.get("bg") as File
      const cover = form.get("cover") as File
      if (!bg.name) form.set("prev_bg", selectedGame.bg)
      if (!cover.name) form.set("prev_cover", selectedGame.bg)

      const { ok } = await API.updateGame(selectedGame._id, form)
      if (ok) notifySuccess("Game updated")
      else notifyError("Something went wrong")
    }

    clearForm()
  }

  const deleteGame = async (id: string) => {
    API.deleteGame(id)
    clearForm()
  }

  const openGame = (id: string) => {
    router.push(`/games/${id}`)
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
    clearForm,
  }
}
