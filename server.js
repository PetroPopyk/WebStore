const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 8000;
var mysql = require('mysql');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(cors());
//connected database info
var connection = mysql.createConnection({
    host: '193.93.216.145'
    , user: 'sqlkn15_3_ppr'
    , password: 'kn15_ppr'
    , database: 'sqlkn15_3_ppr'
});
//mysql PRODUCTS database initializing
var initDb = function () {
    connection.query('' + 'CREATE TABLE IF NOT EXISTS items (' + 'id int(11) NOT NULL AUTO_INCREMENT,' + 'name varchar(50), ' + 'price int(11),' + 'PRIMARY KEY(id) )', function (err) {
        if (err) throw err;
    });
};
initDb();
//get all PRODUCTS from database
app.get('/items', function (req, res) {
    connection.query('SELECT * FROM items', function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
    });
});
//mysql Users database initializing
var initDb2 = function () {
    connection.query('' + 'CREATE TABLE IF NOT EXISTS userss (' + 'id int(11) NOT NULL AUTO_INCREMENT,' + 'name varchar(50), ' + 'pass varchar(50),' + 'PRIMARY KEY(id) )', function (err) {
        if (err) throw err;
    });
};
initDb2();
//get all USERS from database
app.get('/users', function (req, res) {
    connection.query('SELECT * FROM userss', function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
    });
});
//add new user - registration
app.post('/userss', function (req, res) {
    connection.query('INSERT INTO userss SET ?', req.body, function (err, result) {
        if (err) throw err;
    });
    res.sendStatus(200);
});
//------------------
//add new product to database
app.post('/items', function (req, res) {
    connection.query('INSERT INTO items SET ?', req.body, function (err, result) {
        if (err) throw err;
    });
    res.sendStatus(200);
});
//delete product from database
app.delete('/items/:id', function (req, res) {
    connection.query('DELETE FROM items WHERE id = ?', req.params.id, function (err) {
        if (err) throw err;
    });
    res.sendStatus(200);
});
//twilio sms verification 
const twilio = require('twilio');
const clientTwilio = new twilio('AC45f99cd39a27291dc51d53af8794eeaf', 'cf095f26aa173dde3b4755df858649ed');
app.post('/testtwilio', function (req, res) {
    clientTwilio.messages.create({
        body: req.body.code
        , to: req.body.number
        , from: '+17087164339'
    }).then((message) => console.log(message.sid));
    res.sendStatus(200);
});
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});