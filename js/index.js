window.onload = function(){
  var audio = new Audio('./sounds/inicio.mp3');
  audio.load();
  setTimeout(function(){
    audio.play();},500);
};
  