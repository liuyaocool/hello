const {createApp} = Vue;
const vm = createApp({
    data() {
        return {
            filterWord: '',
            // [statusCode, url, index]
            datas: [],
            /**
             * {
             *  request: {
             *      method: '',
             *      url: '',
             *      httpVersion: '',
             *      headLine: '',
             *      headers: [['key', 'value']],
             *      data: ''
             *  },
             *  response: {
             *      headLine: '',
             *      headers: [['key', 'value']],
             *      data: ''
             *  }
             * }
             */
            allData: [],
            showIdx: -1,
            // 同上
            detail: null,
            dataHandler: null
        };
    },
    methods: {
        getFile() {
            fileChooser().then(file => {
                let fileType = file.name.split('.');
                fileType = fileType[fileType.length-1];
                getTextFromFile(file).then(text => {
                    switch(fileType) {
                        case 'har': this.harDataFill(text); break;
                        default: alert(`file type '${fileType}' not support`); break;
                    }
                });
            });
        },
        harDataFill(text){
            let fileJson = JSON.parse(text);
            console.log(fileJson);
            let datas = [];
            fileJson.log.entries.forEach(d => {
                let dt;
                datas.push(dt = {
                    request: {
                        contentType: '',
                        method: d.request.method,
                        url: d.request.url,
                        httpVersion: d.request.httpVersion,
                        headers: [],
                        data: d.request.postData.text
                    },
                    response: {
                        contentType: '',
                        httpVersion: d.response.httpVersion,
                        status: d.response.status,
                        statusText: d.response.statusText,
                        headers: [],
                        data: d.response.content.text
                    }
                });
                d.request.headers.forEach(h => {
                    if (h.name.toLowerCase() == 'content-type' && h.value.indexOf('application/json') >= 0) {
                        dt.request.data = this.jsonFormat(dt.request.data);
                        dt.request.contentType = 'json';
                    }
                    dt.request.headers.push([h.name, h.value])
                });
                d.response.headers.forEach(h => {
                    if (h.name.toLowerCase() == 'content-type' && h.value.indexOf('application/json') >= 0) {
                        dt.response.data = this.jsonFormat(dt.response.data);
                        dt.response.contentType = 'json';
                    }
                    dt.response.headers.push([h.name, h.value])
                });
            })
            this.allData = datas;
            this.filterDatas();
        },
        filterStatic() {
            this.filterWord = '-.js -.css -.png -.svg -.jpg -.gif';
            this.filterDatas();
        },
        filterDatas() {
            let filterword = (this.filterWord || '').split(" "),
                fdatas = [], d, url, skip, f;
            for (let i = 0; i < this.allData.length; i++) {
                d = this.allData[i];
                url = d.request.url;
                skip = false;
                outfor:
                for (let i = 0; i < filterword.length; i++) {
                    if(!(f = filterword[i])) continue;
                    switch(f[0]) {
                        case "-":
                            if (f.length > 1 && url.indexOf(f.substring(1)) >= 0) {
                                skip = true;
                                break outfor;
                            };
                            break;
                        default:
                            if (url.toLowerCase().indexOf(f.toLowerCase()) < 0) {
                                skip = true;
                                break outfor;
                            }
                    }
                }
                if (!skip) {
                    fdatas.push([d.response.status, url, i]);
                }
            };
            this.datas = fdatas;
        },
        showDetail(idx) {
            this.detail = this.allData[idx];
            this.showIdx = idx;
        },
        closeDetail() {
            this.detail = null;
            this.showIdx = idx;
        },
        jsonFormat(str) {
            return JSON.stringify(JSON.parse(str), null, 4).replaceAll('\n', '<br>').replaceAll(' ', '&nbsp;')
        }
    }
}).mount('#app');