const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.isMintable();
    await contractInterface.toggleMintable(false);
    await contractInterface.isMintable();
}

main();
