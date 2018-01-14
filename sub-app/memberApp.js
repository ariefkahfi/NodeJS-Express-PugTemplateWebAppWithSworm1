var express = require('express');
var memberApp = express();

var memberCRUD = require("../models/member/memberCRUD");


memberApp.post("/add",function(req,res){
    memberCRUD.save({
        member : {
            id : req.body.id,
            name : req.body.name,
            address : req.body.address
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request ok /member/add"
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
memberApp.get("/gets",function(req,res){
    memberCRUD.getMembers({
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
memberApp.post("/update/:id",function(req,res){
    memberCRUD.update({
        member : {
            name : req.body.name,
            address : req.body.address,
            id : req.params.id
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request ok /member/update/id"
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


