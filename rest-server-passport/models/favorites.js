// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    dishId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref:'dishes'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;