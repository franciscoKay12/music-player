const allLiTags = ultag.querySelectorAll("li");

function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {

    let audioTag = allLiTags[j].querySelector(".audio-duration");

    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
      
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
   
    allLiTags[j].setAttribute("onclick", "clicked(this)");
    
  }

}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex= getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    //
    playingNow();
  }