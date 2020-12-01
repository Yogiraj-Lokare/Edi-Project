const mongoose = require('mongoose');
const schema = mongoose.Schema({
    test_name:{
        type:String,
        unique:true,
        required:true,
    },
    test_id:{
        type:String
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
            type:Date
        },
        user_response:[{
            type:Number
        }],
        is_test_ended:{
            type:Boolean,
            default:false
        }
    }]
});
const Score= new mongoose.model("Score",schema);
module.exports=Score;