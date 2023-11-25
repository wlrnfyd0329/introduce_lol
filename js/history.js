var aside = document.querySelector('aside');
var title = document.getElementById("title");
var content_title = document.getElementById("content").querySelectorAll("h1");


function sizeUp() {
    title.style.transform = "scale(1.2)";
};

function sizeDown() {
    title.style.transform = "scale(1)";
};

title.addEventListener('mouseover', sizeUp);

title.addEventListener('mouseout', sizeDown);

title.addEventListener('click', () => {
    sizeDown();
    title.removeEventListener('mouseover', sizeUp);
    title.removeEventListener('mouseout', sizeDown);
    aside.classList.add("moveRight");

    setTimeout(function () {
        aside.classList.add("moveUp");
    }, 1000);

    setTimeout(function () {
        document.getElementsByClassName('title-explain')[0].classList.add("show-title");
        document.getElementById('content').style.display = "block";
        document.getElementById('content').classList.add("show-content");
    }, 1500);
});

content_title[0].addEventListener('click', () => {
    var winner = document.getElementsByClassName("winner")[0];
    var song = document.getElementsByClassName("song")[0];
    if (winner.style.display == 'none') {
        winner.style.display = "block";
        song.style.display = 'none';
    }
    else {
        winner.style.display = "none";
        song.style.display = 'block';
    }
});

content_title[1].addEventListener('click', () => {
    var winner = document.getElementsByClassName("winner")[0];
    var song = document.getElementsByClassName("song")[0];
    if (winner.style.display == 'none') {
        winner.style.display = "block";
        song.style.display = 'none';
    }
    else {
        winner.style.display = "none";
        song.style.display = 'block';
    }
});

function changeVideo(index) {
    var videos = document.getElementsByClassName("video");
    var video_indexs = document.getElementsByClassName("song-year");
    var song_title = document.getElementsByClassName("song")[0].querySelector("h3");
    var song_featuring = document.getElementsByClassName("song")[0].querySelector("h4");

    for(var video of videos) {
        video.querySelector("video").pause();
        video.style.display = "none";
    }
    for(var video_index of video_indexs) {
        video_index.classList.remove("active-video");
    }
    videos[index].style.display = "block";
    video_indexs[index].classList.add("active-video");

    switch (index) {
        case 0:
            song_title.innerText = "GODS";
            song_featuring.innerText = "(ft: NewJeans)"
            break;
        case 1:
            song_title.innerText = "STAR WALKIN'";
            song_featuring.innerText = "(ft: Lil Nas X)"
            break;
        case 2:
            song_title.innerText = "Burn It All Down";
            song_featuring.innerText = "(ft: PVRIS)"
            break;
        case 3:
            song_title.innerText = "Take Over";
            song_featuring.innerText = "(ft: Jeremy McKinnon(A Day To Remember), MAX, Henry)"
            break;
        case 4:
            song_title.innerText = "Phoenix";
            song_featuring.innerText = "(ft: Cailin Russo, Chrissy Costanza)"
            break;
        case 5:
            song_title.innerText = "RISE";
            song_featuring.innerText = "(ft: The Glitch Mob, Mako, and The Word Alive)"
            break;
        case 6:
            song_title.innerText = "Legends Never Die";
            song_featuring.innerText = "(ft: Against The Current)"
            break;
        case 7:
            song_title.innerText = "Ignite";
            song_featuring.innerText = "(ft: Zedd)"
            break;
        case 8:
            song_title.innerText = "Worlds Collide";
            song_featuring.innerText = "(ft: Nicki Taylor)"
            break;
        case 9:
            song_title.innerText = "Warriors";
            song_featuring.innerText = "(ft: Imagine Dragons)"
            break;
    }
}