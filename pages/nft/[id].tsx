import { BigNumber } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import saveSvgAsPng from 'save-svg-as-png'
import { MdQrCodeScanner} from "react-icons/md";

import { contractHash } from '../../config'
import useTokenContract from "../../hooks/useTokenContract";
import QrGenerator from "../../components/QrGenerator";
import ipfs from "../../utils/ipfs";
import { isMinter } from "../../hooks/useIsMinter"
import { NFT } from "../../utils/types";

export default function Nft() {
  const [nft, nftSet] = useState<NFT>()
  const contract = useTokenContract(contractHash)
  const [showQrCode, enableShowQrCode] = useState(false)

  const router = useRouter()

  const { query } = useRouter()
  const idNft = BigNumber.from(query.id as String)

  useEffect(() => {
    const fetchNft = async () => {
      if (contract) {
        const nft = await ipfs.getNftById(contract, idNft)
        nftSet(nft)
      }
    }
    fetchNft()
  }, [contract, idNft])

  function handleReturn() {
    return router.back()
  }

  if (!nft || !contract) {
    return <span>Loading...</span>
  }

  function generateQrCode() {
    enableShowQrCode(true)
  }
  
  function getIdQrCode() {
    return `qrcode-${nft.id}`
  }

  function downloadImage() {
    const idSvg = getIdQrCode()
    const svgElement = document.getElementById(idSvg);
    
    const imageOptions = {
      scale: 4,
      encoderOptions: 1,
      backgroundColor: 'white',
    }
    saveSvgAsPng.saveSvgAsPng(svgElement, `${idSvg}.png`, imageOptions)
  }

  function pauseNft() {
    if (isMinter()) {
      contract.updateItem(nft.id, String(nft.image), false)
    }
  }

  function serializeNft() : string{
    const {id,lat,lng} = nft
    return JSON.stringify({id,lat,lng})
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="mx-auto mt-6 h-64 w-64">
          {showQrCode ? (
            <QrGenerator id={getIdQrCode()} value={serializeNft()}></QrGenerator>
          ): (
            <div
              className="mx-auto rounded-md bg-cover bg-top bg-no-repeat h-full w-full"
              style={{
                backgroundImage: `url(${nft.image})`
              }}
            />
          )}
        </div>
        <div className="min-h-64 w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <div className="flex">
            <h3 className="font-semibold text-lg leading-tight truncate mr-2">{nft.name}</h3>
            <span>
              #{nft.id}
            </span>
          </div>
          <p className="text-sm text-gray-600 tracking-wide font-semibold mt-2 break-words">
            {nft.description}
          </p>
        </div>

        <div className="bottom-0 w-full py-4 shadow-lg z-10 absolute bg-blue-50 rounded-lg">
          {isMinter() ? (
            <div className="grid grid-cols-2 grid-rows-2 w-4/5 mx-auto gap-3">
              {showQrCode ? (
                <>
                  <button
                    onClick={downloadImage}
                    className="shadow bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Download Image
                  </button>
                  <button onClick={() => enableShowQrCode(false)}
                    className="shadow bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Fechar QR Code
                  </button>
                </>
              ) : (
                <button onClick={generateQrCode}
                  className="flex items-center justify-center shadow bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded col-span-2">
                  <MdQrCodeScanner size={24} className="mr-2"/>
                  Gerar QR Code
                </button>
              )}
              
              <button onClick={pauseNft}
                className="shadow bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Pausar
              </button>
              <button onClick={handleReturn}
                className="shadow bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Voltar
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button onClick={handleReturn}
                className="shadow bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Voltar
              </button>
            </div>
          )}
        </div>
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