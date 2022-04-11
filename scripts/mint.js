const { contractInterface } = require("./contract/interface");

async function main() {
    const tx = await contractInterface.mint();
    console.log("\n");
    console.log(`>>> call func > contract.mint()`);
    console.log(` ·· tx · wait · ${ tx.hash }`);
    await tx.wait();
    console.log(` ·· tx · done : success`);
}

main();
