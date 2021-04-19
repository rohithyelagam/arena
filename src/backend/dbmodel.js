const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
    user_id: String,
    user_name: String,
    user_photo: String,
    lists: [{
        list_name: String,
        tasks:[{
            task_name:String,
        }]
    }]
});

module.exports = mongoose.model('users', userData);