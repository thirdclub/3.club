import { NextApiRequest, NextApiResponse } from "next"
var Web3 = require('web3');
var web3 = new Web3(process.env.ETH_MAINNET_RPC || Web3.givenProvider);

type Data = {
  status: number,
  result: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    web3.eth.ens.getAddress(req.body.ensName).then(function (result: any) {
        res.status(200).json({
            status: 200,
            result: { pubkey: result }
        })
    });
    res.status(400).json({
        status: 400,
        result: {
            "error": "Cant find address under this ens domain"
        }
    })
}
