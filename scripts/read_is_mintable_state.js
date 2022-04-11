const { contractInterface } = require("./contract/interface");

async function main() {
    console.log(`\n>>> read data > contract.isMintable\n ··    return : ${ await contractInterface.isMintable() }`);
}

main();
