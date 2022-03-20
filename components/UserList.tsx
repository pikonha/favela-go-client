import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore, MdQrCodeScanner} from "react-icons/md";

import useTokenContract from "../hooks/useTokenContract";
import * as ipfs from "../utils/ipfs";
import CTAButton from "./CTAButton";
import NFTList from "./NFTList";
import QrReader from "./QrContainerReader";
import { contractHash } from '../config'
import { NFT } from "../utils/types";

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
  const [nftLen, nftLenSet] = useState(0)
  const [offset, offsetSet] = useState(0)
  const [limit] = useState(6)
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
    (async function() {
      nftLenSet(await ipfs.totalOfNftsByAccount(contract, account))
    })()
  }, [account, contract])

  useEffect(() => {
    (async function() {
      if (contract) {
        const nft = await ipfs.getNftsFromAccount(contract, account, limit, offset)
        nftsSet(nft)
      }
    })()
  }, [contract, account, limit, offset])

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-2 mt-2">
          {showButtonScanQr && (
            <CTAButton
              handleClick={openScanQRCode}
            >
              <div className="flex">
                <MdQrCodeScanner size={24} className="mr-2"/>
                Scan QR Code
              </div>
            </CTAButton>
          )}

          {!showButtonScanQr && (
            <CTAButton
              handleClick={closeQRCode}
            >
              Close QR Code
            </CTAButton>
          )}
        </div>

        <div className="flex items-center">
          {
            scanReaderEnabled && <QrReader
              contract={contract}
              address={account}
            />
          }
        </div>

        <div className="grid grid-cols-2 my-4">
          {offset != 0 ? (
            <MdOutlineNavigateBefore 
              size={36}
              onClick={() => offsetSet(offset => offset - limit) }
            />
          ) : <div className="w-8 h-8"/>}
          {offset + limit < nftLen && (
            <MdOutlineNavigateNext
              size={36}
              onClick={() => offsetSet(offset => offset + limit) }
            />
          )}
        </div>
        <NFTList nfts={nfts} />
      </div>
    </>
  )
}