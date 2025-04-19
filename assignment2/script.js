/**
 * WHAT: Crafting Tutorial Media Player JavaScript
 * WHY: Creates interactive functionality for tutorial playback
 * HOW: Using event listeners and DOM manipulation
 * CITATION: Core event handling based on week5, week6, and week7 files
 */

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Log that script has loaded
  console.log("Script loaded");

  /**
   * WHAT: Get DOM element references
   * WHY: Store elements we'll interact with
   * HOW: Using getElementById and querySelector methods
   * CITATION: Based on week5/weather/script.js lines 1-3
   */
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

  /**
   * WHAT: Define icon paths for different states
   * WHY: Makes it easy to update icons when state changes
   * HOW: Using object literal with descriptive keys
   * CITATION: Icons from Icons8 as specified in the assignment
   */
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

  /**
   * WHAT: Format seconds to MM:SS
   * WHY: Creates readable time display
   * HOW: Math operations for minutes and seconds
   * CITATION: Math operations from week5/script.js
   */
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  /**
   * WHAT: Update progress bar
   * WHY: Shows playback progress
   * HOW: Calculate percentage played
   * CITATION: DOM updates from week5/weather/script.js
   */
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

  /**
   * WHAT: Play media function
   * WHY: Starts video playback
   * HOW: Using HTML5 video API
   * CITATION: From week7/videoscript.js lines 11-14
   */
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

  /**
   * WHAT: Pause media function
   * WHY: Pauses video playback
   * HOW: Using HTML5 video API
   * CITATION: From week7/videoscript.js lines 24-27
   */
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
   * HOW: Toggling muted property
   * CITATION: Event handling from week6/week6/blog.post/script.js
   */
  function toggleMute() {
    console.log("Mute button clicked");
    mediaElement.muted = !mediaElement.muted;

    // Update volume icon based on mute state
    updateVolumeIcon();

    console.log("Mute toggled:", mediaElement.muted);
  }

  /**
   * WHAT: Update volume icon based on current volume state
   * WHY: Provides visual feedback on volume level
   * HOW: Changes image source based on volume state
   * CITATION: Using Icons8 icons as specified in assignment
   */
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

  /**
   * WHAT: ORIGINAL FEATURE - Initialize speed controls
   * WHY: Allows playback speed adjustment
   * HOW: Setting playbackRate property
   * CITATION: Event handling from week6/week6/blog.post/script.js
   * SOURCES: HTMLMediaElement.playbackRate - MDN Web Docs
   */
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

  /**
   * WHAT: Event listener for volume slider
   * WHY: Adjusts audio volume
   * HOW: Updates volume property
   * CITATION: From week7/videoscript.js
   */
  volumeSlider.addEventListener("input", function () {
    mediaElement.volume = this.value;
    console.log(`Volume changed to ${this.value}`);

    // Update volume icon based on new volume
    if (!mediaElement.muted) {
      updateVolumeIcon();
    }
  });

  /**
   * WHAT: Play button event listener
   * WHY: Starts playback on click
   * HOW: Calls playMedia function
   * CITATION: From week7/videoscript.js
   */
  playButton.addEventListener("click", playMedia);

  /**
   * WHAT: Pause button event listener
   * WHY: Pauses playback on click
   * HOW: Calls pauseMedia function
   * CITATION: From week7/videoscript.js
   */
  pauseButton.addEventListener("click", pauseMedia);

  /**
   * WHAT: Mute button event listener
   * WHY: Toggles audio muting
   * HOW: Calls toggleMute function
   * CITATION: From week6/week6/blog.post/script.js
   */
  muteButton.addEventListener("click", toggleMute);

  /**
   * WHAT: Progress bar click listener
   * WHY: Enables seeking to position
   * HOW: Calculates click position
   * CITATION: Click handling from week6/week6/blog.post/script.js
   */
  document
    .querySelector(".progress-bar")
    .addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      mediaElement.currentTime = clickPosition * mediaElement.duration;
      console.log(`Jumped to ${formatTime(mediaElement.currentTime)}`);
    });

  /**
   * WHAT: Timeupdate event listener
   * WHY: Updates progress as video plays
   * HOW: Calls updateProgressBar function
   * CITATION: From week7/videoscript.js
   */
  mediaElement.addEventListener("timeupdate", updateProgressBar);

  /**
   * WHAT: Metadata loaded event
   * WHY: Initializes UI when video loads
   * HOW: Calls initialization functions
   * CITATION: From week7/videoscript.js
   */
  mediaElement.addEventListener("loadedmetadata", function () {
    console.log("Video metadata loaded, duration:", mediaElement.duration);

    updateProgressBar();
    initializeSpeedControls();

    // Initially hide pause button
    pauseButton.style.display = "none";
  });

  /**
   * WHAT: Video ended event
   * WHY: Resets UI when video ends
   * HOW: Calls pauseMedia function
   * CITATION: From week7/videoscript.js
   */
  mediaElement.addEventListener("ended", function () {
    console.log("Video ended");
    pauseMedia();
  });

  // Initial setup
  updateProgressBar();
  console.log("Initial setup complete");
});
