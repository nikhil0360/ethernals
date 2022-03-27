// just like /album but this page will be for our music in minted album
import React from "react";
import { useLocation } from "react-router-dom";
import "./Album.css";
import Opensea from "./images/opensea.png";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import { Card, Button, Modal, Tooltip, Image, Alert, Typography } from "antd";
import { useIPFS } from "hooks/useIPFS";
import styles from "components/NativeTransactions/styles";

const VideoAlbum = ({ setNftAlbum }) => {
    const { state: album } = useLocation();
    const {resolveLink} = useIPFS();

    return (
        <>
            <div className="albumContent">
                <div className="topBan">
                    <img
                        src={album.image}
                        alt="albumcover"
                        className="albumCover"
                    ></img>
                    <div className="albumDeets">
                        <div>VIDEO</div>
                        <div className="title">{album.name}</div>
                        <div className="artist">
                            {album.metadata.artist}
                        </div>
                        <div>
                            {album.metadata.year}{" "}
                        </div>
                    </div>
                </div>
                <div className="topBan">
                    <div
                        className="openButton"
                        onClick={() =>
                            window.open(
                                `https://testnets.opensea.io/assets/mumbai/${album.token_address}/${album.token_id}`
                            )
                        }
                    >
                        OpenSea
                        <img src={Opensea} className="openLogo" />
                    </div>
                </div>
                <div className="videoPlayer">
                    <video width="400" controls>
                        <source src={resolveLink(album.metadata.animation_url)} type="video/mp4" />
                    </video>
                </div>
            </div>
        </>
    );
};

export default VideoAlbum;