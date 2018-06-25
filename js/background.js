function Background(game){
  this.game = game;

  // this.img = new Image();
  // this.img.src = 'img/bg.png';
  this.x = 0;
  this.y = 0;

}

Background.prototype.draw = function(color) {
  // this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  this.game.ctx.save();
  this.game.ctx.fillStyle = color;
  this.game.ctx.fillRect(0,0,this.game.canvas.width, this.game.canvas.heigth);
  this.game.ctx.restore();
};
