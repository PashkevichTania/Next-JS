import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react"
import { GENRES, PLATFORMS } from "src/utils/constants"
import React, { useState } from "react"
import { generateKey } from "src/utils/func"
import { CustomSelect } from "components/CustomSelect"

export const GameForm = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement & {
      title: { value: string }
      developers: { value: string }
      publisher: { value: string }
      description: { value: string }
      releaseDate: { value: Date }
      ratingCritics: { value: number }
      ratingUsers: { value: number }
      ratingAge: { value: string }
      tags: { value: string }
      cover: { files: File[] }
      bg: { files: File[] }
    }

    // console.debug(values)
    const form = new FormData(target)
    form.set("key", generateKey())
    form.set("platforms", JSON.stringify(selectedPlatforms))
    form.set("genres", JSON.stringify(selectedGenres))

    // @ts-ignore
    console.debug(...form)

    // const response = await fetch(`/api/test/`, {
    //   method: 'POST',
    //   body: form
    // })

    // const { result } = await response.json()
    // console.debug(result)
  }
  return (
    <div className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
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
          <TextInput name="ratingUsers" type="number" max={10} min={0} required={true} />
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
