import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {useRouter}  from 'next/router';
import ReactLoading from 'react-loading';

import { contractHash } from '../config'
import ipfs from "../utils/ipfs";
import CTAButton from "./CTAButton";
import useTokenContract from "../hooks/useTokenContract";
import NFTList from "./NFTList";
import {NFT} from "../utils/types";

export default function AdminList() {
  const [loading, loadingSet] = useState(true)
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();
  const contract = useTokenContract(contractHash)
  const router = useRouter()

  useEffect(() => {
    async function awaitAccount() {
      if (contract) {
        loadingSet(true)
        const nfts = await ipfs.getNftTemplates(contract)
        if (nfts) nftsSet(nfts);
        loadingSet(false)
      }
    }
    awaitAccount()
  }, [contract, account])

  if (loading) {
    return <ReactLoading type={"spinningBubbles"} color={"#D33DD6"} height={50} width={50} />
  }
  
  return (
    <>
      <CTAButton handleClick={() => router.push("/admin/nft/new")}>
        Criar nova atração
      </CTAButton>
      <NFTList nfts={nfts} />
    </>
  )
}