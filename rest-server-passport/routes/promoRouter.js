var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Promotions = require('../models/promotions'); //set up to use promotions schema and model.

var promoRouter = express.Router();//set up to use promotions router

promoRouter.use(bodyParser.json());

promoRouter.route('/')

//list all promotions

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Promotions.find({}, function (err, promotion) { //search database for all promotions
        if (err) throw err;
        res.json(promotion);//response sent as parsed json.
    });
})
//add a new promotion

.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
    Promotions.create(req.body, function (err, promotion) {//create new promotion from the request body , callback funtion on return. 
        if (err) throw err;
        console.log('Promotion created!');
        var id = promotion._id;

        res.writeHead(200, {//respond with a 200 that the record was created sucessfully and 
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion with id: ' + id);// send back the id of the newly created record
    });
  })

//delete all promotions

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
    Promotions.remove({}, function (err, resp) {//delete all promotions. 
        if (err) throw err;
        res.json(resp);//response in json
    });
  })


//acting on a specific promoid
promoRouter.route('/:promoId')

//return details of a specific promotion by id
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Promotions.findById(req.params.promoId, function (err, promotion) {//find by the id supplied
        if (err) throw err;
        res.json(promotion);//response with the promotion parsed as json
    });
})

//update the details fo a specific promotion by id. 

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body//updates the promotion using the body of the request.
    }, {
        new: true //ensures the new value is used. 
    }, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);//returns the promotion once altered. 
    });
})

//delete the promotion by id. 
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
    Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {
        if (err) throw err;
        res.json(resp); //return response in json.
    });
});





module.exports = promoRouter;