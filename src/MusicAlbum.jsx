// just like /album but this page will be for our music
import React from "react";
import { useLocation } from "react-router-dom";
import "./Album.css";
import Opensea from "./images/opensea.png";
import { ClockCircleOutlined } from "@ant-design/icons";

const MusicAlbum = ({ setNftAlbum }) => {
    const { state: album } = useLocation();

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
                        <div>ALBUM</div>
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
                    <div className="playButton" onClick={() => setNftAlbum([album])}>
                        PLAY
                    </div>
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
                <div className="tableHeader">
                    <div className="numberHeader">#</div>
                    <div className="titleHeader">TITLE</div>
                    <div className="numberHeader">
                        <ClockCircleOutlined />
                    </div>
                </div>
                <div className="tableContent" key="0">
                    <div className="numberHeader">{1}</div>
                    <div
                        className="titleHeader"
                        style={{ color: "rgb(205, 203, 203)" }}
                    >
                        {album.metadata.name}
                    </div>
                    <div className="numberHeader">{album.metadata.duration}</div>
                </div>

            </div>
        </>
    );
};

export default MusicAlbum;