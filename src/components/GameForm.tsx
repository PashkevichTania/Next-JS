import { Button, FileInput, Label, Select, Textarea, TextInput } from "flowbite-react"
import { GENRES, PLATFORMS, ESRB } from "@/utils/constants"
import { CustomSelect } from "@/components/CustomSelect"
import { useAdminForm } from "@/hooks/useAdminForm"

export const GameForm = () => {
const {
  selectedPlatforms,
  setSelectedPlatforms,
  selectedGenres,
  setSelectedGenres,
  submitHandler
} = useAdminForm()


  return (
    <div
      className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <form className="h-[100%] flex flex-col gap-4" onSubmit={submitHandler}>
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
            helperText="Cover picture for preview"
          />
        </div>
        <div id="fileUpload2">
          <div className="mb-2 block">
            <Label htmlFor="bg" value="Upload background picture" />
          </div>
          <FileInput id="bg" name="bg" accept="image/*" helperText="Background picture" />
        </div>
        <div className="pb-5">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}
