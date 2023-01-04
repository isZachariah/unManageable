import { PrismaClient } from '@prisma/client'
import { Reading, BigBook, Steps, Prayer, Tradition, Reflection } from "../src/types/readings";
import path from "path";
import { promises as fs } from 'fs';
import reflection from "../src/components/cards/reflectionCard";
const prisma = new PrismaClient()

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

async function fetchData(file: string) {
  const directory = path.join(process.cwd(), 'src', 'data');
  //Read the json data file data.json
  const data = await fs.readFile(directory + file, 'utf8');
  // const reflections = await fetch('../src/pages/api/static/reflections')
  // console.log(data)
  return JSON.parse(data)
}

async function main() {
  // Fetch data from the daily reflections JSON
  await fetchData('/dailyreflections.json')
    .then(data => {
    data
      .filter((reflection:Reflection) => reflection.reading !== null || reflection.citation  !== null)
      .forEach(async (reflection: Reflection) => {
        const month = months.indexOf(reflection.month) + 1
        reflection.date = new Date(`${month}-${reflection.day}-2021`)
        // console.log(reflection)
        const create = await prisma.reflection.create({
          data: {
            month: reflection.month,
            day: reflection.day,
            date: reflection.date,
            title: reflection.title,
            quotation: reflection.quotation,
            citation: reflection.citation as string,
            reading: reflection.reading as string
          }
        })
      })
    })
  // Fetch data from the As Bill See's It (readings.json) JSON
  // await fetchData('/readings.json')
  //   .then(data => {
  //     data.forEach(async (reading: Reading) => {
  //       const createReading = await prisma.reading.create({
  //         data: {
  //           number: reading.number,
  //           title: reading.title,
  //           reading: reading.reading
  //         }
  //       })
  //     })
  //   })
  // // Fetch data from The Big Book JSON
  // await fetchData('/big_book_para.json')
  //   .then(data => {
  //     data.forEach(async (paragraph: BigBook) => {
  //       const createBigBook = await prisma.bigBook.create({
  //         data: {
  //           chapter: paragraph.chapter,
  //           paragraph: paragraph.paragraph,
  //           title: paragraph.title,
  //           body: paragraph.body
  //         }
  //       })
  //     })
  //   })
  // // Fetch data from the prayers JSON
  // await fetchData('/prayers.json')
  //   .then(data => {
  //     data.forEach(async (prayer: Prayer) => {
  //       const createPrayer = await prisma.prayer.create({
  //         data: {
  //           title: prayer.title,
  //           author: prayer.author,
  //           year: prayer.year,
  //           step: prayer.step,
  //           prayer: prayer.prayer
  //         }
  //       })
  //     })
  //   })
  // // Fetch data from the twelve steps JSON
  // await fetchData('/twelvesteps.json')
  //   .then(data => {
  //     data.forEach(async (step: Steps) => {
  //       const createSteps = await prisma.steps.create({
  //         data: {
  //           number: step.number,
  //           step: step.step
  //         }
  //       })
  //     })
  //   })
  // // Fetch data from the traditions JSON
  // await fetchData('/traditions.json')
  //   .then(data => {
  //     data.forEach(async (tradition: Tradition) => {
  //       const createTradition = await prisma.traditions.create({
  //         data: {
  //           number: tradition.number,
  //           tradition: tradition.tradition
  //         }
  //       })
  //     })
  //   })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })