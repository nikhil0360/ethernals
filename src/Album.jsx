import React from "react";
import { useLocation } from "react-router-dom";
import "./Album.css";
import Opensea from "./images/opensea.png";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import { Alert } from "antd";

const Album = ({ setNftAlbum }) => {
  const { state: album } = useLocation();
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(album?.contract || "0x8a68d4e28515815cd6026416f4b2a4b647796f3e");

  return (
    <>
      {totalNFTs !== undefined && (
        <>
          {!fetchSuccess && (
            <>
              <Alert
                message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
                type="warning"
              />
              <div style={{ marginBottom: "10px" }}></div>
            </>
          )}
          <div className="albumContent">
            <div className="topBan">
              <img
                src={album.image}
                alt="albumcover"
                className="albumCover"
              ></img>
              <div className="albumDeets">
                <div>ALBUM</div>
                <div className="title">{album.title}</div>
                <div className="artist">
                  {album && NFTTokenIds[0].metadata.artist}
                </div>
                <div>
                  {album && NFTTokenIds[0].metadata.year}{" "}
                  {album && album.length} Songs
                </div>
              </div>
            </div>
            <div className="topBan">
              <div className="playButton" onClick={() => setNftAlbum(NFTTokenIds)}>
                PLAY
              </div>
              <div
                className="openButton"
                onClick={() =>
                  window.open(
                    `https://testnets.opensea.io/assets/mumbai/${album.contract}/1`
                  )
                }
              >
                OpenSea
                <img src={Opensea} className="openLogo" alt="opensea logo"/>
              </div>
            </div>
            <div className="tableHeader">
              <div className="numberHeader">#</div>
              <div className="titleHeader">TITLE</div>
              <div className="numberHeader">
                <ClockCircleOutlined />
              </div>
            </div>
            {album &&
              NFTTokenIds.map((nft, i) => {
                return (
                  <>
                    <div className="tableContent" key={i}>
                      <div className="numberHeader">{i + 1}</div>
                      <div
                        className="titleHeader"
                        style={{ color: "rgb(205, 203, 203)" }}
                      >
                        {nft.metadata.name}
                      </div>
                      {/* <div className="numberHeader">{nft.metadata.duration}</div> */}
                    </div>
                  </>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Album;