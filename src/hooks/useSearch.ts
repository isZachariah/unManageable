import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function useSearch() {
  const [query, setSearch] = useState<string>('')
  const {search} = useRouter().query

  useEffect(() => {
    setSearch(search as string)
  }, [search])

  return query
}

export default useSearch