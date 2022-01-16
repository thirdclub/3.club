import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Network, OpenSeaAPI } from "opensea-js";
import Database from "utils/database";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

const openSeaApi = new OpenSeaAPI({
  networkName: Network.Rinkeby,
});
const db = new Database();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getSession({ req });
    if (!session || !session.user || !session.user.ethAddress) {
      return res.status(400).json({
        error: "Invalid request",
      });
    }
    const { user } = session;
    const { qr } = req.body;
    const qrData = JSON.parse(Buffer.from(qr, "base64").toString());
    const contractAddress = qrData.contractAddress;
    const assets = await openSeaApi.getAssets({
      owner: session.user.ethAddress,
      asset_contract_address: contractAddress,
    });
    if (assets.assets.length > 0) {
      db.createScanRecord({
        userId: user.id,
        eventId: qrData.eventId,
        asset: {
          tokenId: assets.assets[0].tokenId,
          tokenAddress: assets.assets[0].tokenAddress,
          image: assets.assets[0].imageUrl,
          owner: assets.assets[0].owner,
        },
        date: Date.now(),
      });
    }
    res.status(200).json({
      result: "OK",
      data: assets.assets,
    });
  } else {
    console.error("Invalid method");
    res.status(400).json({
      error: "Invalid method",
    });
  }
}
