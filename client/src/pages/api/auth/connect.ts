import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Database from "utils/database";

const db = new Database();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res.status(400).json({
        error: "Invalid request",
      });
    }
    const { user } = session;
    const { message, signed } = req.body;
    const recoveredAddress = ethers.utils.verifyMessage(message, signed);
    await db.createConnection(user.id, recoveredAddress.toLowerCase());
    res.status(200).json({
      result: "OK",
    });
  } else {
    console.error("Invalid method");
    res.status(400).json({
      error: "Invalid method",
    });
  }
}
