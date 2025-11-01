define(["dojo/_base/fx","dojo/fx"], function(baseFx, fx){
  return {
    popGlow: function(node){ return baseFx.animateProperty({ node: node, duration: 220, properties: { fontSize: {start: 28, end: 36}, opacity: {start: 1, end: 1} } }); },
    fadeIn: function(node, ms){ return baseFx.fadeIn({ node: node, duration: ms||300 }); },
    fadeOut: function(node, ms){ return baseFx.fadeOut({ node: node, duration: ms||300 }); }
  };
});
