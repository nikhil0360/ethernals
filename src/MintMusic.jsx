import React from "react";
import { useLocation } from "react-router-dom";
import "./Album.css";
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
var util = require('util')
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
        margin: "auto",
    },

    steps_action: {
        marginTop: "24px",
    },
    input: {
        fontSize: "16px",
        margin: "10px",
    },
};




const MintMusic = () => {
    const [isPending, setIsPending] = useState(false);
    const [artist, setArtist] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [imageFile, setImageFile] = useState("");
    const [musicFile, setMusicFile] = useState("");
    const { saveFile } = useMoralisFile();
    const [imageHash, setImageHash] = useState("");
    const [musicHash, setMusicHash] = useState("");
    const [metadataHash, setMetadataHash] = useState("");
    const contractAddress = "0x020783C43e25c5171A6842469400246f6373FfDD";
    const contractABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CRYPTODEVS_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"TokenAlive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"TokenToOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"formatTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"getNumberLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]';
    const contractProcessor = useWeb3ExecuteFunction();

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

    async function mint() {
        setIsPending(true);

        await saveFile(imageFile.name, imageFile, {
            type: "image",
            saveIPFS: true,
            saveFile: false,
            onSuccess: (result) => {
                setImageHash(result._hash)
                console.log(imageHash)
                // setIsPending(false);
            },
            onError: (error) => {
                console.log(error)
                setIsPending(false);
            },
        });

        await saveFile(musicFile.name, musicFile, {
            type: "mp3",
            saveIPFS: true,
            saveFile: false,
            onSuccess: (result) => {
                setMusicHash(result._hash)
                console.log(musicHash)
                // setIsPending(false);
            },
            onError: (error) => {
                console.log(error)
                setIsPending(false);
            },
        });


        let metadata = {
            name: name,
            artist: artist,
            year: year,
            image: "/ipfs/" + imageHash,
            animation_url: "/ipfs/" + musicHash
        }

        const base64 = btoa(JSON.stringify(metadata));
        console.log(base64);

        await saveFile("metadata.json",
            { base64 },
            {
                type: "base64",
                saveIPFS: true,
                saveFile: false,
                onSuccess: (result) => {
                    setMetadataHash(result._hash)
                    console.log(metadataHash)
                    // setIsPending(false);
                },
                onError: (error) => {
                    console.log(error._hash)
                    setIsPending(false);
                },
            });

        console.log("ipfs://" + metadataHash);

        const ops = {
            contractAddress: contractAddress,
            // functionName: mintMusic,
            abi: contractABI,
            params: {
                tokenURI: `ipfs://${metadataHash}`
            },
            // msgValue: p
          };
      
          await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
              console.log("success");
              setIsPending(false);
              succList();
            },
            onError: (error) => {
              setIsPending(false);
              failList();
            },
          });
    };

    return (
        <>
            <div>
                <Card
                    style={styles.card}
                    title={
                        <div style={styles.header}>
                            <Blockie scale={5} avatar currentWallet />
                            <Address size="6" copyable />
                            <NativeBalance />
                        </div>
                    }
                >

                    <div style={styles.input}>
                        <Input id="artist" type="text" onChange={(e) => setArtist(e.target.value)} placeholder="Artist Name" />
                        <Input id="name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Album Name" />
                        <Input id="year" type="number" onChange={(e) => setYear(e.target.value)} placeholder="Year of Creation" />
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
                        style={{ width: "100%", marginTop: "0px", marginBottom: "20px" }}
                        onClick={mint}
                    >
                        Mint Now 👾
                    </Button>

                </Card>
            </div>
        </>
    );
};

export default MintMusic;