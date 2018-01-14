var databaseModel = require("../databasemodel");

var memberBookModel = databaseModel.memberBookModel();

function MemberBookCRUD(){
    this.insertRelation = (obj)=>{
        memberBookModel({
            member_id : obj.member_book.member_id,
            book_id : obj.member_book.book_id
        }).save().then(()=>{
            obj.onSuccess();
        }).catch((err)=>{
            obj.onError(err);
        });
    }
    this.getAllRelation = (obj)=>{
        databaseModel
            .dbInstance()
            .query("select " +
            " m.id as member_id , b.id as book_id , m.name as member_name,b.name as book_name from member m " + 
            " inner join member_book mb " + 
            " on m.id = mb.member_id " + 
            " inner join book b " + 
            " on b.id = mb.book_id")
            .then((result)=>{
                obj.onResult(result);
            })
            .catch((err)=>{
                obj.onError(err);
            });
    }
    this.deleteRelation = function(obj){
        databaseModel
            .dbInstance()
            .statement("delete from member_book where " + 
                "member_id = @m_id " 
             +  "and book_id = @b_id ",{
                m_id : obj.member_book.member_id,
                b_id : obj.member_book.book_id  
             }).then(function(){
                obj.onFinish();
             }).catch(function(err){
                obj.onError(err);
             });
    }

}

module.exports = new MemberBookCRUD();