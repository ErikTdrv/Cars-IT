require('dotenv').config()
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// npm i node-fetch

const getByVin = async (vin) => {
    try {
        const request = await fetch(`https://car-utils.p.rapidapi.com/vindecoder?vin=${vin?.trim()}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.APITOKEN,
                'X-RapidAPI-Host': 'car-utils.p.rapidapi.com'
            }
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error
    }
}

const getIPInfo = async (ip) => {
    try {
        const request = await fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${ip}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.APITOKEN,
                'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
            }
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error
    }
}
const getUserIP = async () => {
    const request = await fetch('https://api64.ipify.org?format=json')
    const data = await request.json()
    return data
}

module.exports = {
    getUserIP,
    getIPInfo,
    getByVin,
}
