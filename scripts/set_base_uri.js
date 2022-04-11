const { contractInterface } = require("./contract/interface");

async function main() {
    let newBaseUrl = '';
    const tx = await contractInterface.setBaseURI(newBaseUrl);
    console.log("\n");
    console.log(`>>> call func > contract.setBaseURI("${ newBaseUrl }")`);
    console.log(` ·· tx · wait · ${ tx.hash }`);
    await tx.wait();
    console.log(` ·· tx · done : success`);
}

main();
