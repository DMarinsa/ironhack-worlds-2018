// Constructor function
function Ball(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.radius = 15;
  this.img = new Image();
  this.img.src = './images/ball.png';
}

// Function to render the ball
Ball.prototype.draw = function (color) {
  this.game.ctx.save();
  this.game.ctx.beginPath();
  this.game.ctx.translate(this.x, this.y);
  this.game.ctx.drawImage(this.img,
    0,
    0,
    this.radius * 2,
    this.radius * 2);
  this.game.ctx.closePath();
  this.game.ctx.restore();
};

// Function to update ball position
Ball.prototype.move = function () {

  //Limits on X Axis
  if ((this.x) > 0 && (this.x + this.radius) < this.game.canvas.width) {
    this.x += this.speedX;
  } else {
    if (this.x -this.radius <= 0) {
      this.x = this.radius;
    }
    if (this.x + this.radius >= this.game.canvas.width) {
      this.x = this.game.canvas.width - this.radius -20;
    }
    this.speedX = -this.speedX;
  }
  this.speedX *= 0.985;

  //Limits on Y Axis

  if ((this.y) > 0 && (this.y + this.radius) < this.game.canvas.height) {
    this.y += this.speedY;
  } else {
    if (this.y -this.radius <= 0) {
      this.y = 50;
    }
    if (this.y + this.radius >= this.game.canvas.height) {
      this.y = this.game.canvas.height - 50;
    }
    this.speedY = -this.speedY;
  }
  this.speedY *= 0.985;
  // vectorial composition to calculate collissions result
  this.speed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));
};

Ball.prototype.collisionWithBall = function (car) {
  var dx = car.x - this.x;
  var dy = car.y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance <= (this.radius + car.radius)) {
    return true;
  } else {
    return false;
  }
};