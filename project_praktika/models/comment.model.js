const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    carId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Car',
        required:true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const Comment = mongoose.model('Comment',schema);
module.exports = Comment;