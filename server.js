const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // Разрешаем подключения со всех адресов
});

app.use(express.static('public')); // Раздаем фронтенд из папки public

io.on('connection', (socket) => {
    console.log('Пользователь подключился');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Отправляем сообщение всем
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
