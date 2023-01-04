import type { FC} from "react";
import React, { useEffect, useState } from "react";
import { prisma } from "../server/db/client";
import type { Reflection } from "../types/readings";
import Head from "next/head";
import ReflectionCard from "../components/cards/reflectionCard";
import { useRouter } from "next/router";
import { trpc,  } from "../utils/trpc";
import { useInfiniteQuery } from "@tanstack/react-query";
import useScrollPosition from "../hooks/useScrollPosition";
import useSearch from "../hooks/useSearch";

const DailyReflections: FC = () => {
  const scrollPosition = useScrollPosition()
  const query = useSearch()

  const { data, hasNextPage, fetchNextPage, isFetching } = trpc.reflections.list
    .useInfiniteQuery(
      { query },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
      )

  const reflections = data?.pages.flatMap((page) => page.reflections) ?? []

  useEffect(() => {
    if(scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [scrollPosition, hasNextPage, fetchNextPage, isFetching])

  return (
    <>
      <Head>
        <title>Daily Reflections</title>
        <meta name="Built to make accessing AA readings easier for meeting attendees" content="Created by isZachariah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex min-h-screen w-screen flex-col items-center justify-center bg-slate-800 align-middle m-auto"}>

        <div className={'container flex flex-row w-screen m-auto items-center justify-center align-middle  mt-12 break-before-column'}>
          {
            <div className={'columns-1 md:columns-2 lg:columns-3 '}>
              {
                reflections.map((reflection, index) => (
                  <div key={index}>
                    <ReflectionCard reflection={reflection} />
                  </div>
                ))
              }
            </div>
          }
        </div>
      </main>
    </>
  );
};

// export async function getServerSideProps() {
//   const reflections = await prisma.reflection.findMany({
//     orderBy: {
//       date: 'asc'
//     }
//   })
//   return {
//     props: {
//       reflections: JSON.parse(JSON.stringify(reflections))
//     }
//   }
// }
//
// type PageProps = {
//   reflections: Reflection[]
// }
// reflections
//   .filter(reflection =>
//      reflection.title.includes(query)
//   || reflection.quotation.includes(query)
//   || reflection.reading.includes(query)
// )
//   .map((reflection, index) => (
//   <div key={index}>
//     <ReflectionCard reflection={reflection} />
//   </div>
// ))

export default DailyReflections;