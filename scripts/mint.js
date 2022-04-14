const { ethers } = require("hardhat");
const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.isMintable();

    let priceToPay = await contractInterface.getPrice();
    await contractInterface.mint({ value: priceToPay });
}

main();
