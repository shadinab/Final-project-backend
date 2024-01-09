
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'config/config.env' }); // Load environment variables from config/config.env
const app = express();
const loggerMiddleware = require('./middleware/loggerMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors middleware
const User = require('./model/User');
const messageRoutes = require('./routes/Chat');

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


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// find avatar for story in the frontend
app.get('/avatars', async (req, res) => {
  try {
    const userData = await User.find({}, 'avatar');
    console.log(userData);
    const avatarUrls = userData.map((user) => user.avatar);
        console.log(avatarUrls);

    res.json(avatarUrls);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//socket.io


// routes
app.use('/api', messageRoutes);


const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


