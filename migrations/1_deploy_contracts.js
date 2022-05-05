var Marketplace = artifacts.require("./Marketplace.sol");
var Collection = artifacts.require("./Collection.sol");

module.exports = function(deployer) {
  deployer.deploy(Collection)
  deployer.deploy(Marketplace)
};

