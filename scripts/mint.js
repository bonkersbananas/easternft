const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.isMintable();
    await contractInterface.mint();
}

main();
