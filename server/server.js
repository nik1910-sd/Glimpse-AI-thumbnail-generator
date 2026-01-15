import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB  from './configs/db.js';
import  session from 'express-session';
import MongoStore from 'connect-mongo';
import AuthRouter from './routes/AuthRoutes.js';
import ThumbnailRouter from './routes/ThumbnailsRoutes.js';
import UserRouter from './routes/UserRoutes.js';


await connectDB();

const app = express();

app.use(cors({
  origin:['http://localhost:5173','http://localhost:3000','https://glimpse-umber.vercel.app'],
  credentials : true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
  maxAge :1000*60*60*24,
  httpOnly:true,
  secure:process.env.NODE_ENV ==='production',
  sameSite:'none',
  path:'/'
},
  store: MongoStore.create({
    mongoUrl : process.env.MONGODB_URI,
    collectionName :'sessions'
  }) 
}));

app.use(express.json())

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is Live!');
});

app.use('/api/auth',AuthRouter);
app.use('/api/thumbnail',ThumbnailRouter);
app.use('/api/user',UserRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});