var Marketplace = artifacts.require("./Marketplace.sol");
//var Collection = artifacts.require("./Collection.sol");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
  //deployer.deploy(Collection,"name", "symbol");
  //.then(() => deployer.deploy(Factory, Collection.address));
};
