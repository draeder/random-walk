const http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html')

var app = http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://qrng.anu.edu.au');
    res.writeHead(200, {
        'Content-Type': 'text/html',
    })
    res.end(index)
})

const Walk = require('./random-walk')
const stock = new Walk
const io = require('socket.io').listen(app)

io.sockets.on('connection', function(socket) {

    stock.on("result", result => {
        socket.emit("result", result)
    })

})

stock.get("walk", {base: 0, type: "positive", scale: 100, rate: 1000, pseudo: false})
app.listen(3001);