import React, { FC } from "react";
import { Steps, Tradition } from "../../types/readings";

type Props = {
  reading: {number: number, step?: string | undefined, tradition?: string | undefined}
}

const StepOrTradition: FC<Props> = ({reading}) => {
  return (
    <div className={'flex flex-row gap-6 text-align-left container border-black border-2 p-2 bg-blue-400 rounded-xl shadow-3xl w-96 break-inside-avoid'}>
      <p className={'text-3xl'}>{reading.number}.</p>
      {
        reading.step && <p className={'mt-2'}>{reading.step}</p>
      }
      {
        reading.tradition && <p>{reading.tradition}</p>
      }
    </div>
  );
};

export default StepOrTradition;