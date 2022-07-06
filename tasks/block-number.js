//to get the current block number of whatever blockchain we are working with
const { task } = require("hardhat/config"); //importing the task function

//to define a task, bame , description
task("block-number", "Prints out the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block Number: ${blockNumber}`);
    }
);

module.exports = {}  //to beable to export it
