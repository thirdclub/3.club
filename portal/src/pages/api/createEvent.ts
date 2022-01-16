import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Database from "utils/database";
import { v4 as uuidv4 } from "uuid";

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
    const event = {
      ...req.body,
      id: uuidv4(),
      userId: session.user.id,
      createdAt: Date.now(),
    };
    await db.createEvent(event);
    res.status(200).json({
      result: "OK",
      data: event,
    });
  } else {
    console.error("Invalid method");
    res.status(400).json({
      error: "Invalid method",
    });
  }
}
