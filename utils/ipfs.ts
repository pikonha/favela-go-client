import axios from 'axios'

import { ERC20 } from "../contracts/types"

const IPFS_URL = "https://ipfs.io/ipfs/"
const getUrl = (nftIpfsUrl) => {
  const [,ipfsId] = nftIpfsUrl.split('//')
  return `${IPFS_URL}${ipfsId}`
}

async function getNftsFromAccount(contract: ERC20, account: string) {
  if (!contract) {
    return
  }
  const ids = await contract.getAllNftsIdsByAddress(account)
  const ipfsUrls = await Promise.all(ids.map(id => contract.tokenURI(id)))
  const nfts = await Promise.all(ipfsUrls.map(url => axios.get(getUrl(url))))
  return nfts.map((n,i) => ({
      url: n.data.image,
      id: ids[i]
    }
  ))
}

export default {
  getNftsFromAccount
}
