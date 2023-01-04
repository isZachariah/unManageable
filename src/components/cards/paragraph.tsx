import type { FC } from "react";
import React from "react";
import type { BigBook } from "../../types/readings";

type ParagraphProps  = {
  paragraph: BigBook
}
const Paragraph: FC<ParagraphProps> = ({paragraph}) => {
  return (
    <div className={'w-3/5 flex flex-col text-center p-6 bg-white rounded-xl border-black shadow-3xl'}>
      <p className={'p-2'}>{paragraph.body}</p>
      <p className={'text-xs'}>{paragraph.title}</p>
    </div>
  );
};

export default Paragraph;