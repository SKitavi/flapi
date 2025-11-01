define(["dojo/_base/lang"], function(lang){
  function loadImage(src){ return new Promise(function(res, rej){ var img = new Image(); img.onload=function(){res(img)}; img.onerror=rej; img.src=src; }); }
  return {
    loadAll: function(map){
      var keys = Object.keys(map); var out = {}; return Promise.all(keys.map(function(k){
        return loadImage(map[k]).then(function(img){ out[k]=img; });
      })).then(function(){ return out; });
    }
  };
});
