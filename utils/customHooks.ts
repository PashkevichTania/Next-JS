import React, { useCallback, useEffect, useMemo, useState } from "react"
import { filtersActions } from "RTK/filtersSlice"
import { useDispatch, useSelector } from "react-redux"
import { filtersSelector } from "RTK/selectors"
import { GameDataBrief } from "./intefaces"
import { API } from "server/apiUtils"

export function useResizeObserver() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver(([container]) => {
        setSize({
          width: container.contentRect.width,
          height: container.contentRect.height,
        })
      }),
    []
  )
  const measuredRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) resizeObserver.observe(node)
      else resizeObserver.disconnect()
    },
    [resizeObserver]
  )

  return { size, measuredRef }
}

export const useSidebar = (ref: HTMLFormElement | null) => {
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

export const useGamesPage = (serverGames: GameDataBrief[]) => {
  const [games, setGames] = useState(serverGames)
  const filtersState = useSelector(filtersSelector)

  useEffect(() => {
    API.fetchFilteredGames(filtersState).then((result) => {
      setGames(result)
    })
  }, [filtersState])

  return {
    games,
  }
}
