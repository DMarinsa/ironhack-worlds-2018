function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this.fps = 60;
  this.reset();
  this.setListeners();
}

Game.prototype.clean = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
};

Game.prototype.degToRadians = function (n) {
  return n * Math.PI / 180;
};


Game.prototype.start = function () {
  this.animation = window.requestAnimationFrame(this.update.bind(this));
};

Game.prototype.update = function () {
  this.clean();
  this.drawAll();
  this.moveAll();
  window.requestAnimationFrame(this.update.bind(this));
};

Game.prototype.stop = function () {
  window.cancelAnimationFrame(this.animation);
};

Game.prototype.reset = function () {
  this.background = new Background(this);
  this.car1 = new Car(this, this.canvas.width - 160, 193, 0);
  this.car2 = new Car(this, 160, (this.canvas.height + 80) / 2, 180);
  this.ball = new Ball(this, this.canvas.width / 2, this.canvas.height / 2);
  this.score1 = 0;
  this.score2 = 0;
};

Game.prototype.drawAll = function () {
  this.background.draw();
  this.car1.draw();
  this.car2.draw();
  this.ball.draw('black');
};

Game.prototype.moveAll = function () {
  if (this.collisionWithBall(this.car1, this.ball)) {
    if (this.car1.speed < 0.25 && this.car1.speed > -0.25) {
      // parado
      this.ball.speedX = -this.ball.speedX;
      this.ball.speedY = -this.ball.speedY;
    } else if (this.car1.speed - this.ball.speed > -5 &&
      this.car1.speed - this.ball.speed < 5) {
      // Rebote con coche a baja velocidad;
      this.ball.speedX = -0.5 * this.ball.speedX;
      this.ball.speedY = -0.5 * this.ball.speedY;
    } else {
      //en movimiento
      this.ball.speedX = 1.5 * this.car1.speed * Math.cos(this.car1.angle);
      this.ball.speedY = 1.5 * this.car1.speed * Math.sin(this.car1.angle);
    }
  }
  if (this.collisionWithBall(this.car2, this.ball)) {
    if ((this.car2.speed < 0.25 && this.car2.speed > -0.25)) {
      // Parado
      this.ball.speedX = -this.ball.speedX;
      this.ball.speedY = -this.ball.speedY;
    } else if (this.car2.speed - this.ball.speed > -5 &&
      this.car2.speed - this.ball.speed < 5) {
      // Rebote con coche a baja velocidad;
      this.ball.speedX = -0.5 * this.ball.speedX;
      this.ball.speedY = -0.5 * this.ball.speedY;
    } else {
      //En movimiento
      this.ball.speedX = 1.5 * this.car2.speed * Math.cos(this.car2.angle);
      this.ball.speedY = 1.5 * this.car2.speed * Math.sin(this.car2.angle);
    }
  }
  if (this.collisionBetweenCars(this.car1, this.car2)) {
    var speedControl = this.car1.speed;
    this.car1.x += 1.5 * this.car2.speed * Math.cos(this.car2.angle);
    this.car1.y += 1.5 * this.car2.speed * Math.sin(this.car2.angle);
    this.car2.x += 1.5 * speedControl * Math.cos(this.car1.angle);
    this.car2.y += 1.5 * speedControl * Math.sin(this.car1.angle);
  }
  this.car1.move();
  this.car2.move();
  this.ball.move();
};

Game.prototype.setListeners = function () {
  document.onkeydown = function (e) {
    e.preventDefault();
    switch (e.keyCode) {
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

  document.onkeyup = function (e) {
    e.preventDefault();
    switch (e.keyCode) {
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

Game.prototype.collisionWithBall = function (car, ball) {
  var dx = car.x - ball.x;
  var dy = car.y - ball.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance <= (ball.radius + car.carSize * car.ratio / 3)) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.collisionBetweenCars = function (car1, car2) {
  dx = car1.x - car2.x;
  dy = car1.y - car2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < (car1.ratio * car1.carSize / 3 + car2.ratio * car2.carSize / 3) &&
    distance < (car1.carSize / 2 + car2.carSize / 2)) {
    return true;
  } else {
    return false;
  }
};