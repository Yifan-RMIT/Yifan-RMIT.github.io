// This page of JavaScript scripts is for a website that has some interactive effects,
// the kind where you can tap buttons to play, pause, mute, adjust the sound, and change the speed.
// I took some of the things from the web page and added reactions to them, like clicking on them to start the playback,
// or to turn the sound off. Also added a progress bar so you can see where the video has gone, or you can tap the bar to jump around.
// The main reason for doing this was to use code to control the content on the page so that it could move and be manipulated.

document.addEventListener("DOMContentLoaded", function () {
  // Log that script has loaded
  console.log("Script loaded");

  // Get the elements of the page (the ones we want to manipulate)
  // Save the ones we want to move first, like buttons and stuff.

  const mediaElement = document.getElementById("media-element");
  const playButton = document.getElementById("play-button");
  const pauseButton = document.getElementById("pause-button");
  const muteButton = document.getElementById("mute-button");
  const volumeIcon = document.getElementById("volume-icon");
  const volumeSlider = document.getElementById("volume-slider");
  const progressBar = document.getElementById("progress-fill");
  const timeDisplay = document.getElementById("time-display");
  const speedButtons = document.querySelectorAll(".speed-btn");
  const speedDisplay = document.getElementById("speed-display");

  // Define the paths of the icons to be used in different states, e.g. the icon for play is not the same as the one for pause
  // so that when the state changes (e.g. play to pause) I can just change the icon without having to look for the image again each time.

  const iconPaths = {
    play: "assets/icons/play.png",
    pause: "assets/icons/pause.png",
    volumeHigh: "assets/icons/audio.png",
    volumeLow: "assets/icons/low-volume.png",
    volumeMute: "assets/icons/no-audio.png",
  };

  // Log successful element selection
  console.log("Elements selected");

  // Initialize player state
  let isPlaying = false;

  // Format the number of seconds into minutes plus seconds format, like 05:30, this is a good look,
  //  otherwise the original is 123 seconds of such numbers, look too unintuitive, with this function becomes clear

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  // Update the progress of the progress bar so that you can see exactly where the progress line is at the end of the video.
  function updateProgressBar() {
    if (mediaElement.duration) {
      const percentage =
        (mediaElement.currentTime / mediaElement.duration) * 100;
      progressBar.style.width = `${percentage}%`;

      // Update time display
      timeDisplay.textContent = `${formatTime(
        mediaElement.currentTime
      )} / ${formatTime(mediaElement.duration)}`;
    }
  }

  // Play video function, press the button will start the video, it is used to start the playback.
  function playMedia() {
    console.log("Play button clicked");
    mediaElement
      .play()
      .then(() => {
        isPlaying = true;
        playButton.style.display = "none";
        pauseButton.style.display = "flex";
        console.log("Video playing");
      })
      .catch((error) => {
        console.error("Error playing media:", error);
      });
  }

  // This is a function to pause the video. Pressing it stops the video, and is used to interrupt playback.
  function pauseMedia() {
    console.log("Pause button clicked");
    mediaElement.pause();
    isPlaying = false;
    playButton.style.display = "flex";
    pauseButton.style.display = "none";
    console.log("Video paused");
  }

  /**
   * WHAT: Toggle mute function
   * WHY: Mutes/unmutes audio


   */
  function toggleMute() {
    console.log("Mute button clicked");
    mediaElement.muted = !mediaElement.muted;

    // Update volume icon based on mute state
    updateVolumeIcon();

    console.log("Mute toggled:", mediaElement.muted);
  }

  // Swap out the volume icon based on the current volume state, so you can tell if the volume is audible or muted just by looking at the icon.
  function updateVolumeIcon() {
    if (mediaElement.muted) {
      volumeIcon.src = iconPaths.volumeMute;
    } else {
      if (mediaElement.volume < 0.5) {
        volumeIcon.src = iconPaths.volumeLow;
      } else {
        volumeIcon.src = iconPaths.volumeHigh;
      }
    }
  }

  // This is a feature added by original to initialise the speed control,
  //  which allows us to change the speed of the video playback,
  //  like speeding it up or slowing it down.
  function initializeSpeedControls() {
    console.log("Setting up speed controls");

    // Add click event to each speed button
    speedButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Get speed from data-speed attribute
        const speed = parseFloat(this.getAttribute("data-speed"));
        console.log(`Changing speed to ${speed}x`);

        try {
          // Set playback rate
          mediaElement.playbackRate = speed;

          // Update display
          speedDisplay.textContent = speed + "x";

          // Update active button
          speedButtons.forEach((btn) => {
            btn.classList.remove("active");
          });
          this.classList.add("active");

          console.log(`Speed changed to ${speed}x`);
        } catch (error) {
          console.error("Error changing playback speed:", error);
        }
      });
    });
  }

  // Add an event listener to the volume slider, pull it to adjust the volume, and the sound will follow.

  volumeSlider.addEventListener("input", function () {
    mediaElement.volume = this.value;
    console.log(`Volume changed to ${this.value}`);

    // Update volume icon based on new volume
    if (!mediaElement.muted) {
      updateVolumeIcon();
    }
  });

  // The event listener for the play button, the one that makes the video start when you click it.
  playButton.addEventListener("click", playMedia);

  // An event listener for the pause button that stops the video when you press it,
  //  so you can watch it again the next time it's played.
  pauseButton.addEventListener("click", pauseMedia);

  // An event listener for the mute button that turns the sound off and on when you click it, like a mute switch.
  muteButton.addEventListener("click", toggleMute);

  // This is a listener to tap on the progress bar to jump to a certain point in the video,
  // so you can tap on that point if you want to watch it.
  document
    .querySelector(".progress-bar")
    .addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      mediaElement.currentTime = clickPosition * mediaElement.duration;
      console.log(`Jumped to ${formatTime(mediaElement.currentTime)}`);
    });

  // This is a timeupdate event listener that updates the progress bar while the video is playing so that the progress bar keeps moving to keep up with the video.
  mediaElement.addEventListener("timeupdate", updateProgressBar);

  // This is the event where the video's metadata is loaded, and it's used to get the UI ready at the beginning,
  //  so that things like the time and the progress bar can be displayed first.
  mediaElement.addEventListener("loadedmetadata", function () {
    console.log("Video metadata loaded, duration:", mediaElement.duration);

    updateProgressBar();
    initializeSpeedControls();

    // Initially hide pause button
    pauseButton.style.display = "none";
  });

  // This is the event after the video has finished playing, when it finishes playing,
  //  reset the UI a bit, like the buttons and the progress bar will go back to the beginning.
  mediaElement.addEventListener("ended", function () {
    console.log("Video ended");
    pauseMedia();
  });

  // Initial setup
  updateProgressBar();
  console.log("Initial setup complete");
});
