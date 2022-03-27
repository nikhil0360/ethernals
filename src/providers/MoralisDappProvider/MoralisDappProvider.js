import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import Web3 from "web3";
import {Biconomy} from "@biconomy/mexa";
import {notification } from "antd";

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user, isAuthenticated, isWeb3Enabled, } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(
    '{"noContractDeployed": true}'
  ); //Smart Contract ABI here
  const [marketAddress, setMarketAddress] = useState(); //Smart Contract Address Here

  const [isBiconomyInitialized, setIsBiconomyInitialized] = useState(false);
  const [biconomyProvider, setBiconomyProvider] = useState({});

  useEffect(() => {
    const initializeBiconomy = async () => {
      if (isBiconomyInitialized) {
        // Resetting when reinitializing
        setIsBiconomyInitialized(false);
      }

      const walletWeb3 = await Moralis.enableWeb3();
      const networkProvider = new Web3.providers.HttpProvider(
        "https://speedy-nodes-nyc.moralis.io/20309a120dcd433fbbfc6bf0/polygon/mumbai"
      );
      const biconomy = new Biconomy(networkProvider, {
        walletProvider: walletWeb3.currentProvider,
        apiKey: process.env.REACT_APP_BICONOMY_API_KEY_MUMBAI,
      });
      setBiconomyProvider(biconomy);

      // This web3 instance is used to read normally and write to contract via meta transactions.
      web3.setProvider(biconomy);

      biconomy
        .onEvent(biconomy.READY, () => {
          setIsBiconomyInitialized(true);
        })
        .onEvent(biconomy.ERROR, () => {
          // Handle error while initializing mexa
          notification.error({
            message: "Biconomy Initialization Fail",
            description:
              "Biconomy has failed to initialized. Please try again later.",
          });
        });
    };

    if (isAuthenticated && isWeb3Enabled && chainId !== "0x1") {
      initializeBiconomy();
    }
  }, [
    isAuthenticated,
    isWeb3Enabled,
    chainId,
    web3,
    Moralis,
  ]);

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get("ethAddress")
      ),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        marketAddress,
        setMarketAddress,
        contractABI,
        setContractABI,
        isBiconomyInitialized,
        biconomyProvider,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
