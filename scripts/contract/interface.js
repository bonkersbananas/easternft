module.exports = (() => {
        let network = process.env.DEPLOY_NETWORK;
        let { deployments } = require("../../deployments/addresses.json");
        let { contractAddress } = deployments[network];

        let contractArtifactPath = "artifacts/contracts/NFT.sol/NFT.json";
        let { sourceName, contractName, abi } = require(`../../deployments/${ network }/${ contractArtifactPath }`);

        let alchemyApiUrl = process.env.ALCHEMY_API_URL || process.env.API_URL;
        let privateKey = process.env.TESTNET_PRIVATE_KEY || process.env.PRIVATE_KEY;

        // Provider
        let alchemyProvider = new ethers.providers.AlchemyProvider(network=network);

        // Signer
        let signer = new ethers.Wallet(privateKey, alchemyProvider);

        // Contract interface
        let contractInterface = new ethers.Contract(contractAddress, abi, signer);

        return {
            contractAddress: contractAddress,
            contractInterface: contractInterface,
            contractName: contractName,
        };
    })();

//module.export = { moduleValues };

