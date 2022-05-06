var Collection = artifacts.require("./Collection.sol");
var Factory = artifacts.require("./Factory.sol");

module.exports = function(deployer) {
  deployer.deploy(Factory);
  //.then(() => deployer.deploy(Factory, Collection.address));
};
