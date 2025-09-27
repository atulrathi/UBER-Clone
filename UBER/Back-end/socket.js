const socketIO = require('socket.io');
const usermodel = require('./Models/User-Model');
const captionmodel = require('./Models/caption')

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: 'http://localhost:5173/',
            method: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('clint connected :', socket.id);

socket.on('join', async (data) => {
  try {
    const { userID, usertype } = data;

    if (!userID || userID.trim() === "") {
      console.warn("⚠️ Invalid userID received for join:", userID);
      return; // skip update
    }

    if (usertype === 'user') {
      await usermodel.findByIdAndUpdate(userID, { socketID: socket.id });
    } else if (usertype === 'caption') {
      await captionmodel.findByIdAndUpdate(userID, { socketID: socket.id });
    }

    console.log(`${usertype} joined with socketID: ${socket.id}`);
  } catch (err) {
    console.error("Error in join event:", err);
  }
});


        socket.on('disconnect', () => {
            console.log(`clint is disconnect :`, socket.id);
        })
    })
}

function sendmessagetosocketid(socketID, message) {
    if (io) {
        io.to(socketID).emit('message', message);
    } else {
        console.log('socket.io is not initilized .');
    }
}
module.exports = { initializeSocket, sendmessagetosocketid };