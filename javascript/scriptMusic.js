const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
musicAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector("#duration_slider"),
volume_show = wrapper.querySelector("#volume_show"),
recent_volume = wrapper.querySelector("#volume");

// let musicIndex= 2; First path.
// Load random music on page refresh. Last path.
let musicIndex= Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    //1Playingmu 10mo step.
    playingNow();
});

function loadMusic(indexNumber) {
  musicName.innerText = allMusic[indexNumber - 1].name;
  musicArtist.innerText = allMusic[indexNumber - 1].artist;
  musicImg.src = `images/${allMusic[indexNumber - 1].img}.jpg`;
  musicAudio.src = `song/${allMusic[indexNumber - 1].src}.mp3`;

  timer = setInterval(slider_time, 1000);
  total.innerHTML = allMusic.length;
  present.innerHTML = indexNumber;   
}

function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText= "paused";
  musicAudio.play();
} 

function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText= "play_arrow";
  musicAudio.pause();
} 

playPauseBtn.addEventListener("click", ()=>{
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
  //1Playingmu 17en step.
  playingNow();
});

function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  //1Playingmu 19no step.
  playingNow();
}

function prevMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  //1Playingmu 18vo step.
  playingNow();
}

nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

function change_duration() {
  slider_position = musicAudio.duration * (progressBar.value / 100);
  musicAudio.currentTime = slider_position;
}

function slider_time() {
  let position = 0;
  
  if (!isNaN(musicAudio.duration)) {
    position = musicAudio.currentTime * (100 / musicAudio.duration);
    progressBar.value = position;
  }

let musicCurrentTime = wrapper.querySelector(".current"),
musicDuration = wrapper.querySelector(".finish");

let audioDuration = musicAudio.duration;
let totalMin = Math.floor(audioDuration / 60);
let totalSec = Math.floor(audioDuration % 60);
if (totalSec < 10) {
  totalSec = `0${totalSec}`;
}
musicDuration.innerText = `${totalMin}:${totalSec}`;

let currentMin = Math.floor(musicAudio.currentTime / 60);
let currentSec = Math.floor(musicAudio.currentTime % 60);
if (currentSec < 10) {
  currentSec = `0${currentSec}`;
}
musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

}

const repeatBtn = wrapper.querySelector("#repeat-plist"); 
repeatBtn.addEventListener("click", ()=>{

  let getText = repeatBtn.innerText;
  
  switch (getText) {
    case "repeat":
      repeatBtn.innerText="repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
  
    case "repeat_one":
      repeatBtn.innerText="shuffle";
      repeatBtn.setAttribute("title", "Playback shuffle");
      break;
      
    case "shuffle":
      repeatBtn.innerText="repeat";
      repeatBtn.setAttribute("title", "Playback looped");
      break;
  }

});

musicAudio.addEventListener("ended", ()=>{
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      nextMusic();
      break;
  
    case "repeat_one":
      musicAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
      
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      //1Playingmu 20en step.
      playingNow();
      break;
  }
});

function  volume_change() {
  volume_show.innerHTML = recent_volume.value;
  musicAudio.volume = recent_volume.value / 100;
}

const ultag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  
  // Icreasing index by 1 because in the loadMusic function we've decresed index by-1.
  // `<li li-index="${i}" = 1Playingmu 3er step.
  // "+ 1}">" = 1Playingmu 8vo step.
  let litag = `<li li-index="${i + 1}">
               <div class="row">
               <span>${allMusic[i].name}</span>
               <p>${allMusic[i].artist}</p>
               </div>
               <audio class="${allMusic[i].src}" src="song/${allMusic[i].src}.mp3"></audio>
               <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
              </li>`;

 ultag.insertAdjacentHTML("beforeend", litag);

 let liAudioTag = ultag.querySelector(`.${allMusic[i].src}`);
 let liAudioDuration = ultag.querySelector(`#${allMusic[i].src}`);

 liAudioTag.addEventListener("loadeddata", ()=>{
 let audioDuration = liAudioTag.duration;
 let totalMin = Math.floor(audioDuration / 60);
 let totalSec = Math.floor(audioDuration % 60);
 if (totalSec < 10) {
  totalSec = `0${totalSec}`;
 }
 liAudioDuration.innerText = `${totalMin}:${totalSec}`;
 // 15to step.
 liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
});
  
}

// Playing particular music on particular li clicked. 1Playingmu.
// 1er step.
const allLiTags = ultag.querySelectorAll("li");

 // 8vo step.
 function playingNow() {
    // 2nd step.
    for (let j = 0; j < allLiTags.length; j++) {
    // 12vo step.
    let audioTag = allLiTags[j].querySelector(".audio-duration");
    // 11vo step.
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing")
      // 14en step.
      // audioTag.innerText = "";
      // 16to step.
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    // 5to step.
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
    allLiTags[j].classList.add("playing");
    // 13er step.
    audioTag.innerText = "Playing";
    }
  
   allLiTags[j].setAttribute("onclick", "clicked(this)");
 
  }
 }

// 7mo step.
function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  // 9no step.
  playingNow();
}