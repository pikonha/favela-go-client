import axios from 'axios'

import { ERC20 } from "../contracts/types"
import { ipfsURL } from '../config'

const getUrl = (nftIpfsUrl) => {
  const [, ipfsId] = nftIpfsUrl.split('//')
  return `${ipfsURL}${ipfsId}`
}

async function getNftsFromAccount(contract: ERC20, account: string) {
  if (!contract) {
    return
  }
  const ids = await contract.getAllNftsIdsByAddress(account)
  const ipfsUrls = await Promise.all(ids.map(id => contract.tokenURI(id)))
  const nfts = await Promise.all(ipfsUrls.map(url => axios.get(getUrl(url))))
  return nfts.map((n, i) => ({
    url: n.data.image,
    name: n.data.name,
    descriptions: n.data.description,
    lat: n.data.lat,
    lng: n.data.lng,
    id: ids[i]
  }
  ))
}

export default {
  getNftsFromAccount
}
