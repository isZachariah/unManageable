import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const steps = async (req: NextApiRequest, res: NextApiResponse) => {
  const twelveSteps = await prisma.steps.findMany();
  res.status(200).json(twelveSteps);
};

export default steps;