function filter() {
    var search = document.getElementById("search").value.toLowerCase();
    var champion_list = document.getElementsByClassName("champion-list");

    for (let i = 0; i < champion_list.length; i++) {
        var isSearch = false;
        champion_name = champion_list[i].getElementsByClassName("champion-name");
        for (let j = 0; j < champion_name.length; j++) {
            korean_name = champion_name[j].querySelector("#name").innerHTML;
            english_name = champion_name[j].querySelector("img").src.slice(54,-4);
            if (korean_name.includes(search) || english_name.includes(search)) {
                champion_name[j].style.display = 'inline-block';
                isSearch = true;
            }
            else {
                champion_name[j].style.display = 'none';
            }
        }
        if (isSearch) {
            champion_list[i].style.display = 'block';
        }
        else {
            champion_list[i].style.display = 'none';
        }
    }
}

function moveUrl(i) {
    var name = document.getElementsByClassName("champion-name")[i].querySelector("img").src.slice(54,-4);
    window.open("https://www.leagueoflegends.com/ko-kr/champions/"+name+"/");
}