import { Button, FileInput, Label, Select, Spinner, Textarea, TextInput } from "flowbite-react"
import { GENRES, PLATFORMS, ESRB, CONST } from "@/utils/constants"
import { CustomSelect } from "@/components/CustomSelect"
import { useAdminForm } from "@/hooks/useAdminForm"
import { AiOutlineClear, MdAdd, MdDelete, MdEdit, MdOpenInNew } from "react-icons/all"

export const GameForm = () => {
const {
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
} = useAdminForm()

  if (isLoading) return (
    <div
      className="h-[100%] flex flex-col items-center justify-center p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <Spinner
        size="xl"
      />
     </div>
  )

  return (
    <div
      className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <form className="h-[100%] flex flex-col gap-4" onSubmit={submitHandler} id="form">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput name="title" type="text" placeholder="Fortnite" required={true} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="developers" value="Developers" />
          </div>
          <TextInput
            name="developers"
            type="text"
            placeholder="2K Australia, 2K Boston"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="publisher" value="Publisher" />
          </div>
          <TextInput name="publisher" type="text" placeholder="sony" required={true} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="platforms" value="Platforms" />
          </div>
          <CustomSelect
            list={PLATFORMS}
            selectedItems={selectedPlatforms}
            setSelectedItems={setSelectedPlatforms}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="genres" value="Genres" />
          </div>
          <CustomSelect
            list={GENRES}
            selectedItems={selectedGenres}
            setSelectedItems={setSelectedGenres}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Description" />
          </div>
          <Textarea
            name="description"
            placeholder="Write a description..."
            defaultValue=""
            rows={4}
            style={{ resize: "none" }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="releaseDate" value="Release date" />
          </div>
          <TextInput name="releaseDate" type="date" required={true} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="ratingCritics" value="Rating Critics" />
          </div>
          <TextInput name="ratingCritics" type="number" max={100} min={0} required={true} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="ratingUsers" value="Rating Users" />
          </div>
          <TextInput name="ratingUsers" type="number" max={10} min={0} step="0.1" required={true} />
        </div>
        <div >
          <div className="mb-2 block">
            <Label
              htmlFor="ratingAge"
              value="Select age rating"
            />
          </div>
          <Select
            name="ratingAge"
            required={true}
          >
            {ESRB.map((rating)=>
              <option key={rating.name} value={rating.name}>
                {rating.name}
              </option>
            )}
          </Select>
        </div>
        <div id="fileUpload1">
          <div className="mb-2 block">
            <Label htmlFor="cover" value="Upload cover" />
          </div>
          <FileInput
            id="cover"
            name="cover"
            accept="image/*"
            multiple={false}
            helperText="Cover picture for preview"
          />
        </div>
        <div id="fileUpload2">
          <div className="mb-2 block">
            <Label htmlFor="bg" value="Upload background picture" />
          </div>
          <FileInput
            id="bg"
            name="bg"
            accept="image/*"
            helperText="Background picture"
            multiple={false}
          />
        </div>
        <div className={"pb-5 flex " +(selectedGame ? "flex-col gap-4" : "flex-row gap-2")}>
          <Button gradientDuoTone="tealToLime" onClick={clearForm}>
            <span className="pr-2" >Clear</span>
            <AiOutlineClear />
          </Button>
          {selectedGame
           ?
            <div className="flex flex-row gap-2">
              <Button  gradientMonochrome="success" pill={true} onClick={()=>openGame(selectedGame._id)}>
                <span className="pr-2" >Open</span>
                <MdOpenInNew />
              </Button>
              <Button gradientDuoTone="cyanToBlue" pill={true} type="submit">
                <span className="pr-2" >Save Edit</span>
                <MdEdit />
              </Button>
              <Button gradientMonochrome="failure" pill={true} onClick={()=>deleteGame(selectedGame._id)}>
                <span className="pr-2" >Delete</span>
                <MdDelete />
              </Button>
            </div>
          :
            <Button gradientDuoTone="purpleToBlue" type="submit">
              <span className="pr-2" >Add game</span>
              <MdAdd/>
            </Button>
          }

        </div>
      </form>
    </div>
  )
}
