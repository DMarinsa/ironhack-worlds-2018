// Constructor function
function Background(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = './images/grass.jpg';
  this.x = 0;
  this.y = 0;

}

// Function used to draw the background and both goal lines
Background.prototype.draw = function () {
  this.game.ctx.save();
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  this.game.ctx.restore();
};
