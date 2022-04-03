import React, { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import "./createFlow.css";
import { ethers } from "ethers";
import { Card, Button, Modal, Typography, Divider, Input } from "antd";

//where the Superfluid logic takes place
async function createNewFlow(recipient, flowRate) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const DAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"; //DAIx on polygon network

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      receiver: recipient,
      flowRate: flowRate,
      superToken: DAIx,
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Kovan
    Super Token: DAIx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

async function deleteExistingFlow(recipient) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const DAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts[0];
  console.log(account);

  try {
    const deleteFlowOperation = sf.cfaV1.deleteFlow({
      sender: account,
      receiver: recipient,
      superToken: DAIx,
    });

    console.log("Creating your stream...");

    const result = await deleteFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `you've just deleted your money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: Kovan
      Super Token: DAIx
      Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
      Receiver: ${recipient},
      `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export const CreateFlow = () => {
  const [recipient, setRecipient] = useState(
    "0x68E65AB834b4e87D01837eB1375387abb6724ab4"
  );
  const [isButtonLoading1, setIsButtonLoading1] = useState(false);
  const [isButtonLoading2, setIsButtonLoading2] = useState(false);
  const [flowRate, setFlowRate] = useState("771604938270"); // equals to 2 DAIx per month
  const [flowRateDisplay, setFlowRateDisplay] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  return (
    <div className="createFlow">
      

      <div>
        <Button
          type="primary"
          size="large"
          style={{
            width: "100%",
            background: "#824ee2",
            marginTop: "20px",
            border: "0px"
          }}
          loading={isButtonLoading1}
          onClick={() => {
            setIsButtonLoading1(true);
            createNewFlow(recipient, flowRate);
            setTimeout(() => {
              setIsButtonLoading1(false);
            }, 1000);
          }}
        >
          Start Stream
        </Button>
        <Button
          type="primary"
          size="large"
          style={{
            width: "100%",
            background: "#ff4d4f",
            marginTop: "20px",
            border: "0px"
          }}
          loading={isButtonLoading2}
          onClick={() => {
            setIsButtonLoading2(true);
            deleteExistingFlow(recipient);
            setTimeout(() => {
              setIsButtonLoading2(false);
            }, 1000);
          }}
        >
          Stop Stream
        </Button>
      </div>

      <div className="description">
        {/* <p>
          Hello frnd, In order to use the platform you need to start a money
          stream which will act as a subscription. You can literally start or
          end your subscription anytime.
        </p> */}
        <div className="calculation">
          <p>Your flow will be equal to:</p>
          <p>
            <b>$2</b> DAIx/month
          </p>
        </div>
      </div>
    </div>
  );
};
