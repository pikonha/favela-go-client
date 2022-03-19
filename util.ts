import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function pinataCreds() {
  return {
    pinata_api_key: String(process.env.API_Key),
    pinata_secret_api_key: String(process.env.API_Secret),
  };
}

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
