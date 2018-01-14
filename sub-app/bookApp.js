var express = require("express");
var bookCRUD = require("../models/book/bookCRUD");
var bookApp = express();


bookApp.post("/add",function(req,res){
    bookCRUD.save({
        book : {    
            name : req.body.name,
            price : req.body.price
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request OK /book/add"
            });
        },
        onError : function(err){
            res.json(500,{
                status : 500,
                message : err
            });
        }
    });
});
bookApp.get("/gets",function(req,res){
    bookCRUD.getBooks({
        onResult : function(result){
            res.json({
                status : 200,
                message : result
            });
        },
        onError : function(err){
            res.json(500,{
                status : 500,
                message : err
            });
        }
    });
});
bookApp.post("/update/:id",function(req,res){
    bookCRUD.update({
        book : {
            name : req.body.name,
            price : req.body.price,
            id : req.params.id
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request OK /book/update/id"
            });
        },
        onError : function(err){
            res.json(500,{
                status : 500,
                message : err
            });
        }
    });
});


module.exports = bookApp;