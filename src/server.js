const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve('public')))
app.set('views', path.resolve('public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('/index.html');
});

io.on('connection', (socket) => {
    socket.on("msg", (args) => {
        console.log(args)

        io.emit("lorota", args)
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});