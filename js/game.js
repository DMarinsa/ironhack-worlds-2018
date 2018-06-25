function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this.fps = 60;
  this.reset();
}

Game.prototype.clean = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.heigth);
};

Game.prototype.start = function(){
  //this.animation = window.requestAnimationFrame(this.update);
  
  this.interval = setInterval(function(){
    this.clean();
    this.drawAll();
    this.moveAll();
  }.bind(this), 1000/this.fps);
};

Game.prototype.update = function(){
  this.clean();
  this.drawAll();
  this.moveAll();
  window.requestAnimationFrame(this.update);
};

Game.prototype.stop = function() {
  // window.cancelAnimationFrame(this.animation);
  clearInterval(this.interval);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.car1 = new Car(this, 20, this.canvas.height/2, 0);
  this.car2 = new Car(this, this.canvas.width-20, this.canvas.height/2, 180);
  this.ball = new Ball(this, this.canvas.width/2, this.canvas.height/2);
  console.log(this.ball);
  console.log(this.car1);
  
  this.score1 = 0;
  this.score2 = 0;
};

Game.prototype.drawAll = function(){
  this.clean();
  this.background.draw('green');
  this.car1.draw('orange');
  this.car2.draw('blue');
  this.ball.draw('black');
};

Game.prototype.moveAll = function(){
  this.car1.move();
  this.car2.move();
  this.ball.move();
};

