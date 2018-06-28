// Constructor function
function Car(game, x, y, angle, imgSrc) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.angle = this.degToRadians(angle);
  this.angularSpeed = 0;
  this.speed = 0;
  this.acc = 0;
  this.mass = 100;
  this.carSize = 60;
  this.img = new Image();
  this.ratio = 717 / 550;
  this.img.src = imgSrc;
  this.center1= [this.x, this.y];
  this.center2= [this.x-this.carSize/2, this.y];
  this.radius = this.carSize*this.ratio/3;
}

// Function to change from degrees to radians
Car.prototype.degToRadians = function (n) {
  return n * Math.PI / 180;
};

// Function to draw car Image
Car.prototype.draw = function () {
  this.game.ctx.save();
  this.game.ctx.beginPath();
  this.game.ctx.translate(this.x, this.y);
  this.game.ctx.rotate(this.angle);
  this.game.ctx.fillStyle = 'yellow';
  this.game.ctx.arc(this.carSize/2,0,this.carSize*this.ratio/3, 0, Math.PI*2);
  this.game.ctx.fill();
  this.game.ctx.drawImage(this.img,
    -this.carSize * this.ratio / 3,
    -this.carSize / 2,
    this.carSize * this.ratio,
    this.carSize);
  this.game.ctx.closePath();
  this.game.ctx.restore();
};

// Function to change, acceleration, speed and finally position of car objects
Car.prototype.move = function () {
  // Minimum speed to turn around
  if (this.speed > 0.4 || this.speed < -0.4) {
    this.angle += this.angularSpeed;
  }
  this.speed += this.acc;
  // Friction force
  this.speed *= 0.95;

  // Limits on X Axis
  if (this.x >= this.carSize && this.x <= this.game.canvas.width - this.carSize) {
    this.x += this.speed * Math.cos(this.angle);
  } else {
    this.acc = 0;
    if (this.x < this.carSize) {
      this.x = this.carSize;
    } else {
      this.x = this.game.canvas.width - this.carSize;
    }
  }

  //Limits on Y Axis
  if (this.y >= this.carSize / 2 && this.y <= this.game.canvas.height - this.carSize / 2) {
    this.y += this.speed * Math.sin(this.angle);
  } else {
    this.acc = 0;
    if (this.y < this.carSize / 2) {
      this.y = this.carSize / 2;
    } else {
      this.y = this.game.canvas.height - this.carSize / 2;
    }
  }

};

// Function to change angular speed
Car.prototype.turnAngleSpeed = function (angularSpeed) {
  if (this.angularSpeed < this.degToRadians(10) && this.angularSpeed > -this.degToRadians(10)) {
    this.angularSpeed += this.degToRadians(angularSpeed);
  }
};