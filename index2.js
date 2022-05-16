const { Spot } = require('@binance/connector')

const apiKey = ''
const secretKey = ''
const client = new Spot(apiKey, secretKey)

client.account().then(res => client.logger.log(res.data))

function main() {
    console.log('abc');
}

main();