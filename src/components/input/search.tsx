import type { Dispatch, FC, SetStateAction } from "react";

type SearchProps = {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}
const Search: FC<SearchProps> = ({ query, setQuery }) => {

  function clearOptions() {
    setQuery('')
  }

  return (
    <>
      <div className={`text-center  align-middle justify-center m-auto`}>
        <label
          className={`flex flex-basis font-bold mb-1 block` /*text-gray-700*/}
          htmlFor={'search'}
        >
          {/*Search*/}
        </label>
        <div
          className={`flex bg-white outline-none h-10 w-80 rounded-3xl border-[#777] border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2`}>
          <input className={`input[type=search] bg-white outline-none h-8 ml-3 w-72 flex rounded-3xl ` /*text-white*/}
                 id={'search'} type={'search'}
                 onChange={(e) => setQuery( e.target.value )}
                 value={query}
          >
          </input>
          <button
            onClick={(e) => {
              e.stopPropagation()
              clearOptions()
            }}
            className={'flex flex-basis font-bold mb-1 block text-center pt-2'}>&times;</button>
        </div>

      </div>
    </>
  )
}

export default Search



