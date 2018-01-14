var databaseModel = require("../databasemodel");

var bookModel = databaseModel.bookModel();

function BookCRUD(){
    this.save = function(obj){
        bookModel({
            name : obj.book.name,
            price : obj.book.price
        }).save().then(function(){
            obj.onFinish();
        }).catch(function(err){
            obj.onError(err);
        });
    }
    this.getBooks = function(obj){
        databaseModel
            .bookModel()
            .query("select * from book")
            .then(function(results){
                obj.onResult(results);
            })
            .catch(function(err){
                obj.onError(err);
            });
    }
    this.update = function(obj){
        bookModel({
            name : obj.book.name,
            price : obj.book.price,
            id : obj.book.id
        }).update().then(function(){
            obj.onFinish();
        }).catch(function(err){
            obj.onError(err);
        });
    }
}

module.exports = new BookCRUD();



