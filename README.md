Ironhack World Finals 2018
==========================
# 2D rocket League

https://dmarinsa.github.io/world-cup-finals-2018/



## My biggest Trouble.

  Main issue were physics, too much trouble adding angular response to the ball collision whithout using any  library.

## Biggest Challenge to solve yet?

  Adjusting those collisions to the pixel & "pausing" the execution of the animation when a goal happens.

## What would I do different if I started all over again?

  - Add a better final.
  - Refactor the collisions.
  - I would totally change the visual aspect :)

## A technical detail.

  ```
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
  ```
  ```
    this.ball.speedX = 1.5 * this.car2.speed * Math.cos(this.car2.angle);
    this.ball.speedY = 1.5 * this.car2.speed * Math.sin(this.car2.angle);
  ```
