define([], function(){
  function Player(x,y,phys){ this.x=x; this.y=y; this.vy=0; this.phys=phys; this.r=18; }
  Player.prototype.flap = function(){ this.vy = this.phys.jumpImpulse; };
  Player.prototype.update = function(dt, canvasH){
    this.vy += this.phys.gravity * dt; if(this.vy>this.phys.maxFall) this.vy=this.phys.maxFall; this.y += this.vy*dt;
    if(this.y < this.r){ this.y=this.r; this.vy=0; }
    if(this.y > canvasH - this.r){ this.y = canvasH - this.r; this.vy=0; }
  };
  Player.prototype.getAABB = function(){ return { x:this.x-this.r, y:this.y-this.r, w:this.r*2, h:this.r*2 }; };
  Player.prototype.draw = function(ctx){
    // Creepy vampire bird/crow
    ctx.save(); ctx.translate(this.x, this.y);
    var t = Date.now() * 0.003;
    var wingFlap = Math.sin(t * 3) * 0.3;
    
    // Shadow/aura
    ctx.fillStyle = "rgba(80, 20, 100, 0.4)";
    ctx.beginPath();
    ctx.ellipse(0, this.r * 0.3, this.r * 1.3, this.r * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Body - dark purple/black
    ctx.fillStyle = "#1a0f1f";
    ctx.strokeStyle = "#4a2858";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.r * 0.7, this.r * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Left wing
    ctx.fillStyle = "#0f0618";
    ctx.strokeStyle = "#2a1838";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-this.r * 0.5, -this.r * 0.2);
    ctx.quadraticCurveTo(-this.r * 1.2, -this.r * 0.3 + wingFlap, -this.r * 1.4, this.r * 0.4 + wingFlap);
    ctx.quadraticCurveTo(-this.r * 1.0, this.r * 0.3, -this.r * 0.5, this.r * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Wing feather details
    for (var i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-this.r * 0.7, -this.r * 0.1 + i * this.r * 0.2);
      ctx.lineTo(-this.r * 1.2, this.r * 0.1 + i * this.r * 0.15 + wingFlap);
      ctx.stroke();
    }
    
    // Right wing
    ctx.beginPath();
    ctx.moveTo(this.r * 0.5, -this.r * 0.2);
    ctx.quadraticCurveTo(this.r * 1.2, -this.r * 0.3 + wingFlap, this.r * 1.4, this.r * 0.4 + wingFlap);
    ctx.quadraticCurveTo(this.r * 1.0, this.r * 0.3, this.r * 0.5, this.r * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    for (var j = 0; j < 3; j++) {
      ctx.beginPath();
      ctx.moveTo(this.r * 0.7, -this.r * 0.1 + j * this.r * 0.2);
      ctx.lineTo(this.r * 1.2, this.r * 0.1 + j * this.r * 0.15 + wingFlap);
      ctx.stroke();
    }
    
    // Head
    ctx.fillStyle = "#1a0f1f";
    ctx.strokeStyle = "#4a2858";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, -this.r * 0.5, this.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Menacing red eyes with glow
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(220, 0, 0, 0.8)";
    ctx.fillStyle = "#dc0000";
    ctx.beginPath();
    ctx.arc(-this.r * 0.25, -this.r * 0.55, this.r * 0.15, 0, Math.PI * 2);
    ctx.arc(this.r * 0.25, -this.r * 0.55, this.r * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Pupil slits
    ctx.fillStyle = "#0a0a0a";
    ctx.beginPath();
    ctx.ellipse(-this.r * 0.25, -this.r * 0.55, this.r * 0.05, this.r * 0.12, 0, 0, Math.PI * 2);
    ctx.ellipse(this.r * 0.25, -this.r * 0.55, this.r * 0.05, this.r * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Sharp hooked beak
    ctx.fillStyle = "#3a3a3a";
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.r * 0.1, -this.r * 0.35);
    ctx.lineTo(this.r * 0.65, -this.r * 0.4);
    ctx.quadraticCurveTo(this.r * 0.75, -this.r * 0.35, this.r * 0.6, -this.r * 0.2);
    ctx.lineTo(this.r * 0.1, -this.r * 0.25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Talons
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-this.r * 0.2, this.r * 0.7);
    ctx.lineTo(-this.r * 0.25, this.r * 1.0);
    ctx.moveTo(-this.r * 0.1, this.r * 0.7);
    ctx.lineTo(-this.r * 0.1, this.r * 1.0);
    ctx.moveTo(this.r * 0.1, this.r * 0.7);
    ctx.lineTo(this.r * 0.1, this.r * 1.0);
    ctx.moveTo(this.r * 0.2, this.r * 0.7);
    ctx.lineTo(this.r * 0.25, this.r * 1.0);
    ctx.stroke();
    
    ctx.restore();
  };
  return Player;
});
