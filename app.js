var express = require('express')
var fs = require('fs')
const { Spot } = require('@binance/connector')

var app = express()
app.use(express.static("public"))
var server = require('http').Server(app)
var io = require('socket.io')(server)
app.io = io

const PORT = process.env.PORT || 8080
server.listen(PORT, console.log(`Server listening on ${PORT}`))

// Connect to socket
io.on('connection', (socket) => {
    console.log('New connection', socket.id);
})

// Load data from config file
loadConfigFile("./config.json")

function loadConfigFile(file) {
    var obj
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err
        obj = JSON.parse(data)
        // const client = new Spot(data.API_KEY, data.SECRET_KEY, { baseURL: 'https://testnet.binance.vision' })
        const client = new Spot('', '', {
            wsURL: 'wss://stream.binance.com:9443/ws'
        })

        const callbacks = {
            open: () => client.logger.log('open'),
            close: () => client.logger.log('closed'),
            message: data => client.logger.log(data)
            // message: data => app.io.sockets.emit('price', JSON.parse(data)['p'])
        }
        client.aggTradeWS('btcusdt', callbacks)
    })
}

app.post('/post', (req, res) => {
    console.log("Connected to React");
    res.redirect('/')
})

app.post


