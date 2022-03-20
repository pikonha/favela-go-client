import axios from "axios";
import { BigNumber } from "ethers";

import { ERC20 } from "../contracts/types";
import { ipfsURL } from "../config";

const getUrl = (nftIpfsUrl) => {
  const [, ipfsId] = nftIpfsUrl.split("//");
  return ipfsId;
};

async function getNftsFromAccount(contract: ERC20, account: string) {
  if (!contract) {
    return;
  }
  const ids = await contract.getAllNftsIdsByAddress(account);
  const ipfsUrls = await Promise.all(ids.map((id) => contract.tokenURI(id)));
  const nfts = await Promise.all(
    ipfsUrls.map((url) => axios.get(`${ipfsURL}/${getUrl(url)}`))
  );
  return nfts.map((n, i) => ({
    url: n.data.image,
    name: n.data.name,
    descriptions: n.data.description,
    lat: n.data.lat,
    lng: n.data.lng,
  }));
}

async function getNftById(contract: ERC20, id: BigNumber) {
  if (!contract) {
    return;
  }

  const tokenUri = await contract.tokenURI(id);
  const nftRes = await axios.get(`${ipfsURL}/${getUrl(tokenUri)}`);
  return nftRes.data;
}

export default {
  getNftsFromAccount,
  getNftById,
};
