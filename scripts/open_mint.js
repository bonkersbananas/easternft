const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.isMintable();
    await contractInterface.toggleMintable(true);
    await contractInterface.isMintable();
}

main();
