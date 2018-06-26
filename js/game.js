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
  this.car1 = new Car(this, this.canvas.width-160, 193, 0);
  this.car2 = new Car(this, 160, (this.canvas.height+80)/2, 180);
  this.ball = new Ball(this, this.canvas.width/2, this.canvas.height/2);
  this.score1 = 0;
  this.score2 = 0;
};

Game.prototype.drawAll = function(){
  this.background.draw();
  this.car1.draw();
  this.car2.draw();
  this.ball.draw('black');
};

Game.prototype.moveAll = function(){
  if(this.collisionWithBall(this.car1, this.ball)){
    if(this.car1.speed<0.5 && this.car1.speed>-0.5){
      this.ball.speedX = -this.ball.speedX;
      this.ball.speedY = -this.ball.speedY;
    } else {
      this.ball.speedX = 1+this.car1.speed*Math.cos(this.car1.angle);
      this.ball.speedY = 1+this.car1.speed*Math.sin(this.car1.angle);
    }
  }
  if(this.collisionWithBall(this.car2, this.ball)){
    if(this.car2.speed<0.5 && this.car2.speed>-0.5){
      this.ball.speedX = -this.ball.speedX;
      this.ball.speedY = -this.ball.speedY;
    } else {
      this.ball.speedX = 1+this.car2.speed*Math.cos(this.car2.angle);
      this.ball.speedY = 1+this.car2.speed*Math.sin(this.car2.angle);
    }
  }
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

Game.prototype.collisionWithBall = function(car,ball){
  var dx = car.x-ball.x;
  var dy = car.y-ball.y;
  var distance = Math.sqrt(dx*dx+dy*dy);
  if(distance>(ball.radius+car.carSize*car.ratio/3)){
    return false;
  }else {
    return true;
  }
};

Game.prototype.collisionBetweenCars = function(car1,car2){
  var dx = car1.x-car2.x;
  var dy = car1.y-car2.y;
  var distance = Math.sqrt(dx*dx+dy*dy);
  if(distance<(car1.carSize+car2.carSize)){
    return true;
  } else {
    return false;
  }
};