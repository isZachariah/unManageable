import type { FC } from "react";
import React from "react";
import type { BigBook } from "../../types/readings";
import useSearch from "../../hooks/useSearch";

type ParagraphProps  = {
  paragraph: BigBook
}
const Paragraph: FC<ParagraphProps> = ({paragraph}) => {
  const search = useSearch()

  const containsSearch = paragraph.body.includes(search)
  if (containsSearch) {
    const index = paragraph.body.indexOf(search)
    const paragraphSplit = paragraph.body.split(search)
  }
  return (
    <div className={'lg:w-2/3 min-w-2/3 flex flex-col text-center p-6 bg-white rounded-xl border-black shadow-2xl shadow-black  md:ml-20 lg:ml-40'}>
      <p className={'p-2'}>
        {
        paragraph.body
        }
      </p>
      <p className={'text-xs'}>{paragraph.title}</p>
    </div>
  );
};

export default Paragraph;