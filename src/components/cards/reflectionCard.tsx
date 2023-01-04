import type { NextComponentType } from "next";
import { Reflection } from "../../types/readings";
import { FC } from "react";

type ReflectionProps = {
  reflection: Reflection
}

const ReflectionCard: FC<ReflectionProps> = ({reflection}) => {
  const today = new Date()
  const isToday = reflection.date.getDate() === today.getDate() && reflection.date.getMonth() === today.getMonth()
  const bg = isToday ? 'bg-orange-800 border-4' : 'bg-neutral-800'
  const color = isToday ? 'border-black text-black' : ''


  return (
    <div className={`${bg} flex flex-col w-96 h-fit border-2 border-black text-white rounded-xl p-8 m-8 shadow-2xl shadow-black break-inside-avoid` }>
      <p className={``}>{`${reflection.month} ${reflection.day.toString()}`}</p>
      <p className={`text-xl w-fit mb-2 `}>{reflection.title}</p>
      <div className={`w-full border-2 h-0 ${color}`}/>
      <div className={'m-2'}>
        <p className={`mb-4 `}>{reflection.quotation}</p>

        <p className={`mb-4`}>{reflection.reading}</p>

        <p className={`text-xs`}>{reflection.citation}</p>
      </div>

    </div>
  )
}

export default ReflectionCard