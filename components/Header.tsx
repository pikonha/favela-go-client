import Image from 'next/image'

import Account from "./Account";
import useEagerConnect from "../hooks/useEagerConnect";
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter()
  const triedToEagerConnect = useEagerConnect();

  function handleLogoClick() {
    return router.push("/")
  }

  return (
    <header className="h-16 flex items-center justify-between px-4 mb-4 text-white"
      style={{
        backgroundColor: "#D33DD6"
      }}
    >
      <Image 
        onClick={handleLogoClick}
        src="/logo.svg" 
        width="72" 
        height="72" 
        className='pointer' 
        alt="Morro do corcovado"
      />
      {triedToEagerConnect && <Account />}
    </header>
  )
}