var keyboard = {
  KEY_UP: 38,
  KEY_DOWN: 40,
  KEY_LEFT: 37,
  KEY_RIGHT: 39,
  KEY_W: 87,
  KEY_S: 83,
  KEY_A: 65,
  KEY_D: 68,
  KEY_H: 72,
};

function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this.fpsCounter = 0;
  this.time = 180;
  this.score1 = 0;
  this.score2 = 0;

  //Audio Elements
  this.goalSound = new Audio('./sounds/si.mp3');
  this.vuvuzela = new Audio('./sounds/vuvuzela.mp3');
  this.reset();
  this.setListeners();
}


// Function used to clean the canvas every time it loops
Game.prototype.clean = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
};

// Function to start the game
Game.prototype.start = function () {
  this.animation = window.requestAnimationFrame(this.update.bind(this));
};

// Rendering loop
Game.prototype.update = function () {
  if (this.isGoal(this.ball)) {
    this.goalSound.play();
    this.reset();
  }
  this.fpsCounter++;
  if (this.fpsCounter % 60 == 0) {
    this.time--;
    if (this.time == 0) {
    }
  }

  document.getElementById('timer').innerHTML = this.returnLegibleTime();
  this.clean();
  this.drawAll();
  this.checkCollisions();
  this.moveAll();
  window.requestAnimationFrame(this.update.bind(this));
};

// Function to stop the game
Game.prototype.stop = function () {
  cancelAnimationFrame(this.animation);
  this.animation = undefined;
};

// Function to reset every initial condition
Game.prototype.reset = function () {
  this.background = new Background(this);
  this.car1 = new Car(this, this.canvas.width - 160, 193, 0, './images/car1.png');
  this.car2 = new Car(this, 160, (this.canvas.height + 80) / 2, 180, './images/car2.png');
  this.ball = new Ball(this, this.canvas.width / 2, this.canvas.height / 2);
};

// Function to render each object
Game.prototype.drawAll = function () {
  this.background.draw();
  this.car1.draw();
  this.car2.draw();
  this.ball.draw();
};

// Function to update each position
Game.prototype.moveAll = function () {
  // Update each object
  this.car1.move();
  this.car2.move();
  this.ball.move();
};

Game.prototype.checkCollisions = function () {
  // Check if car 1 collides with ball
  if (this.ball.collisionWithBall(this.car1)) {
    // Bola Parada
    if (this.ball.speedX == 0 &&
      this.ball.speedY == 0 &&
      this.car1.speed < 0.05 &&
      this.car1.speed > -0.05) {
      this.ball.speedX = 2 * this.car1.speed * Math.cos(this.car1.angle);
      this.ball.speedY = 2 * this.car1.speed * Math.sin(this.car1.angle);
    }
    if (this.car1.speed < 0.1 && this.car1.speed > -0.1) {
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
  // Check if car 2 collides with ball
  if (this.ball.collisionWithBall(this.car2)) {
    // Bola Parada
    if (this.ball.speedX == 0 && this.ball.speedY == 0) {
      this.ball.speedX = 2 * this.car1.speed * Math.cos(this.car2.angle);
      this.ball.speedY = 2 * this.car1.speed * Math.sin(this.car2.angle);
    }
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
  // Check if both cars collide
  if (this.car1.collisionBetweenCars(this.car2)) {
    var speedControl = this.car1.speed;
    this.car1.x += 1.5 * this.car2.speed * Math.cos(this.car2.angle);
    this.car1.y += 1.5 * this.car2.speed * Math.sin(this.car2.angle);
    this.car2.x += 1.5 * speedControl * Math.cos(this.car1.angle);
    this.car2.y += 1.5 * speedControl * Math.sin(this.car1.angle);
  }
  if (this.car2.collisionBetweenCars(this.car1)) {
    var speedControl = this.car2.speed;
    this.car2.x += 1.5 * this.car1.speed * Math.cos(this.car1.angle);
    this.car2.y += 1.5 * this.car1.speed * Math.sin(this.car1.angle);
    this.car1.x += 1.5 * speedControl * Math.cos(this.car2.angle);
    this.car1.y += 1.5 * speedControl * Math.sin(this.car2.angle);
  }
};


// Function to set the listeners for each player
Game.prototype.setListeners = function () {
  document.onkeydown = function (e) {
    e.preventDefault();
    switch (e.keyCode) {
      case keyboard.KEY_UP: // Up
        this.car1.acc = -0.5;
        break;
      case keyboard.KEY_DOWN: // down
        this.car1.acc = 0.5;
        break;
      case keyboard.KEY_LEFT: // left
        this.car1.turnAngleSpeed(-1);
        break;
      case keyboard.KEY_RIGHT: // right
        this.car1.turnAngleSpeed(1);
        break;
      case keyboard.KEY_W: // W
        this.car2.acc = -0.5;
        break;
      case keyboard.KEY_S: // S
        this.car2.acc = 0.5;
        break;
      case keyboard.KEY_A: // A
        this.car2.turnAngleSpeed(-1);
        break;
      case keyboard.KEY_D: // D
        this.car2.turnAngleSpeed(1);
        break;
      case keyboard.KEY_H: // D
        this.vuvuzela.play();
        break;
    }
  }.bind(this);

  document.onkeyup = function (e) {
    e.preventDefault();
    switch (e.keyCode) {
      case keyboard.KEY_UP: // Up
        this.car1.acc = 0;
        break;
      case keyboard.KEY_DOWN: // down
        this.car1.acc = 0;
        break;
      case keyboard.KEY_LEFT: // left
        this.car1.angularSpeed = 0;
        break;
      case keyboard.KEY_RIGHT: // right
        this.car1.angularSpeed = 0;
        break;
      case keyboard.KEY_W: // W
        this.car2.acc = 0;
        break;
      case keyboard.KEY_S: // S
        this.car2.acc = 0;
        break;
      case keyboard.KEY_A: // A
        this.car2.angularSpeed = 0;
        break;
      case keyboard.KEY_D: // D
        this.car2.angularSpeed = 0;
        break;
      case keyboard.KEY_H: // D
        this.vuvuzela.pause();
        break;
    }
  }.bind(this);
};

Game.prototype.isGoal = function (ball) {
  var scoreString;
  if (ball.x <= ball.radius &&
    ball.y < this.canvas.height / 2 + 50 &&
    ball.y > this.canvas.height / 2 - 50) {
    this.score2++;
    if (this.score2 < 10) scoreString = '0' + this.score2;
    else scoreString = this.score2;
    document.getElementById('score2').innerHTML = scoreString;
    return true;
  } else if (ball.x >= this.canvas.width - +ball.radius &&
    ball.y < this.canvas.height / 2 + 50 &&
    ball.y > this.canvas.height / 2 - 50) {
    this.score1++;
    if (this.score1 < 10) scoreString = '0' + this.score1;
    else scoreString = this.score1;

    document.getElementById('score1').innerHTML = scoreString;
    return true;
  }
  return false;
};

Game.prototype.returnLegibleTime = function () {
  var seconds = this.time, minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
};