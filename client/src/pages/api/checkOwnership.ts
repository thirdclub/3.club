import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Network, OpenSeaAPI } from "opensea-js";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

const openSeaApi = new OpenSeaAPI({
  networkName: Network.Rinkeby,
});

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
    const { contractAddress } = req.body;
    const address = session.user.ethAddress;
    const assets = await openSeaApi.getAssets({
      owner: address,
      asset_contract_address: contractAddress,
    });
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
