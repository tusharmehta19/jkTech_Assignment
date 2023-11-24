import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import useragent from 'express-useragent';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { databaseConnect } from "./database/databaseConnection.js"
import routes from './routes/routes.js';
import multer from 'multer';
var upload = multer();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes)
// enable cors

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

app.options('*', cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

//capture useragent
app.use(useragent.express());

// Multer
app.use(upload.array());
app.use(express.static('public'));


app.get("/ping", (req, res) => res.send("pong"))

app.get('/', (req, res) => {
    res.send({ express: 'Welcome to Backend' });
});




databaseConnect().then((response) => {
    app.listen(9900, () => console.log(`express server listening at http://localhost:9900`))
    console.log(response)

}).catch((error => {
    console.log(error, "Error Connecting Database")
}))