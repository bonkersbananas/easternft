let { network } = require("hardhat");
const fs = require('fs')

async function main() {
    const ContractFactory = await ethers.getContractFactory("NFT");
    const contract = await ContractFactory.deploy();
    await contract.deployed();

    // output address where contract is deployed
    console.log(contract.address);

    let networkName = network.name;
    if (networkName === 'localhost') {
        fs.writeFileSync('.dev_contract', contract.address);
    }
 }

 main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
