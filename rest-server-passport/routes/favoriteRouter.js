var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');
var Dishes = require('../models/dishes');
var User = require('../models/user');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({postedBy:req.decoded._doc._id})
        .populate('Dishes.dishId','description')
        .populate('User.postedBy','username')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
        console.log(req.decoded._doc._id);
        console.log(req.params._id);
    });
})

/*.post(function (req, res, next) {
    Favorites.create(req.body, function (err, favorite) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        favorite.save(function (err, favorite) {
            if (err) throw err;
            console.log('Favorite added');
            res.json(favorite);
        });
    });
})*/




/*
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.create(req.body, function (err, favorite) {

        req.body.postedBy = req.decoded._doc._id;
        console.log(req.body);
        if (err) throw err;
        console.log('Favorite Added');
        var id = favorite._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the favorite with id: ' + id);
    });
})
*/

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    var fav = Favorites({
            dishId:req.body.dishId,
            postedBy:req.decoded._doc._id
        });
        fav.save(function(err,favorite) {
            if (err) throw err;
             res.writeHead(200, {
            'Content-Type': 'text/plain'
            });
            var id = fav._id;
            res.end('Added the favorite with id: ' + id);
        });

    });


/*
    req.body, function (err, favorite) {

        req.body.postedBy = req.decoded._doc._id;
        console.log(req.body);
        if (err) throw err;
        console.log('Favorite Added');
        var id = favorite._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the favorite with id: ' + id);
    });
})
*/

module.exports = favoriteRouter;