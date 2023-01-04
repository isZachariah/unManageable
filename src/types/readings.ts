import { z } from 'zod'

export const readingSchema = z.object({
  number: z.number(),
  title: z.string(),
  reading: z.string(),
})

export type Reading = {
  number: number
  title: string
  reading: string
}
export const reflectionsSchema = z.object({
  month: z.string(),
  day:   z.number(),
  title: z.string(),
  quotation: z.string(),
  citation: z.string(),
  reading: z.string(),
})

export type Reflection = {
  date: Date;
  month: string
  day: number
  title: string
  quotation: string
  citation: string
  reading: string
}

export const prayerSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.number(),
  prayer: z.string(),
})

export type Prayer = {
  title: string
  author: string
  year: number
  step: number
  prayer: string
}

export const bigBookSchema = z.object({
  chapter: z.string(),
  title: z.string(),
  paragraph: z.number(),
  body: z.string(),
})

export type BigBook = {
  chapter: string
  title: string
  paragraph: number
  body: string
}

export const stepsSchema = z.object({
  number: z.number(),
  step: z.string(),
})

export type Steps = {
  number: number
  step: string
}

export const traditionsSchema = z.object({
  number: z.number(),
  step: z.string(),
})

export type Tradition = {
  number: number
  tradition: string
}