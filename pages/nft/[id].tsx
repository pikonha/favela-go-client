import { BigNumber } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { contractHash } from '../../config'
import useTokenContract from "../../hooks/useTokenContract";
import QrGenerator from "../../components/QrGenerator";
import ipfs from "../../utils/ipfs";

import { isMinter } from "../../hooks/useIsMinter"

type NFT = {
  id: Number,
  name: String,
  description: String,
  extra_links: String[],
  hidden: Boolean,
  image: String,
  lat: Number,
  lng: Number,
}

export default function Nft() {
  const [nft, nftSet] = useState<NFT>()
  const contract = useTokenContract(contractHash)
  const [showQrCode, enableShowQrCode] = useState(false)

  const router = useRouter()

  const { query } = useRouter()
  const indexNft = BigNumber.from(query.id as String)

  useEffect(() => {
    const fetchNft = async () => {
      if (contract) {
        const nft = await ipfs.getNftById(contract, indexNft)
        nftSet(nft)
      }
    }
    fetchNft()
  }, [contract, router.query.id])

  function handleReturn() {
    return router.back()
  }

  if (!nft || !contract) {
    return <span>Loading...</span>
  }

  function generateQrCode() {
    enableShowQrCode(true)
  }

  function pauseNft() {
    console.log("pause nft")
    if (isMinter()) {
      console.log("its a minter")

      contract.updateItem(indexNft, String(nft.image), false)
    } else {
      console.log("not a minter")
    }
  }

  return (
    <>
      <div className="flex flex-col">

        {!showQrCode && (
          <div>
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
              {isMinter() && (
                <button onClick={generateQrCode}
                  className="shadow bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                  Gerar QR Code
                </button>
              )}
              {isMinter() && (
                <button onClick={pauseNft}
                  className="shadow bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                  Pausar
                </button>
              )}
              <button onClick={handleReturn}
                className="shadow bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Voltar
              </button>
            </div>
          </div>
        )}

        {showQrCode && (
          <div>
            <QrGenerator value={JSON.stringify(nft)}></QrGenerator>
            <button onClick={() => enableShowQrCode(false)}
              className="shadow bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              Fechar QR Code
            </button>
          </div>
        )}
      </div>
    </>
  )
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