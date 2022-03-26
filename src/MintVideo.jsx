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
import axios from 'axios';
var util = require('util')
const { Text } = Typography;

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




const MintVideo = () => {
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

        // await saveFile(imageFile.name, imageFile, {
        //     type: "image",
        //     saveIPFS: true,
        //     saveFile: false,
        //     onSuccess: (result) => {
        //         setImageHash(result._hash)
        //         console.log(imageHash)
        //         // setIsPending(false);
        //     },
        //     onError: (error) => {
        //         console.log(error)
        //         setIsPending(false);
        //     },
        // });

        // await saveFile(musicFile.name, musicFile, {
        //     type: "mp3",
        //     saveIPFS: true,
        //     saveFile: false,
        //     onSuccess: (result) => {
        //         setMusicHash(result._hash)
        //         console.log(musicHash)
        //         // setIsPending(false);
        //     },
        //     onError: (error) => {
        //         console.log(error)
        //         setIsPending(false);
        //     },
        // });


        // let metadata = {
        //     name: name,
        //     artist: artist,
        //     year: year,
        //     image: "/ipfs/" + imageHash,
        //     animation_url: "/ipfs/" + musicHash
        // }

        // const base64 = btoa(JSON.stringify(metadata));
        // console.log(base64);

        // await saveFile("metadata.json",
        //     { base64 },
        //     {
        //         type: "base64",
        //         saveIPFS: true,
        //         saveFile: false,
        //         onSuccess: (result) => {
        //             setMetadataHash(result._hash)
        //             console.log(metadataHash)
        //             // setIsPending(false);
        //         },
        //         onError: (error) => {
        //             console.log(error._hash)
        //             setIsPending(false);
        //         },
        //     });

        // console.log("ipfs://" + metadataHash);

        // const p = 1 * ("1e" + 13);
        // const ops = {
        //     contractAddress: marketAddress,
        //     functionName: createItemFunction,
        //     abi: contractABIJson,
        //     params: {},
        //     msgValue: p
        // };

        // await contractProcessor.fetch({
        //     params: ops,
        //     onSuccess: () => {
        //         console.log("success");
        //         setIsPending(false);
        //         succList();
        //         setStatus("finish")
        //     },
        //     onError: (error) => {
        //         setIsPending(false);
        //         failList();
        //     },
        // });

        const apiKey = "6c0a0b1e-4800-4949-a31f-40f1bbc00e92";



        // ********* get url for upload ******************
        const options = {
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            }
            // data: {
            //     'name' : 'Example file'
            // }
        }

        const data = {
            name: musicFile.name
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
                //  'Content-Type': 'application/octet-stream'
            }
        }

        const data2 = musicFile;

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
            console.log("in loop 1.....")
            sleep(3000);
            console.log("in loop 2.....")
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
                //  'Content-Type': 'application/octet-stream'
            }
        }

        const data4 = {
            ipfs: {}
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
            if(taskPhase == "completed"){
                break;
            }
            console.log("in task 1.....")
            sleep(3000);
            console.log("in task 2.....")
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
        console.log(taskIPFS.data.output.export.ipfs);

        const metipfs = taskIPFS.data.output.export.ipfs
        console.log(metipfs);

        setIsPending(false);
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

                    <label for="music">Video File: </label>
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

export default MintVideo;