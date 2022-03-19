import { useWeb3React } from "@web3-react/core";

import UserList from "../components/UserList";

function Home() {  
  const { account, library } = useWeb3React()
  const isConnected = typeof account === "string" && !!library

  return (
    <div className="flex flex-col items-center gap-8">
      {isConnected && (
        // <AdminList/>
        <UserList/>
        /* // (isMinter && <AdminList />) || (!isMinter && <UserList />) */
      )}
    </div>
  );
}

export default Home;
