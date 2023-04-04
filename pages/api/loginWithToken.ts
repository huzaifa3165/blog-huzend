import { NextApiRequest, NextApiResponse } from "next";
import { getUserData } from "../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;
      const userData = await getUserData(
        process.env.STRAPI_HOST,
        token,
        process.env.JWT_SECRET
      );
      res.status(200).json({ userData });
    } catch (error: any) {
      console.log(error.message);
      res.status(401).json({ message: error.message });
    }
  }
}
