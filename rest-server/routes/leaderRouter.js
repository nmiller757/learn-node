var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaders = require('../models/leadership'); //set up to use leadership schema and model.

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

//list all leaders
.get(function(req,res,next){
    Leaders.find({}, function (err, leader) { //search database for all leaders
        if (err) throw err;
        res.json(leader);//response sent as parsed json.
    });})

//create new leader
.post(function(req, res, next){
    Leaders.create(req.body, function (err, leader) {//create new leader from the request body , callback funtion on return. 
        if (err) throw err;
        console.log('Leader created!');
        var id = leader._id;

        res.writeHead(200, {//respond with a 200 that the record was created sucessfully and 
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);// send back the id of the newly created record
    });
  })

//delete all leaders

.delete(function(req, res, next){
    Leaders.remove({}, function (err, resp) {//delete all leaders 
        if (err) throw err;
        res.json(resp);//response in json
    });
  })

//acting on a specific leaderId

leaderRouter.route('/:leaderId')

.get(function(req,res,next){
    Leaders.findById(req.params.promoId, function (err, leader) {//find by the id supplied
        if (err) throw err;
        res.json(leader);//response with the leader parsed as json
    });
})

.put(function(req, res, next){
   Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body//updates the leader using the body of the request.
    }, {
        new: true //ensures the new value is used. 
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);//returns the leader once altered. 
    });
})

.delete(function(req, res, next){
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
        if (err) throw err;
        res.json(resp); //return response in json.
    });
});

module.exports = leaderRouter;