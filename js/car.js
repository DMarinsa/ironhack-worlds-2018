function Car(game, x,y, angle){
  this.game = game;
  this.x = x;
  this.y = y;
  this.angle = this.degToRadians(angle);
  this.angularSpeed = 0;
  this.speed = 0;
  this.acc = 0;
  this.mass = 100;
  this.carSize = 100;
  this.img = new Image();
  this.ratio = 1000/646;
  this.img.src = "./images/car.png";
}

Car.prototype.degToRadians= function(n){
  return n*Math.PI/180;
};

Car.prototype.draw = function(){
  this.game.ctx.save();
  this.game.ctx.beginPath();
  this.game.ctx.translate(this.x, this.y);
  this.game.ctx.rotate(this.angle);
  this.game.ctx.strokeStyle = "2px solid yellow";
  this.game.ctx.strokeRect(0,0,this.carSize*this.ratio,this.carSize);
  this.game.ctx.fillStyle = 'pink';
  this.game.ctx.arc(0,0, this.carSize*this.ratio/3,0,Math.PI*2);
  this.game.ctx.fill();
  this.game.ctx.drawImage(this.img,
    -this.carSize*this.ratio/3,
    -this.carSize/2, 
    this.carSize*this.ratio,
    this.carSize);
  this.game.ctx.closePath();
  this.game.ctx.restore();
};

Car.prototype.move = function(){
  if(this.speed>0.4 || this.speed<-0.4){
    this.angle += this.angularSpeed;
   }
   this.speed += this.acc;
   // Friction force
   this.speed *= 0.95;

   // Limits on X Axis
   if(this.x>=0 && this.x <= this.game.canvas.width){
    console.log(this.speed);
    this.x += this.speed * Math.cos(this.angle);
   } else {
     this.acc = 0;
     if(this.x<0){
       this.x=0;
     }else{
       this.x = this.game.canvas.width;
     }
   }

   //Limits on Y Axis
   if(this.y>=0 && this.y <= this.game.canvas.height){
    this.y += this.speed * Math.sin(this.angle);
   } else {
     this.acc = 0;
     if(this.y<0){
       this.y=0
     }else{
       this.y = this.game.canvas.height;
     }
   }
   
};

Car.prototype.turnAngleSpeed = function(angularSpeed){
  if(this.angularSpeed < this.degToRadians(10) && this.angularSpeed > -this.degToRadians(10)){
    this.angularSpeed += this.degToRadians(angularSpeed);
  }
};