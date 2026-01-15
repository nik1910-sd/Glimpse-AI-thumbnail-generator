import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import AuthRouter from './routes/AuthRoutes.js';
import ThumbnailRouter from './routes/ThumbnailsRoutes.js';
import UserRouter from './routes/UserRoutes.js';

await connectDB();

const app = express();

app.set('trust proxy', 1); 

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://glimpse-umber.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
 
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy does not allow access from this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24,
   
    secure: process.env.NODE_ENV === 'production', // true if on Vercel
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
    httpOnly: true,
    path: '/'
  }
}));

app.use(express.json());

const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  res.send('Server is Live!');
});

app.use('/api/auth', AuthRouter);
app.use('/api/thumbnail', ThumbnailRouter);
app.use('/api/user', UserRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});