# lol.github.io

[홈페이지](https://yhj0329.github.io/lol.github.io/position.html)  

게임 League of Legends를 소개하는 웹사이트입니다.  
- 로그인은 node.js 서버와 데이터베이스가 열려있지 않아 홈페이지에서 확인할 수 없습니다.
- 전적 검색 화면은 api 키를 매번 갱신할 수 없어 홈페이지에서 확인할 수 없습니다.

## 비고

- node.js 서버와 mysql database를 처음 사용해봐서 어려웠다.
- JavaScript로 API를 사용해 데이터를 다뤘는데 흥미로웠다.
- 원하는 웹사이트를 만들 수 있어서 재밌었다.
- git에서 제공하는 정적 웹 사이트 말고 나중에 항시 작동하는 동적 웹사이트를 만들어 보고 싶다.
- Front-End 와 Back-End 공부가 좀 더 필요하다고 느꼈다.

## 목차

- [주제 선정 이유](#주제-선정-이유)
- [웹페이지 설계도](#웹페이지-설계도)
- [로그인 회원가입 화면](#로그인-회원가입-화면)
- [포지션 소개 화면](#포지션-소개-화면)
- [챔피언 소개 화면](#챔피언-소개-화면)
- [롤드컵 소개 화면](#롤드컵-소개-화면)
- [전적 검색 화면](#전적-검색-화면)
- [DataBase](#database-만들기)
- [Node.js Server](#nodejs-server)
- [git 웹 사이트 이용하는 방법](#git-웹-사이트-이용하는-방법)

## 주제 선정 이유

- 스포츠는 사람들을 하나로 뭉쳐 즐거움을 선사하다.
- 최근에 E-sports가 아시안 게임에서 선택되었다.
- 아시안 게임 종목인 League of Legends를 소개함으로 같이 게임의 정보를 알게 되고 쉽게 접근할 수 있게 된다.

## 웹페이지 설계도

<img width="722" alt="웹페이지 설계도" src="https://github.com/yhj0329/lol.github.io/assets/102153681/f27e4677-ca0b-4d30-b737-193fe1e919cc">

## 로그인 회원가입 화면

https://github.com/yhj0329/lol.github.io/assets/102153681/ced385c6-66dc-49c7-b9fc-e5736e41c097

로그인(login.html), 회원가입(register.html)에서 server에 post를 보내면  
server에서 DataBase를 확인하여 처리한다.

<details>
<summary>Html 코드</summary>

서버에 post 보내기
```html
<form action="login.html" method="POST">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="submit" value="로그인">
</form>
```
</details>

<details>
<summary>JavaScript 코드</summary>

서버에서 정보 처리하기
- server.js
```js
app.post('/login.html', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND userpw = ?', [username, password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('position.html');
                response.end();
            } else {
                response.redirect('loginerror.html');
                response.end();
            }
        });
    } 
    else {
        response.end();
    }
});

app.post('/register.html', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var password2 = request.body.password2;
    if (username && password && password2 && (password == password2)) {
        connection.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length <= 0) {
                connection.query('INSERT INTO user (username, userpw) VALUES(?,?)', [username, password],
                    function (error, data) {
                        if (error)
                            console.log(error);
                        else
                            console.log(data);
                    });
                connection.query('INSERT INTO recentSearch (username) VALUES(?)', [username],
                    function (error, data) {
                        if (error)
                            console.log(error);
                        else
                            console.log(data);
                    });
                response.redirect('registersuccess.html');
            } 
            else {
                response.redirect('registerexist.html');
            }
            response.end();
        });
    } 
    else {
        response.redirect('registererror.html');
        response.end();
    }
});
```
</details>

## 포지션 소개 화면

League of Legends 소개와 역할군 소개

https://github.com/yhj0329/lol.github.io/assets/102153681/13cb44c5-e459-4236-a352-960960b7685b

position.js에서  
웹의 크기가 변경될 때, 요소의 크기 재조정  
역할군 클릭시 발생할 event  


## 챔피언 소개 화면

챔피언 소개와 챔피언 검색

https://github.com/yhj0329/lol.github.io/assets/102153681/579176bd-d75a-4e55-93b5-fa2f7ac02452

<details>
<summary>챔피언 검색과 검색어 삭제 JavaScript 코드</summary>

- champion.js
```js
function filter() {
    document.getElementById("searchClear").style.display = "inline";
    var search = document.getElementById("search").value.toLowerCase();
    var champion_list = document.getElementsByClassName("champion-list");

    for (let i = 0; i < champion_list.length; i++) {
        var isSearch = false;
        champion_name = champion_list[i].getElementsByClassName("champion-name");
        for (let j = 0; j < champion_name.length; j++) {
            korean_name = champion_name[j].querySelector("#name").innerHTML;
            english_name = champion_name[j].querySelector("img").alt;
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

function searchClear() {
    document.getElementById("search").value = "";
    filter();
    document.getElementById("searchClear").style.display = "none";
}
```
</details>

<details>
<summary>클릭시 웹사이트 연결 JavaScript 코드</summary>

- champion.js
```js
function moveUrl(i) {
    var name = document.getElementsByClassName("champion-name")[i].querySelector("img").alt;
    window.open(`https://www.leagueoflegends.com/ko-kr/champions/${name}/`);
}
```

</details>

## 롤드컵 소개 화면

롤드컵 소개

https://github.com/yhj0329/lol.github.io/assets/102153681/bc3d166e-e34a-41cf-bcfb-857f9b78137e

history.js에서 요소의 움직임을 담당하고 있다.

## 전적 검색 화면

전적 검색

https://github.com/yhj0329/lol.github.io/assets/102153681/29071ab2-570c-4cbd-974c-9baa234366ba

<details>
<summary>최근 검색어 JavaScript 코드</summary>
  
데이터베이스에서 저장된 최근 검색어 불러오기
- search.js
```js
fetch("http://127.0.0.1:3000/search.html", {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }, 
    body: new URLSearchParams({
        isLoad: 'true',
    }) })
    .then((response) => {
        return response.json();
    })
    .then(data => {
        var recent = document.getElementById("recentSearch").querySelectorAll("td");
        var num = 0;
        for (let i in data['0']) {
            if (i == "username") continue;
            recent[num++].innerText = data['0'][i];
        }
    })
    .catch(error => {
        console.error('Error fetching summoner info:', error);
    });

function recentSearch(i) {
    var recent = document.getElementById("recentSearch").querySelectorAll("td")[i];
    document.getElementById("search-input").value = recent.innerText;
}
```

데이터베이스에 최근 검색어 저장하기
- search.js
```js
function updateRecent(name) {
    var recent = document.getElementById("recentSearch").querySelectorAll("td");
    var isOverlap = false;
    for(let i = 0; i < 10; i++) {
        if(recent[i].innerText == name) {
            for (let j = i; j > 0; j--) {
                recent[j].innerText = recent[j - 1].innerText;
            }
            recent[0].innerText = name;
            isOverlap = true;
        }
    }
    if (!isOverlap) {
        for (let i = 9; i > 0; i--) {
            recent[i].innerText = recent[i - 1].innerText;
        }
        recent[0].innerText = name;
    }
    fetch("http://127.0.0.1:3000/search.html", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            name0: recent[0].innerText,
            name1: recent[1].innerText,
            name2: recent[2].innerText,
            name3: recent[3].innerText,
            name4: recent[4].innerText,
            name5: recent[5].innerText,
            name6: recent[6].innerText,
            name7: recent[7].innerText,
            name8: recent[8].innerText,
            name9: recent[9].innerText,
        })
    })
        .catch(error => {
            console.error('Error fetching summoner info:', error);
        });
}
```

위의 요청을 서버에서 수행
- server.js
```js
app.post('/search.html', function (request, response) {
    if (request.body.isLoad == 'true') {
        connection.query('SELECT * FROM recentSearch WHERE username = ?', [request.session.username], function (error, results, fields) {
            if (error) throw error;
            response.json(results);
        });
    }
    else{
        connection.query('UPDATE recentSearch SET searchname1 = ? WHERE username = ?;', [request.body.name0, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname2 = ? WHERE username = ?;', [request.body.name1, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname3 = ? WHERE username = ?;', [request.body.name2, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname4 = ? WHERE username = ?;', [request.body.name3, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname5 = ? WHERE username = ?;', [request.body.name4, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname6 = ? WHERE username = ?;', [request.body.name5, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname7 = ? WHERE username = ?;', [request.body.name6, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname8 = ? WHERE username = ?;', [request.body.name7, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname9 = ? WHERE username = ?;', [request.body.name8, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname10 = ? WHERE username = ?;', [request.body.name9, request.session.username],
            function (error, data) { });
    }
});
```
</details>

<details>
<summary>api 사용 JavaScript 코드</summary>

- search.js
```js
function search() {
    var searchName = document.getElementById("search-input").value;
    if (searchName != "") {
        updateRecent(searchName);
        const summoner = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchName}?api_key=${api_key}`;

        fetch(summoner)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                summoner_info = data;
                set_summoner();
                load_date();
                document.getElementById("search-content").style.display = "block";
            })
            .catch(error => {
                console.error('Error fetching summoner info:', error);
                alert(`불러오기 실패! 소환사 이름이 존재하지 않습니다. 오류 이유 : ${error}`);
            });
    }
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
            alert(`불러오기 실패! 오류 이유 : ${error}`);
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
            alert(`불러오기 실패! 오류 이유 : ${error}`);
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
    var rank_type = document.getElementById("rank-type");

    if (rank_info.length == 0) {
        summoner_rank_img.src = ``;
        summoner_rank.innerHTML = `랭크 정보 없음`;
        summoner_win.innerText = ``;
        summoner_lose.innerText = ``;
        summoner_winning_rate.innerText = ``;
    }
    else if (rank_info.length == 1) {
        if (rank_info['0']['queueType'] == "RANKED_SOLO_5x5") {
            rank_type.innerText = "솔로 랭크";
        }
        else {
            rank_type.innerText = "자유 랭크";
        }
        summoner_rank_img.src = `./icon/rank/${rank_info['0']['tier']}.png`;
        summoner_rank.innerHTML = `${rank_info['0']['tier']} ${rank_info['0']['rank']}<br><span>${rank_info['0']['leaguePoints']} LP</span>`;
        summoner_win.innerText = `${rank_info['0']['wins']} 승`;
        summoner_lose.innerText = `${rank_info['0']['losses']} 패`;
        summoner_winning_rate.innerText = `승률 : ${Math.round((Number(rank_info['0']['wins']) / (Number(rank_info['0']['wins']) + Number(rank_info['0']['losses']))) * 100)}%`;
    }
    else {
        rank_type.innerText = "솔로 랭크";
        if (rank_info['0']['queueType'] == "RANKED_SOLO_5x5") {
            summoner_rank_img.src = `./icon/rank/${rank_info['0']['tier']}.png`;
            summoner_rank.innerHTML = `${rank_info['0']['tier']} ${rank_info['0']['rank']}<br><span>${rank_info['0']['leaguePoints']} LP</span>`;
            summoner_win.innerText = `${rank_info['0']['wins']} 승`;
            summoner_lose.innerText = `${rank_info['0']['losses']} 패`;
            summoner_winning_rate.innerText = `승률 : ${Math.round((Number(rank_info['0']['wins']) / (Number(rank_info['0']['wins']) + Number(rank_info['0']['losses']))) * 100)}%`;
        }
        else {
            summoner_rank_img.src = `./icon/rank/${rank_info['1']['tier']}.png`;
            summoner_rank.innerHTML = `${rank_info['1']['tier']} ${rank_info['1']['rank']}<br><span>${rank_info['1']['leaguePoints']} LP</span>`;
            summoner_win.innerText = `${rank_info['1']['wins']} 승`;
            summoner_lose.innerText = `${rank_info['1']['losses']} 패`;
            summoner_winning_rate.innerText = `승률 : ${Math.round((Number(rank_info['1']['wins']) / (Number(rank_info['1']['wins']) + Number(rank_info['1']['losses']))) * 100)}%`;

        }
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
            alert(`불러오기 실패! 오류 이유 : ${error}`);
        });
}
```
</details>

## DataBase 만들기

mysql을 설치하고 실행한다.

- user 정보를 저장할 table 생성
- 최근 전적 검색어를 저장할 table 생성
- username을 key로 두개의 table을 연결

```sql
CREATE DATABASE IF NOT EXISTS lol_page CHARACTER SET utf8 COLLATE utf8_bin;
USE lol_page

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20),
    userpw VARCHAR(100),
    PRIMARY KEY(id)
) ENGINE=MYISAM CHARSET=utf8;

CREATE TABLE IF NOT EXISTS recentSearch ( 
    username VARCHAR(20), 
    searchname1 VARCHAR(100), 
    searchname2 VARCHAR(100), 
    searchname3 VARCHAR(100), 
    searchname4 VARCHAR(100), 
    searchname5 VARCHAR(100), 
    searchname6 VARCHAR(100), 
    searchname7 VARCHAR(100), 
    searchname8 VARCHAR(100), 
    searchname9 VARCHAR(100), 
    searchname10 VARCHAR(100), 
    primary key(username)
);
```

## Node.js Server

server 열기와 database 연결하기  

- server.js
```js
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'rootroot',
    database    : 'lol_page'
})

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.redirect('login.html');
});

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});
```

## git 웹 사이트 이용하는 방법

1. git repository를 만든다  
Repository name : 원하는이름.github.io  
Public 으로 설정
2. repository에 index.html 파일 업로드
3. Settings에서 Code and automation의 마지막 Pages 메뉴를 클릭해서 활성화한다.
4. Pages에 나온 주소로 들어가면 index.html 내용이 나온다.
