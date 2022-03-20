import { useWeb3React } from "@web3-react/core";
import AdminList from "../components/AdminList";

import UserList from "../components/UserList";
import { contractHash } from "../config";
import useIsMinter from "../hooks/useIsMinter";

function Home() {  
  const { account, library } = useWeb3React()
  const isMinter = useIsMinter(account, contractHash)
  const isConnected = typeof account === "string" && !!library

  return (
    <div className="flex flex-col items-center gap-8">
      {isConnected && (isMinter ? <AdminList /> : <UserList />)}
    </div>
  );
}

export default Home;
