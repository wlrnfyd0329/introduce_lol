var position_icon = document.getElementsByClassName('position_icon');

function adjustPosition() {
    var top = position_icon[0];
    var jungle = position_icon[1];
    var mid = position_icon[2];
    var adc = position_icon[3];
    var sup = position_icon[4];
    var backgroundPos = document.getElementById("background").getBoundingClientRect();
    var backgroundWidth = backgroundPos.right - backgroundPos.left;
    var backgroundHeight = backgroundPos.bottom - backgroundPos.top;

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
    top.style.left = topLeft + 'px';
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
}

// 페이지 로드 및 화면 크기 변경 이벤트에 대한 이벤트 리스너 등록
window.onload = adjustPosition;
window.addEventListener('resize', adjustPosition);


position_icon[0].addEventListener('click', () => {positionIconClick(0)});
position_icon[1].addEventListener('click', () => {positionIconClick(1)});
position_icon[2].addEventListener('click', () => {positionIconClick(2)});
position_icon[3].addEventListener('click', () => {positionIconClick(3)});
position_icon[4].addEventListener('click', () => {positionIconClick(4)});

