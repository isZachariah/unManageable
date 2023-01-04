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
        <div
          className={`flex bg-white outline-none h-10 w-80 rounded-3xl border-[#777] border shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2`}>
          <input className={`input[type=search] bg-white outline-none ml-3 w-72 flex rounded-xl ` /*text-white*/}
                 id={'search'} type={'search'}
                 onChange={(e) => setQuery( e.target.value )}
                 value={query}
          >
          </input>
        </div>
      </div>
    </>
  )
}

export default Search



