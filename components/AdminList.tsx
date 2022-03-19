import {useRouter}  from 'next/router';

import NFTList, {NFT} from "./NFTList";
import CTAButton from "./CTAButton";

export default function UserList({nfts = []}: {nfts: NFT[]}) {
  const router = useRouter()
  
  return (
    <>
      <CTAButton value="Criar nova atração" handleClick={() => router.push("/admin/nft/new")} />
      <NFTList nfts={nfts} />
    </>
  )
}