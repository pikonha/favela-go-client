# Favela Go Client

## Roadmap

- [ ] User
  - [ ] Read QR Code
    - [ ] Button `scan QR code`
  - [X] List NFTs
    - [X] list
    - [ ] map
  - [ ] NFT details
- [ ] Admin
  - [ ] Create a new NFT
    - [ ] map
    - [ ] image
    - [ ] name
    - [ ] enabled
  - [ ] List NFTs
  - [ ] Pause generation of new NFTs

## Features

- Separate packages from [ethers.js](https://docs.ethers.io/v5/) for improved tree-shaking, often only ethers Contracts
- Hooks-first approach to fetching and caching data from Contracts and memoization for performance with [SWR](https://swr.vercel.app)
- [web3-react](https://github.com/NoahZinsmeister/web3-react) for ease of connecting to Web3 providers with a solid API
- Auto-generates types for the contract ABIs in the `/contracts` folder via [TypeChain](https://github.com/ethereum-ts/TypeChain)

### Auto Contract Type Generation

**Note**: After adding in your new contract ABIs (in JSON format) to the `/contracts` folder, run `yarn compile-contract-types` to generate the types.

You can import these types when declaring a new Contract hook. The types generated show the function params and return types of your functions, among other helpful types. 

```ts
import MY_CONTRACT_ABI from "../contracts/MY_CONTRACT.json";
import type { MY_CONTRACT } from "../contracts/types";
import useContract from "./useContract";

export default function useMyContract() {
  return useContract<MY_CONTRACT>(CONTRACT_ADDRESS, MY_CONTRACT_ABI);
}
```
