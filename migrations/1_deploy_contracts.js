var CollectionHandler = artifacts.require("./CollectionHandler.sol");
var Collection = artifacts.require("./Collection.sol");

module.exports = function(deployer) {
  deployer.deploy(CollectionHandler);
  //deployer.deploy(Collection,"name", "symbol");
  //.then(() => deployer.deploy(Factory, Collection.address));
};
