import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {useRouter}  from 'next/router';

import { contractHash } from '../config'
import * as ipfs from "../utils/ipfs";
import NFTList, {NFT} from "./NFTList";
import CTAButton from "./CTAButton";
import useTokenContract from "../hooks/useTokenContract";
import NFTTypes, { NFTType } from "./NFTTypes";

export default function AdminList() {
  // const [nfts, nftsSet] = useState<NFT[]>([])
  const [types, typesSet] = useState<NFTType[]>([])
  const { account } = useWeb3React();
  const contract = useTokenContract(contractHash)
  const router = useRouter()

  useEffect(() => {
    async function awaitAccount() {
      if (contract) {
        // nftsSet(await ipfs.getNftsFromAccount(contract, account))
        // console.log(getTypes);
        const getTypes = await ipfs.getNftTypes(contract, account);
        typesSet(getTypes);
      }
    }
    awaitAccount()
  }, [contract, account])
  
  return (
    <>
      <CTAButton value="Criar nova atração" handleClick={() => router.push("/admin/nft/new")} />
      {/* <NFTList nfts={nfts} /> */}
      <NFTTypes types={types}/>
    </>
  )
}