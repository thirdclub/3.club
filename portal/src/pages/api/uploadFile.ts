import { storage } from "lib/firebase";
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
    const file = storage.bucket().file(`${uuidv4()}.png`);
    await file.save(Buffer.from(req.body.image, "base64"), {
      contentType: "image/png",
      public: true,
    });
    res.status(200).json({
      result: "OK",
      data: file.publicUrl(),
    });
  } else {
    console.error("Invalid method");
    res.status(400).json({
      error: "Invalid method",
    });
  }
}
