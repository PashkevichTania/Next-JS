import { Button, Checkbox, Label, Sidebar, TextInput } from "flowbite-react"
import { AiOutlineClear, BiSearchAlt, HiArrowSmLeft, HiArrowSmRight, HiMenu } from "react-icons/all"
import { useSidebar } from "utils/customHooks"
import { useRef } from "react"

function SidebarMenu() {
  const ref = useRef(null)
  const {
    open,
    setOpen,
    handleSubmit,
    clearFilters,
  } = useSidebar(ref.current)

  return (
    <div
      className="w-fit sticky left-0 top-0 h-[100vh] pt-24 bg-white dark:bg-gray-800 transition-all border-solid border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <div className="self-end">
          <button type="button" onClick={() => setOpen(!open)}
                  className="outline-none inline-flex flex-row items-center m-2">
            <HiMenu className="w-8 h-8" />
            {open ? <HiArrowSmLeft className="w-8 h-8" /> : <HiArrowSmRight className="w-8 h-8" />}
          </button>
        </div>
        <form className={`${open ? "block" : "hidden"} w-fit`} onSubmit={handleSubmit} ref={ref}>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Filter Games</h2>
            <div className="flex flex-col gap-4 pb-5 border-solid border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="title"
                    value="Game title"
                  />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="Firewatch"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="rating"
                    value="Game user's rating more than:"
                  />
                </div>
                <TextInput
                  id="ratingUsers"
                  type="number"
                  placeholder="9.1"
                />
              </div>
              <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="rating"
                  value="Game critic's rating more than:"
                />
              </div>
              <TextInput
                id="ratingCritics"
                type="number"
                placeholder="69"
              />
            </div>
              <div className="relative">
                <Label
                  htmlFor="datepicker"
                  value="Released after:"
                />
                <input type="date" id="datepicker"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Select date" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="sort_rating"
                  defaultChecked={false}
                />
                <Label htmlFor="sort_rating">
                  Sort by rating
                </Label>
              </div>
            </div>
            <div className="p-5">
              <Button gradientDuoTone="purpleToBlue" type="submit">
                Filter
                <BiSearchAlt className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="px-5 pb-5">
              <Button gradientDuoTone="purpleToBlue" onClick={clearFilters}>
                Clear filters
                <AiOutlineClear className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Sidebar>
        </form>
      </div>
    </div>
  )
}

export default SidebarMenu
