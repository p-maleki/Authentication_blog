

 // در فایل روتر قرار میگیرد احتمالا


 var express = require('express');
 const multer = require("multer"); 
 const fs = require('fs');
 var router = express.Router();
 
 const upload = multer({
   dest: process.cwd() + "/public/images"
 });
 
  /* GET home page. */
 // router.get('/', function(req, res, next) {
 //   res.render('index', { title: 'Express' });
 // });
 
 router.get('/signup', function(req, res){
   // console.log(process.cwd())
   res.render('form');
 })
  
 //  router.get('/add-article', function(req, res){
 //    // console.log(process.cwd())
 //    res.render('add-article');
 //  })
 router.post('/signup', upload.single("file"), function (req, res) {
   console.log(req.body);
   console.log(req.file);
   fs.rename(req.file.path, req.file.destination + "/" + req.file.originalname, function(err){
     if(err)
       res.send(err)
   })
   res.send(200)
 })
 //  router.post('/add-article', upload.single("file"), function (req, res) {
 //    console.log(req.body);
 //    console.log(req.file);
 //    fs.rename(req.file.path, req.file.destination + "/" + req.file.originalname, function(err){
 //      if(err)
 //        res.send(err)
 //    })
 //    res.send(200)
 //  })
 
 module.exports = router;
 
 
  
 
 
 