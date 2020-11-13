const mongoose = require('mongoose');
const schema = mongoose.Schema({
    test_name:{
        type:String,
        unique:true,
        required:true,
    },
    test_id:{
        type:Number
    },
    users:[{
        user_id:{
            type:Number
        },
        user_name:{
            type:String
        },
        user_email:{
            type:String
        },
        user_score:{
            type:Number
        },
        test_start_time:{
            type:String
        }
    }]
});
const Score= new mongoose.model("Score",schema);
module.exports=Score;