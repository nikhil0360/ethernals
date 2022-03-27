import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Tabs } from "antd";
import { library } from "./helpers/albumList";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import { Card, Button, Modal, Tooltip, Image, Alert, Typography } from "antd";
import {
  FileSearchOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
// super fluid 
import { CreateFlow } from "./CreateFlow";
import { useIPFS } from "hooks/useIPFS";



const { Meta } = Card;

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
  },

  steps_action: {
    marginTop: "24px",
  },

  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
    marginTop: "20px",
  },
  banner: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    width: "600px",
    borderRadius: "10px",
    // height: "150px",
    // marginBottom: "20px",
    // paddingBottom: "20px",
    // borderBottom: "solid 1px #e3e3e3",
    flexDirection: "column",
  },
  logo: {
    height: "250px",
    width: "250px",
    borderRadius: "50%",
    // positon: "relative",
    // marginTop: "-80px",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
    textAlign: "center"
  },
};

const { TabPane } = Tabs;

const Home = () => {
  const fallbackImg =
    "data:image/png;base64,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";
  const contractAddress = "0x3eEDc39f195EE85cD6e2e3226911158c82b3Ab61";
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(contractAddress);
  const { chainId, walletAddress } = useMoralisDapp();
  const {resolveLink} = useIPFS();

  // console.log(NFTTokenIds);


  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="FEATURED" key="1">
          <h1 className="featuredTitle">Today Is The Day</h1>
          <div className="albums">
            {library.map((e, i) => (
              <div key={i} className="albumSelection">
                <Link to={{
                  pathname: "/album",
                  state: e
                }}>
                  <img
                    src={e.image}
                    alt="bull"
                    style={{ width: "150px", marginBottom: "10px" }}
                  ></img>
                  <p>{e.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="GENRES & MOODS" key="2">
          <h1 className="featuredTitle">Pop Music</h1>
          <div className="albums">
            {library.slice(7, 13).map((e) => (
              <div className="albumSelection">
                <Link to={{
                  pathname: "/album",
                  state: e
                }} state={e}>
                  <img
                    src={e.image}
                    alt="bull"
                    style={{ width: "150px", marginBottom: "10px" }}
                  ></img>
                  <p>{e.title}</p>
                </Link>
              </div>
            ))}
          </div>
          <h1 className="featuredTitle">Top Hits</h1>
          <div className="albums">
            {library.slice(5, 11).map((e) => (
              <div className="albumSelection">
                <Link to={{
                  pathname: "/album",
                  state: e
                }} state={e}>
                  <img
                    src={e.image}
                    alt="bull"
                    style={{ width: "150px", marginBottom: "10px" }}
                  ></img>
                  <p>{e.title}</p>
                </Link>
              </div>
            ))}
          </div>
          <h1 className="featuredTitle">Country</h1>
          <div className="albums">
            {library.slice(0, 6).map((e) => (
              <div className="albumSelection">
                <Link to={{
                  pathname: "/album",
                  state: e
                }} state={e}>
                  <img
                    src={e.image}
                    alt="bull"
                    style={{ width: "150px", marginBottom: "10px" }}
                  ></img>
                  <p>{e.title}</p>
                </Link>
              </div>
            ))}
          </div>
          <h1 className="featuredTitle">Classics</h1>
          <div className="albums">
            {library.slice(5, 11).map((e) => (
              <div className="albumSelection">
                <Link to={{
                  pathname: "/album",
                  state: e
                }} state={e}>
                  <img
                    src={e.image}
                    alt="bull"
                    style={{ width: "150px", marginBottom: "10px" }}
                  ></img>
                  <p>{e.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="NEW RELEASES" key="3">
          <h1 className="featuredTitle">Hot Off The Press</h1>
          <div className="albums">
            {library.map((e) => (
              <div className="albumSelection">
                <Link to={{
                  pathname: "/album",
                  state: e
                }} state={e}>
                  <img
                    src={e.image}
                    alt="bull"
                    style={{ width: "150px", marginBottom: "10px" }}
                  ></img>
                  <p>{e.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="MUSIC NFTs" key="4">
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


                {/* <div style={styles.NFTs}>
            {NFTTokenIds.slice(0, 20).map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Tooltip title="View On Blockexplorer">
                    <FileSearchOutlined
                      onClick={() =>
                        window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )
                      }
                    />
                  </Tooltip>,
                  //   <Tooltip title="Buy NFT">
                  //     <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                  //   </Tooltip>,
                ]}
                style={{ width: 240, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview={false}
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{ height: "240px" }}
                  />
                }
                key={index}
              >
                <Meta title={`${nft.name} #${nft.token_id}`} description={`#${nft.contract_type}`} />
              </Card>
            ))}

          </div> */}
                <div className="albums">
                  {NFTTokenIds.slice(0, 20).map((e, i) => (
                    <div key={i} className="albumSelection">
                      <Link to={{
                        pathname: "/mintalbum",
                        state: e
                      }} state={e}>
                        <img
                          src={resolveLink(e.image)}
                          alt={fallbackImg}
                          style={{ width: "150px", marginBottom: "10px" }}
                        ></img>
                        <p>{e.metadata.name}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </TabPane >

        {/* <TabPane tab="superfluid" key="5">
          <div className="superfluid">
            <CreateFlow />
          </div>
        </TabPane> */}

        {/* <TabPane tab="VIDEO" key="5">
          <video width="400" controls>
            <source src="https://ipfs.io/ipfs/QmRPo2q2n23nVNyGpBuzihTnrV1usdFrh9qj4Rw8KvmU55" type="video/mp4" />
          </video>
        </TabPane> */}

<TabPane tab="VIDEO NFTS" key="5">
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


                {/* <div style={styles.NFTs}>
            {NFTTokenIds.slice(0, 20).map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Tooltip title="View On Blockexplorer">
                    <FileSearchOutlined
                      onClick={() =>
                        window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )
                      }
                    />
                  </Tooltip>,
                  //   <Tooltip title="Buy NFT">
                  //     <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                  //   </Tooltip>,
                ]}
                style={{ width: 240, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview={false}
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{ height: "240px" }}
                  />
                }
                key={index}
              >
                <Meta title={`${nft.name} #${nft.token_id}`} description={`#${nft.contract_type}`} />
              </Card>
            ))}

          </div> */}
                <div className="albums">
                  {NFTTokenIds.slice(0, 20).map((e, i) => (
                    <div key={i} className="albumSelection">
                      <Link to={{
                        pathname: "/videoalbum",
                        state: e
                      }} state={e}>
                        <img
                          src={resolveLink(e.image)}
                          alt={fallbackImg}
                          style={{ width: "150px", marginBottom: "10px" }}
                        ></img>
                        <p>{e.metadata.name}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </TabPane >

      </Tabs>
    </>
  );
};

export default Home;