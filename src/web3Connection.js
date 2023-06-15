import Web3 from 'web3';

const web3Connection = async () => {
  let web3;
  
  if (typeof window.ethereum !== 'undefined') {
    // Conexión con MetaMask u otro proveedor del navegador
    web3 = new Web3(window.ethereum);
    try {
      // Solicitar al usuario el permiso para acceder a su cuenta
      await window.ethereum.enable();
    } catch (error) {
      // El usuario rechazó el acceso a su cuenta
      console.error("El usuario rechazó el acceso a su cuenta");
    }
  } else if (typeof window.web3 !== 'undefined') {
    // Conexión con una versión antigua de MetaMask u otro proveedor del navegador
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // Conexión a una red local de desarrollo (Hardhat, Ganache, etc.)
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(provider);
  }

  return web3;
}

export default web3Connection;