import React, { FC } from "react";
import { prisma } from "../server/db/client";
import type {Steps} from "../types/readings";
import StepOrTradition from "../components/cards/stepOrTradition";

export async function getServerSideProps() {

  const steps = await prisma.steps.findMany({
    orderBy: {
      number: 'asc'
    }
  })
  return {
    props: {
      steps: JSON.parse(JSON.stringify(steps))
    }
  }
}

type Props = {
  steps: Steps[]
}

const Steps:FC<Props> = ({steps}) => {
  return (
    <div className={'items-center align-middle justify-center m-auto text-white gap-16 grid grid-cols-3'}>
      {
        steps.map((step, index) => (
          <div key={index} className={'mb-6'}>
            <StepOrTradition reading={step} />
          </div>
        ))
      }
    </div>
  );
};
// flex flex-row flex-wrap flex-basis
export default Steps;