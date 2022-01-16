import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
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
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(400).json({
      error: "Invalid request",
    });
  }
  let { toAddress, name, description, image, imageUrl } = req.body;

  let url = imageUrl;
  if (image) {
    const file = storage.bucket().file(`${uuidv4()}.png`);
    await file.save(Buffer.from(image, "base64"), {
      contentType: "image/png",
      public: true,
    });
    url = file.publicUrl();
  }

  await db.createPass({
    toAddress: toAddress,
    contractAddress: process.env.SMART_CONTRACT!,
    name: name,
    description: description,
    image: url,
    id: uuidv4(),
    userId: session.user.id,
    mintStatus: "pending",
    createdAt: Date.now(),
  });
  res.status(200).json({
    result: "Minting",
  });
}

type Attribute = {
  trait_type: string;
  value: string;
  display_type?: string;
};

type Metadata = {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  animation_url?: string;
  attributes?: Attribute[];
};

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY!,
    ethers.getDefaultProvider(process.env.NETWORK_RPC!)
  )
);

const nft = sdk.getNFTModule(process.env.SMART_CONTRACT!);

async function mintOne(toAddr: string, metadata: Metadata) {
  await nft.mintTo(toAddr, metadata);
}
