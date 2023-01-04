import React, { FC, useState } from "react";
import { prisma } from "../server/db/client";
import { BigBook } from "../types/readings";
import Paragraph from "../components/cards/paragraph";

export async function getServerSideProps() {
  const paragraphs = await prisma.bigBook.findMany({
    orderBy: [
      { chapter  : 'asc' },
      { paragraph: "asc" }
    ]
  })
  return {
    props: {
      paragraphs: paragraphs
    }
  }
}

type BigBookProps = {
  paragraphs: BigBook[]
}

export const CHAPTERS = [`Bill's Story`, `There is a Solution`, `We Agnostics`, `How it Works`, `Into Action`, `Working With Others`, `To Wives`, `The Family Afterward`, `To Employers`, `A Vision For You`]
const BigBook: FC<BigBookProps> = ({paragraphs}) => {
  const [chapter, setChapter] = useState(`Bill's Story`)

  function selectChapter(chapter: string) {
     setChapter(chapter)
  }

  return (
    <>
      <div className={'flex flex-row'}>
        <aside className={'flex flex-col text-white w-full'}>
          {
            CHAPTERS.map((chapter, index) => (
              <button
                key={index}
                onClick={() => selectChapter(chapter)}
              >{chapter}</button>
            ))
          }

        </aside>
        <div className={'flex flex-col align-middle justify-center m-auto gap-12'}>
          {
            paragraphs.filter(paragraph => paragraph.title === chapter).map((paragraph, index) => (
              <div key={index}>
                <Paragraph paragraph={paragraph} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default BigBook;