/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const default_network = "matic";
const api_url = process.env.ALCHEMY_API_URL || process.env.API_URL;
const private_key = process.env.TESTNET_PRIVATE_KEY || process.env.PRIVATE_KEY;
const etherscan_api_key = process.env.ETHERSCAN_API_KEY || process.env.POLYGONSCAN_API_KEY;


module.exports = {
    solidity: "0.8.4",
    defaultNetwork: default_network,
    networks: {
        hardhat: {},
        matic: {
            url: api_url,
            accounts: [`${private_key}`]
        }
    },
    etherscan: {
        apiKey: etherscan_api_key,
    },
}