const fs = require('fs')
const crypto = require('crypto')


const _registered = JSON.parse(fs.readFileSync('./ingfo/register.json'))


const getRegisteredRandomId = () => {
    return _registered[Math.floor(Math.random() * _registered.length)].id
}

const addRegisteredUser = (userid, name, age, time, serials) => {
    const obj = { id: userid, name: name, age: age, time: time, serial: serials }
    _registered.push(obj)
    fs.writeFileSync('./ingfo/register.json', JSON.stringify(_registered))
}


const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}


const checkRegisteredUser = (userid) => {
    let status = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].id === userid) {
            status = true
        }
    })
    return status
}

module.exports = {
	getRegisteredRandomId,
	addRegisteredUser,
	createSerial,
	checkRegisteredUser
}