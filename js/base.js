
// 指定长度
function uuid(len) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var radix = chars.length, uuid = '', i;
    len = len > 0 ? len : 36;
    for (i = 0; i < len; i++) uuid += chars[0 | Math.random() * radix];
    return uuid;
}

/**
 * send http
 * @param option
    {
        method: 'post',
        url: '',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        async: true,
        body: '',
        progress: function(ev) {

        },
        success: function(res) {

        }
    }
 */
function doHttp(option) {
    option = option ? option : {};
    let http = new XMLHttpRequest();
    http.open(option.method ? option.method : "post", option.url,
        false === option.async ? false : true);
    if (option.headers && (typeof option.headers == "object")) {
        for (let headerName in option.headers) {
            http.setRequestHeader(headerName, option.headers[headerName]);
        }
    }
    if (http.upload) {
        http.upload.addEventListener('progress' , function (ev) {
            if (option.progress) {
                option.progress(ev);
            }
        }, false);
    }
    http.onreadystatechange = function (res) {
        switch (http.readyState) {
            case 4:
                if (option.success && (typeof option.success == "function")) {
                    option.success(http.responseText);
                }
                break;
            default: break;
        }
    }
    http.send(option.body ? option.body : null);
}

function fileChooser(multiple, accept, getFileFunc) {
    if (!isFunc(getFileFunc)) return;
    let fileInput = document.createElement('input');
    if (multiple === true) {
        fileInput.multiple = true;
    }
    fileInput.type = 'file';
    if (accept) {
        fileInput.accept = accept;
    }
    fileInput.onchange = function (ev) {
        let file = ev.target.files;
        if (isFunc(getFileFunc)) getFileFunc(file);
    }
    fileInput.click();
}

function getFilePath(file, getPathFunc) {
    if (!isFunc(getPathFunc)) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        getPathFunc(this.result);
    }
}

function fileChoose(multiple, accept) {
    return new Promise((resolve, reject) => {
        let fileInput = document.createElement('input');
        if (multiple === true) {
            fileInput.multiple = true;
        }
        fileInput.type = 'file';
        if (accept) {
            fileInput.accept = accept;
        }
        fileInput.onchange = function (ev) {
            resolve(ev.target.files);
        }
        fileInput.click();
    });
}

function getTextFromFile(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve("");
            return;
        }
        const reader = new FileReader(); // 创建 FileReader 对象
        // 当文件读取成功时的回调
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        reader.onerror = (error) => reject(error);
        // 读取文件内容为文本
        reader.readAsText(file);
    });
}

function isFunc(f) {
    return f && typeof f === 'function';
}

function loadRemoteBody(htmlUrl) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', htmlUrl, false);
    xhr.send();
    let doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
}

function asyncLoadJs(url, scriptOnload) {
    setTimeout(() => {
        let t = Date.now();
        var script = document.createElement('script');
        script.src = url;
        script.defer = true;
        document.body.appendChild(script);
        if(isFunc(scriptOnload)) {
            script.onload = function(e) {
                scriptOnload(e, Date.now() - t);
            }
        }
    }, 500);
}