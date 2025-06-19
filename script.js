console.log("Hello, World!");

function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

let currentSong = new Audio();
async function getSongs(){
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for(let i=0; i<as.length;i++){
        const element = as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playmusic = (track, pause= false)=>{
    const audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
    if(!pause){
    currentSong.play();
    play.src = "pause.svg";
    }
    document.querySelector(".songInfo").innerHTML = track.replaceAll("%20", " ");
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
}

async function main(){
    
    let songs = await getSongs();
    playmusic(songs[0],true);
    console.log(songs);

    let songUL= document.querySelector(".songList").getElementsByTagName("ul")[0];
    for( const song of songs){
        songUL.innerHTML = songUL.innerHTML+ `<li><img class="invert" src="music.svg" alt="" srcset="">
                            <div class="info">
                               <div>${song.replaceAll("%20", " ")} </div>
                               <div>KR$NA</div> 
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
        
    })

    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src= "pause.svg";
        }
        else{
            currentSong.pause();
            play.src= "play.svg";
        }
    })

    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)} / ${secondsToMinutesAndSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", (e)=>{

        
    })

}

main()