import Account from "./Account";
import useEagerConnect from "../hooks/useEagerConnect";

export default function Header() {
  const triedToEagerConnect = useEagerConnect();

  return (
    <header className="h-16 bg-blue-100 flex items-center justify-end px-4 mb-4">
        {triedToEagerConnect && <Account />}
    </header>
  )
}