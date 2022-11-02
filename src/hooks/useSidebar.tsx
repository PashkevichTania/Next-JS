import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { filtersActions } from "@/store/filtersSlice"

export default function useSidebar(ref: HTMLFormElement | null) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & {
      title: { value: string }
      ratingUsers: { value: number }
      ratingCritics: { value: number }
      datepicker: { value: Date }
      sort_rating: { checked: boolean }
    }
    const values = {
      title: target.title.value,
      ratingUsers: +target.ratingUsers.value,
      ratingCritics: +target.ratingCritics.value,
      releaseDate: target.datepicker.value,
      sort: target.sort_rating.checked,
    }

    dispatch(filtersActions.set(values))
    // target.reset()
  }

  const clearFilters = () => {
    dispatch(filtersActions.clear())
    ref?.reset()
  }

  return {
    open,
    setOpen,
    handleSubmit,
    clearFilters,
  }
}
