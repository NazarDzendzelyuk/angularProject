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


let users = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS users (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'email varchar(50), ' +
        'password varchar(50), ' +
        'status int(11), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS users')
        });
};

users();

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
app.get('/signUp/:email', function (req, res) {
    connection.query('SELECT * FROM users  WHERE email = ?', req.params.email, function (err, rows) {
        if (err) throw err;
        console.log('get user, email: ' + req.params.email);
        res.status(200).send(rows);
    });
});
app.put('/signUp/:email', function (req, res) {
    connection.query('UPDATE users SET status= ? WHERE email= ?', [req.body.status, req.params.email], function (err) {
        if (err) throw err;
        console.log('user updated email: ' + req.params.email)
    })
    res.sendStatus(200);
})

let phones = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS phones (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'model varchar(50), ' +
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
app.get('/phones/:name', function (req, res) {
    connection.query('SELECT * FROM phones  WHERE name = ?', req.params.name, function (err, rows) {
        if (err) throw err;
        console.log('get phone, name: ' + req.params.name);
        res.status(200).send(rows);
    });
});
app.post('/phones', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO phones SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('phone successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})

app.delete('/phones/:id', function (req, res) {
    connection.query('DELETE FROM phones WHERE id= ?', req.params.id, function (err) {
        if (err) throw err;
        console.log('phone deleted with id: ' + req.body.id)
    })
    res.sendStatus(200);
})

app.put('/phones/:id', function (req, res) {
    connection.query('UPDATE phones SET name= ?,model=?, price= ?, display= ?, camera= ?, ram= ? WHERE id= ?', [req.body.name, req.body.model, req.body.price, req.body.display, req.body.camera, req.body.ram, req.params.id], function (err) {
        if (err) throw err;
        console.log('phone updated id: ' + req.params.id)
    })
    res.sendStatus(200);
})

let tablets = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS tablets (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'model varchar(50), ' +
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

app.get('/tablets/:name', function (req, res) {
    connection.query('SELECT * FROM tablets  WHERE name = ?', req.params.name, function (err, rows) {
        if (err) throw err;
        console.log('get tablet, name: ' + req.params.name);
        res.status(200).send(rows);
    });
});

app.post('/tablets', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO tablets SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('tablet successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})

app.delete('/tablets/:id', function (req, res) {
    connection.query('DELETE FROM tablets WHERE id= ?', req.params.id, function (err) {
        if (err) throw err;
        console.log('tablet deleted with id: ' + req.body.id)
    })
    res.sendStatus(200);
})

app.put('/tablets/:id', function (req, res) {
    connection.query('UPDATE tablets SET name= ?,model=?, price= ?, display= ?, ram= ? WHERE id= ?', [req.body.name, req.body.model, req.body.price, req.body.display, req.body.ram, req.params.id], function (err) {
        if (err) throw err;
        console.log('tablet updated id: ' + req.params.id)
    })
    res.sendStatus(200);
})

let headphones = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS headphones (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'model varchar(50), ' +
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

app.get('/headphones/:name', function (req, res) {
    connection.query('SELECT * FROM headphones  WHERE name = ?', req.params.name, function (err, rows) {
        if (err) throw err;
        console.log('get headphones, name: ' + req.params.name);
        res.status(200).send(rows);
    });
});

let comments = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS comments (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'email varchar(50), ' +
        'time varchar (50), ' +
        'comment varchar(50), ' +
        'name varchar(50), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS comments')
        });
}
comments()
app.get('/comments', function (req, res) {
    connection.query('SELECT * FROM comments', function (err, response) {
        if (err) throw err;
        console.log('get all comments, length' + response.length)
        res.status(200).send(response);
    })
})

let categories = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS categories (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'source varchar (50), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS categories')
        });
}
categories()
app.get('/categories', function (req, res) {
    connection.query('SELECT * FROM categories', function (err, response) {
        if (err) throw err;
        console.log('get all categories, length' + response.length)
        res.status(200).send(response);
    })
})
app.post('/categories', function (req, res) {
    connection.query('INSERT INTO categories SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('category successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})
app.delete('/categories/:id', function (req, res) {
    connection.query('DELETE FROM categories WHERE id= ?', req.params.id, function (err) {
        if (err) throw err;
        console.log('category deleted with id: ' + req.body.id)
    })
    res.sendStatus(200);
})

app.put('/categories/:id', function (req, res) {
    connection.query('UPDATE categories SET category= ?,source=? WHERE id= ?', [req.body.name, req.body.source, req.params.id], function (err) {
        if (err) throw err;
        console.log('category updated id: ' + req.params.id)
    })
    res.sendStatus(200);
})
app.post('/comments', function (req, res) {
    connection.query('INSERT INTO comments SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('comment successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})


app.get('/comments/:name', function (req, res) {
    connection.query('SELECT * FROM comments  WHERE name = ?', req.params.name, function (err, rows) {
        if (err) throw err;
        console.log('get comment, name: ' + req.params.name);
        res.status(200).send(rows);
    });
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
