import express from 'express'
import mysql from 'mysql'
import session from 'express-session'
import path from 'path'
const __dirname = path.resolve();
import bodyParser from 'body-parser'


// MYSQL
let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'siliconv_api'
});
connection.connect();
global.db = connection;


const PORT = 8080;
const app = express();


app.listen(PORT, function() {
    console.log('Server listent port:'+PORT)
    console.log('Root connexion: http://localhost:'+PORT)
})
// IMPORT MIDDLEWARE
import {AuthMiddleware} from "./middleware/auth.middleware.js";
import {UploadMiddleware} from "./middleware/upload.middleware.js";
// IMPORT CONTROLLER
import {GuessController} from "./controllers/guess.controller.js";
import {ApiController} from "./controllers/api.controller.js";
import {UserController} from "./controllers/user.controller.js";
import {AdminController} from "./controllers/admin.controller.js";

app.set(express.static(path.join(__dirname + './views')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
        secret: 'boostaflex at',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 300000 }
    })
);



/* ROUTES GET */
app.get('/', GuessController.getHome)

app.get('/login', GuessController.getLogin)
app.post('/login', UserController.postLogin)

app.get('/register', GuessController.getRegister)
app.post('/register', UserController.postRegister)

app.get('/api/v1/characters', ApiController.allCharacters)

app.get('/dashboard', AuthMiddleware.LoggedIn, UserController.goDashboard)
app.get('/documentation', AuthMiddleware.LoggedIn, UserController.goDocumentation)
app.get('/support', AuthMiddleware.LoggedIn, UserController.goSupport)
app.get('/logout', UserController.userLogout)


app.get('/gestion/add-character', AuthMiddleware.isAdmin, AdminController.goAddCharacter)
let characterStorage = UploadMiddleware.upload('img/img-character');
app.post('/gestion/add-character', characterStorage.single('image'), AdminController.addCharacter)

