import { useWeb3React } from "@web3-react/core";
import useIsMinter from "../hooks/useIsMinter";
import AdminList from "../components/AdminList";
import UserList from "../components/UserList";

const nftAddress = "0xB9A7083C98278a0E3D236F1E5cCbD5A326D0b624"

function Home() {
  const { account, library } = useWeb3React();
  const isMinter = useIsMinter(account, nftAddress)

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <main>
        {isConnected && (isMinter && <AdminList />) }
        {isConnected && (!isMinter && <UserList />) }
      </main>
    </div>
  );
}

export default Home;
