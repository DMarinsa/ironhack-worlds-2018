function Ball(game, x, y){
  this.game = game;
  this.x = x;
  this.y = y;
  this.speed = 0;
  this.acc = 0;
  this.radius = 20;
}

Ball.prototype.draw = function(color){
  this.game.ctx.save();
  this.game.ctx.beginPath();
  this.game.ctx.translate(this.x, this.y);
  //this.game.ctx.drawImage()
  this.game.ctx.fillStyle = color;
  this.game.ctx.arc(0,0,this.radius,0,Math.PI*2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
  this.game.ctx.restore();
};

Ball.prototype.move = function(){
  this.speed += this.acc;
  this.speed *= 0.95;
  this.x += this.speed;
  this.y += this.speed;
};