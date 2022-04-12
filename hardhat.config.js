/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

const alchemyApiUrl = process.env.ALCHEMY_API_URL || process.env.API_URL;
const privateKey = process.env.TESTNET_PRIVATE_KEY || process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || process.env.POLYGONSCAN_API_KEY;

let defaultNetwork = process.env.DEPLOY_NETWORK || 'localhost';
if (defaultNetwork === 'maticmum') {
    defaultNetwork = 'matic';
}
module.exports = {
    solidity: "0.8.4",
    defaultNetwork: defaultNetwork,
    networks: {
        hardhat: {},
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: [`0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e`],
        },
        matic: {
            url: alchemyApiUrl,
            accounts: [`${privateKey}`],
        }
    },
    etherscan: {
        apiKey: etherscanApiKey,
    },
}