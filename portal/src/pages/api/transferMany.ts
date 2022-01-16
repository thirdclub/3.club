// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { ThirdwebSDK } from "@3rdweb/sdk";
// import { ethers } from "ethers";
// require("dotenv").config();


// type Response = {
//   result: string
// }

// //Instantiate 3rdweb SDK
// const sdk = new ThirdwebSDK(
//   new ethers.Wallet(
//       // Your wallet private key
//       process.env.PRIVATE_KEY as string,
//       // RPC URL
//       ethers.getDefaultProvider(process.env.NETWORK_RPC!)
//   )
// );

// // Instantiate NFT Collection module
// const nft = sdk.getNFTModule(process.env.SMART_CONTRACT!);

// async function transferOne(toAddr: string, tokenId: string) {
//   await nft.transfer(
//     toAddr,
//     tokenId
//   )
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Response>
// ) {
//   let { toTransfer } = req.body

//   // Running the entire thing
//   toTransfer.forEach((transfer: { toAddress: string; tokenId: string; }) => {
//     transferOne(transfer.toAddress, transfer.tokenId);
//   });
  
//   res.status(200).json({
//     result: `Transferring many NFTs`,
//   })
// }
