/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const defaultNetwork = "matic";
const alchemyApiUrl = process.env.ALCHEMY_API_URL || process.env.API_URL;
const privateKey = process.env.TESTNET_PRIVATE_KEY || process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || process.env.POLYGONSCAN_API_KEY;

module.exports = {
    solidity: "0.8.4",
    defaultNetwork: defaultNetwork,
    networks: {
        hardhat: {},
        matic: {
            url: alchemyApiUrl,
            accounts: [`${privateKey}`]
        }
    },
    etherscan: {
        apiKey: etherscanApiKey,
    },
}