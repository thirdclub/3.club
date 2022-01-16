import axios from "axios";
import Config from "config/config";
import { FC } from "react";
import { getEIP4361Message } from "utils/web3-utils";
import WalletLink from "walletlink";
import ConnectButton from "./ConnectButton";

const CoinbaseButton: FC<{
  onSuccess: (data: any) => void;
  setLoading: (loading: boolean) => void;
}> = (props) => {
  const { onSuccess, setLoading } = props;

  async function connect() {
    try {
      setLoading(true);
      const walletLink = new WalletLink({
        appName: Config.appName,
        appLogoUrl: `${window.location.protocol}//${window.location.hostname}/favicon.ico`,
      });
      const provider = walletLink.makeWeb3Provider(
        `https://mainnet.infura.io/v3/${Config.infuraId}`,
        1
      );
      const accounts = await provider.send("eth_requestAccounts");
      const message = getEIP4361Message({
        domain: window.location.hostname,
        address: accounts[0],
        uri: window.location.href,
        chainId: 1,
      });
      const signed = await provider.send("personal_sign", [
        message,
        accounts[0],
      ]);
      const reponse = await axios.post("/api/auth/connect", {
        provider: "coinbase",
        message: message,
        signed: signed,
      });
      walletLink.disconnect();
      onSuccess(reponse.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConnectButton iconSrc="/img/ic_coinbase.png" onClick={connect}>
      Coinbase
    </ConnectButton>
  );
};

export default CoinbaseButton;
