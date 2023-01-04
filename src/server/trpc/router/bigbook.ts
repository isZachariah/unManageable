import { publicProcedure, router } from "../trpc";
import { z } from 'zod'
import { zCHAPTERS } from "../../../types/readings";


export const bigbookRouter = router({
  chapters: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
        search: z.string().optional(),
        chapter: z.string().optional(),
      })
    )
    .query(async ({ctx, input}) => {
      const { prisma } = ctx
      const { limit, cursor, search, chapter } = input

      const paragraphs = await prisma.bigBook.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          AND: [
            {
              body: {
                contains: search
              }
            },
            {
              title: {
                equals: chapter
              }
            },
          ],
          NOT: {
            body: {
              equals: ''
            }
          }
        },
        orderBy: [
          { chapter  : 'asc' },
          { paragraph: "asc" }
        ],
      });

      let nextCursor: typeof cursor | undefined = undefined
      if (paragraphs.length > limit) {
        const nextItem = paragraphs.pop() as typeof paragraphs[number]
        nextCursor = nextItem.id
      }

      return {
        paragraphs,
        nextCursor
      }
    })
})