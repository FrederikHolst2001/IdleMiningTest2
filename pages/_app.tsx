import type { AppProps } from "next/app";
import { ThirdwebProvider, embeddedWallet, smartWallet, walletConnect, metamaskWallet, coinbaseWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ACCOUNT_FACTORY_CONTRACT_ADDRESS } from "../constants/contracts";
import Navbar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        metamaskWallet(embeddedWallet()),
        coinbaseWallet(embeddedWallet()),
        walletConnect(embeddedWallet()),
      ]}
      authConfig={{
        domain: process.env.DOMAIN || "",
        authUrl: "/api/auth"
      }}
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
