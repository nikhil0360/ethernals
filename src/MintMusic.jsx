import React from "react";
import "./Album.css";
import NativeBalance from "./components/NativeBalance";
import Address from "./components/Address/Address";
import Blockie from "./components/Blockie";
import { Card, Button, Modal, Divider, Input } from "antd";
import { useState } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import { useMoralisFile } from "react-moralis";

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
        margin: "auto",
        color: "white",
    },

    steps_action: {
        marginTop: "24px",
    },
    input: {
        fontSize: "16px",
        marginTop: "10px",
        marginBottom: "10px",
        background: "transparent",
        border: "0px",
        color: "white",
    },
    address:{
        padding: "20px",
        margin: "10px"
    }
};




const MintMusic = () => {
    const [isPending, setIsPending] = useState(false);
    const [artist, setArtist] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [imageFile, setImageFile] = useState("");
    const [musicFile, setMusicFile] = useState("");
    const { saveFile } = useMoralisFile();
    const { web3 } = useMoralis();
    
    // // without biconomy
    // const contractAddress = "0x886165bbF0049593C454c0c795F3E26Ecd3c4680";
    // const contractABI = '[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"createToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';

    // // with biconomy
    const contractAddress = "0x3eEDc39f195EE85cD6e2e3226911158c82b3Ab61";
    const contractABI = '[{"inputs":[{"internalType":"address","name":"_trustedForwarder","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"createToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_trustedForwarder","type":"address"}],"name":"setTrustForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]';
    const { isBiconomyInitialized, biconomyProvider, walletAddress } = useMoralisDapp();


    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = JSON.parse(contractABI);

    const fileInput = (e) => setImageFile(e.target.files[0]);

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

    let imageHash;
    async function mint() {
        setIsPending(true);

        await saveFile(imageFile.name, imageFile, {
            type: "image",
            saveIPFS: true,
            saveFile: false,
            onSuccess: (result) => {
                imageHash = result._hash;
            },
            onError: (error) => {
                console.log(error)
                setIsPending(false);
                failList();
            },
        });

        console.log(imageHash);


        let musicHash;
        await saveFile(musicFile.name, musicFile, {
            type: "mp3",
            saveIPFS: true,
            saveFile: false,
            onSuccess: (result) => {
                musicHash = result._hash;
            },
            onError: (error) => {
                console.log(error)
                setIsPending(false);
                failList();
            },
        });

        console.log(musicHash);

        // // not added duration of music
        let metadata = {
            name: name,
            artist: artist,
            year: year,
            image: "/ipfs/" + imageHash,
            animation_url: "/ipfs/" + musicHash,
            type: "music"
        }

        const base64 = btoa(JSON.stringify(metadata));

        console.log(base64);

        let metadataHash;
        await saveFile("metadata.json",
            { base64 },
            {
                type: "base64",
                saveIPFS: true,
                saveFile: false,
                onSuccess: (result) => {
                    metadataHash = result._hash;
                },
                onError: (error) => {
                    console.log(error)
                    setIsPending(false);
                    failList();
                },
            });

        console.log(metadataHash);

        const contractInst = new web3.eth.Contract(contractABIJson, contractAddress);

        const input = `ipfs://${metadataHash}`;
        

        // **************** WITH BICONOMY START ***************** //
        const transactionParams = {
            from: walletAddress,
            signatureType: biconomyProvider["EIP712_SIGN"]
        }

        let tx = contractInst.methods.createToken(input).send(transactionParams);

        tx.on("transactionHash", function () { })
            .once("confirmation", function (transactionHash) {
                succList()
                console.log(transactionHash)
                setIsPending(false);
            })
            .on("error", function (e) {
                failList()
                console.log(e);
                setIsPending(false);
            });
        
        // **************** WITH BICONOMY END ***************** //

         // **************** WITHOUT BICONOMY BELOW ***************** //

        // const ops = {
        //     contractAddress: contractAddress,
        //     functionName: "createToken",
        //     abi: contractABIJson,
        //     params: {
        //         tokenURI: `ipfs://${metadataHash}`
        //     },
        // };

        // await contractProcessor.fetch({
        //     params: ops,
        //     onSuccess: () => {
        //         console.log("success");
        //         setIsPending(false);
        //         succList();
        //     },
        //     onError: (error) => {
        //         console.log(error);
        //         setIsPending(false);
        //         failList();
        //     },
        // });

         // **************** WITHOUT BICONOMY ABOVE ***************** //
    };

    return (
        <>
            <div>
                <Card
                    style={styles.card}
                    // title={
                    //     <div style={styles.header}>
                    //         <Blockie scale={5} avatar currentWallet />
                    //         <Address size="6" copyable style={styles.address}/>
                    //         <NativeBalance />
                    //     </div>
                    // }
                    className="card"
                >

                    <div style={styles.input}>
                        <Input id="artist" type="text" style={styles.input} onChange={(e) => setArtist(e.target.value)} placeholder="Artist Name" />
                        <Input id="name" type="text" style={styles.input} onChange={(e) => setName(e.target.value)} placeholder="Album Name" />
                        <Input id="year" type="number" style={styles.input} onChange={(e) => setYear(e.target.value)} placeholder="Year of Creation" />
                    </div>


                    <label for="image">Image File: </label>
                    <Input type="file" style={styles.input} id="image" onChange={fileInput} />
                    <Divider />

                    <label for="music">Music File: </label>
                    <Input type="file" style={styles.input} id="music" onChange={(e) => setMusicFile(e.target.files[0])} />



                    <Button
                        type="primary"
                        size="large"
                        loading={isPending}
                        style={{ width: "100%", marginTop: "10px", marginBottom: "10px", background: "#824ee2", border: "0px"}}
                        onClick={mint}
                    >
                        MINT MUSIC 🎵
                    </Button>

                </Card>
            </div>
        </>
    );
};

export default MintMusic;