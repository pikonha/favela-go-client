import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import useTokenContract from "../hooks/useTokenContract";
import useIPFS from "../hooks/useIpfs";
import NFTList, {NFT} from "../components/NFTList";

const nftAddress = "0xB9A7083C98278a0E3D236F1E5cCbD5A326D0b624"

export default function UserList() {
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();
  
  const contract = useTokenContract(nftAddress)
  const IPFS = useIPFS()
  
  useEffect(() => {
    async function awaitAccount() {
      if (contract) nftsSet(await IPFS.getNftsFromAccount(contract,account))
    }
    awaitAccount()
  }, [contract, account, IPFS])

  function handleScanQRCode() {

  }

  return (
    <div className="flex flex-col items-center">
      <button 
        className="bg-green-100 px-4 py-2 rounded-md"
        onClick={handleScanQRCode}
      >
        Scan QR Code
      </button>
      <NFTList nfts={nfts} />
    </div>
  )
}