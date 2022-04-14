let { network } = require("hardhat");
const fs = require('fs')

module.exports = (
    () => {
        let networkName = network.name;
        let deployNetwork = networkName === 'localhost' ? 'localhost' : process.env.DEPLOY_NETWORK;
        let { deployments } = require("../../deployments/addresses.json");
        let contractAddress = networkName === 'localhost'
            ? fs.readFileSync('./.dev_contract', 'utf-8')
            : deployments[deployNetwork].contractAddress;

        let contractArtifactPath = "artifacts/contracts/NFT.sol/NFT.json";
        let contractArtifactBase = networkName === 'localhost' ? '../..' : `../../deployments/${ deployNetwork }`;
        let { sourceName, contractName, abi } = require(`${ contractArtifactBase }/${ contractArtifactPath }`);

        let privateKey = network.config.accounts[0];

        // Provider
        let provider = networkName === 'localhost' ? new ethers.providers.JsonRpcProvider(network.config.url) : new ethers.providers.AlchemyProvider(network=deployNetwork);

        // Signer
        let signer = new ethers.Wallet(privateKey, provider);

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

                        if (result && typeof result === "object" && result.hash) {
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
