import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import ipfs from "../utils/ipfs";
import useIsMinter from "../hooks/useIsMinter";
import AdminList from "../components/AdminList";
import UserList from "../components/UserList";
import useTokenContract from "../hooks/useTokenContract";
import { NFT } from "../components/NFTList";

const NFT_ADDRESS = "0xB9A7083C98278a0E3D236F1E5cCbD5A326D0b624"

function Home() {
  const [nfts, nftsSet] = useState<NFT[]>()
  // const isMinter = useIsMinter(account, process.env.NFT_ADDRESS)
  
  const { account, library } = useWeb3React()
  const contract = useTokenContract(NFT_ADDRESS)  
  const isConnected = typeof account === "string" && !!library

  useEffect(() => {
    const fetchNfts = async () => {      
      const nfts = await ipfs.getNftsFromAccount(contract,account)
      nftsSet(nfts)
    }
    fetchNfts()
  }, [contract, account])

  return (
    <div className="flex flex-col items-center gap-8">
      {isConnected && (
        <AdminList nfts={nfts}/>
        /* // (isMinter && <AdminList />) || (!isMinter && <UserList />) */
      )}
    </div>
  );
}

export default Home;
