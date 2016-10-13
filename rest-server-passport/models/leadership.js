// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false,
        unique: true
    },
    designation: {
        type: String,
        required: false,
        unique: false
    },
    abbr: {
        type: String,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: true
    }},
{
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Leaders = mongoose.model('leader', leaderSchema);

// make this available to our Node applications
module.exports = Leaders;