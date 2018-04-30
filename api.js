const express = require('express');
const router = express.Router();
var mongodb = require('mongodb').MongoClient;
var mdb;

mongodb.connect('mongodb://localhost:27017/ait', function(err, database){
    if(err) throw err;
    console.log("Connected!");
    const db = database.db('ait');
    var ait = db.collection("ait");
    var count = db.collection("counts");

    router.get('/', (req,res)=>{
        res.send('Hi');
    });

    router.get('/posts/:num', (req,res)=>{
        var post_num = req.params.num;
        ait.find({id: Number.parseInt(post_num)}).toArray(function(err,result){
            if(err) throw err;
            // console.log({id: Number.parseInt(post_num)});
            res.json(result);
        })
    });

    router.get('/posts', (req,res)=>{
        ait.find({}).toArray(function(err,result){
            if(err) throw err;
            res.json(result);
        })
    });
    
    router.post('/posts', (req,res)=>{
        ait.insert(req.body, function(err,result){
            if(err) throw err;
            res.send('Done');
        });
    });

    router.delete('/posts/:num', (req,res)=>{
        var post_num = Number.parseInt(req.params.num);
        ait.deleteOne({id: post_num}, function(err,result){
            if(err) throw err;
            res.send('Done');
        })
    });

    router.put('/posts/:num', (req,res)=>{
        var post_num = Number.parseInt(req.params.num);
        ait.update({id: post_num}, req.body, {upsert: true}, function(err,result){
            if(err) throw err;
            res.send('Done');
        })
    });

    router.get('/counts', (req,res)=>{
        count.find({}).toArray(function(err,result){
            if(err) throw err;
            res.json(result);
        })
    });

    router.post('/counts', (req,res)=>{
        count.remove({});
        count.insert(req.body, function(err,result){
            if(err) throw err;
            res.send('Ok');
        });
    });
});

module.exports = router;