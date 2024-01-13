const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'config/config.env' }); // Load environment variables from config/config.env
const app = express();
const loggerMiddleware = require('./middleware/loggerMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors middleware
const User = require('./model/User');
const connectDB = require ('./config/db');

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const avatarRoutes = require('./routes/avatarRoutes');

const chatRoutes = require('./routes/chatRoutes'); // Add this line

// socket.io
const http = require('http');
const server = http.createServer(app); // Require http module for creating the server
const Message = require('./model/Chat');

app.use('/api', chatRoutes);




// // MongoDB connection
connectDB();


app.get('/', (req, res) => {
  res.send('Welcome to the dating app!');
});

// Middleware`
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(cors());

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// find avatar for story in the frontend
app.use('/', avatarRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket.IO connection handling

const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });


   socket.on('send_message', async (data) => {
     try {
       // Save the message to MongoDB
       const newMessage = new Message(data);
       await newMessage.save();

       // Emit the message to all clients in the room except the sender
       socket.to(data.room).emit('receive_message', data);

       // Update the local state on the sender's side
       io.to(socket.id).emit('receive_message', data);
     } catch (error) {
       console.error('Error saving message to MongoDB:', error);
     }
   });


   
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// workin
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config({ path: 'config/config.env' }); // Load environment variables from config/config.env
// const app = express();
// const loggerMiddleware = require('./middleware/loggerMiddleware');
// const cookieParser = require('cookie-parser');
// const cors = require('cors'); // Import the cors middleware
// const User = require('./model/User');
// const connectDB = require ('./config/db');

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const avatarRoutes = require('./routes/avatarRoutes');


// // socket.io
// const http = require('http');
// const server = http.createServer(app); // Require http module for creating the server
// const chatRoutes = require('./routes/Chat');



// // // MongoDB connection
// connectDB();


// app.get('/', (req, res) => {
//   res.send('Welcome to the dating app!');
// });

// // Middleware`
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(loggerMiddleware);
// app.use(cors());

// app.use('/api', userRoutes);
// app.use('/api/auth', authRoutes);

// // find avatar for story in the frontend
// app.use('/', avatarRoutes);

// // chat
// app.use('/api/chat', chatRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Socket.IO connection handling

// const { Server } = require('socket.io');

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on('join_room', (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on('send_message', (data) => {
//     socket.to(data.room).emit('receive_message', data);
//   });


//   socket.on('disconnect', () => {
//     console.log('User Disconnected', socket.id);
//   });
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config({ path: 'config/config.env' }); // Load environment variables from config/config.env
// const app = express();
// const loggerMiddleware = require('./middleware/loggerMiddleware');
// const cookieParser = require('cookie-parser');
// const cors = require('cors'); // Import the cors middleware
// const User = require('./model/User');
// const connectDB = require('./config/db');

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const avatarRoutes = require('./routes/avatarRoutes');

// // socket.io
// const http = require('http');
// const socketIo = require('socket.io');
// const server = http.createServer(app); // Require http module for creating the server

// // // MongoDB connection
// connectDB;

// app.get('/', (req, res) => {
//   res.send('Welcome to the dating app!');
// });

// // Middleware`
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(loggerMiddleware);
// app.use(cors());

// app.use('/api', userRoutes);
// app.use('/api/auth', authRoutes);

// // find avatar for story in the frontend
// app.use('/', avatarRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Socket.IO connection handling

// const { Server } = require('socket.io');
// app.use(cors());

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on('join_room', (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on('send_message', (data) => {
//     socket.to(data.room).emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User Disconnected', socket.id);
//   });
// });

