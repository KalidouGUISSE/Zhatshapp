const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Sert les fichiers statiques (ton HTML/CSS/JS client)
app.use(express.static('public'));

// io.on('connection', socket => {
//   console.log('Un utilisateur est connecté');

//   // Réception d’un message du client
//   socket.on('chatMessage', msg => {
//     // Envoie à tous les clients (broadcast)
//     io.emit('chatMessage', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('Utilisateur déconnecté');
//   });
// });

// server.listen(3000, () => {
//   console.log('Serveur lancé sur http://localhost:3000');
// });



io.on('connection', (socket) => {
    console.log('Nouvelle connexion');

    // ✅ Rejoindre une room
    socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} a rejoint ${room}`);
    });

    // ✅ Quitter une room
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`Socket ${socket.id} a quitté ${room}`);
    });

    // ✅ Recevoir un message
    socket.on('chatMessage', (message) => {
        // Renvoyer uniquement aux membres de la room
        socket.to(message.room).emit('chatMessage', {
            ...message,
            auteur: 'Autre utilisateur'
        });
    });
});
