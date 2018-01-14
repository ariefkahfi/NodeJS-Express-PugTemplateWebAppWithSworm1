var databaseModel = require("../databasemodel");


function BookCRUD(){
    this.save = function(obj){
        databaseModel.bookModel({
            name : obj.book.name,
            price : obj.book.price
        }).save().then(function(){
            obj.onFinish();
        }).catch(function(err){
            obj.onError(err);
        });
    }

    this.update = function(obj){
        databaseModel.bookModel({
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



