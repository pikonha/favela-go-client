import {useEffect, useState} from "react"
import useTokenContract from "./useTokenContract";

let addrIsMinter = false;

export default function useIsMinter(account: string, contractAddress: string): Boolean {
  const contract = useTokenContract(contractAddress)
  const [minter, setMinter] = useState(false)

  useEffect(() => {
    const fetchIsMinter = async () => {
      if (contract) {
        const minterRole = await contract.MINTER_ROLE()
        const isMinter = await contract.hasRole(minterRole, account)
        addrIsMinter = isMinter
        return isMinter
      }
    }
    fetchIsMinter().then(setMinter)
  }, [account, contract])

  return minter
}

export function isMinter() {
  return addrIsMinter
}
