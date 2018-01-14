var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");


var bookCRUD = require("./models/book/bookCRUD");
var memberCRUD = require("./models/member/memberCRUD");
var memberBookCRUD = require("./models/member-book/memberBookCRUD");


app.use(bodyParser.urlencoded({extended : true}));
app.use("/css",express.static(path.join(__dirname+"/assets","css")));
app.use("/js",express.static(path.join(__dirname+"/assets","js")));

app.set("views",__dirname+"/templates");
app.set("view engine","pug");




// book requests
app.post("/book/add",function(req,res){
    bookCRUD.save({
        book : {
            name : req.body.name,
            price : req.body.price
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request OK"
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
app.get("/book/gets",function(req,res){
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
app.post("/book/update/:id",function(req,res){
    bookCRUD.update({
        book : {
            name : req.body.name,
            price : req.body.price,
            id : req.params.id
        },
        onFinish : function(){
            res.json({
                status : 200,
                message : "request OK"
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
// book requests

// card requests
// card requests

// member requests
// member requests

// memberBook requests
// memberBook requests





app.get("/",function(req,res){
    res.render("index",{
        title : "Welcome to home page"
    });
});


app.get("/member",function(req,res){
    res.render("member",{
        title : "Welcome to member page",
        titleForm : "Member Form",
        titleList : "Member List"
    });
});
app.get("/book",function(req,res){
    res.render("book",{
        title : "Welcome to book page",
        titleForm : "Book Form",
        titleList : "Book List"
    });
});
app.get("/card",function(req,res){
    res.render("card",{
        title : "Welcome to card page",
        titleForm : "Card Form",
        titleList : "Card List"
    });
});

app.listen(9600,function(){
    console.log("listening on port 9600");
});