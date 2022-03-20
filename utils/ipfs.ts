import axios from "axios";
import { BigNumber } from "ethers";

import { NFT } from "../utils/types";
import { ERC20 } from "../contracts/types";
import { ipfsURL } from "../config";

const getUrl = (nftIpfsUrl) => {
  const [_, ipfsId] = nftIpfsUrl.split("//");
  if (ipfsId == undefined) return nftIpfsUrl;
  return ipfsId;
};

async function totalOfNftsByAccount(contract: ERC20, account: string) {
  if (!contract) return 0;
  return Number(await contract.balanceOf(account));
}

async function getNftsFromAccount(
  contract: ERC20,
  account: string,
  limit: number = 10,
  offset: number = 0
): Promise<NFT[] | null> {
  if (!contract) {
    return;
  }
  let ids = await contract.getAllNftsIdsByAddress(account);
  ids = ids.slice(offset, offset + limit);
  const ipfsUrls = await Promise.all(ids.map((id) => contract.tokenURI(id)));
  const nfts = await Promise.all(
    ipfsUrls.map((url) => axios.get<NFT>(`${ipfsURL}/${getUrl(url)}`))
  );
  return nfts.map(({ data }, i) => ({ ...data, id: ids[i] }));
}

async function getNftTypes(contract: ERC20, account: string) {
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
    image: n.data.image,
    name: n.data.name,
    ipfsId: ids[i].ipfsId,
    canMint: ids[i].canMint,
    id: i,
  }));
}

async function getNftById(contract: ERC20, id: BigNumber) {
  if (!contract) {
    return;
  }
  const tokenUri = await contract.tokenURI(id);
  const nftRes = await axios.get(`${getUrlWithGateway(tokenUri)}`);
  return nftRes.data;
}

function getUrlWithGateway(tokenUri) {
  return `${ipfsURL}/${getUrl(tokenUri)}`;
}

export default {
  getNftsFromAccount,
  getNftById,
  totalOfNftsByAccount,
  getUrlWithGateway,
};
