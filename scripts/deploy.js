//basic layout
// imports
// async main
// call main

//imports
const { ethers } = require("hardhat");

//async main function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed()
}

//main function call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
