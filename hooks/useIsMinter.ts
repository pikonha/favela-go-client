import {useMemo} from "react"
import { useWeb3React } from "@web3-react/core";
import useTokenContract from "./useTokenContract";

export default function useIsMinter(contractAddress: string): Promise<Boolean> {
  const { account } = useWeb3React();
  const contract = useTokenContract(contractAddress)

  return useMemo(async () => {
    if (contract) {
      const minterRole = await contract.MINTER_ROLE()
      const isMinter = await contract.hasRole(minterRole, account)
      return isMinter
    }
  }, [account, contract])
}
