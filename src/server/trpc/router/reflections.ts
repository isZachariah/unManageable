import { publicProcedure, router,  } from "../trpc";
import { z } from "zod";

export const reflectionsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        month: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(12)
      })
    )
    .query(async ({ctx, input}) => {
      const { prisma } = ctx
      const { query, month, cursor, limit } = input

      const reflections = await prisma.reflection.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          OR: [
            {
              reading: {
                contains: query
              },
            },
            {
              quotation: {
                contains: query
              },
            },
            {
              title: {
                contains: query
              }
            },
            {
              month: {
                contains: query
              }
            },
          ]
        },
        orderBy: [
          {
            date: "asc"
          }
        ],
      })

      let nextCursor: typeof cursor | undefined = undefined

      if (reflections.length > limit) {
        const nextItem = reflections.pop() as typeof reflections[number]
        nextCursor = nextItem.id
      }
      return {
        reflections,
        nextCursor,
      }
    }),
  today: publicProcedure
    .input(
      z.object({
        date: z.date()
      })
    )
    .query(async ({ctx, input}) => {
      const { prisma } = ctx
      const { date } = input

      const reflection = await prisma.reflection.findFirst({
        where: {
          AND: [
            {
              day: date.getDate()
            },
            {
              month: date.toLocaleString('default', { month: 'long' })
            }
          ]
        }
      })
      return {
        reflection
      }
    })
})