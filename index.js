const app = require('express')();
const API = require('./api');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const middlewares = require('./middlewares');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bp = require('body-parser');
require('./models/user');
require('./services/passport');

// env
require('dotenv').config();
// body parser
app.use(bp.json());
// cross origin enabled
app.use(cors());

// configuring cookies
app.use(cookieSession({
  maxAge: 30*24*60*60*1000, // 30 days
  keys: [keys.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

// auth api by instructor
// require('./api/auth')(app); // by instructor


// all our /api calls gets routed here
app.use('/api', API);

if(process.env.NODE_ENV === 'production'){
  // Express will serve up production assets like our main.js file and main.css
  app.use(express.static('client/build'));
  // Express will serve up the index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// just a response with 404 statusCode and a message
app.use("*", middlewares.m404);
// port assigning depending on environment
const PORT = process.env.PORT || 4000;
// MongoDB Connect
mongoose.connect(keys.MONGO_DB_URI)
.then(db => {
  console.log("✔ Connected to MongoDB.");
  // starting to listed to requests on the port in .env or in the deployment env port specified
  app.listen(PORT, error => {
    error
    ?
    console.log("✖ Something went wrong, could not launch server on", PORT)
    :
    console.log("✔ NodeJS/ExpressJS running on port", PORT)
    console.log("✔ ReactJS App running on port 3000")
  })
})
.catch( error => {
  console.log("✖ Could not connect to MongoDB.");
  console.log("✖ Could not launch application without connecting to MongoDB.");
  console.log(error);
})
