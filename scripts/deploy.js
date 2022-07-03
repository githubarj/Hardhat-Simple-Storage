//basic layout
// imports
// async main
// call main

//hardhat comes with an inbuilt network, a lcal ethereum node designed for development . it allows you to deploy your contracts run your teste and debug your code

//imports
const { ethers, run, network } = require("hardhat"); //run allows us to run any hardhat task, network allows us to see network configuration information

//async main function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();

    console.log(`Deployed contract to: ${simpleStorage.address}`);
    //console.log(network.config) //gives network details
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        //checking if etherscan api key exists and that we are on rinkeby

        console.log("Waiting for block txes...")
        await simpleStorage.deployTransaction.wait(6); //waiting 6 blocks and then run the verify function
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);

    //update the current value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
}

//programatic verification, below we are going to add some code to automatically verify our contacts after they have been deployed
async function verify(contractAddress, args) {
    console.log("Verifying contract...");

    //since our code may already be verified which may cause an error , we use a try catch
    try {
        //below is the verify function
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(e);
        }
    }
}

//main function call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
