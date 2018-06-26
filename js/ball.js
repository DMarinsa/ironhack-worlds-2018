function Ball(game, x, y){
  this.game = game;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.radius = 20;
  this.img = new Image();
  this.img.src = './images/ball.png';
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
  this.speed *= 0.95;

  //Limits on X Axis
  if( (this.x) > 0 && (this.x+this.radius)<=this.game.canvas.width){
    this.x += this.speedX;
  } else {   
    if(this.x<=0){
      this.x = 1;
    }
    if(this.x+this.radius>=this.game.canvas.width){
      this.x = this.game.canvas.width-this.radius;
    }
    this.speedX = -this.speedX;
  }

  //Limits on Y Axis

  if( (this.y) > 0 && (this.y+this.radius)<=this.game.canvas.height){
    this.y += this.speedY;
  } else {
    console.log(this.y);    
    if(this.y<=0){
      this.y = 1;
    }
    if(this.y+this.radius>=this.game.canvas.height){
      this.y = this.game.canvas.height-25;
    }
    this.speedY = -this.speedY;
  }
};