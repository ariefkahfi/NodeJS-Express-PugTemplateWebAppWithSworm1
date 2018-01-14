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
        cardModel({
            type : obj.card.type,
            id : obj.card.id
        }).update().then(function(){
            obj.onFinish();
        }).catch(function(err){
            obj.onError(err);
        });
    }
    this.delete = function(obj){
        databaseModel
            .dbInstance()
            .statement("delete from card where id = @id",{id : obj.card.id})
            .then(function(){
                obj.onFinish();
            })
            .catch(function(err){
                obj.onError(err);
            });
    }
}

module.exports = new CardCRUD();