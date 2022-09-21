//var NFTCollection = artifacts.require("./NFTCollection.sol");
var NFTMarketplace = artifacts.require("./NFTMarketplace.sol");
//var Factory = artifacts.require("./Factory.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTMarketplace);
  //deployer.deploy(Factory);
  //deployer.deploy(Collection,"name", "symbol");
  //.then(() => deployer.deploy(Factory, Collection.address));
  //deployer.deploy(NFTCollection)
 //.then(() => deployer.deploy(NFTMarketplace));
 //.then(() => deployer.deploy(NFTMarketplace, NFTCollection.address));
};
