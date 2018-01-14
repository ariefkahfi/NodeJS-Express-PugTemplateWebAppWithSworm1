var databaseModel = require("../databasemodel");

var cardModel = databaseModel.cardModel();

function CardCRUD(){
    this.save = function(obj){
        cardModel({
            id : obj.card.id,
            type : obj.card.type,
            member_id : obj.card.member_id
        }).save()
        .then(function(){
            obj.onFinish();
        }).catch(function(err){
            obj.onError(err);
        });
    }
    this.getCards = function(obj){
        databaseModel
            .cardModel()
            .query("select * from card")
            .then(function(results){
                obj.onResult(results);
            })
            .catch(function(err){
                obj.onError(err);
            });
    }
    this.update = function(obj){
        databaseModel
            .dbInstance()
            .statement(
                "update card set type = @type where member_id = @m_id",
                {
                    type : obj.card.type,
                    member_id : obj.card.member_id
                }
            ).then(function(){
                obj.onFinish();
            }).catch(function(err){
                obj.onError(err);
            });
    }
    this.delete = function(obj){
        databaseModel
            .dbInstance()
            .statement("delete from card where member_id = @id",{id : obj.card.member_id})
            .then(function(){
                obj.onFinish();
            })
            .catch(function(err){
                obj.onError(err);
            });
    }
}

module.exports = new CardCRUD();