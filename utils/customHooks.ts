import React, { useCallback, useMemo, useState } from "react"

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
    [],
  )
  const measuredRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) resizeObserver.observe(node)
      else resizeObserver.disconnect()
    },
    [resizeObserver],
  )

  return { size, measuredRef }
}


export const useSidebar = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & {
      title: { value: string }
      rating: { value: number }
      datepicker: { value: Date }
      sort_rating: { checked: boolean }
    }
    const values = {
      title: target.title.value,
      rating: target.rating.value,
      date: target.datepicker.value,
      sort: target.sort_rating.checked,
    }
    console.log(values)
    console.log(e)
    target.reset()
  }

  const clearFilters = () => {
  }

  return {
    open,
    setOpen,
    handleSubmit,
    clearFilters,
  }
}
