const { contractInterface } = require("./contract/interface");

async function main() {
    price = await contractInterface.getPrice();
    console.log("----");
    console.log(`note that the price is set in gwei.\nthe actual price is: ${ price * Math.pow(10, -18) } ETH/MATIC`);
    console.log("----");
}

main();
