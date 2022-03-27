export const useIPFS = () => {
  const resolveLink = (url) => {
    console.log(url);
    if (!url || !url.indexOf("ipfs://")===0 ) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  return { resolveLink };
};
