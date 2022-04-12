const { contractInterface } = require("./contract/interface");

async function main() {
    price = await contractInterface.getPrice();
    console.log("----");
    console.log(`note that the price is set in gwei.\nthe actual price is: ${ ethers.utils.formatEther(price) } ETH/MATIC`);
    console.log("----");

    newPrice = ethers.utils.parseEther('0.00');
    await contractInterface.setPrice(newPrice);

    price = await contractInterface.getPrice();
    console.log("----");
    console.log(`note that the price is set in gwei.\nthe actual price is: ${ ethers.utils.formatEther(price) } ETH/MATIC`);
    console.log("----");
}

main();
