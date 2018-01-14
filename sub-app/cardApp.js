var express = require("express");
var cardApp = express();

var cardCRUD = require("../models/card/cardCRUD");

cardApp.post("/add",function(req,res){
    cardCRUD.save({
        card : {
            id : req.body.id,
            type : req.body.type,
            member_id : req.body.member_id
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request ok /card/add"
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
cardApp.get("/gets",function(req,res){
    cardCRUD.getCards({
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
cardApp.get("/delete/:member_id",function(req,res){
    cardCRUD.delete({
        card : {
            member_id : req.params.member_id
        },
        onFinish : function(){
            res.json({
                status : 200,
                message  : "request ok /card/delete/member_id"
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
cardApp.post("/update/:member_id",function(req,res){
    cardCRUD.update({
        card : {
            type : req.body.type,
            member_id : req.params.member_id
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request ok /card/update/id"
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

module.exports = cardApp;