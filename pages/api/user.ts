import { NextApiRequest, NextApiResponse } from "next";
import { getTokenWithCred, getUserData } from "../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(email, password);
    const token = await getTokenWithCred(email, password);

    if (token) {
      console.log(process.env.JWT_SECRET);
      const userData = await getUserData(
        process.env.STRAPI_HOST,
        token,
        process.env.JWT_SECRET
      );
      res.status(200).json({ userData, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
}
