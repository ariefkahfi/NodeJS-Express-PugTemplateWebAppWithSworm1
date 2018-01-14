var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");


var bookCRUD = require("./models/book/bookCRUD");
var cardCRUD = require("./models/card/cardCRUD");
var memberCRUD = require("./models/member/memberCRUD");
var memberBookCRUD = require("./models/member-book/memberBookCRUD");


app.use(bodyParser.urlencoded({extended : true}));
app.use("/css",express.static(path.join(__dirname+"/assets","css")));
app.use("/js",express.static(path.join(__dirname+"/assets","js")));

app.set("views",__dirname+"/templates");
app.set("view engine","pug");



var bookApp = require("./sub-app/bookApp");
var cardApp = require("./sub-app/cardApp");
var memberApp =require("./sub-app/memberApp");


app.use("/book",bookApp);
app.use("/card",cardApp);
app.use("/member",memberApp);










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