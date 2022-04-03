import React from "react";
import "./Album.css";
import NativeBalance from "./components/NativeBalance";
import Address from "./components/Address/Address";
import Blockie from "./components/Blockie";
import { Card, Button, Modal, Divider, Input } from "antd";
import { useState } from "react";
import axios from 'axios';
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction, useMoralis, useMoralisFile } from "react-moralis";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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
};


const MintVideo = () => {
    const [isPending, setIsPending] = useState(false);
    const [artist, setArtist] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [imageFile, setImageFile] = useState("");
    const [videoFile, setVideoFile] = useState("");
    const { saveFile } = useMoralisFile();

    // // without biconomy 
    // const contractAddress = "0x886165bbF0049593C454c0c795F3E26Ecd3c4680";
    // const contractABI = '[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"createToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';

    // with biconomy
    const contractAddress = "0x3eEDc39f195EE85cD6e2e3226911158c82b3Ab61";
    const contractABI = '[{"inputs":[{"internalType":"address","name":"_trustedForwarder","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"createToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_trustedForwarder","type":"address"}],"name":"setTrustForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]';


    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = JSON.parse(contractABI);
    const { web3 } = useMoralis();
    const { isBiconomyInitialized, biconomyProvider, walletAddress } = useMoralisDapp();

    function succList() {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: "Success!",
            content: `Your video NFT is minted, you can look it in your collections`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function failList() {
        let secondsToGo = 5;
        const modal = Modal.error({
            title: "Error!",
            content: `There was a problem minting your video NFT`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    async function mint() {
        const apiKey = "6c0a0b1e-4800-4949-a31f-40f1bbc00e92";
        setIsPending(true);

        let imageHash;
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
            },
        });

        // ********* get url for upload ******************
        const options = {
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            }
        }

        const data = {
            name: videoFile.name
        }

        let url;
        let assetID;

        await axios.post('https://livepeer.com/api/asset/request-upload', data, options).then(res => {
            console.log(res);
            console.log(res.data);
            url = res.data.url;
            assetID = res.data.asset.id;
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });


        console.log(url);
        console.log(assetID);

        // ********* uploading assets on livepeer ******************
        const options2 = {
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'video/mp4'
            }
        }

        const data2 = videoFile;

        await axios.put(url, data2, options2).then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });

        // // ************* waiting for asset to get ready ************* // // 

        console.log("we are waiting for the asset to get ready now");
        let assetStatus = "waiting";


        while (assetStatus == "waiting") {
            console.log("in loop.....")
            sleep(3000);
            console.log("in loop after sleep.....")
            // ************* Listing Assets ************** // 
            const options3 = {
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                }
            }
            await axios.get("https://livepeer.com/api/asset/" + assetID, options3).then(res => {
                console.log(res);
                console.log(res.status);
                assetStatus = res.data.status;
            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
        }

        console.log(assetStatus);
        // ************* Export Asset ************** // 

        const options4 = {
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            }
        }

        const data4 = {
            ipfs: {},
        }

        let task;
        let taskID;
        const taskURL = 'https://livepeer.com/api/asset/' + String(assetID) + '/export';

        console.log(taskURL);

        await axios.post(taskURL, data4, options4).then(res => {
            console.log(res.data);
            console.log(res.data.task);
            task = res.data.task;
            taskID = task.id;
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });


        // // checking if the task is completed
        console.log("we are waiting for the task to get ready now");
        let lastProgress = "0";
        let taskIPFS;
        let taskPhase = "notCompleted"

        while (parseFloat(lastProgress) < 0.999) {
            if (taskPhase == "completed") {
                break;
            }
            console.log("in task.....")
            sleep(3000);
            console.log("in task after sleep.....")
            // ************* Listing Assets ************** // 
            const options3 = {
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                }
            }
            await axios.get("https://livepeer.com/api/task/" + taskID, options3).then(res => {
                console.log(res);
                console.log(res.data.status.progress);
                lastProgress = res.data.status.progress;
                taskPhase = res.data.status.phase;
                taskIPFS = res;
            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
        }

        console.log(lastProgress);
        
        let videoHash = taskIPFS.data.output.export.ipfs.videoFileCid

        console.log(`video hash is ${videoHash}`);

        let metadata = {
            name: name,
            artist: artist,
            year: year,
            image: "/ipfs/" + imageHash,
            animation_url: "/ipfs/" + videoHash,
            type: "video"
        }

        const base64 = btoa(JSON.stringify(metadata));

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
        

         // **************** WITH BICONOMY BELOW ***************** //
        const contractInst = new web3.eth.Contract(contractABIJson, contractAddress);

        const input = `ipfs://${metadataHash}`;
        
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

         // **************** WITH BICONOMY ABOVE ***************** //


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
                    //         <Address size="6" copyable />
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
                    <Input type="file" style={styles.input} id="image" onChange={(e) => setImageFile(e.target.files[0])} />
                    <Divider />
                    <label for="video">Video File: </label>
                    <Input type="file" style={styles.input} id="video" onChange={(e) => setVideoFile(e.target.files[0])} />
                    <Button
                        type="primary"
                        size="large"
                        loading={isPending}
                        style={{ width: "100%", marginTop: "10px", marginBottom: "10px", background: "#824ee2", border: "0px"}}
                        onClick={mint}
                    >
                        MINT MUSIC 🎥
                    </Button>
                </Card>
            </div>
        </>
    );
};

export default MintVideo;