const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');


async function main(){
    const URI = "mongodb+srv://SanjuDeveloper:Mausam123@sanjudeveloper.rm0ud.mongodb.net/FriendshipQuiz?retryWrites=true&w=majority"
    try{
        await mongoose.connect(URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useFindAndModify:false
        });
        console.log("database connected..!");
    }
    catch(e){
        throw 'internal database error';
    }
};

module.exports = main;
