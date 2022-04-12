const { ethers } = require("hardhat");
const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.isMintable();

    let priceToPay = ethers.utils.parseEther('0.00');
    await contractInterface.mint({ value: priceToPay });
}

main();
