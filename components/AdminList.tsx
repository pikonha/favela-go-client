import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {useRouter}  from 'next/router';

import useTokenContract from "../hooks/useTokenContract";
import useIPFS from "../hooks/useIpfs";
import NFTList, {NFT} from "./NFTList";
import CTAButton from "./CTAButton";

const nftAddress = "0xB9A7083C98278a0E3D236F1E5cCbD5A326D0b624"

export default function UserList() {
  const router = useRouter()
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

  return (
    <>
      <CTAButton value="Criar nova atração" handleClick={() => router.push("/admin/nft/new")} />
      <NFTList nfts={nfts} />
    </>
  )
}