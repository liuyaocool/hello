(function() {

    // ========= demo ===============================================================
    let htmlList = `
    ./canvas/Tunnel1.html
    ./canvas/circle04.html
    ./canvas/circle1.html
    ./canvas/circle2.html
    ./canvas/circle3.html
    ./canvas/dreampoint01.html
    ./canvas/electric.html
    ./canvas/flower2.html
    ./canvas/flowllines.html
    ./canvas/flowpoint.html
    ./canvas/hacker01.html
    ./canvas/kaleidoscope01.html
    ./canvas/lightning01.html
    ./canvas/lightning02.html
    ./canvas/lightning03.html
    ./canvas/lightning04.html
    ./canvas/liquid01.html
    ./canvas/magicCube01.html
    ./canvas/meteor.html
    ./canvas/meteorite01.html
    ./canvas/mouse01.html
    ./canvas/polygon.html
    ./canvas/rgb.html
    ./canvas/star1.html
    ./canvas/wave1.html
    ./canvas/word.html
    ./canvas/word2.html
    ./css/bar01.html
    ./css/bar02.html
    ./css/box-shadow.html
    ./css/button/button01.html
    ./css/button/button02.html
    ./css/button/button03.html
    ./css/button/button04.html
    ./css/button/button05.html
    ./css/button/button06.html
    ./css/button/button07.html
    ./css/button/button08.html
    ./css/button/button09.html
    ./css/button/button10.html
    ./css/button/button11.html
    ./css/button/button12.html
    ./css/button/button13.html
    ./css/button/button14.html
    ./css/button/button15.html
    ./css/button/button16.html
    ./css/circle01.html
    ./css/circle02.html
    ./css/heart.html
    ./css/phonograph01.html
    ./css/rain01.html
    ./css/snow01.html
    ./css/word01.html
    `.split('\n');

    let tmp, htmlStr = '';
    for (let i = 0; i < htmlList.length; i++) {
        if (!htmlList[i]) continue;
        tmp = htmlList[i].split('/')
        switch(tmp[1]) {
            case "canvas":
                tmp[0] = 'canvas ';
                break;
            default:
                tmp[0] = '';
                break
        }
        htmlStr += `<li><a target="main" href="${htmlList[i].replace('./', 'html/demo/')}">${tmp[0]}${tmp[tmp.length-1].split('.')[0]}</a></li>`;
    }
    document.getElementById('demo').innerHTML = htmlStr;

    // ========= font ===============================================================
    fetch('html/font/fontList').then(resp => {
        let htmlStr = '';
        if (resp.ok) resp.text().then(str => {
            str.split('\n').filter(line => line).forEach(line => {
                htmlStr += `<li><a target="main" href="html/font/main.html?a=${line}#${line}">
                    ${line.split('.')[0].split('/')[1]}
                </a></li>`;
            })
            document.getElementById('font').innerHTML = htmlStr;
        });
    })

    // 如果直接在标签src上写 不会触发 load事件
    let hash = location.hash.substring(1);
    document.getElementById('main').src = hash ? hash :  'welcome.html';

    document.onclick = e => {
        switch(e.target.tagName) {
            case "A": 
                if ('main' == e.target.target) {
                    location.hash = e.target.getAttribute('href');
                }
                break;
            default:
                break;
        }
    }
})()

function showMenu(id) {
    var sty = document.getElementById(id).style;
    sty.display = 'none' == sty.display ? '' : 'none';
}