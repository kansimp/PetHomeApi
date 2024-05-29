import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();
import connection from './config/connectDB';
const app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    let method = req.method;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true to allow credentials (cookies, authorization headers, etc.)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (method == 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection(app);
