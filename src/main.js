define([
  "dojo/dom","dojo/dom-construct","dojo/on","dojo/keys","dojo/_base/lang","dojo/_base/fx","dojo/fx",
  "app/config","app/game/GameEngine","app/ui/Hud","app/web3/CartridgeControllerAdapter"
], function(dom, domConstruct, on, keys, lang, baseFx, fx, config, GameEngine, Hud, Cartridge){
  var canvas = dom.byId("game");
  var ctx = canvas.getContext("2d");
  var hud = new Hud();
  var engine = new GameEngine(canvas, ctx, config, hud);
  var state = { playing:false };

  function play(){
    dom.byId('overlay').classList.add('hidden');
    state.playing = true; engine.start();
  }
  function pause(){ state.playing = !state.playing; state.playing? engine.resume(): engine.pause(); }
  function restart(){ engine.reset(); play(); }

  var btnPlay = dom.byId('btnPlay');
  var btnPause = dom.byId('btnPause');
  var btnRestart = dom.byId('btnRestart');
  var btnConnect = dom.byId('btnConnect');

  on(btnPlay, 'click', play);
  on(btnPause, 'click', pause);
  on(btnRestart, 'click', restart);

  var connectBusy = false;
  on(btnConnect, 'click', function(){ if(connectBusy) return; connectBusy = true; btnConnect.textContent='Connecting…';
    Cartridge.connect().then(function(acct){ btnConnect.textContent='Connected'; }).catch(function(){ btnConnect.textContent='Connect'; }).finally(function(){ connectBusy=false; });
  });

  // Keyboard
  on(document, 'keydown', function(e){
    if(e.keyCode === keys.SPACE || e.keyCode === keys.UP_ARROW){ e.preventDefault(); engine.inputFlap(); }
    else if(e.keyCode === 80){ pause(); } // P
    else if(e.keyCode === 82){ restart(); } // R
  });
  // Touch/Click on canvas
  var flap = lang.hitch(engine, engine.inputFlap);
  on(canvas, 'touchstart', function(e){ e.preventDefault(); flap(); });
  on(canvas, 'click', function(){ flap(); });

  // Start with overlay visible
  baseFx.fadeIn({ node: dom.byId('overlay'), duration: 350 }).play();
});
