import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const traditions = async (req: NextApiRequest, res: NextApiResponse) => {
  const traditions = await prisma.traditions.findMany();
  res.status(200).json(traditions);
};

export default traditions;