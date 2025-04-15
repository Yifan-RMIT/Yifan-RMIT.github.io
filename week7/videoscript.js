const myVideo = document.querySelector("#my-video");
console.log(myVideo);

//==================================================
// here is my logic for playing the sound
// first I am fetching the right play button
const playButton = document.querySelector("#play-button");
console.log(playButton);

// playing sound on click
playButton.addEventListener("click", playAudio);

// my play logic
function playAudio() {
  myVideo.play();
}

//==================================================
// here is my logic for pausing the sound
// first I am fetching the right pause button
const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// playing sound on click
pauseButton.addEventListener("click", pauseAudio);

// my play logic
function pauseAudio() {
  myVideo.pause();
}
//==================================================
