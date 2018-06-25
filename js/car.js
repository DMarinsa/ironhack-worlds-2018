function Car(game, x,y, angle){
  this.game = game;
  this.x = x;
  this.y = y;
  this.angle = this.degToRadians(angle);
  this.angularSpeed = 0;
  this.speed = 0;
  this.acc = 0;
  this.carSize = 100;
  // this.img = new Image();
  // this.ratio = 900/490;
  // this.img.src = "https://i.pinimg.com/originals/9c/4e/6c/9c4e6cdc5ea03c911967c82f1ea80956.png"
}

Car.prototype.degToRadians= function(n){
  return n*Math.PI/180;
};

Car.prototype.draw = function(color){
  this.game.ctx.save();
  this.game.ctx.translate(this.x, this.y);
  this.game.ctx.rotate(this.angle);
  this.game.ctx.fillStyle = color;
  this.game.ctx.fillRect(0, 0,this.carSize,this.carSize/2);
  this.game.ctx.stroke();
  // this.game.ctx.drawImage(this.img,
  //               -this.carSize*this.ratio/2,
  //               -this.carSize/2, 
  //               this.carSize*this.ratio,this.carSize);
  this.game.ctx.restore();
};

Car.prototype.move = function(){
  if(this.speed>0.2 || this.speed<-0.2){
    this.angle += this.angularSpeed; 
   }
   this.speed += this.acc;
   this.speed *= 0.95;
   this.x += this.speed * Math.cos(this.angle);
   this.y += this.speed * Math.sin(this.angle);
};

Car.prototype.turnAngleSpeed = function(angularSpeed){
  if(this.angularSpeed < this.degToRadians(10) && this.angularSpeed > -this.degToRadians(10)){
    this.angularSpeed += this.degToRadians(angularSpeed);
  }
};

/*
Car.prototype.handleKeyDown = function(key){
  console.log(key);
  switch(key){
    case 38: // Up
     this.acc = -0.5;
     break;
    case 40: // down
     this.acc = 0.5;
     break; 
    case 37: // left
     this.turnAngleSpeed(-1);
     break; 
    case 39: // right
     this.turnAngleSpeed(1);
     break; 
  }
}

Car.prototype.handleKeyUp = function(key){
   switch(key){
    case 38: // Up
     this.acc = 0;
     break;
    case 40: // down
     this.acc = 0;
     break; 
    case 37: // left
     this.angularSpeed = 0;
     break; 
    case 39: // right
     this.angularSpeed = 0;
     break; 
  }
}

document.onkeydown = function(e){
  car.handleKeyDown(e.keyCode);
  car2.handleKeyDown(e.keyCode);
}

document.onkeyup = function(e){
  car.handleKeyUp(e.keyCode);  
  car2.handleKeyUp(e.keyCode);
}
*/