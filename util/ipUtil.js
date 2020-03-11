const os = require('os')

const ip = (function () {
    let [iptable,ifaces] = [[],os.networkInterfaces()]
    for (let dev in ifaces) {
        ifaces[dev].forEach((obj, idx) => {
            if (obj.family == 'IPv4') iptable.push(obj.address)
        });
    } 
    return iptable
})()

module.exports = ip