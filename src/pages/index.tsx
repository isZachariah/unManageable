import { type NextPage } from "next";
import Head from "next/head";
import { prisma } from "../server/db/client";
import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Reflection } from "../types/readings";
import ReflectionCard from "../components/cards/reflectionCard"
import { useRouter } from 'next/router'


export async function getServerSideProps() {

  const reflections = await prisma.reflection.findMany({
    orderBy: {
      date: 'asc'
    }
  })
  return {
    props: {
      reflections: JSON.parse(JSON.stringify(reflections))
    }
  }
}

type HomeProps = {
  reflections: Reflection[]
}
const Home: NextPage<HomeProps> = ({reflections}) => {
  const [query, setSearch] = useState<string>('')
  const {search} = useRouter().query

  useEffect(() => {
    setSearch(search as string)
  }, [search])

  // const reflections = useQuery({
  //   queryKey:  ['reflection'],
  //   queryFn: () => fetchReflections
  // })

  return (
    <>
      <Head>
        <title>unManageable</title>
        <meta name="Built to make accessing AA readings easier for meeting attendees" content="Created by isZachariah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800">

        <div className={'flex flex-row'}>
          {
            reflections && (
              <div className={'flex flex-wrap'}>
                {
                  reflections.filter(reflection => reflection.title.includes(query)
                    || reflection.quotation.includes(query)
                    || reflection.reading.includes(query)

                  ).map((reflection, index) => (
                  <div key={index}>
                    <ReflectionCard reflection={reflection} />
                  </div>
                ))
                }
              </div>
            )
          }
        </div>
      </main>
    </>
  );
};

export default Home;
