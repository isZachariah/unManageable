import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const bigbook = async (req: NextApiRequest, res: NextApiResponse) => {
  const bigBookParagraphs = await prisma.bigBook.findMany();
  res.status(200).json(bigBookParagraphs);
};

export default bigbook;