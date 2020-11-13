const express= require("express");
const auth=require('../middleware/auth');
const fs = require('fs');
const app=express.Router();
const multer = require('multer');
const cors = require('cors');
const XLSX = require('xlsx');
const Test = require('../models/Test');
const data = require("../data");
const User = require("../models/User");
app.use(cors());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'data');
  },
  filename: function (req, file, cb) {
    cb(null, 'user.xlsx' );
  }   
});
var upload = multer({ storage: storage }).single('file');

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'data');
},
filename: function (req, file, cb) {
  cb(null, 'test.xlsx' );
}   
});
var upload1 = multer({ storage: storage1 }).single('file');

app.post('/check',auth,async(req,res)=>{
  try{
    const na =await Test.find({test_name:req.body.test_name});
    //console.log(na[0].test_name);
    if(na.length == 0){
      return res.json({error:'3'});
    }
    const vv = await User.findOne({email:req.user.email});
    //console.log(vv);
    var vb=true; 
    for(var i=0;i<vv.givenTests.length;i++){
      if(vv.givenTests[i].testName  == na[0].test_name){
        vb=false;
        break;
      }
    }
    if(!vb){
      return res.json({error:'2'});
    }
    if(na[0].test_type == 'Closed'){
      var cb=false;
      for(var i=0;i<na[0].allowed_users.length;i++){
        if(na[0].allowed_users[i] == req.user.email){
          cb=true;
          break;
        }
      }
      if(!cb){
        return res.json({error:'3'});
      }
    }
    return res.json(na[0].test_name);
    }
    catch(e){
      res.json({error:e});
    }
});

app.post('/search',auth,async(req,res)=>{
  try{
  const na =await Test.find({test_name:req.body.test_name});
  //console.log(na[0].test_name);
  if(na.length == 0){
    return res.json({error:'no such test'});
  }
  return res.json(na[0].test_name);
  }
  catch(e){
    res.json({error:e});
  }
});
app.post('/onetest',auth,async(req,res)=>{
  try{
    const data = await Test.findOne({_id:req.body.test_id});
    //console.log(data,req.body.test_id);
    return res.json(data);
  }
  catch(e){
    res.json(e);
  }
});
app.get('/mytests',auth,async(req,res)=>{
    try{
      const data1 = await Test.find({test_creator:req.user.email});
      var nam=[];
      data1.map(data2=>{
        var emp = {
          test_name:data2.test_name, 
          key:data2._id,
          test_start:`${data2.start_time.date} @ ${data2.start_time.time}`,
          test_end:`${data2.end_time.date} @ ${data2.end_time.time}`
        }
        nam.push(emp);
      });
      const fin = {
        data:nam
      }
     return res.status(200).json(fin);
    }
    catch(e){
     return res.json(e);
    }
});

app.post('/allowuser',auth,(req,res)=>{
   upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            console.log('error',err);  
        } 
        res.status(200).send(req.file);
 });
});

