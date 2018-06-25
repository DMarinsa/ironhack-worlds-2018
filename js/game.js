function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this.fps = 60;
  this.reset();
}

Game.prototype.clean= function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.heigth);
};

Game.prototype.start = function(){
  this.animation = window.requestAnimationFrame(this.update);
  
  /* this.interval = setInterval(function(){
    this.clean();
    this.drawAll();
    this.moveAll();
  }.bind(this), 1000/fps); */
};

Game.prototype.update = function(){
  this.clean();
  this.drawAll();
  this.moveAll();
  window.requestAnimationFrame(this.update);
};

Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animation);
  //clearInterval(this.interval);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player1 = new Player(this);
  this.player2 = new Player(this);
  this.ball = new Ball(this);
  this.score1 = 0;
  this.score2 = 0;
};

Game.prototype.drawAll = function(){
  this.player1.draw();
  this.player2.draw();
  this.ball.draw();
};

Game.prototype.moveAll = function(){
  this.player1.move();
  this.player2.move();
  this.ball.move();
};

