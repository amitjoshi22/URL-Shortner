const express = require('express');
const compression = require('compression');
const cors = require('cors');
const fs =  require('fs');
const path = require('path')
const morgan = require('morgan')
const connectDatabase = require('./config/database');
const linksRoute = require('./routes/links')
const redirRoute = require('./routes/redirection')
const app = express()
app.use(compression())
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'})
connectDatabase();
// enabling cors
app.use(cors());
app.options('*', cors());
// body parsing
// support parsing of application/json type post data
app.use(express.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/links',linksRoute)
app.use('/',redirRoute)



const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Port Connent on this ${PORT}`)
})