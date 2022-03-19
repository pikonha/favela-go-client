import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import useTokenContract from "../hooks/useTokenContract";
import useIPFS from "../hooks/useIpfs";
import CTAButton from "./CTAButton";
import NFTList, { NFT } from "../components/NFTList";
import QrReader from "./QrContainerReader";

import { contractHash } from '../config'

export default function UserList() {
  const [nfts, nftsSet] = useState<NFT[]>([])
  const { account } = useWeb3React();
  const [scanReaderEnabled, scanReaderEnabledSet] = useState(false)

  const contract = useTokenContract(contractHash)
  const IPFS = useIPFS()

  function openScanQRCode() {
    return scanReaderEnabledSet(true)
  }

  function closeQRCode() {
    return scanReaderEnabledSet(false)
  }

  useEffect(() => {
    async function awaitAccount() {
      if (contract) nftsSet(await IPFS.getNftsFromAccount(contract, account))
    }
    awaitAccount()
  }, [contract, account, IPFS])

  return (
    <>
      <div className="flex flex-col items-center">
        User
        <div className="mb-2 mt-2">
          <CTAButton value="Scan QR Code"
            handleClick={openScanQRCode}
          />

          <CTAButton value=" Close QR Code"
            handleClick={closeQRCode}
          />
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