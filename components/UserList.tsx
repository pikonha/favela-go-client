import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import useTokenContract from "../hooks/useTokenContract";
import ipfs from "../utils/ipfs";
import CTAButton from "./CTAButton";
import NFTList, { NFT } from "./NFTList";
import QrReader from "./QrContainerReader";

import { contractHash } from '../config'

export default function UserList() {
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();
  const [scanReaderEnabled, scanReaderEnabledSet] = useState(false)
  const [showButtonScanQr, setShowButtonScanQr] = useState(true)
  const contract = useTokenContract(contractHash)

  function openScanQRCode() {
    setShowButtonScanQr(false)
    return scanReaderEnabledSet(true)
  }

  function closeQRCode() {
    setShowButtonScanQr(true)
    return scanReaderEnabledSet(false)
  }

  useEffect(() => {
    async function awaitAccount() {
      if (contract) {
        const nft = await ipfs.getNftsFromAccount(contract, account)
        nftsSet(nft)
      }
    }
    awaitAccount()
  }, [contract, account])

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-2 mt-2">
          {showButtonScanQr && (
            <CTAButton value="Scan QR Code"
              handleClick={openScanQRCode}
            />
          )}

          {!showButtonScanQr && (
            <CTAButton value="Close QR Code"
              handleClick={closeQRCode}
            />
          )}
        </div>

        <div className="flix items-center">
          {
            scanReaderEnabled && <QrReader
              contract={contract}
              address={account}
            />
          }
        </div>

        <NFTList nfts={nfts} />
      </div>
    </>
  )
}