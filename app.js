import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import enforce from 'express-sslify'
import cors from 'cors'

const app  = express();

const PORT = process.env.PORT || 3000

app.use(enforce.HTTPS({ trustProtoHeader: true })) // Comment for dev || Uncomment for production

// Middlewares
app.use(bodyParser.json({
	extended: false
}));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cors())

// Middleware to serve Static Files
app.use(express.static('public'));
app.use('/auth', express.static('public'))
app.use('/user', express.static('public'))
app.use('/booking', express.static('public'))
app.use('/booking/:client', express.static('public'))
app.use('/booking/:client/:service', express.static('public'))
app.use('/booking/:client/:service/:staff', express.static('public'))

app.use(cookieSession({
	name: 'eudSession',
	keys: ['some'],
	maxAge: 24 * 60 * 60 * 1000
}))

// Custom middleware to access session data in EJS
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// Set Views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routes
import authRouter from './src/routes/auth.js';
import bookingRouter from './src/routes/booking.js';
import homeRouter from './src/routes/home.js';
import userRouter from './src/routes/user.js';

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/booking', bookingRouter);
app.use('/user', userRouter);

app.get('*', (req, res) => {
	res.send("Not Found");
});

app.listen(PORT, () => {
	console.info(`Listening on port ${PORT}`);
});