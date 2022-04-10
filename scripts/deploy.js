async function main() {
    const ContractFactory = await ethers.getContractFactory("NFT");

    // Start deployment, returning a promise that resolves to a contract object
    const contract = await ContractFactory.deploy();
    console.log(contract.address);
 }

 main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });