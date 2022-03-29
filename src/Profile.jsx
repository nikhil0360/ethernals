import React from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import Opensea from "./images/opensea.png";
import { ClockCircleOutlined } from "@ant-design/icons";
import NativeBalance from "./components/NativeBalance";
import Address from "./components/Address/Address";
import Blockie from "./components/Blockie";
import { Card, Button, Modal, Typography, Divider, Input } from "antd";
import { useState } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";
import { Steps } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useMoralisFile } from "react-moralis";
import { CreateFlow } from "CreateFlow";
const { Text } = Typography;


const styles = {
    title: {
        fontSize: "30px",
        fontWeight: "600",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        width: "450px",
        fontSize: "16px",
        fontWeight: "500",
        // margin: "auto",
        // background: "white"
    },

    steps_action: {
        marginTop: "24px",
    },
    input: {
        fontSize: "16px",
        margin: "10px",
    },
};




const Profile = () => {
    const contractAddress = "0x68E65AB834b4e87D01837eB1375387abb6724ab4"; // IDA contract address
    const contractABI = '[{"inputs":[],"name":"airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"approveSubscription","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokeSubscription","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"},{"internalType":"contract ISuperfluid","name":"_host","type":"address"},{"internalType":"contract IInstantDistributionAgreementV1","name":"_ida","type":"address"},{"internalType":"contract ISuperfluidToken","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"subscriber","type":"address"},{"internalType":"uint128","name":"units","type":"uint128"}],"name":"updateUnits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"AIRDROP_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AIRDROP_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractDaiXBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastAirdrop","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract ISuperfluidToken","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = JSON.parse(contractABI);
    function succList() {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: "Success!",
            content: `Your NFT is minted, you can look it in your collections`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function failList() {
        let secondsToGo = 5;
        const modal = Modal.error({
            title: "Error!",
            content: `There was a problem minting your NFT`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    async function subscribe() {
        console.log("subscribe");

        const ops = {
            contractAddress: contractAddress,
            functionName: "approveSubscription",
            abi: contractABIJson,
            params: {},
        };

        await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                console.log("success");
                // succList();
            },
            onError: (err) => {
                // failList();
                // console.log(err);
            },
        });
    };

    async function claim() {
        console.log("claim");

        const ops = {
            contractAddress: contractAddress,
            functionName: "claimBalance",
            abi: contractABIJson,
            params: {},
        };

        await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                console.log("success");
                // succList();
            },
            onError: (error) => {
                // failList();
                // console.log(error);
            },
        });
    };

    return (
        <>
            <div className="profile">


                <div className="superfluidStream">
                    <Card
                        style={styles.card}
                        // title={
                        //     <div style={styles.header}>
                        //         <Blockie scale={5} avatar currentWallet />
                        //         <Address size="6" copyable />
                        //         <NativeBalance />
                        //     </div>
                        // }
                    >
                        {/* <Button
                            type="primary"
                            size="large"
                            // loading={isPending}
                            style={{ width: "100%", marginTop: "0px", marginBottom: "20px", background: "#52c41a" }}
                            onClick={() => console.log("stream started")}
                        >
                            Start Stream
                        </Button>

                        <Button
                            type="primary"
                            size="large"
                            // loading={isPending}
                            style={{ width: "100%", marginTop: "0px", marginBottom: "20px", background: "#f5222d" }}
                            onClick={() => console.log("stream ended")}
                        >
                            Stop Stream
                        </Button> */}

                        <div className="superfluid">
                            <CreateFlow />
                        </div>

                    </Card>
                </div>

                <div className="superfluidDistribution">
                    <Card
                        style={styles.card}
                        // title={
                        //     <div style={styles.header}>
                        //         <Blockie scale={5} avatar currentWallet />
                        //         <Address size="6" copyable />
                        //         <NativeBalance />
                        //     </div>
                        // }
                    >

                        <p>Hi, If you are a creator who minted any music or video as NFT, you are eligilbe to 
                            to be part of creator royalty. Click below to subscribe to our contract and after you have
                            subscribe claim your rewards daily. 
                        </p>

                        <Button
                            type="primary"
                            size="large"
                            // loading={isPending}
                            style={{ width: "100%", margin: "10px", background: "#52c41a" }}
                            onClick={subscribe}
                        >
                            Subscribe
                        </Button>

                        <Button
                            type="primary"
                            size="large"
                            // loading={isPending}
                            style={{ width: "100%",  margin: "10px", background: "#13c2c2" }}
                            onClick={claim}
                        >
                            Claim
                        </Button>

                    </Card>
                </div>
            </div>
        </>
    );
};

export default Profile;