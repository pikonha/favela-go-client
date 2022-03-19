import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";

import useTokenContract from "../../hooks/useTokenContract";
import useIsMinter from "../../hooks/useIsMinter";
import useIPFS from "../../hooks/useIpfs";

const nftAddress = ""


function NFTCard({url}) {
  function handleClick() {

  }

  // TODO: description page
  return (
    <a className="w-32 h-32 mx-auto rounded-md bg-cover bg-top bg-no-repeat"
      // onClick={handleClick}
      // href={}
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
    </a>
  )
}

type NFT = {
  url: String,
  id: BigNumber,
}

export default function NFTList() {
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();
  // const isMinter = useIsMinter(nftAddress)
  const contract = useTokenContract(nftAddress)
  const IPFS = useIPFS()
  
  useEffect(() => {
    async function awaitAccount() {
      if (contract) nftsSet(await IPFS.getNftsFromAccount(contract,account))
    }
    awaitAccount()
  }, [contract, account, IPFS])

  return (
    <div className="flex items-center flex-wrap w-4/5 mx-auto gap-4">
      {nfts.map((n, i) => (
        <NFTCard key={i} url={n.url}/>
      ))}
    </div>
  )
}