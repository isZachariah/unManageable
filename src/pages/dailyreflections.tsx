import type { FC } from "react";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import ReflectionCard from "../components/cards/reflectionCard";
import { trpc } from "../utils/trpc";
import useScrollPosition from "../hooks/useScrollPosition";
import useSearch from "../hooks/useSearch";


const months = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];
const today = new Date().getMonth()
const MONTH: string = months[today-1] ?? 'January'
const DailyReflections: FC = () => {

  const [month, setMonth] = useState<string>(MONTH as string)
  const scrollPosition = useScrollPosition();
  const query = useSearch();

  const { data, hasNextPage, fetchNextPage, isFetching } = trpc.reflections.list
    .useInfiniteQuery(
      { query: query, month: month},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const reflections = data?.pages.flatMap((page) => page.reflections) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, fetchNextPage, isFetching]);

  return (
    <>
      <Head>
        <title>Daily Reflections</title>
        <meta name="Built to make accessing AA readings easier for meeting attendees"
              content="Created by isZachariah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex min-h-screen w-screen flex-col items-center justify-center bg-slate-800 align-middle m-auto"}>
        <div className={"container flex flex-row w-screen m-auto items-center justify-center align-middle break-before-column"}>
          {
            <div className={"columns-1 md:columns-2 lg:columns-3 "}>
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

export default DailyReflections;