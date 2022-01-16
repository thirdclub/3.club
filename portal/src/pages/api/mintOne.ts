// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
require("dotenv").config();

// Define data structure
type Attribute = {
  trait_type: string, 
  value: any,
  display_type: any | null
}

type Metadata = {
  name: string,
  description: string,
  image: string,
  external_url: string | null,
  animation_url: string | null,
  attributes: [Attribute] | null
}


type Response = {
  result: string
}

//Instantiate 3rdweb SDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
      // Your wallet private key
      process.env.PRIVATE_KEY as string,
      // RPC URL
      ethers.getDefaultProvider(process.env.NETWORK_RPC!)
  )
);

// Instantiate NFT Collection module
const nft = sdk.getNFTModule(process.env.SMART_CONTRACT!);

async function mintOne(toAddr: string, metadata: Metadata) {
  await nft.mintTo(
    toAddr,
    metadata
  )
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let { toAddress, metadata } = req.body

  // Running the entire thing
  mintOne(toAddress, metadata);
  res.status(200).json({
    result: `Minting one NFT to ${toAddress}`,
  })
}
