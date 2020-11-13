const express = require('express');
const data = require('./data');
const userRoutes= require('./routes/users');
const testRoutes = require('./routes/tests');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose.connect('mongodb://localhost/edi',{useNewUrlParser:true,useUnifiedTopology:true})
app.use('/user',userRoutes);
app.use('/test',testRoutes);
app.get('/api',(req,res)=>{
    res.send(data);
});
app.post('/test',(req,res)=>{
    if(req.body.value !== data.test_name){
        res.json({error:'Not correct name'});
    } 
    res.json(data);
});

app.listen(1111);