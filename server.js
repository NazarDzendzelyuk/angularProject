const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(cors());

//MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nazik1996',
    database: 'myshop'
});

let categories = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS categories (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS categories')
        });
};

categories();

let users = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS users (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'email varchar(50), ' +
        'password varchar(50), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS users')
        });
};

users();


app.get('/cat', function (req, res) {
    connection.query('SELECT * FROM categories', function (err, responce) {
        if (err) throw err;
        console.log('get all categories, length: ' + responce.length);
        res.status(200).send(responce);
    });
});

app.get('/signUp', function (req, res) {
    connection.query('SELECT * FROM users', function (err, response) {
        if (err) throw err;
        console.log('get all users, length' + response.length)
        res.status(200).send(response);
    })
})
app.post('/signUp', function (req, res) {
    connection.query('INSERT INTO users SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('user successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})

let phones = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS phones (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'price int(11), ' +
        'display int(11), ' +
        'camera int(11), ' +
        'ram int(11), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS phones')
        });
};

phones();
app.get('/phones', function (req, res) {
    connection.query('SELECT * FROM phones', function (err, response) {
        if (err) throw err;
        console.log('get all phones, length' + response.length)
        res.status(200).send(response);
    })
})
app.post('/phones', function (req, res) {
    connection.query('INSERT INTO phones SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('phone successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})

let tablets = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS tablets (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'price int(11), ' +
        'display int(11), ' +
        'ram int(11), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS tablets')
        });
};

tablets();
app.get('/tablets', function (req, res) {
    connection.query('SELECT * FROM tablets', function (err, response) {
        if (err) throw err;
        console.log('get all tablets, length' + response.length)
        res.status(200).send(response);
    })
})

let headphones = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS headphones (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'price int(11), ' +
        'connection varchar(50), ' +
        'weight varchar(50), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS headphones')
        });
};

headphones();
app.get('/headphones', function (req, res) {
    connection.query('SELECT * FROM headphones', function (err, response) {
        if (err) throw err;
        console.log('get all headphones, length' + response.length)
        res.status(200).send(response);
    })
})


app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
