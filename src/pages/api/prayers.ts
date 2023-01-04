import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const prayers = async (req: NextApiRequest, res: NextApiResponse) => {
  const prayers = await prisma.prayer.findMany();
  res.status(200).json(prayers);
};

export default prayers;