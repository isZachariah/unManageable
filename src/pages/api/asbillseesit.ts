import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const asBillSeesIt = async (req: NextApiRequest, res: NextApiResponse) => {
  const readings = await prisma.reading.findMany();
  res.status(200).json(readings);
};

export default asBillSeesIt;