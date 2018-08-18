const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
    res.send({ msg: 'it works' }).status(200);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', data => {
        io.emit('RECEIVE_MESSAGE', data);
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));
