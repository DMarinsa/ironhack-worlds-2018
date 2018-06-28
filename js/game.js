var keyboard = {
  KEY_UP: 38,
  KEY_DOWN:40,
  KEY_LEFT: 37,
  KEY_RIGHT: 39,
  KEY_W: 87,
  KEY_S: 83,
  KEY_A: 65,
  KEY_D: 68,
  KEY_H: 0,
};

function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this.fpsCounter = 0;
  this.time = 180;
  this.score1 = 0;
  this.score2 = 0;
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
    this.stop();
    this.reset();
    // animacion
    // resetear objetos a posicion inicial;
  }
  this.fpsCounter++;
  if (this.fpsCounter % 60 == 0) {
    this.time--;
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
  window.cancelAnimationFrame(this.animation);
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

Game.prototype.checkCollisions = function(){
    // Check if car 1 collides with ball
    if (this.collisionWithBall(this.car1, this.ball)) {
      // Bola Parada
      if (this.ball.speedX == 0 && 
          this.ball.speedY == 0 &&
          this.car1.speed < 0.05 &&
          this.car1.speed > -0.05)  {
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
    if (this.collisionWithBall(this.car2, this.ball)) {
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
    if (this.collisionBetweenCars(this.car1, this.car2)) {
      var speedControl = this.car1.speed;
      this.car1.x += 1.5 * this.car2.speed * Math.cos(this.car2.angle);
      this.car1.y += 1.5 * this.car2.speed * Math.sin(this.car2.angle);
      this.car2.x += 1.5 * speedControl * Math.cos(this.car1.angle);
      this.car2.y += 1.5 * speedControl * Math.sin(this.car1.angle);
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
    }
  }.bind(this);
};

// Function to check collisions between 1 car and ball
Game.prototype.collisionWithBall = function (car, ball) {
  // var dx2 = car.x + car.carSize/2 - ball.x;
  var dx1 = car.x - ball.x;
  var dy1 = car.y - ball.y;
  var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  //var distance2 = Math.sqrt(dx2 * dx2 + dy1 * dy1);
  if (distance1 <= (ball.radius + car.carSize*car.ratio/3) /* || distance2 <= (ball.radius + car.carSize*car.ratio/3) */
    ) {
    return true;
  } else {
    return false;
  }
};

// Function to check collisions between cars
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

Game.prototype.isGoal = function (ball) {
  var scoreString;
  if (ball.x <= ball.radius &&
    ball.y < this.canvas.height / 2 + 50 &&
    ball.y > this.canvas.height / 2 - 50) {
    this.score2++;
    if(this.score2 < 10) scoreString = '0'+this.score2;
    else scoreString = this.score2;
    document.getElementById('score2').innerHTML = scoreString;
    return true;
  } else if (ball.x >= this.canvas.width - +ball.radius &&
    ball.y < this.canvas.height / 2 + 50 &&
    ball.y > this.canvas.height / 2 - 50) {
    this.score1++;
    if(this.score1 < 10) scoreString = '0'+this.score1;
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