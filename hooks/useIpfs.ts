// import { create } from "ipfs-http-client";
import axios from 'axios'

import { ERC20 } from "../contracts/types"

export default function useIPFS() {
  // const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' });
  const urlGatewayIPFS = "https://ipfs.io/ipfs/"

  const getUrl = (nftIpfsUrl) => {
    const [,ipfsId] = nftIpfsUrl.split('//')
    return `${urlGatewayIPFS}${ipfsId}`
  }

  async function getNftsFromAccount(contract: ERC20, account: string) {
    const ids = await contract.getAllNftsIdsByAddress(account)
    const ipfsUrls = await Promise.all(ids.map(id => contract.tokenURI(id)))
    const nfts = await Promise.all(ipfsUrls.map(url => axios.get(getUrl(url))))
    return nfts.map((n,i) => ({
        url: n.data.image,
        id: ids[i]
      }
    ))
  }

  return {
    getNftsFromAccount
  }
}