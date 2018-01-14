var databaseModel = require('../databasemodel');

var memberModel = databaseModel.memberModel();

function MemberCRUD(){
    this.save = function(obj){
        memberModel({
            id : obj.member.id,
            name : obj.member.name,
            address : obj.member.address
        }).save()
            .then(function(){
                obj.onFinish();
            })
            .catch(function(err){
                obj.onError(err);
            });
    }

    this.getMembers = function(obj){
        databaseModel.memberModel()
            .query("select * from member")
            .then(function(results){
                obj.onResult(results);
            })
            .catch(function(err){
                obj.onError(err);
            });
    }

    this.update = function(obj){
        memberModel({
            name : obj.member.name,
            address : obj.member.address,
            id : obj.member.id
        }).update()
            .then(function(){
                obj.onFinish();
            })
            .catch(function(err){
                obj.onError(err);
            });

    }

}

module.export = new MemberCRUD();