var position_icon = document.getElementsByClassName('position_icon');

function adjustPosition() {
    var top = position_icon[0];
    var jungle = position_icon[1];
    var mid = position_icon[2];
    var adc = position_icon[3];
    var sup = position_icon[4];
    var backgroundPos = document.getElementById("background").getBoundingClientRect();
    var backgroundWidth = backgroundPos.width;
    var backgroundHeight = backgroundPos.height;

    // 적절한 위치 계산
    var topLeft = backgroundPos.left + backgroundWidth * top.getAttribute('x');
    var topTop = backgroundPos.top + backgroundHeight * top.getAttribute('y');
    
    var jungleLeft = backgroundPos.left + backgroundWidth * jungle.getAttribute('x');
    var jungleTop = backgroundPos.top + backgroundHeight * jungle.getAttribute('y');

    var midLeft = backgroundPos.left + backgroundWidth * mid.getAttribute('x');
    var midTop = backgroundPos.top + backgroundHeight * mid.getAttribute('y');

    var adcLeft = backgroundPos.left + backgroundWidth * adc.getAttribute('x');
    var adcTop = backgroundPos.top + backgroundHeight * adc.getAttribute('y');

    var supLeft = backgroundPos.left + backgroundWidth * sup.getAttribute('x');
    var supTop = backgroundPos.top + backgroundHeight * sup.getAttribute('y');

    // 위치 업데이트
    top.style.left = topLeft + 'px';;
    top.style.top = topTop + 'px';

    jungle.style.left = jungleLeft + 'px';
    jungle.style.top = jungleTop + 'px';

    mid.style.left = midLeft + 'px';
    mid.style.top = midTop + 'px';

    adc.style.left = adcLeft + 'px';
    adc.style.top = adcTop + 'px';

    sup.style.left = supLeft + 'px';
    sup.style.top = supTop + 'px';
}

function positionIconClick(position) {
    for (i = 0; i < 5; i++) {
        if (i == position) position_icon[i].querySelector('img').className = "clickPositionStyle";
        else position_icon[i].querySelector('img').className = "positionStyle";
    }
    document.getElementById('aside-menu').style.display = 'none';
}

// 페이지 로드 및 화면 크기 변경 이벤트에 대한 이벤트 리스너 등록
window.onload = adjustPosition;
window.addEventListener('resize', adjustPosition);

position_icon[0].addEventListener('click', () => {
    positionIconClick(0);
    var explanation = document.querySelector('.explanation');

    explanation.classList.remove('appearText');
    explanation.classList.add('removeText');

    setTimeout(function () {
        explanation.querySelector('.title').innerHTML = "탑(Top)<hr>";
        explanation.querySelector('.explain').innerHTML = "상단 공격로에서 1대1 전투를 치루는 역할군입니다.<br>적 앞에서 물러서지 않고<br>눈에 보이는 모든 적을 섬멸하여<br>팀을 수호하는 <strong style='color: yellow'>용맹한 전사</strong>가 맡는 역할군입니다.";
        explanation.classList.remove('removeText');
        explanation.classList.add('appearText');
    }, 500);
});

position_icon[1].addEventListener('click', () => {
    positionIconClick(1);
    var explanation = document.querySelector('.explanation');

    explanation.classList.remove('appearText');
    explanation.classList.add('removeText');

    setTimeout(function () {
        explanation.querySelector('.title').innerHTML = "정글(Jungle)<hr>";
        explanation.querySelector('.explain').innerHTML = "공격로 사이의 몬스터를 사냥하며<br>아군을 도와 적을 기습하는 역할군입니다.<br>빠른 두뇌회전으로 적과의 수싸움을 통해<br>전장의 흐름을 지배하는<br><strong style='color: yellow'>영리한 지략가</strong>가 맡는 역할군입니다.";
        explanation.classList.remove('removeText');
        explanation.classList.add('appearText');
    }, 500);});
    
position_icon[2].addEventListener('click', () => {
    positionIconClick(2);
    var explanation = document.querySelector('.explanation');

    explanation.classList.remove('appearText');
    explanation.classList.add('removeText');

    setTimeout(function () {
        explanation.querySelector('.title').innerHTML = "미드(Mid)<hr>";
        explanation.querySelector('.explain').innerHTML = "중단 공격로에서 1대1 전투를 치루는 역할군입니다.<br>전장의 중앙에서 팀적으로<br>많은 영향을 끼치기 때문에<br>빠른 상황판단과 실행력을 가진<br><strong style='color: yellow'>다재다능한 해결사</strong>가 맡는 역할군입니다.";
        explanation.classList.add('appearText');
    }, 500);});
    
position_icon[3].addEventListener('click', () => {
    positionIconClick(3);
    var explanation = document.querySelector('.explanation');

    explanation.classList.remove('appearText');
    explanation.classList.add('removeText');

    setTimeout(function () {
        explanation.querySelector('.title').innerHTML = "원딜(AD Carry)<hr>";
        explanation.querySelector('.explain').innerHTML = "하단 공격로에서 2대2 전투를 치루는 역할군입니다.<br>초반에 약하지만 성장 기대치가 가장 높아<br>팀에서 가장 강한 화력을 뿜어낼 수 있습니다.<br>압도적인 무력으로 팀을 승리로 이끄는<br><strong style='color: yellow'>전장의 지배자</strong>가 맡는 역할군입니다.";
        explanation.classList.remove('removeText');
        explanation.classList.add('appearText');
    }, 500);});
    
position_icon[4].addEventListener('click', () => {
    positionIconClick(4);
    var explanation = document.querySelector('.explanation');

    explanation.classList.remove('appearText');
    explanation.classList.add('removeText');

    setTimeout(function () {
        explanation.querySelector('.title').innerHTML = "서폿(Support)<hr>";
        explanation.querySelector('.explain').innerHTML = "하단 공격로에서 2대2 전투를 치루는 역할군입니다.<br>주로 원딜의 성장을 도와주지만<br>아군의 전투가 수월하도록 지원하는 활동도 합니다.<br>눈에 띄지 않지만 뒤에서 묵묵히 아군을 지원하는<br><strong style='color: yellow'>따뜻한 어머니</strong>가 맡는 역할군입니다. ";
        explanation.classList.remove('removeText');
        explanation.classList.add('appearText');
    }, 500);});