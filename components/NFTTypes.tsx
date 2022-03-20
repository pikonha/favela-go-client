import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { ipfsURL } from "../config";
import ipfs from "../utils/ipfs"

export type NFTType = {
  image: String,
  canMint: Boolean,
  id: number,
  name: String,
  ipfsId: String
}

type NFTTypesListProps = {
  types: NFTType[],
  isAdmin?: Boolean
}

function NFTType({ name: _name, image: _image, canMint: _canMint, ipfsId: _ipfsId }: NFTType) {
  const router = useRouter()
  // console.log(_ipfsId)
  return (
    <a className="w-32 h-32 mx-auto rounded-md bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${_image})`,
      }}

      //onClick={() => router.push(`/nft/${id.toString()}`)}
      >
      <p>Nome: {_name}</p>
      <p>Habilitado: {_canMint ? "Sim" : "Não"}</p>
    </a>
    )
}

export default function NFTTypes({ types }: NFTTypesListProps) {
  return (
    <div className="grid mx-auto grid-cols-2 gap-4">
      {types.map((n, i) => (
        <NFTType key={i} image={ipfs.getUrlWithGateway(n.image)} name={n.name} id={n.id} ipfsId={n.ipfsId} canMint={n.canMint}/>
      ))}
    </div>
  )
}
