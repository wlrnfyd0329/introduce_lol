var btn = document.getElementById('header-btn');

function openMenu() {
    var box = document.getElementById('aside-menu');
    if (box.style.display == 'none') {
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
}

btn.addEventListener('click', openMenu, false);