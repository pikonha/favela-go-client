import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import useTokenContract from "../hooks/useTokenContract";
import * as ipfs from "../utils/ipfs";
import CTAButton from "./CTAButton";
import NFTList, { NFT } from "./NFTList";
import QrReader from "./QrContainerReader";

import { contractHash } from '../config'

// https://ipfs.io/ipfs/QmefQCqppvDHV493UL4BJcYQLaQB95svrqoEmkbXaT88vy
// https://ipfs.io/ipfs/QmSAUijdrmNL8AcV7P5Doxef2STtsoMyJix4deDxLGwpPC
// https://ipfs.io/ipfs/QmdFyFJAvDKxdwqEB5dd639vh8whtgKisauAou1b7Acwop
// https://ipfs.io/ipfs/QmS4H8uBtikXz6v1EVdStiiFJ5C1751G8XKV3enW9Vy1zn
// https://ipfs.io/ipfs/QmWyHYudT7ZwSV558R2Rer3NonJzPpPtexf9bMpAE9vxCf
// https://ipfs.io/ipfs/QmRbbP2BdJbQoNEJK4pwVpA5adRnRdk8hg8ioD5VqYgN21
// https://ipfs.io/ipfs/QmTcPJk1QqBsTPvRUvZWH9nJTGm7EpxECyT3yGm7qqZnGX
// https://ipfs.io/ipfs/QmPTczGRCDDrrXMhzmHrLW5tZy2yMs2EDBtT7MKgt9zstz
// https://ipfs.io/ipfs/QmYJ71Eck4Df2iFZsuhjmtsRP6F1tVimYsgf4wBhoCeTPz
// https://ipfs.io/ipfs/QmXuHwS9wAqSyDKkLG4n5CPLr2cRjMHGck5F9xNno5DLMZ

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