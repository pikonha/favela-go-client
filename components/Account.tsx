import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";


const Account = () => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  async function handleConnect() {
    setConnecting(true);

    try {
      await activate(injected, undefined, true)
    } catch (error) {
        // ignore the error if it's a user rejected request
        if (error instanceof UserRejectedRequestError) {
          setConnecting(false);
        } else {
          setError(error);
        }
    }
  }

  if (typeof account !== "string") {
    return (
      <>
        {isWeb3Available ? (
          <button
            disabled={connecting}
            onClick={handleConnect}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </>
    );
  }

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
