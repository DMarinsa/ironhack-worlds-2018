function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this.fps = 60;
  this.reset();
  this.setListeners();
}

Game.prototype.clean = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.heigth);
};

Game.prototype.start = function(){
  this.animation = window.requestAnimationFrame(this.update.bind(this));
};

Game.prototype.update = function(){
  this.clean();
  this.drawAll();
  this.moveAll();
  window.requestAnimationFrame(this.update.bind(this));
};

Game.prototype.stop = function(){
  window.cancelAnimationFrame(this.animation);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.car1 = new Car(this, this.canvas.width-20, this.canvas.height/2, 180);
  this.car2 = new Car(this, 20, this.canvas.height/2, 0);
  this.ball = new Ball(this, this.canvas.width/2, this.canvas.height/2);
  this.score1 = 0;
  this.score2 = 0;
};

Game.prototype.drawAll = function(){
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

Game.prototype.setListeners = function(){
  document.onkeydown = function(e){
    e.preventDefault();
    switch(e.keyCode){
      case 38: // Up
        this.car1.acc = -0.5;
        break;
      case 40: // down
        this.car1.acc = 0.5;
        break; 
      case 37: // left
        this.car1.turnAngleSpeed(-1);
        break; 
      case 39: // right
        this.car1.turnAngleSpeed(1);
        break;
      case 87: // W
        this.car2.acc = -0.5;
        break;
      case 83: // S
        this.car2.acc = 0.5;
        break; 
      case 65: // A
        this.car2.turnAngleSpeed(-1);
        break; 
      case 68: // D
        this.car2.turnAngleSpeed(1);
        break;
    }
  }.bind(this);

  document.onkeyup = function(e){
    e.preventDefault();
    switch(e.keyCode){
      case 38: // Up
        this.car1.acc = 0;
        break;
      case 40: // down
        this.car1.acc = 0;
        break; 
      case 37: // left
        this.car1.angularSpeed = 0;
        break; 
      case 39: // right
        this.car1.angularSpeed = 0;
        break;
      case 87: // W
        this.car2.acc = 0;
        break;
      case 83: // S
        this.car2.acc = 0;
        break; 
      case 65: // A
        this.car2.angularSpeed = 0;
        break; 
      case 68: // D
        this.car2.angularSpeed = 0;
        break;
    }
  }.bind(this);
};