export const CONST = {
  SITE_NAME: "GameX",
  LINKS: {
    GITHUB: "https://github.com/PashkevichTania",
    VK: "https://vk.com/gaywh0re",
    PROJECT: "https://github.com/PashkevichTania/next-js-games-library"
  },
  COVERS_FOLDER: "public/assets/games/covers/",
  BG_FOLDER: "public/assets/games/bg/",
  BLUR_FOLDER: "public/assets/games/bg/blur/",
  TEMP_FOLDER: "public/temp/",
} as const

export const ROUTES = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "games",
    path: "/games",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "admin",
    path: "/admin",
  },
]

export const PLATFORMS = [
  "PlayStation 3",
  "PlayStation 4",
  "PlayStation 5",
  "Xbox 360",
  "Xbox One",
  "Xbox Series X/S",
  "Windows",
  "macOS",
  "Stadia",
  "Nintendo Switch",
  "iOS",
  "Android",
]

export const GENRES = [
  "Adventure",
  "Action-adventure",
  "Open-World",
  "RPG",
  "First-person shooter",
  "Third-person shooter",
  "Real-time strategy",
  "MMO",
  "MOBA",
  "Fantasy",
  "Platformer",
  "Simulation",
  "Sports",
  "Puzzle",
  "Survival",
  "Horror",
  "Sci-Fi",
  "Battle royale",
  "Sandbox",
  "Role-playing",
  "Graphic adventure",
  "Racing",
  "Fighting",
  "Strategy",
]

export const ESRB = [
  { name: "EC", img: "ESRB_2013_Early_Childhood.svg.png", title: "Early childhood" },
  { name: "E", img: "ESRB_2013_Everyone.svg.png", title: "Everyone" },
  { name: "E10+", img: "ESRB_2013_Everyone_10+.svg.png", title: "Everyone 10 and older" },
  { name: "T", img: "ESRB_2013_Teen.svg.png", title: "Teen" },
  { name: "M", img: "ESRB_2013_Mature.svg.png", title: "Mature" },
  { name: "AO", img: "ESRB_2013_Adults_Only_18+.svg.png", title: "Adults Only 18+" },
  { name: "RP", img: "ESRB_2013_Rating_Pending.svg.png", title: "Rating Pending" },
]
