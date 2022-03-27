export const useIPFS = () => {
  const resolveLink = (url) => {
    // if (!url || !url.indexOf("ipfs://")===0) return url;
    // return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");

    if(url.indexOf("ipfs://") === 0){
      return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    }

    else if(url.indexOf("/ipfs/") === 0){
      return url.replace("/ipfs/", "https://gateway.ipfs.io/ipfs/");
    }

    else {
      return url;
    }
  };

  return { resolveLink };
};
