import { useState } from "react"
import filters from "@/store/filters"


type SidebarForm = HTMLFormElement & {
  title: { value: string }
  ratingUsers: { value: number }
  ratingCritics: { value: number }
  datepicker: { value: Date }
  sort_rating: { checked: boolean }
}

export default function useSidebar(ref: HTMLFormElement | null) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<SidebarForm>) => {
    e.preventDefault()
    const target = e.currentTarget
    const values = {
      title: target.title.value,
      ratingUsers: +target.ratingUsers.value,
      ratingCritics: +target.ratingCritics.value,
      releaseDate: target.datepicker.value,
      sort: target.sort_rating.checked,
    }

    //TODO: clear
    filters.set(values)
    // target.reset()
  }

  const clearFilters = () => {
    filters.clear()
    ref?.reset()
  }

  return {
    open,
    setOpen,
    handleSubmit,
    clearFilters,
  }
}
