export function getEIP4361Message(params: {
  domain: string;
  address: string;
  uri: string;
  chainId: number;
}): string {
  const { domain, address, uri, chainId } = params;
  return `${domain} wants you to sign in with your Ethereum account:
${address}

URI: ${uri}
Version: 1
Chain ID: ${chainId}
Nonce: ${Math.random().toString(36).slice(-8)}
Issued At: ${new Date().toISOString()}`;
}

export function shortenAddress(address: string, chars = 6): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function uint8ArrayToHex(value: Uint8Array): string {
  return [...value].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function hexStringToUint8Array(hexString: String): Uint8Array {
  return new Uint8Array(
    hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
}
