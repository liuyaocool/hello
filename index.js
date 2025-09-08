(function() {

    // ========= demo ===============================================================
    let htmlList = `
canvas/Tunnel1
canvas/circle04
canvas/circle1
canvas/circle2
canvas/circle3
canvas/dreampoint01
canvas/electric
canvas/flower2
canvas/flowllines
canvas/flowpoint
canvas/hacker01
canvas/kaleidoscope01
canvas/lightning01
canvas/lightning02
canvas/lightning03
canvas/lightning04
canvas/liquid01
canvas/magicCube01
canvas/meteor
canvas/meteorite01
canvas/mouse01
canvas/mouse02
canvas/universe01
canvas/polygon
canvas/rgb
canvas/star1
canvas/wave1
canvas/word
canvas/word2
css/bar01
css/bar02
css/box-shadow
css/button/button01
css/button/button02
css/button/button03
css/button/button04
css/button/button05
css/button/button06
css/button/button07
css/button/button08
css/button/button09
css/button/button10
css/button/button11
css/button/button12
css/button/button13
css/button/button14
css/button/button15
css/button/button16
css/circle01
css/circle02
css/heart
css/phonograph01
css/rain01
css/snow01
css/word01
    `.split('\n');

    let tmp, htmlStr = '';
    htmlList.filter(e => e.trim()).forEach(path => {
        tmp = path.split('/');
        switch(tmp[0]) {
            case "canvas":
                tmp[0] = 'canvas ';
                break;
            default:
                tmp[0] = '';
                break
        }
        htmlStr += `<li><a target="main" href="html/demo/${path}.html">${tmp[0]}${tmp[tmp.length-1]}</a></li>`;
    });
    document.getElementById('demo').innerHTML = htmlStr;

    // ========= font ===============================================================
    fetch('html/font/fontList').then(resp => {
        let htmlStr = '';
        if (resp.ok) resp.text().then(str => {
            str.split('\n').filter(line => line).forEach(line => {
                htmlStr += `<li><a target="main" href="html/font/main.html?${line}">
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