/** @format */

const { ethers } = require("hardhat");
const fs = require("fs"); // import fs module

// main function to deploy the smart contract
async function main() {
  // Get the contract factory for the SocialApp contract
  const SocialApp = await ethers.getContractFactory("SocialApp");

  // Deploy the contract
  const social_media_app = await SocialApp.deploy();

  // Wait for the deployment to be confirmed
  await social_media_app.deployed();

  // Create an object with the address and ABI of the deployed contract
  const data = {
    address: social_media_app.address,
    abi: JSON.parse(social_media_app.interface.format("json")),
  };

  // Write the ABI and address to the SocialApp.json file
  fs.writeFileSync("./SocialApp.json", JSON.stringify(data));

  // Log the address of the deployed contract
  console.log("SocialApp contract deployed to:", social_media_app.address);
}

// Call the main function and catch any errors that might occur
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
