import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {useRouter}  from 'next/router';

import { contractHash } from '../config'
import ipfs from "../utils/ipfs";
import NFTList from "./NFTList";
import CTAButton from "./CTAButton";
import useTokenContract from "../hooks/useTokenContract";
import { NFT } from "../utils/types";

export default function AdminList() {
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();
  const contract = useTokenContract(contractHash)
  const router = useRouter()

  useEffect(() => {
    async function awaitAccount() {
      if (contract) {
        const nfts = await ipfs.getNftsFromAccount(contract, account)
        if (nfts) nftsSet(nfts)
      }
    }
    awaitAccount()
  }, [contract, account])
  
  return (
    <>
      <CTAButton handleClick={() => router.push("/admin/nft/new")}>
        Criar nova atração
      </CTAButton>
      <NFTList nfts={nfts} />
    </>
  )
}