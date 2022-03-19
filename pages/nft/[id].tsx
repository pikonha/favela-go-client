import { BigNumber } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { contractHash } from '../../config'
import useTokenContract from "../../hooks/useTokenContract";
import ipfs from "../../utils/ipfs";
import { NFT } from "../../utils/types";


export default function Nft() {
  const [nft, nftSet] = useState<NFT>()
  const contract = useTokenContract(contractHash)

  const {query} = useRouter()

  useEffect(() => {
    const fetchNft = async () => {
      if(contract){
        const nft = await ipfs.getNftById(contract, BigNumber.from(query.id as String))
        nftSet(nft)
      }
    }
    fetchNft()
  }, [contract, query.id])

  if (!nft || !contract) {
    return <span>Loading...</span>
  }

  return (
    <div className="flex flex-col">
      <div className="min-h-64">
        <div
          className="h-64 w-64 mx-auto rounded-md bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(${nft.image})`
          }}
        />
      </div>
      <div className="min-h-64 w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
        <div className="flex">
          <h3 className="font-semibold text-lg leading-tight truncate mr-2">{nft.name}</h3>
          <span>
            #{nft.id}
          </span>
        </div>
        <p className="text-sm text-gray-600 tracking-wide font-semibold mt-2">
          {nft.description}
        </p>
      </div>
      <div className="max-w-4/5 mx-auto flex">
        <button className="shadow bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
          Voltar
        </button>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
      paths: [],
      fallback: 'blocking'
  }
}