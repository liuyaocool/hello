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