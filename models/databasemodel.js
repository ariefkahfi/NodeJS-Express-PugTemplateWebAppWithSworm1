var sworm = require("sworm");


function DatabaseModel(){
    this.dbInstance = function(){
        return sworm.db({
            driver : "mysql",
            config : {
                user : "arief",
                password : "arief",
                host : "localhost",
                database : "sworm_db8"
            }
        });
    }

    this.bookModel = function(){
        return this.dbInstance().model({table : "book"});
    }
    this.cardModel = function(){
        return this.dbInstance().model({table : "card"});
    }
    this.memberModel = function(){
        return this.dbInstance().model({table : "member"});
    }
    this.memberBookModel = function(){
        return this.dbInstance()
                   .model(
                    {
                        table : "member_book", 
                        id : ["member_id","book_id"]
                    }
                );
    }
}



module.exports = new DatabaseModel();