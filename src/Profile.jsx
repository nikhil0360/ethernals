import React from "react";
import "./Profile.css";
import { Card, Button, Modal, Image } from "antd";
import { useWeb3ExecuteFunction } from "react-moralis";
import { CreateFlow } from "CreateFlow";
import Blockie from "components/Blockie";
import Address from "components/Address/Address";
import NativeBalance from "components/NativeBalance";

const styles = {
    title: {
        fontSize: "30px",
        fontWeight: "600",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white"
    },
    card: {
        // boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        // border: "1px solid #e7eaf3",
        // borderRadius: "1rem",
        width: "450px",
        fontSize: "16px",
        fontWeight: "500",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    steps_action: {
        marginTop: "24px",
    },
    input: {
        fontSize: "16px",
        margin: "10px",
    },

    address: {
        padding: "20px",
        margin: "20px"
    },
    image: {
        width: "200px",
        marginBottom: "10px"
    },
    h1: {
        color: "white",
        fontSize: "30px",
    }
};

function succList() {
    let secondsToGo = 5;
    const modal = Modal.success({
        title: "Success!",
        content: `Your transaction was successful!`,
    });
    setTimeout(() => {
        modal.destroy();
    }, secondsToGo * 1000);
}

function failList() {
    let secondsToGo = 5;
    const modal = Modal.error({
        title: "Error!",
        content: `Your transaction failed due to some error!`,
    });
    setTimeout(() => {
        modal.destroy();
    }, secondsToGo * 1000);
}

const Profile = () => {
    const fallbackImg =
    "data:image/png;base64,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";
    const contractAddress = "0x68E65AB834b4e87D01837eB1375387abb6724ab4"; // IDA contract address
    const contractABI = '[{"inputs":[],"name":"airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"approveSubscription","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokeSubscription","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"},{"internalType":"contract ISuperfluid","name":"_host","type":"address"},{"internalType":"contract IInstantDistributionAgreementV1","name":"_ida","type":"address"},{"internalType":"contract ISuperfluidToken","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"subscriber","type":"address"},{"internalType":"uint128","name":"units","type":"uint128"}],"name":"updateUnits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"AIRDROP_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AIRDROP_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractDaiXBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastAirdrop","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract ISuperfluidToken","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = JSON.parse(contractABI);
    const PoM = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzAiIGhlaWdodD0iMjcwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSJ1cmwoI0IpIiBkPSJNMCAwaDI3MHYyNzBIMHoiLz48ZGVmcz48ZmlsdGVyIGlkPSJBIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaGVpZ2h0PSIyNzAiIHdpZHRoPSIyNzAiPjxmZURyb3BTaGFkb3cgZHg9IjAiIGR5PSIxIiBzdGREZXZpYXRpb249IjIiIGZsb29kLW9wYWNpdHk9Ii4yMjUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiLz48L2ZpbHRlcj48L2RlZnM+PHBhdGggZD0iTTcyLjg2MyA0Mi45NDljLS42NjgtLjM4Ny0xLjQyNi0uNTktMi4xOTctLjU5cy0xLjUyOS4yMDQtMi4xOTcuNTlsLTEwLjA4MSA2LjAzMi02Ljg1IDMuOTM0LTEwLjA4MSA2LjAzMmMtLjY2OC4zODctMS40MjYuNTktMi4xOTcuNTlzLTEuNTI5LS4yMDQtMi4xOTctLjU5bC04LjAxMy00LjcyMWE0LjUyIDQuNTIgMCAwIDEtMS41ODktMS42MTZjLS4zODQtLjY2NS0uNTk0LTEuNDE4LS42MDgtMi4xODd2LTkuMzFjLS4wMTMtLjc3NS4xODUtMS41MzguNTcyLTIuMjA4YTQuMjUgNC4yNSAwIDAgMSAxLjYyNS0xLjU5NWw3Ljg4NC00LjU5Yy42NjgtLjM4NyAxLjQyNi0uNTkgMi4xOTctLjU5czEuNTI5LjIwNCAyLjE5Ny41OWw3Ljg4NCA0LjU5YTQuNTIgNC41MiAwIDAgMSAxLjU4OSAxLjYxNmMuMzg0LjY2NS41OTQgMS40MTguNjA4IDIuMTg3djYuMDMybDYuODUtNC4wNjV2LTYuMDMyYy4wMTMtLjc3NS0uMTg1LTEuNTM4LS41NzItMi4yMDhhNC4yNSA0LjI1IDAgMCAwLTEuNjI1LTEuNTk1TDQxLjQ1NiAyNC41OWMtLjY2OC0uMzg3LTEuNDI2LS41OS0yLjE5Ny0uNTlzLTEuNTI5LjIwNC0yLjE5Ny41OWwtMTQuODY0IDguNjU1YTQuMjUgNC4yNSAwIDAgMC0xLjYyNSAxLjU5NWMtLjM4Ny42Ny0uNTg1IDEuNDM0LS41NzIgMi4yMDh2MTcuNDQxYy0uMDEzLjc3NS4xODUgMS41MzguNTcyIDIuMjA4YTQuMjUgNC4yNSAwIDAgMCAxLjYyNSAxLjU5NWwxNC44NjQgOC42NTVjLjY2OC4zODcgMS40MjYuNTkgMi4xOTcuNTlzMS41MjktLjIwNCAyLjE5Ny0uNTlsMTAuMDgxLTUuOTAxIDYuODUtNC4wNjUgMTAuMDgxLTUuOTAxYy42NjgtLjM4NyAxLjQyNi0uNTkgMi4xOTctLjU5czEuNTI5LjIwNCAyLjE5Ny41OWw3Ljg4NCA0LjU5YTQuNTIgNC41MiAwIDAgMSAxLjU4OSAxLjYxNmMuMzg0LjY2NS41OTQgMS40MTguNjA4IDIuMTg3djkuMzExYy4wMTMuNzc1LS4xODUgMS41MzgtLjU3MiAyLjIwOGE0LjI1IDQuMjUgMCAwIDEtMS42MjUgMS41OTVsLTcuODg0IDQuNzIxYy0uNjY4LjM4Ny0xLjQyNi41OS0yLjE5Ny41OXMtMS41MjktLjIwNC0yLjE5Ny0uNTlsLTcuODg0LTQuNTlhNC41MiA0LjUyIDAgMCAxLTEuNTg5LTEuNjE2Yy0uMzg1LS42NjUtLjU5NC0xLjQxOC0uNjA4LTIuMTg3di02LjAzMmwtNi44NSA0LjA2NXY2LjAzMmMtLjAxMy43NzUuMTg1IDEuNTM4LjU3MiAyLjIwOGE0LjI1IDQuMjUgMCAwIDAgMS42MjUgMS41OTVsMTQuODY0IDguNjU1Yy42NjguMzg3IDEuNDI2LjU5IDIuMTk3LjU5czEuNTI5LS4yMDQgMi4xOTctLjU5bDE0Ljg2NC04LjY1NWMuNjU3LS4zOTQgMS4yMDQtLjk1IDEuNTg5LTEuNjE2cy41OTQtMS40MTguNjA5LTIuMTg3VjU1LjUzOGMuMDEzLS43NzUtLjE4NS0xLjUzOC0uNTcyLTIuMjA4YTQuMjUgNC4yNSAwIDAgMC0xLjYyNS0xLjU5NWwtMTQuOTkzLTguNzg2eiIgZmlsbD0iI2ZmZiIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iQiIgeDE9IjAiIHkxPSIwIiB4Mj0iMjcwIiB5Mj0iMjcwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2NiNWVlZSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBjZDdlNCIgc3RvcC1vcGFjaXR5PSIuOTkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGV4dCB4PSIzMi41IiB5PSIyMzEiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9IiNmZmYiIGZpbHRlcj0idXJsKCNBKSIgZm9udC1mYW1pbHk9IlBsdXMgSmFrYXJ0YSBTYW5zLERlamFWdSBTYW5zLE5vdG8gQ29sb3IgRW1vamksQXBwbGUgQ29sb3IgRW1vamksc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiPlBvTSBTcG8z77iP4oOjaWZ5PC90ZXh0Pjwvc3ZnPgo="
    


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
                succList();
            },
            onError: (err) => {
                failList();
                console.log(err);
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
                succList();
            },
            onError: (error) => {
                failList();
                console.log(error);
            },
        });
    };

    return (
        <>
            <div className="profile">

                <div className="userProfile">
                    <Card style={styles.card} className="card">
                        <div style={styles.header}>
                            <Blockie scale={10} avatar currentWallet />
                            <Address size="6" copyable style={styles.address} />
                            <NativeBalance />
                        </div>
                    </Card>
                    <Card style={styles.card} className="card">
                        <h1 style={styles.h1}>Proof of Membership</h1>
                        <div style={styles.header}>
                            <Image
                                preview={false}
                                src={PoM || "error"}
                                fallback={fallbackImg}
                                alt="Proof of membership"
                                style={styles.image}
                            />
                        </div>
                    </Card>
                </div>

                <div className="superfluid">

                    <Card style={styles.card} className="card">
                        <CreateFlow />
                    </Card>



                    <Card
                        style={styles.card}
                        className="card"
                    >

                        {/* <p>Hi, If you are a creator who minted any music or video as NFT, you are eligilbe to
                            to be part of creator royalty. Click below to subscribe to our contract and after you have
                            subscribe claim your rewards daily.
                        </p> */}

                        <Button
                            type="primary"
                            size="large"
                            // loading={isPending}
                            style={{ width: "100%", marginTop: "20px", background: "#824ee2", border: "0px" }}
                            onClick={subscribe}
                        >
                            Subscribe
                        </Button>

                        <Button
                            type="primary"
                            size="large"
                            // loading={isPending}
                            style={{ width: "100%", marginTop: "20px", background: "#52c41a", border: "0px" }}
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