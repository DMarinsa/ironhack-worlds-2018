// Constructor function
function Car(game, x, y, angle, imgSrc) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.angle = this.game.degToRadians(angle);
  this.angularSpeed = 0;
  this.speed = 0;
  this.acc = 0;
  this.mass = 100;
  this.carSize = 80;
  this.img = new Image();
  this.ratio = 717 / 550;
  this.img.src = imgSrc;
}

// Function to draw car Image
Car.prototype.draw = function () {
  this.game.ctx.save();
  this.game.ctx.beginPath();
  this.game.ctx.translate(this.x, this.y);
  this.game.ctx.rotate(this.angle);
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
  if (this.angularSpeed < this.game.degToRadians(10) && this.angularSpeed > -this.game.degToRadians(10)) {
    this.angularSpeed += this.game.degToRadians(angularSpeed);
  }
};