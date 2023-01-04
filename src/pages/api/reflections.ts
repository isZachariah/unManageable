import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const reflections = async (req: NextApiRequest, res: NextApiResponse) => {
  const reflections = await prisma.reflection.findMany();
  res.status(200).json(reflections);
};

export default reflections;