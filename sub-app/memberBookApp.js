var express = require("express");

var memberBookApp = express();

var memberBookCRUD = require("../models/member-book/memberBookCRUD");

memberBookApp.get("/gets",(req,res)=>{
    memberBookCRUD.getAllRelation({
        onResult : (data)=>{
            res.json({
                status : 200,
                message : data
            });
        },
        onError : (err)=>{
            res.json(500,{
                status : 500,
                message : err
            });
        }
    });
});
memberBookApp.post("/add",(req,res)=>{
    memberBookCRUD.insertRelation({
        member_book : {
            member_id : req.body.member_id,
            book_id : req.body.book_id
        },
        onSuccess : ()=>{
            res.json({
                status : 200,
                message : "request ok /member-book/add"
            });
        },
        onError : (err)=>{
            res.json(500,{
                status : 500,
                message : err
            });
        }
    });
});
memberBookApp.get("/delete/:m_id/:b_id",(req,res)=>{
    memberBookCRUD.deleteRelation({
        member_book : {
            member_id: req.params.m_id,
            book_id : req.params.b_id
        },
        onFinish : ()=>{
            res.redirect("http://localhost:9600/member");
        },
        onError : (err)=>{
            res.json(500,{
                status : 500,
                message : err
            });
        }
    });
});

module.exports = memberBookApp;