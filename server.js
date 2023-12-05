var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'rootroot',
    database    : 'lol_page'
})

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.redirect('login.html');
});

app.post('/login.html', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND userpw = ?', [username, password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('position.html');
                response.end();
            } else {
                response.redirect('loginerror.html');
                response.end();
            }
        });
    } 
    else {
        response.end();
    }
});

app.post('/register.html', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var password2 = request.body.password2;
    if (username && password && password2 && (password == password2)) {
        connection.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length <= 0) {
                connection.query('INSERT INTO user (username, userpw) VALUES(?,?)', [username, password],
                    function (error, data) {
                        if (error)
                            console.log(error);
                        else
                            console.log(data);
                    });
                connection.query('INSERT INTO recentSearch (username) VALUES(?)', [username],
                    function (error, data) {
                        if (error)
                            console.log(error);
                        else
                            console.log(data);
                    });
                response.redirect('registersuccess.html');
            } 
            else {
                response.redirect('registerexist.html');
            }
            response.end();
        });
    } 
    else {
        response.redirect('registererror.html');
        response.end();
    }
});

app.post('/search.html', function (request, response) {
    if (request.body.isLoad == 'true') {
        connection.query('SELECT * FROM recentSearch WHERE username = ?', [request.session.username], function (error, results, fields) {
            if (error) throw error;
            response.json(results);
        });
    }
    else{
        connection.query('UPDATE recentSearch SET searchname1 = ? WHERE username = ?;', [request.body.name0, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname2 = ? WHERE username = ?;', [request.body.name1, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname3 = ? WHERE username = ?;', [request.body.name2, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname4 = ? WHERE username = ?;', [request.body.name3, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname5 = ? WHERE username = ?;', [request.body.name4, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname6 = ? WHERE username = ?;', [request.body.name5, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname7 = ? WHERE username = ?;', [request.body.name6, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname8 = ? WHERE username = ?;', [request.body.name7, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname9 = ? WHERE username = ?;', [request.body.name8, request.session.username],
            function (error, data) { });
        connection.query('UPDATE recentSearch SET searchname10 = ? WHERE username = ?;', [request.body.name9, request.session.username],
            function (error, data) { });
    }
});

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});