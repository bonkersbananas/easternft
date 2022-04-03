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
    console.log(`Updating isMintable on ${CONTRACT_ADDRESS} ...`);
    console.log("isMintable:", await nftContract.isMintable());

    const tx = await nftContract.toggleMintable(true);
    console.log("* Transaction ID:", tx.hash);
    await tx.wait();

    console.log("isMintable now:", await nftContract.isMintable());
}
main();