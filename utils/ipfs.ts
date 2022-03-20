import axios from "axios";
import { BigNumber } from "ethers";

import { ERC20 } from "../contracts/types";
import { ipfsURL } from "../config";

const getUrl = (nftIpfsUrl) => {
  const [_, ipfsId] = nftIpfsUrl.split("//");
  return ipfsId;
};

async function getNftsFromAccount(contract: ERC20, account: string) {
  if (!contract) {
    return;
  }
  const ids = await contract.getAllNftsIdsByAddress(account);
  const ipfsUrls = await Promise.all(
    ids.map(async (id) => {
      var uri = await contract.tokenURI(id);
      return uri;
    })
  );
  const nfts = await Promise.all(
    ipfsUrls.map((url) => axios.get(`${getUrlWithGateway(url)}`))
  );
  return nfts.map((n, i) => ({
    image: n.data.image,
    name: n.data.name,
    id: i,
    // descriptions: n.data.description,
    // lat: n.data.lat,
    // lng: n.data.lng,
  }));
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

  console.log(nftTypes);

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
  const ipfsId = getUrl(tokenUri);
  const returnString = `${ipfsURL}/${ipfsId}`;
  console.log(returnString == "https://ipfs.io/ipfs/ipfs:");
  return returnString;
}

export { getNftsFromAccount, getNftById, getNftTypes, getUrlWithGateway };
