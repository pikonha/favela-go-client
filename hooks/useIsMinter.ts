import {useEffect, useMemo, useState} from "react"
import useTokenContract from "./useTokenContract";

export default function useIsMinter(account: string, contractAddress: string): Boolean {
  const [isMinter, isMinterSet] = useState(false)
  const contract = useTokenContract(contractAddress)

  useEffect(() => {
    const fetchIsMinter = async () => {
      if (contract) {
        const minterRole = await contract.MINTER_ROLE()
        const isMinter = await contract.hasRole(minterRole, account)
        return isMinter
      }
    }
    fetchIsMinter().then(isMinterSet)
  }, [account, contract])

  return isMinter
}
