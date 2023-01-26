/** @format */
const toHex = require("number_to_hex");

export async function connectWallet() {
  try {
    const { ethereum } = window.ethereum;
    if (ethereum) {
      alert("install metamask");
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      // console.log(window.ethereum.networkVersion);

      if (window.ethereum.networkVersion !== 5) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(5) }],
        });
      }

      return { address };
    }
  } catch (error) {
    return {
      status: error,
    };
  }
}
