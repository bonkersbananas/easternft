async function main() {
    const ContractFactory = await ethers.getContractFactory("NFT");
    const contract = await ContractFactory.deploy();
    await contract.deployed();

    // output address where contract is deployed
    console.log(contract.address);
 }

 main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });