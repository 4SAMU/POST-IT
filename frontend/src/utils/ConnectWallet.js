/** @format */

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
      //   setWalletAdd(
      //     String(address).substring(0, 5) + "..." + String(address).substring(38)
      //   );
      return { address };
    }
  } catch (error) {
    return {
      status: error,
    };
  }
}
