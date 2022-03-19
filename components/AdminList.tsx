import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {useRouter}  from 'next/router';

import useTokenContract from "../hooks/useTokenContract";
import useIPFS from "../hooks/useIpfs";
import CTAButton from "./CTAButton";

import NFTList, { NFT } from "../components/NFTList";
import { contractHash } from '../config'

export default function UserList() {
  const router = useRouter()
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();

  const contract = useTokenContract(contractHash)
  const IPFS = useIPFS()

  useEffect(() => {
    async function awaitAccount() {
      if (contract) nftsSet(await IPFS.getNftsFromAccount(contract, account))
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