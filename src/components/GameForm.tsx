import Image from "next/image"
import {
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
  Modal,
} from "flowbite-react"
import { GENRES, PLATFORMS, ESRB } from "@/utils/constants"
import { CustomSelect } from "@/components/CustomSelect"
import { AdminForm, useAdminForm } from "@/hooks/useAdminForm"
import {
  AiOutlineClear,
  HiOutlineExclamationCircle,
  MdAdd,
  MdClose,
  MdDelete,
  MdEdit,
  MdOpenInNew,
} from "react-icons/all"
import { useRef, useState } from "react"

export const GameForm = () => {
  const [show, setShow] = useState(false)
  const formElement = useRef<AdminForm>(null)

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
    clearForm,
    selectBGHandler,
    selectCoverHandler,
    clearCoverHandler,
    clearBGHandler,
    selectedBG,
    selectedCover,
  } = useAdminForm(formElement)

  if (isLoading)
    return (
      <div
        className="h-[100%] flex flex-col items-center justify-center p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        <Spinner size="xl" />
      </div>
    )

  return (
    <div
      className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <form
        className="h-[100%] flex flex-col gap-4"
        onSubmit={submitHandler}
        id="form"
        ref={formElement}
      >
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="ratingAge" value="Select age rating" />
          </div>
          <Select name="ratingAge" required={true}>
            {ESRB.map((rating) => (
              <option key={rating.name} value={rating.name}>
                {rating.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="grow">
            <div className="mb-2 block">
              <Label htmlFor="bg" value="Upload background picture" />
            </div>
            <FileInput
              id="bg"
              name="bg"
              accept="image/*"
              helperText="Background picture"
              multiple={false}
              onChange={selectBGHandler}
            />
          </div>
          <div className="w-10">
            <Button
              gradientMonochrome="failure"
              onClick={clearBGHandler}
            >
              <MdClose />
            </Button>
          </div>
        </div>
        <div>
          {selectedBG &&  <Image width={400} height={200} src={selectedBG}  alt="BG preview" /> }
        </div>
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="grow">
            <div className="mb-2 block">
              <Label htmlFor="cover" value="Upload cover" />
            </div>
            <FileInput
              id="cover"
              name="cover"
              accept="image/*"
              multiple={false}
              helperText="Cover picture for preview"
              onChange={selectCoverHandler}
            />
          </div>
          <div className="w-10">
            <Button
              gradientMonochrome="failure"
              onClick={clearCoverHandler}
            >
              <MdClose />
            </Button>
          </div>
        </div>
        <div>
          {selectedCover &&  <Image width={200} height={300} src={selectedCover}  alt="BG preview" /> }
        </div>
        <div className={"pb-5 flex " + (selectedGame ? "flex-col gap-4" : "flex-row gap-2")}>
          <Button gradientDuoTone="tealToLime" onClick={clearForm}>
            <span className="pr-2">Clear</span>
            <AiOutlineClear />
          </Button>
          {selectedGame ? (
            <div className="flex flex-row gap-2">
              <Button
                gradientMonochrome="success"
                pill={true}
                onClick={() => openGame(selectedGame._id)}
              >
                <span className="pr-2">Open</span>
                <MdOpenInNew />
              </Button>
              <Button gradientDuoTone="cyanToBlue" pill={true} type="submit">
                <span className="pr-2">Save</span>
                <MdEdit />
              </Button>
              <Button gradientMonochrome="failure" pill={true} onClick={() => setShow(true)}>
                <span className="pr-2">Delete</span>
                <MdDelete />
              </Button>
            </div>
          ) : (
            <Button gradientDuoTone="purpleToBlue" type="submit">
              <span className="pr-2">Add game</span>
              <MdAdd />
            </Button>
          )}
        </div>
      </form>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this game? {selectedGame ? `(${selectedGame.title})` : ""}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  if (selectedGame) deleteGame(selectedGame._id)
                  setShow(false)
                }}
              >
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShow(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
