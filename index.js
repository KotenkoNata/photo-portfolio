/*Get our elements*/
const player = document.querySelector('.player-container');
const controls = document.querySelector('.player__controls');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const center = player.querySelector('.center');
const ranges = player.querySelector('.player__slider');
const volume = player.querySelector('.volume__button');
const fullscreen = player.querySelector('.fullscreen__button');

/*Functions*/

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  center.classList.remove('isHidden');
}

function updateButton() {
  toggle.children[0].children[0].href.baseVal = this.paused ? `./assets/svg/symbol-defs.svg#icon-play` : `./assets/svg/symbol-defs.svg#icon-pause`;
}

function updateVolume() {
  video.muted = !video.muted;
  volume.children[0].children[0].href.baseVal = video.muted ? `./assets/svg/symbol-defs.svg#icon-mute` : `./assets/svg/symbol-defs.svg#icon-volume`;
}

function hideCenterBtn(){
  center.classList.add('isHidden');
  controls.classList.remove('isHidden');
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration)*100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(e)
}

function goFullScreen(){
  // if (video.requestFullscreen) {
  //   video.requestFullscreen();
  // } else if (video.webkitRequestFullscreen) { /* Safari */
  //   video.webkitRequestFullscreen();
  // } else if (video.msRequestFullscreen) { /* IE11 */
  //   video.msRequestFullscreen();
  // }

  if (video.webkitSupportsFullscreen) video.webkitEnterFullScreen()
    }

/*Hook up the event listeners*/

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click', togglePlay);
center.addEventListener('click', togglePlay);
center.addEventListener('click', hideCenterBtn);

ranges.addEventListener('change',handleRangeUpdate);
ranges.addEventListener('mousemove',handleRangeUpdate);

volume.addEventListener('click', updateVolume);

fullscreen.addEventListener('click',goFullScreen);


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=>{ mousedown && scrub(e)});
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);


console.log(`Score: 60 / 60; 
1. Вёрстка, дизайн, UI +10/10;
2. Кнопка Play/Pause на панели управления +10/10; 
3. Есть прогресс-бар ползунок которого перемещается отображая прогресс проигрывания видео. При перемещении ползунка вручную меняется текущее время проигрывания видео +10/10; 
4. Есть кнопка Volume/Mute при клике по которой можно включить или отключить звук +10/10; 
5. Есть регулятор громкости звука при перемещении ползунка которого можно сделать звук громче или тише +10/10; 
6. Кнопка Play/Pause в центре видео +10/10; 
7. Дополнительный не предусмотренный в задании функционал - возможность открыть видео в полноэкранном режиме +10/10;`)



