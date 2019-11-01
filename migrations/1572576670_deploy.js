var History = artifacts.require('History');
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(History);
};