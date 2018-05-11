const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    id: String,
    name: String,
    description: String,
    age: Number,
    movieIds: {type: Array},
    era: String,
    canon: Boolean
});

var Character = mongoose.model('characters', characterSchema);

export {
    Character
}