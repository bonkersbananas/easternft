const { contractInterface } = require("./contract/interface");

async function main() {
    let options = {};
    if (process.env.DEPLOY_NETWORK !== 'localhost') {
        let provider = new ethers.providers.AlchemyProvider(network=deployNetwork);
        const feeData = await provider.getFeeData();
        options = { gasPrice: feeData.gasPrice };
    }

    await contractInterface.isMintable();
    await contractInterface.toggleMintable(true, options);
    await contractInterface.isMintable();
}

main();
