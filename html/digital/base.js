async function getPhone() {
    let phone = {};
    let phoneList = ['huawei.json', 'honor.json', 'oppo.json', 'vivo.json', 'apple.json'];
    for (let i = 0, tmp; i < phoneList.length; i++) {
        tmp = await this.getJsonFile('phone/' + phoneList[i]);
        for(let k in tmp) {
            phone[k] = tmp[k];
        }
    }
    return phone;
}

async function getJsonFile(path) {
    return JSON.parse(await fetchTextFile(path));
}