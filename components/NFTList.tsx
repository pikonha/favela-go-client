import { useRouter } from "next/router";

import { NFT } from "../utils/types";

type NFTListProps = {
  nfts: NFT[],
  isAdmin?: Boolean
}

function NFTCard({ image, id }: Pick<NFT, "id"| "image">) {
  const router = useRouter()

  return (
    <a className="w-32 h-32 mx-auto rounded-md bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
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
        <NFTCard key={i} image={n.image} id={n.id}/>
      ))}
    </div>
  )
}
