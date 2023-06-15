import Authentication from "../src/contracts/Authentication.json";

const Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Authentication.networks[networkId];

    return new web3.eth.Contract(
        Authentication.abi,
        deployedNetwork && deployedNetwork.address
    );
}

export default Contract;
