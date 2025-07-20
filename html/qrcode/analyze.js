
document.getElementById('result').onpaste = function(ev) {
    let it = ev.clipboardData.items;
    if (it.length < 1 || (it = it[0]).kind != 'file' || !it.type.match(/^image\//i)) {
        return;
    }
    analyzeLocal(it.getAsFile());
}

function analyzeChoose() {
    fileChooser().then(file => analyzeLocal(file));
}

function analyzeLocal(file) {
    document.getElementById('result').value = '解析中。。。';
    analyze(file, text => {
        document.getElementById('result').value = text
    }, path => document.getElementById('uploadPic').src = path);
}

function analyze(file, getResFunc, getPathFunc) {
    if (!file || !isFunc(getResFunc)) return;
    var fr = new FileReader();
    fr.onload = function (ev) {
        let image = new Image();
        image.onload = function (ev1) {
            let cvs = document.createElement('canvas'),
                ctx = cvs.getContext('2d'),
                w = image.width, h = image.height,
                text;
            cvs.width = w;
            cvs.height = h;
            ctx.drawImage(image, 0, 0);
            text = jsQR(ctx.getImageData(0, 0, w, h).data, w, h);
            if(text) {
                getResFunc(text.data)
                return;
            };
            window.qrCli.decode(ev.target.result).then(function (result) {
                getResFunc(result[0]);
            }).catch(e => {
                console.error(e)
                getResFunc(e);
            });
        }
        let src = (image.src = ev.target.result);
        if (isFunc(getPathFunc)) getPathFunc(src);
        // Jimp.read(ev.target.result).then(img => {
        //     console.log(img);
        //     console.log(jsQR(img.bitmap.data, img.bitmap.width, img.bitmap.height));
        // });
    };        
    fr.readAsDataURL(file);
}

let opcvJsUrl = '../../jslib/qrcode/delib2/oepncv.js';
// opcvJsUrl = 'https://cdn.jsdelivr.net/gh/liuyaocool/hello/jslib/qrcode/delib2/oepncv.js';
// opcvJsUrl = 'https://static.clewm.net/cli/js/decode/oepncv.js';

// let opcvCacheKey = 'opcv_';
// if(!localStorage.getItem(opcvCacheKey + 1)) {
//     let partLen = 1024 * 1024;
//     fetch(opcvJsUrl).then(res => {
//         if(!res.ok) return;
//         res.text().then(getText => {
//             for (let i = 0; ; i++) {
//                 let jsPart = getText.substr(partLen * i, partLen)
//                 if (!jsPart) break;
//                 localStorage.setItem(opcvCacheKey + i, jsPart);
//             }
//             eval(getText);
//         });
//     })
// } else {
//     let opcvJs = '';
//     for (let i = 0; ; i++) {
//         if (!localStorage.getItem(opcvCacheKey + i)) break;
//         opcvJs += localStorage.getItem(opcvCacheKey + i);
//     }
//     eval(opcvJs);
// }

// 用此方法才能做到异步
// document.getElementById('delib2').innerText = 'analyze enhance libiary loading...';
// asyncLoadJs(opcvJsUrl, (e, cost) => {
//     document.getElementById('delib2').innerText = `analyze enhance libiary load ok ${cost / 1000}s`;
// });