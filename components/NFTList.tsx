import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { getUrlWithGateway } from "../utils/ipfs"

export type NFT = {
  image: String,
  name: String,
  id : number
}

type NFTListProps = {
  nfts: NFT[],
  isAdmin?: Boolean
}

function NFTCard({ image: url, id }: NFT) {
  const router = useRouter()
  return (
    <a className="w-32 h-32 mx-auto rounded-md bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${url})`,
      }}
      onClick={() => router.push(`/nft/${id.toString()}`)}
    >
    </a>
  )
}

export default function NFTList({ nfts }: NFTListProps) {
  return (
    <div className="grid mx-auto grid-cols-2 gap-4">
      {nfts.map((n, i) => (
        <NFTCard key={i} image={getUrlWithGateway(n.image)} id={n.id} name={n.name}/>
      ))}
    </div>
  )
}
