define(["dojo/_base/lang"], function(lang){
  var controller = null; var account = null; var constants = null;
  function ensure(){
    if(controller) return Promise.resolve();
    // Lazy-load ESM packages via unpkg to avoid bundling for now
    return Promise.all([
      import('https://unpkg.com/@cartridge/controller@latest/dist/index.mjs'),
      import('https://unpkg.com/starknet@latest/dist/index.mjs')
    ]).then(function(mods){
      var Controller = mods[0].default; constants = mods[1].constants;
      controller = new Controller({
        chains: [ { rpcUrl: 'https://api.cartridge.gg/x/starknet/sepolia' } ],
        defaultChainId: constants.StarknetChainId.SN_SEPOLIA
      });
    });
  }
  return {
    connect: function(){
      return ensure().then(function(){ return controller.connect(); }).then(function(acct){ account = acct; return acct; });
    },
    isConnected: function(){ return !!account; },
    submitScore: function(score, contract){
      // Placeholder: requires contract address and ABI/entrypoint. To be completed in integration milestone.
      return ensure().then(function(){ if(!account) throw new Error('Not connected'); /* send tx here */ return { txHash: '0x0' }; });
    },
    fetchLeaderboard: function(contract){ return Promise.resolve([]); }
  };
});
