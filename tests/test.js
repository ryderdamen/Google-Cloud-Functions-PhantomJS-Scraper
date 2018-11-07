// Simple end-end test
const main = require('../src/index.js')

res = {
    send: (res) => {console.log(res)}
}

req = {
    body: {
        url: "https://developer.mozilla.org/en-US/",
        key: "rydertest"
    }
}

main.main(req, res)