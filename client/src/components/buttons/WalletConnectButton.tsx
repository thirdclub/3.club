import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import axios from "axios";
import ConnectButton from "components/buttons/ConnectButton";
import { FC } from "react";
import { getEIP4361Message } from "utils/web3-utils";

const WalletConnectButton: FC<{
  onSuccess: (data: any) => void;
  setLoading: (loading: boolean) => void;
}> = (props) => {
  const { onSuccess, setLoading } = props;

  async function connect() {
    try {
      const provider = new WalletConnectProvider({
        onLoading: () => setLoading(true),
      });
      const result = await provider.connectUser(
        window.location.hostname,
        window.location.href
      );
      await provider.disconnect();
      onSuccess(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConnectButton iconSrc="/img/ic_walletconnect.png" onClick={connect}>
      WalletConnect
    </ConnectButton>
  );
};

export default WalletConnectButton;

class WalletConnectProvider {
  constructor(params: { onLoading?: () => void }) {
    this.address;
    this.onLoading = params.onLoading ?? this.onLoading;
  }

  connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: {
      open: QRCodeModal.open,
      close: QRCodeModal.close,
    },
  });

  address = this.connector.accounts[0];
  onLoading = () => {};

  async connect(): Promise<string> {
    if (this.connector.connected) {
      return Promise.resolve(this.connector.accounts[0]);
    } else {
      return new Promise((resolve, reject) => {
        this.connector.createSession();
        this.connector.on("connect", async (error, payload) => {
          if (error) {
            reject(error);
          }
          this.address = payload.params[0].accounts[0];
          resolve(payload.params[0].accounts[0]);
        });
      });
    }
  }

  async disconnect(): Promise<void> {
    return this.connector.killSession();
  }

  async signMessage(message: string): Promise<string> {
    if (!this.connector.connected) {
      await this.connect();
    }
    return this.connector.signPersonalMessage([message, this.address]);
  }

  async connectUser(domain: string, uri: string): Promise<Object> {
    if (!this.connector.connected) {
      await this.connect();
    }
    this.onLoading();
    const message = getEIP4361Message({
      domain: domain,
      address: this.address,
      uri: uri,
      chainId: 1,
    });
    const signed = await this.signMessage(message);
    const response = await axios.post("/api/auth/connect", {
      provider: "walletconnect",
      message: message,
      signed: signed,
    });
    return response.data;
  }
}
