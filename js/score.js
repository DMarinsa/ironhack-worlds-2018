function Score(){
  this.score1=0;
  this.score2=0;
  this.time = 120;
}

Score.prototype.returnLegibleTime = function(){
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

Score.prototype.updateScore = function(id, score){
  document.getElementById(id).innerHTML = score;
};

Score.prototype.updateTime = function(){
  document.getElementById('timer').innerHTML = this.returnLegibleTime();
};