import React, { FC, useEffect, useState } from "react";
import Paragraph from "../components/cards/paragraph";
import useScrollPosition from "../hooks/useScrollPosition";
import useSearch from "../hooks/useSearch";
import { trpc } from "../utils/trpc";
import {z} from 'zod'

// export async function getServerSideProps() {
//   const paragraphs = await prisma.bigBook.findMany({
//     orderBy: [
//       { chapter  : 'asc' },
//       { paragraph: "asc" }
//     ]
//   })
//   return {
//     props: {
//       paragraphs: paragraphs
//     }
//   }
// }
//
// type BigBookProps = {
//   paragraphs: BigBook[]
// }

type chapters = `Bill's Story`|`There is a Solution`|`We Agnostics`|`How it Works`|`Into Action`|`Working With Others`|`To Wives`|`The Family Afterward`|`To Employers`|`A Vision For You`
export const CHAPTERS = [`Bill's Story`, `There is a Solution`, `We Agnostics`, `How it Works`, `Into Action`, `Working With Others`, `To Wives`, `The Family Afterward`, `To Employers`, `A Vision For You`]
const BigBook: FC= () => {
  const [chapter, setChapter] = useState<string>(`Bill's Story`)
  const scrollPosition = useScrollPosition()
  const query = useSearch()

  const { data, hasNextPage, fetchNextPage, isFetching } = trpc.bigbook.chapters
    .useInfiniteQuery(
      { search: query, chapter: chapter }, // chapter: chapter
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )
  function selectChapter(chapter: string) {
     setChapter(chapter)
  }

  const paragraphs = data?.pages.flatMap((page) => page.paragraphs) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, fetchNextPage, isFetching]);
// .filter(paragraph => paragraph.title === chapter)
  return (
    <>
      <div className={'flex flex-row w-screen'}>
        <aside className={'flex flex-col w-full text-white border-r-4 border-black mr-4 md:mr-12 lg:mr-24 min-w-4/5 sticky top-48 lg:top-32 z-1 h-screen '}>
          {
            CHAPTERS.map((chapter, index) => (
              <button
                key={index}
                className={`lg:mb-10 md:mb-8 mb-2`}
                onClick={() => selectChapter(chapter)}
              >{chapter}</button>
            ))
          }

        </aside>
        <main className={'flex flex-col align-middle justify-center m-auto gap-12 items-center mr-4'}>
          {
            paragraphs.map((paragraph, index) => (
              <div key={index}>
                <Paragraph paragraph={paragraph} />
              </div>
            ))
          }
        </main>
      </div>
    </>
  );
};

export default BigBook;