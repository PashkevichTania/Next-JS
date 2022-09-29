export const getRatingData = (rating: string) => {
    if (rating.toLowerCase() === "m") return { img: "/assets/icons/rating/m.png", tooltip: "Mature" }
    if (rating.toLowerCase() === "t") return { img: "/assets/icons/rating/t.jpeg", tooltip: "Teens" }
    return { img: "", tooltip: "" }
}

export const getRatingColor = (rating: number) => {
    if (rating > 80) return "#00ff00"
    if (rating > 60) return "#b7ff00"
    if (rating > 40) return "#ffea00"
    if (rating > 20) return "#ffa600"
    return  "#ff0000"
}
