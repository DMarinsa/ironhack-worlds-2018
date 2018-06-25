function Ball(game){
  this.game = game;
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.acc = 0;
  this.radius = 20;
}

Ball.prototype.draw = function(color){
  this.game.ctx.save();
  this.game.ctx.translate(this.game.canvas.width/2+this.radius, this.game.canvas.heigth/2+this.radius);
  //this.game.ctx.drawImage()
  this.game.ctx.fillStyle = color;
  this.game.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
  this.game.restore();
};

Ball.prototype.move = function(){
  this.speed += this.acc;
  this.speed *= 0.95;
  this.x += this.speed;
  this.y += this.speed;
};