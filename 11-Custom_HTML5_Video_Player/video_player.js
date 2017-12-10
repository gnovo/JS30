/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  // `.paused` is the property of `video`, and there is no `.playing` property live on `video`
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // console.log(e) the `MouseEvent` out and you will find the `offsetX` which is relative to the progress `offsetWidth`, use it to calculate the `scrubTime` and then update the video's currentTime
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay); // click the video to play
video.addEventListener('play', updateButton); // update the play button when the video plays
video.addEventListener('pause', updateButton); // update the play button when the video pauses
video.addEventListener('timeupdate', handleProgress); // update the progress bar when the video plays

toggle.addEventListener('click', togglePlay); // click the play button to play
skipButtons.forEach(button => button.addEventListener('click', skip)); // click to skip
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); // handle range input sliders
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // handle range input sliders, for updating real-time, rather than just when we let go of the button

let mousedown = false;
progress.addEventListener('click', scrub); // change the progress bar width
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);