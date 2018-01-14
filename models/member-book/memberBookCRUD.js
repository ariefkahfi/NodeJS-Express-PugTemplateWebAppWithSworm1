var databaseModel = require("../databasemodel");

var memberBookModel = databaseModel.memberBookModel();

function MemberBookCRUD(){
    this.deleteRelation = function(obj){
        memberBookModel()
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