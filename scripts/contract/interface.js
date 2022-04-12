module.exports = (
    () => {
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
        let contract = new ethers.Contract(contractAddress, abi, signer);

        let argsToString = (args) => {
            if (!args || !args.length) { return ''; }
            return args.map((v) => (typeof(v) == 'object' ? Object.keys(v).map((k) => `${ k }=${ JSON.stringify(v[k]) }`).join(", ") : JSON.stringify(v))).reduce((p, k) => [p, k].join(", ") );
        }

        let interfaceWrapper = {
            get: (target, prop, receiver) => {
                return (...args) => {
                    let func_promise = contract[prop](...args);

                    func_promise.then((result) => {
                        console.log("\n");

                        if (result && typeof result === "object") {
                            console.log(`>> fn call > contract.${ prop }(${ argsToString(args) })`);
                            let tx = result;
                            let tx_promise = result.wait();
                            console.log(` · tx wait · ${ tx.hash }`);
                            tx_promise.then((tx_result) => {
                                console.log(` ✓ tx done : success`);
                            });
                            return tx_promise;
                        }

                        console.log(`>>   state > contract.${ prop }(${ argsToString(args) })`);
                        console.log(` ✓  return : ${ result }`);
                        return result;
                    });

                    return func_promise;
                };
            },
        };

        let contractInterface = new Proxy({}, interfaceWrapper);

        return {
            contract: contract,
            contractAddress: contractAddress,
            contractInterface: contractInterface,
            contractName: contractName,
        };
    }
)();
