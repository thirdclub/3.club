import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const response = await axios.get("https://api.ipify.org?format=json");
    res.status(200).json(response.data);
  } else {
  }
}
