var express = require('express');
var morgan = require('morgan');
var cookieparser = require("cookie-parser");

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));//first middle ware
app.use(cookieParser('12345-67890-09876-54321')); // secret key

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;//extract auth field from the headers 
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);//next(err) error handling to the err middleware
        return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'); //parse header, split on space, then process second element as base64 to string, then split this string on the colon to get the username:passord.
    var user = auth[0];//username
    var pass = auth[1];//password
    if (user == 'admin' && pass == 'password') {
        next(); // authorized, continue on to the next middleware , here it it express.static
    } else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);// not authorised and handle error.
    }
}

app.use(auth);//second middle ware

app.use(express.static(__dirname + '/public'));//third middleware.
app.use(function(err,req,res,next) { //error handler for next(err), this returns an error response to res
            res.writeHead(err.status || 500, {//use set error, if not set send 500
            'WWW-Authenticate': 'Basic', //header value returned
            'Content-Type': 'text/plain'
        });
        res.end(err.message);//send error message set earlier
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

