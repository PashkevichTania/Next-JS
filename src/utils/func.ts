export const getRatingData = (rating: string) => {
  if (rating.toLowerCase() === "m") return { img: "/assets/icons/rating/m.png", tooltip: "Mature" }
  if (rating.toLowerCase() === "t") return { img: "/assets/icons/rating/t.jpeg", tooltip: "Teens" }
  return { img: "", tooltip: "" }
}

export const getRatingColor = (rating: number) => {
  if (rating > 80) return "#1fea08"
  if (rating > 60) return "#b5ff00"
  if (rating > 40) return "#f1dc07"
  if (rating > 20) return "#ffa600"
  return "#ff0000"
}

export const capitalize = (word: string) => (word.charAt(0).toUpperCase() + word.slice(1))

export const generateKey = (length: number = 6) => (Math.random() + 1).toString(36).substring(2).substring(10 - length)
