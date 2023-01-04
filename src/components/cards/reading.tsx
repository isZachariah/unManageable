import type { FC } from "react";
import { Prayer, Reflection, Reading, Steps, Tradition, BigBook } from "../../types/readings";

type Props = {
  reading: Reflection |  Reading |  Prayer | Steps | Tradition | BigBook
}

type GenericReading  =  {
  month: string | undefined
  day: number | undefined
  number?: number | undefined
  title?: string | undefined
  quotation?: string | undefined
  citation?: string |  undefined
  reading?: string | undefined

  // tradition?:  string | undefined
  // step?: string | undefined
  // body?: string | undefined
  // prayer?: string | undefined
}
const Reading: FC<GenericReading> = ({number, month,  day, title, quotation, citation, reading}) => {


  return (
    <div className={`flex flex-col w-96 h-fit border-2 border-black text-white rounded-xl p-8 m-8 shadow-3xl bg-neutral-800`}>
      {
        month && day && (
          <>
            <p>{`${month} ${day.toString()}`}</p>
              <p className={'text-xl w-fit mb-2'}>{title}</p>
              <div className={'w-full border-2 h-0'}/>
              <div className={'m-2'}>
                {
                  quotation && <p className={'mb-4'}>{quotation}</p>
                }
                {
                  reading  && <p className={'mb-4'}>{reading}</p>
                }
                {
                  citation  && <p className={'text-xs'}>{citation}</p>
                }
              </div>
          </>
        )
      }
      {
        number && reading && (
          <>
            <p>{number}. {reading}</p>
          </>
        )
      }
    </div>
  )
}

export default Reading