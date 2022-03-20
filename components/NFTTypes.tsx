import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import * as ipfs from "../utils/ipfs"

export type NFTType = {
  id: number,
  ipfsId: String,
  canMint: Boolean,
}

type NFTTypesListProps = {
  types: NFTType[],
  isAdmin?: Boolean
}

function NFTType({ ipfsId: _ipfsId, canMint: _canMint }: NFTType) {
  const router = useRouter()
  return (
    <a className="w-32 h-32 mx-auto rounded-md bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${_ipfsId})`,
      }}

      //onClick={() => router.push(`/nft/${id.toString()}`)}
      >
      <p>Habilitado: {_canMint}</p>
    </a>
    )
}

export default function NFTTypes({ types }: NFTTypesListProps) {
  return (
    <div className="grid mx-auto grid-cols-2 gap-4">
      {types.map((n, i) => (
        <NFTType key={i} ipfsId={ipfs.getUrlWithGateway(n.ipfsId)} id={n.id} canMint={n.canMint}/>
      ))}
    </div>
  )
}
