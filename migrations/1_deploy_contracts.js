var Collection = artifacts.require("./Collection.sol");
var CollectionFactory = artifacts.require("./CollectionFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(CollectionFactory);
  //.then(() => deployer.deploy(Factory, Collection.address));
};
