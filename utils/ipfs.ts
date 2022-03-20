import axios from "axios";
import { BigNumber } from "ethers";

import { NFT } from "../utils/types";
import { ERC20 } from "../contracts/types";
import { ipfsURL } from "../config";

const getUrl = (nftIpfsUrl) => {
  const [_, ipfsId] = nftIpfsUrl.split("//");
  if (!ipfsId) return nftIpfsUrl;
  return ipfsId;
};

async function totalOfNftsByAccount(contract: ERC20, account: string) {
  if (!contract) return 0;
  return Number(await contract.balanceOf(account));
}

async function getNftsByIds(
  contract: ERC20,
  ids: BigNumber[],
  limit: number = 10,
  offset: number = 0
): Promise<NFT[] | null> {
  if (!contract) {
    return;
  }
  ids = ids.slice(offset, offset + limit);
  const ipfsUrls = await Promise.all(ids.map((id) => contract.tokenURI(id)));
  const nfts = await Promise.all(
    ipfsUrls.map((url) => axios.get<NFT>(getUrlWithGateway(getUrl(url))))
  );
  return nfts.map(({ data }, i) => ({ 
    ...data,
    id: ids[i],
    image: getUrlWithGateway(data.image)
  }));
}

async function getNftById(contract: ERC20, id: BigNumber) {
  if (!contract) {
    return;
  }
  const tokenUri = await contract.tokenURI(id);
  const nftRes = await axios.get(`${getUrlWithGateway(tokenUri)}`);
  return {...nftRes.data, image: getUrlWithGateway(nftRes.data.image)};
}

function getUrlWithGateway(tokenUri) {
  return `${ipfsURL}/${getUrl(tokenUri)}`;
}

export default {
  getNftsByIds,
  getNftById,
  totalOfNftsByAccount,
  getUrlWithGateway,
};
