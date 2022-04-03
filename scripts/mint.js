const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

// console.log(JSON.stringify(contract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="maticmum", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const nftContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


async function main() {
    console.log(`Minting 1 NFT from ${CONTRACT_ADDRESS} ...`);
    const tx = await nftContract.mint({ gasLimit: 100000 });
    console.log("* Transaction ID:", tx.hash);
    await tx.wait().then((receipt) => {

    }, (error) => {
        console.log(error);
        console.log(error.method);
        console.log(error.errorSignature);
    });
    console.log("Done!");
}
main();