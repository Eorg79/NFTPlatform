var Collection = artifacts.require("./Collection.sol");
var Factory = artifacts.require("./Factory.sol");

module.exports = function(deployer) {
  deployer.deploy(Collection)
  .then(() => deployer.deploy(Factory, Collection.address));
};