app.post('/testlist',auth,(req,res)=>{
  upload1(req, res, function (err) {
       if (err instanceof multer.MulterError) {
           return res.status(500).json(err)
       } else if (err) {
           console.log('error',err);  
       } 
       //console.log('reached here');
       res.status(200).send(req.file);
});
});
app.post('/testdata',auth ,async(req,res)=>{
    const workbook = XLSX.readFile('./data/test.xlsx');
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var data = XLSX.utils.sheet_to_json(worksheet);
    var tests=[];
    try{
    for(var i=0;i<data.length;i++){
      var mcq=[],body1;
      mcq.push(data[i].option1);
      mcq.push(data[i].option2);
      mcq.push(data[i].option3);
      mcq.push(data[i].option4);
      body1={
        question:data[i].questions,
        marks:data[i].marks,
        mcqs:mcq,
        answer:data[i].answer
      }
      tests.push(body1);
      if(mcq == undefined || data[i].answer == undefined || data[i].marks == undefined || data[i].questions == undefined){
       return  res.json({error:'the question list is not well formated'});
      }
    }
  }
  catch(e){
    return res.json({error:'the question list is not well formated'});
  }
  const namee = req.body.test_name;
  const names = await Test.find({test_name:namee});
  if(names.length !== 0){
    return res.json({error:'test_name is already taken'});
  }
  const testdur = {
    hour:req.body.test_d_h,
    min:req.body.test_d_m,
    second:0
  };
  var str ={
    date:req.body.test_start_from_date,
    time:req.body.test_start_from_time
  }
  var sdstr={
    date:req.body.test_end_at_date,
    time:req.body.test_end_at_time
  }
  var allowe=[];
  if(req.body.test_type == 'Closed'){
    const workbook1 = XLSX.readFile('./data/user.xlsx');
    var first_sheet_name1 = workbook1.SheetNames[0];
    var worksheet1 = workbook1.Sheets[first_sheet_name1];
    var data1 = XLSX.utils.sheet_to_json(worksheet1);
    var doc=[];
    for(var i=0;i<data1.length;i++){
      doc.push(data1[i].Emails);
    }
    allowe =doc;
    }
  const store ={
    test_name:req.body.test_name,
    test_creator:req.user.email,
    list:tests,
    test_duration:testdur,
    test_type:req.body.test_type,
    start_time:str,
    end_time:sdstr,
    allowed_users:allowe
  }
  var rett = new Test(store);
  //console.log(rett);
  try{
    rett=await rett.save();
  }
  catch(e){
    console.log(e);
    return res.send({error:e});
  }
    res.json({success:'done'});
});
app.post('/editdata',auth ,async(req,res)=>{
  try{
  const oneid =await Test.findOne({_id:req.body.test_id});
  //console.log(oneid);
  const workbook = XLSX.readFile('./data/test.xlsx');
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  var data = XLSX.utils.sheet_to_json(worksheet);
  var tests=[];
  try{
  for(var i=0;i<data.length;i++){
    var mcq=[],body1;
    mcq.push(data[i].option1);
    mcq.push(data[i].option2);
    mcq.push(data[i].option3);
    mcq.push(data[i].option4);
    body1={
      question:data[i].questions,
      marks:data[i].marks,
      mcqs:mcq,
      answer:data[i].answer
    }
    tests.push(body1);
    if(mcq == undefined || data[i].answer == undefined || data[i].marks == undefined || data[i].questions == undefined){
     return  res.json({error:'the question list is not well formated'});
    }
  }
}
catch(e){
  return res.json({error:'the question list is not well formated'});
}
const namee = req.body.test_name;
const names = await Test.find({test_name:namee});
if(names.length !== 0){
  //console.log(names[0]._id,req.body.test_id);
  if(names[0]._id != req.body.test_id){
  return res.json({error:'test_name is already taken'});
  }
}
const testdur = {
  hour:req.body.test_d_h,
  min:req.body.test_d_m,
  second:0
};
var str ={
  date:req.body.test_start_from_date,
  time:req.body.test_start_from_time
}
var sdstr={
  date:req.body.test_end_at_date,
  time:req.body.test_end_at_time
}
var allowe=[];
if(req.body.test_type == 'Closed'){
  const workbook1 = XLSX.readFile('./data/user.xlsx');
  var first_sheet_name1 = workbook1.SheetNames[0];
  var worksheet1 = workbook1.Sheets[first_sheet_name1];
  var data1 = XLSX.utils.sheet_to_json(worksheet1);
  var doc=[];
  for(var i=0;i<data1.length;i++){
    doc.push(data1[i].Emails);
  }
  allowe =doc;
  }
const store ={
  test_name:req.body.test_name,
  test_creator:req.user.email,
  list:tests,
  test_duration:testdur,
  test_type:req.body.test_type,
  start_time:str,
  end_time:sdstr,
  allowed_users:allowe
}

//var rett =  Test(store);
//console.log(rett);
try{
  const up = await Test.updateOne({_id:req.body.test_id},{$set:store});
  //console.log(up);
}
catch(e){
  console.log(e);
  return res.send({error:e});
}
//console.log('reached heerre');
  res.json({success:'done'});
}
  catch(e){
    return res.json({error:'id does not exits'});
  }
});



module.exports = app;