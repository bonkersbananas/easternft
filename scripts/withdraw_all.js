const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.withdrawAll();
}

main();
