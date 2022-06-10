const app = require('express')();
const API = require('./api');
const middlewares = require('./middlewares');
// env
require('dotenv').config();
// cross origin enabled
app.use(cors());
// all our /api calls gets routed here
app.use('/api', API);
// just a response with 404 statusCode and a message
app.use("*", middlewares.m404);
// starting to listed to requests on the port in .env or in the deployment env port specified
app.listen(process.env.PORT, error => {
  error
  ? 
  console.log("!!=> Something went wrong, could not launch server on", process.env.PORT)
  :
  console.log("=> NodeJS/ExpressJS running on port", process.env.PORT)
})
