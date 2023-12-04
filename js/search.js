
const api_key = 'RGAPI-e7f322cd-4b3e-4df5-832c-bfe7424fa373';
var summoner_info;
var rank_info;
var champion_info;
var champion_data;



function search() {
    document.getElementById("search-content").style.display = "block";
    var searchName = document.getElementById("search-input").value;
    const summoner = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchName}?api_key=${api_key}`;

    fetch(summoner)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            summoner_info = data;
            set_summoner();
            load_date();
        })
        .catch(error => {
            console.error('Error fetching summoner info:', error);
            alert(`불러오기 실패!<br>오류 이유 : ${error}`);
        });
    document.getElementById("search-content").style.display = "block";
}

function load_date() {
    const rank = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_info['id']}?api_key=${api_key}`;
    const champion = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner_info['id']}?api_key=${api_key}`;

    fetch(rank)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            rank_info = data;
            set_rank();
        })
        .catch(error => {
            console.error('Error fetching summoner info:', error);
            alert(`불러오기 실패!<br>오류 이유 : ${error}`);
        });
    fetch(champion)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            champion_info = data;
            set_champion();
        })
        .catch(error => {
            console.error('Error fetching summoner info:', error);
            alert(`불러오기 실패!<br>오류 이유 : ${error}`);
        });
}

function set_summoner() {
    var summoner_name = document.getElementById("summoner-name");
    var summoner_level = document.getElementById("summoner-level");
    var summoner_img = document.getElementById("summoner-img");

    summoner_name.innerText = `${summoner_info['name']}`;
    summoner_level.innerText = `Lv.${summoner_info['summonerLevel']}`;
    summoner_img.src = `http://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/${summoner_info['profileIconId']}.png`;
}

function set_rank() {
    var summoner_rank_img = document.getElementById("rank-img");
    var summoner_rank = document.getElementById("rank");
    var summoner_win = document.getElementById("rank-win");
    var summoner_lose = document.getElementById("rank-lose");
    var summoner_winning_rate = document.getElementById("rank-winning-rate");

    if (rank_info.length == 0) {
        summoner_rank_img.src = ``;
        summoner_rank.innerHTML = `랭크 정보 없음`;
        summoner_win.innerText = ``;
        summoner_lose.innerText = ``;
        summoner_winning_rate.innerText = ``;
    }
    else {
        summoner_rank_img.src = `./icon/rank/${rank_info['0']['tier']}.png`;
        summoner_rank.innerHTML = `${rank_info['0']['tier']} ${rank_info['0']['rank']}<br><span>${rank_info['0']['leaguePoints']} LP</span>`;
        summoner_win.innerText = `${rank_info['0']['wins']} 승`;
        summoner_lose.innerText = `${rank_info['0']['losses']} 패`;
        summoner_winning_rate.innerText = `승률 : ${Math.round((Number(rank_info['0']['wins']) / (Number(rank_info['0']['wins']) + Number(rank_info['0']['losses']))) * 100)}%`;
    }
}

function set_champion() {
    fetch("https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json")
        .then((response) => {
            return response.json();
        })
        .then(data => {
            champion_data = data;
            var champion_mastery = document.getElementById("champion").querySelectorAll("td");
            for (let i = 0; i < 5; i++) {
                for (var j in champion_data['data']) {
                    if (champion_data['data'][j].key == champion_info[i]['championId']) {
                        champion_mastery[i * 3].innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${champion_data.data[j].id}.png"></img>`;
                        champion_mastery[i * 3 + 1].innerHTML = `${champion_data.data[j].name}`;
                        champion_mastery[i * 3 + 2].innerHTML = `숙련도<br>${champion_info[i]['championPoints'].toLocaleString('ko-KR')}점`;
                    };
                }
            }
        })
        .catch(error => {
            console.error('Error fetching summoner info:', error);
            alert(`불러오기 실패!<br>오류 이유 : ${error}`);
        });
}