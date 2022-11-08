import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { AiOutlineCheckCircle as CheckIcon, FiChevronDown } from "react-icons/all"

type Props = {
  list: string[]
  selectedItems: string[]
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
}

export const CustomSelect = ({ list, selectedItems, setSelectedItems }: Props) => {
  return (
    <div className="w-[100%] h-20">
      <Listbox value={selectedItems} defaultValue={[""]} onChange={setSelectedItems} multiple>
        <div className="relative mt-1 w-[100%] h-20">
          <Listbox.Button
            className="relative h-20 w-full border bg-gray-50 border-gray-300
                text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg sm:text-sm"
          >
            <span className="block text-ellipsis w-[80%] max-h-[80%] overflow-hidden text-gray-400">
              {selectedItems.map((item) => item).join(", ")}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-10 mt-1 p-2 max-h-60 w-full overflow-auto
                   rounded-md border border-blue-500 text-black bg-gray-50 dark:bg-gray-700
                   dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5
                   focus:outline-none sm:text-sm"
            >
              {list.map((item) => (
                <Listbox.Option key={item} value={item} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`flex flex-row items-center ${active && "bg-blue-500 text-white"}`}
                    >
                      {selected && <CheckIcon className="mr-1" />}
                      {item}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
