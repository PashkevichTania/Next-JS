import { Button, FileInput, Label, Select, Textarea, TextInput } from "flowbite-react"
import { GENRES, PLATFORMS } from "src/utils/constants"
import React from "react"
import { generateKey } from "src/utils/func"

export const GameForm = () => {
  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement & {
      title: { value: string }
      developers: { value: string }
      publisher: { value: string }
      platforms: { value: string }
      genres: { value: string }
      description: { value: string }
      releaseDate: { value: Date }
      ratingCritics: { value: number }
      ratingUsers: { value: number }
      ratingAge: { value: string }
      tags: { value: string }
      cover: { files: File[] }
      bg: { files: File[] }
    }
    // const values = {
    //   key: generateKey(),
    //   title: target.title.value,
    //   developers: target.developers.value.split(','),
    //   publisher: target.publisher.value,
    //   platform: target.platforms.value,
    //   genres: target.genres.value,
    //   description: target.description.value,
    //   releaseDate: target.releaseDate.value,
    //   ratingUsers: +target.ratingUsers.value,
    //   ratingCritics: +target.ratingCritics.value,
    //   cover: target.cover.files[0],
    //   bg: target.bg.files[0],
    // }

    // console.debug(values)
    const form = new FormData(target)
    form.set('key', generateKey())

    const response = await fetch(`/api/test/`, {
      method: 'POST',
      body: form
    })

    const { result } = await response.json()
    console.debug(result)
  }
  return (
    <div className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    <form className="h-[100%] flex flex-col gap-4" onSubmit={submitHandler}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Title"
          />
        </div>
        <TextInput
          name="title"
          type="text"
          placeholder="Fortnite"
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="developers"
            value="Developers"
          />
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
          <Label
            htmlFor="publisher"
            value="Publisher"
          />
        </div>
        <TextInput
          name="publisher"
          type="text"
          placeholder="sony"
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="platforms"
            value="Platforms"
          />
        </div>
        <Select
          name="platforms"
          required={true}
          multiple={true}
        >
          {PLATFORMS.map((platform)=>
            <option key={platform} value={platform}>
            {platform}
          </option>)}
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="genres"
            value="Genres"
          />
        </div>
        <Select
          name="genres"
          required={true}
          multiple={true}
        >
          {GENRES.map((genre)=>
            <option key={genre} value={genre}>
            {genre}
          </option>)}
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="comment"
            value="Description"
          />
        </div>
        <Textarea
          name="description"
          placeholder="Write a description..."
          defaultValue=""
          rows={4}
          style={{resize: 'none'}}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="releaseDate"
            value="Release date"
          />
        </div>
        <TextInput
          name="releaseDate"
          type="date"
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="ratingCritics"
            value="Rating Critics"
          />
        </div>
        <TextInput
          name="ratingCritics"
          type="number"
          max={100}
          min={0}
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="ratingUsers"
            value="Rating Users"
          />
        </div>
        <TextInput
          name="ratingUsers"
          type="number"
          max={10}
          min={0}
          required={true}
        />
      </div>
      <div id="fileUpload1">
        <div className="mb-2 block">
          <Label
            htmlFor="cover"
            value="Upload cover"
          />
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
          <Label
            htmlFor="bg"
            value="Upload background picture"
          />
        </div>
        <FileInput
          id="bg"
          name="bg"
          accept="image/*"
          helperText="Background picture"
        />
      </div>
      <div className="mb-5">
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
    </div>
  )
}
