console.log("Welcome to Spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let songs = [
    {songName: "Let me love you", filePath: "1.mp3", coverPath: "10.jpg"},
    {songName: "Heyya babes", filePath: "2.mp3", coverPath: "9.jpg"},
    {songName: "Sorry", filePath: "3.mp3", coverPath: "8.jpg"},
    {songName: "Closer", filePath: "4.mp3", coverPath: "7.jpg"},
    {songName: "ice-cream island", filePath: "5.mp3", coverPath: "6.jpg"},
    {songName: "Summer cool vibes", filePath: "6.mp3", coverPath: "5.jpg"},
    {songName: "cold play guess", filePath: "7.mp3", coverPath: "4.jpg"},
    {songName: "Sea beach-go on", filePath: "8.mp3", coverPath: "3.jpg"},
    {songName: "merry mood", filePath: "9.mp3", coverPath: "2.jpg"},
    {songName: "Dabce-Monkey", filePath: "10.mp3", coverPath: "1.jpg"}
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;//to hide the playing gif
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;//to show the playing gif
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);//how much percentage of the song is played
    myProgressBar.value = progress;
});

//whenever the seekbar comes to end the audio changes
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;//to convert % into value
});

const makeAllPLays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        });   
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPLays();
        songIndex = parseInt(e.target.id);
        //by using target we will get the element which is clicked
        //to change the paly/pause option present by the side of songname
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

//to make functional step-forward and step-backward
document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 9){
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
