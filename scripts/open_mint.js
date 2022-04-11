const { contractInterface } = require("./contract/interface");

async function main() {
    console.log(`\n>>> read data > contract.isMintable\n ··    return : ${ await contractInterface.isMintable() }`);

    let newMintableState = true;
    const tx = await contractInterface.toggleMintable(newMintableState);
    console.log("\n");
    console.log(`>>> call func > contract.toggleMintable(${ newMintableState })`);
    console.log(` ·· tx · wait · ${ tx.hash }`);
    await tx.wait();
    console.log(` ·· tx · done : success`);

    console.log(`\n>>> read data > contract.isMintable\n ··    return : ${ await contractInterface.isMintable() }`);
}

main();
