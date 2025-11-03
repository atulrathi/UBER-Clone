const mongoose = require('mongoose');
const socketIO = require('socket.io');
const usermodel = require('./Models/User-Model');
const captionmodel = require('./Models/caption');

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    // USER OR CAPTION JOINS
    socket.on('join', async (data) => {
      try {
        const { userID, usertype } = data;

        if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
          console.log('⚠️ Invalid userID received in join:', userID);
          return;
        }

        if (usertype === 'user') {
          await usermodel.findByIdAndUpdate(userID, { socketID: socket.id });
        } else if (usertype === 'caption') {
          await captionmodel.findByIdAndUpdate(userID, { socketID: socket.id });
        }

        console.log(`${usertype} joined with socketID: ${socket.id}`);
      } catch (err) {
        console.error('Error in join event:', err);
      }
    });

    // CAPTION LOCATION UPDATE
    socket.on('location-update-caption', async (data) => {
      try {
        const { userID, location } = data;

        if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
          console.log('⚠️ Invalid caption userID:', userID);
          return;
        }

        if (!location || !location.ltd || !location.lng) {
          console.log('⚠️ Invalid location data:', location);
          return socket.emit('error', { message: 'Invalid location data' });
        }

        await captionmodel.findByIdAndUpdate(
          userID,
          { location: { ltd: location.ltd, lng: location.lng } },
          { new: true }
        );

        console.log(`✅ Location updated for caption ${userID}`);
      } catch (error) {
        console.error('Error in location-update-caption:', error);
      }
    });

    // RIDE ACCEPTED EVENT
    socket.on('ride-accepted', async (data) => {
      try {
        const { userID, captionID } = data;

        if( !userID || !mongoose.Types.ObjectId.isValid(userID) ||
            !captionID || !mongoose.Types.ObjectId.isValid(captionID) ) {
          console.log('⚠️ Invalid userID or captionID in ride-accepted:', data);
          return;
        }

        const user = await usermodel.findById(userID);
        const caption = await captionmodel.findById(captionID);

        if(!user || !caption) {
          console.log('⚠️ User or Caption not found for ride-accepted');
          return;
        };
        console.log(user.fullname, caption.fullname, caption.vehicleDetails);
        sendmessagetosocketid(user.socketID, {
          event: 'rideAccepted',
          data: {
            captionname: caption.fullname,
            captionvehicle: caption.vehicleDetails,
          }
        });

        console.log(` Ride accepted by ${ caption.fullname}, sent to user ${user.fullname}`);
      } catch (error) {
        console.error('Error in ride-accepted event:', error);
      }
    });

    // DISCONNECT
    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });
  });
}

// Helper to send message manually
function sendmessagetosocketid(socketID, message) {
  if (io) {
    io.to(socketID).emit(message.event, message.data);
  } else {
    console.log('⚠️ socket.io not initialized');
  }
}

module.exports = { initializeSocket, sendmessagetosocketid };
