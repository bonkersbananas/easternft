const { contractInterface } = require("./contract/interface");

async function main() {
    let newBaseUrl = '';
    await contractInterface.setBaseURI(newBaseUrl);
}

main();
