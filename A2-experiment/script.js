// ✅ 获取元素
const video = document.getElementById('custom-video-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseImg = document.getElementById('play-pause-img');
const progressBar = document.getElementById('progress-bar-fill');
const volumeSlider = document.getElementById('volume-slider');
const bgMusic = document.getElementById('bg-music');

// ✅ 移除默认控件
video.removeAttribute('controls');

// ✅ 播放/暂停功能
playPauseBtn.addEventListener('click', () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = 'https://img.icons8.com/ios-glyphs/30/pause--v1.png';
  } else {
    video.pause();
    playPauseImg.src = 'https://img.icons8.com/ios-glyphs/30/play--v1.png';
  }
});

// ✅ 更新进度条
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

// ✅ 音量控制
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});

// ✅ 自动播放背景音乐
window.addEventListener('load', () => {
  bgMusic.volume = 0.5;

::contentReference[oaicite:5]{index=5}
 
