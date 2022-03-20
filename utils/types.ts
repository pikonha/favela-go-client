import { BigNumber } from "ethers";

export interface NFT {
  id: BigNumber,
  name: String
  description: String,
  extra_links?: String[],
  hidden?: Boolean,
  image: String,
  lat: Number,
  lng: Number,
}