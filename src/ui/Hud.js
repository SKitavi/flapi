define(["dojo/dom","dojo/dom-construct","dojo/dom-class","dojo/_base/lang","app/game/Effects"], function(dom, domConstruct, domClass, lang, Effects){
  function Hud(){ this.nodes = { score: dom.byId('score'), best: dom.byId('best'), overlay: dom.byId('overlay') }; }
  Hud.prototype.setScore = function(v, animate){ this.nodes.score.textContent = v; if(animate){ Effects.popGlow(this.nodes.score).play(); } };
  Hud.prototype.setBest = function(v, animate){ this.nodes.best.textContent = 'Best: ' + v; if(animate){ Effects.fadeIn(this.nodes.best, 250).play(); } };
  Hud.prototype.flashGameOver = function(score, best){ var n=this.nodes.overlay; domClass.remove(n,'hidden'); Effects.fadeIn(n, 200).play(); };
  return Hud;
});
