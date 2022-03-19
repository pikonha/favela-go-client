import { useWeb3React } from "@web3-react/core";
// import ETHBalance from "../components/ETHBalance";
// import TokenBalance from "../components/TokenBalance";

// const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home() {
  const { account, library } = useWeb3React();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <main>
        {isConnected && (
          <section>
            {/* <ETHBalance />
            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" /> */}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
