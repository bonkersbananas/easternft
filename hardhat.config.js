/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { POLYGONSCAN_API_KEY, API_URL, PRIVATE_KEY } = process.env;


module.exports = {
    solidity: "0.7.3",
    defaultNetwork: "matic",
    networks: {
        hardhat: {},
        matic: {
            url: API_URL,
            accounts: [`${PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: POLYGONSCAN_API_KEY,
    },
}