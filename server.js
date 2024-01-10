const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'config/config.env' }); // Load environment variables from config/config.env
const app = express();
const loggerMiddleware = require('./middleware/loggerMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors middleware
const User = require('./model/User');

// socket.io
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app); // Require http module for creating the server

// MongoDB connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Welcome to the dating app!');
});

// Middleware`
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// --------------------------------------------------------------------
// Socket.IO connection handling
const { Server } = require('socket.io');
app.use(cors());

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

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// find avatar for story in the frontend
app.get('/avatars', async (req, res) => {
  try {
    const userData = await User.find({}, 'avatar');
    // console.log(userData);
    const avatarUrls = userData.map((user) => user.avatar);
    // console.log(avatarUrls);

    res.json(avatarUrls);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config({ path: 'config/config.env' }); // Load environment variables from config/config.env
// const app = express();
// const loggerMiddleware = require('./middleware/loggerMiddleware');
// const cookieParser = require('cookie-parser');
// const cors = require('cors'); // Import the cors middleware
// const User = require('./model/User');

// // socket.io
// const http = require('http');
// const socketIo = require('socket.io');
// const server = http.createServer(app); // Require http module for creating the server

// // MongoDB connection

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to the dating app!');
// });

// // Middleware`
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(loggerMiddleware);
// app.use(cors());

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');

// app.use('/api', userRoutes);
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// // --------------------------------------------------------------------
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

// // find avatar for story in the frontend
// app.get('/avatars', async (req, res) => {
//   try {
//     const userData = await User.find({}, 'avatar');
//     // console.log(userData);
//     const avatarUrls = userData.map((user) => user.avatar);
//     // console.log(avatarUrls);

//     res.json(avatarUrls);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
