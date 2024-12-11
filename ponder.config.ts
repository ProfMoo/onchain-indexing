import { createConfig } from "@ponder/core";
import { http } from "viem";

import { CoinbaseCloudOperatorABI } from "./abis/CoinbaseCloudOperatorABI";

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    OperatorContract: {
      network: "mainnet",
      abi: CoinbaseCloudOperatorABI,
      // Proxy contract code (this one actually works). Turns out we're supposed to use the proxy!
      // https://etherscan.io/address/0x8a113da63f02811e63c1e38ef615df94df5d9e70
      address: "0x8a113da63f02811e63c1e38ef615df94df5d9e70",
      // This is the block the operator contract was deployed at.
      // We don't need to index information before this block, so we start here.
      // https://etherscan.io/tx/0xea9146c07bde2ead0fc9ab4066ced495088417a4d5487e6d84704853d753fe27
      startBlock: 17785573,
    },
  },
});
