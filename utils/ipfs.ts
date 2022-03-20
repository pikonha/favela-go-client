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

async function getNftById(contract: ERC20, id: BigNumber) : Promise<NFT|null>{
  if (!contract) {
    return;
  }
  const tokenUri = await contract.tokenURI(id);
  const nftRes = await axios.get(`${getUrlWithGateway(tokenUri)}`);
  return {...nftRes.data, image: getUrlWithGateway(nftRes.data.image)};
}

async function getNftTypes(contract: ERC20) {
  if (!contract) {
    return;
  }
  const ids = await contract.getAllItems();
  const nftTypes = await Promise.all(
    ids.map((x) => {
      return axios.get(`${getUrlWithGateway(x.ipfsId)}`);
    })
  );

  return nftTypes.map((n, i) => ({
    image: getUrlWithGateway(n.data.image),
    name: n.data.name,
    ipfsId: ids[i].ipfsId,
    canMint: ids[i].canMint,
    id: ids[i].id,
    lat : n.data.lat,
    lng : n.data.lng,
    description: n.data.description
  }));
}

function getUrlWithGateway(tokenUri) {
  return `${ipfsURL}/${getUrl(tokenUri)}`;
}

export default {
  getNftsByIds,
  getNftById,
  totalOfNftsByAccount,
  getUrlWithGateway,
  getNftTypes,
};
