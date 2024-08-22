import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
  }

  const response = schema.safeParse(req.body);

  if (!response.success) {
    const { errors } = response.error;

    return res.status(400).json({
      error: { message: "Invalid request", errors },
    });
  }

  const { email, password } = response.data;

  return res.status(200).json({ message: "Success" });
}
