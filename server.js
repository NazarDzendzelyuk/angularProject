const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const mysql = require('mysql');
const port = 8000;
const multer = require('multer');
const fs = require('fs');
const io = require('socket.io').listen(server);
var arr = [];
var connections = [];


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

var upload = multer({
    storage: storage
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(cors());

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s socket connected', connections.length);

    //    DISCONNECT
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket connected', connections.length)
    })

    socket.on('send message', function (data, userName) {
        console.log(data);
        if (userName == null || userName == '') {
            socket.name = 'Anonim'
        } else {
            socket.name = userName;
        }
        io.sockets.emit('new message', {
            msg: data,
            user: socket.name
        })
    })
    socket.on('new user', function (data) {
        console.log(data);
        socket.name = data;
        arr.push(socket.name);
    })

})



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
app.post('/login', function (req, res) {
    connection.query('SELECT * FROM users  WHERE email = ?', req.body.email, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            if (rows[0].password == req.body.password) {
                res.status(200).send("welcome");
                connection.query('UPDATE users SET status = "1" WHERE id = ?', rows[0].id,
                    function (err) {
                        if (err) throw err;
                    }
                );
            } else {
                res.status(200).send("wrong password");
            }
        } else {
            res.status(200).send("wrong login");
        }

    });
});
app.post('/logout', function (req, res) {
    connection.query('UPDATE users SET status = "0" WHERE email = ?', req.body.email,
        function (err) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});

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
        'src varchar(150),' +
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
app.delete('/tabletImg/:src', function (req, res) {
    fs.unlink('public/uploads/' + req.params.src + '', (err) => {
        if (err) throw err;
        console.log('successfully deleted');
    });
})

app.put('/tablets/:id', function (req, res) {
    connection.query('UPDATE tablets SET name= ?,model=?, price= ?, display= ?, ram= ? WHERE id= ?', [req.body.name, req.body.model, req.body.price, req.body.display, req.body.ram, req.params.id], function (err) {
        if (err) throw err;
        console.log('tablet updated id: ' + req.params.id)
    })
    res.sendStatus(200);
})
app.put('/tabletImgEdit/:src', function (req, res) {
    connection.query('UPDATE tablets SET src= ? WHERE src= ?', [req.body.src, req.params.src], function (err) {
        if (err) throw err;
        console.log('tablet updated id: ' + req.params.src)
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
app.post('/headphones', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO headphones SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('headphone successfully added: ' + result.insertId)
    })
    res.sendStatus(200);
})
app.get('/headphones/:name', function (req, res) {
    connection.query('SELECT * FROM headphones  WHERE name = ?', req.params.name, function (err, rows) {
        if (err) throw err;
        console.log('get headphones, name: ' + req.params.name);
        res.status(200).send(rows);
    });
});

app.delete('/headphones/:id', function (req, res) {
    connection.query('DELETE FROM headphones WHERE id= ?', req.params.id, function (err) {
        if (err) throw err;
        console.log('headphone deleted with id: ' + req.body.id)
    })
    res.sendStatus(200);
})

app.put('/headphones/:id', function (req, res) {
    connection.query('UPDATE headphones SET name= ?,model=?, price= ?, connection= ?, weight= ? WHERE id= ?', [req.body.name, req.body.model, req.body.price, req.body.connection, req.body.weight, req.params.id], function (err) {
        if (err) throw err;
        console.log('headphone updated id: ' + req.params.id)
    })
    res.sendStatus(200);
})

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
    connection.query('UPDATE categories SET name= ?,source=? WHERE id= ?', [req.body.name, req.body.source, req.params.id], function (err) {
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

let cart = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS cart (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'email varchar(50), ' +
        'model varchar(50), ' +
        'name varchar(50), ' +
        'price int(11), ' +
        'total int(11), ' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS cart')
        });
};

cart();
app.post('/addPhoneToCart', function (req, res) {
    connection.query('INSERT INTO cart SET ?', req.body, function (err, result) {
        if (err) throw err;
        console.log('added to cart: ' + result.insertId)
    })
    res.sendStatus(200);
})
app.get('/addPhoneToCart/:email', function (req, res) {
    connection.query('SELECT * FROM cart  WHERE email = ?', req.params.email, function (err, rows) {
        if (err) throw err;
        console.log('get good, email: ' + req.params.email);
        res.status(200).send(rows);
    });
});
//app.put('/addPhoneToCart/:email', function (req, res) {
//    connection.query('UPDATE cart SET amount= ? WHERE email= ?', [req.body.amount, req.params.email], function (err) {
//        if (err) throw err;
//        console.log('good updated id: ' + req.params.id)
//    })
//    res.sendStatus(200);
//})
app.put('/addPhoneToCart/:email', function (req, res) {
    connection.query('UPDATE cart SET total= ? WHERE email= ?', [req.body.total, req.params.email], function (err) {
        if (err) throw err;
        console.log('good updated id: ' + req.params.name)
    })
    res.sendStatus(200);
})

app.delete('/addPhoneToCart/:id', function (req, res) {
    connection.query('DELETE FROM cart WHERE id= ?', req.params.id, function (err) {
        if (err) throw err;
        console.log('good deleted with id: ' + req.body.id)
    })
    res.sendStatus(200);
})

app.post('/images', upload.any(), function (req, res, next) {
    res.sendStatus(200);
})

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})
server.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
