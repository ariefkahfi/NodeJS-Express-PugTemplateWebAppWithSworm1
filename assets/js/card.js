clearForm(["id"]);

function addCardsToTable(cards){
    var tableCard = getEl("table-card");

    tableCard.innerHTML = null;

    var trHeader = createEl("tr");

    var tdHeaderId = createEl("td");
    var tdHeaderType = createEl("td");
    var tdHeaderMemberId = createEl("td");


    appendInnerHTML([tdHeaderId,tdHeaderType,tdHeaderMemberId],["Card ID","Card type","Card's Owner"]);
    appendAll(trHeader,[tdHeaderId,tdHeaderType,tdHeaderMemberId]);

    tableCard.append(trHeader);

    cards.forEach((val)=>{
        var newTr = createEl("tr");

        var tdId = createEl("td");
        var tdType = createEl("td");
        var tdMmeberId = createEl("td");

        appendInnerHTML([
            tdId,tdType,tdMmeberId
        ],[
            val.id,val.type,val.name
        ]);
        appendAll(newTr,[tdId,tdType,tdMmeberId]);

        tableCard.append(newTr);
    });  
}
function loadAllCards(){
    BaseRequest({
        url : "http://localhost:9600/card/gets/members",
        method : "get",
        onSuccess : (data)=>{
            var parsedJSON = JSON.parse(data).message;
            console.log(parsedJSON);
            addCardsToTable(parsedJSON);
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}

function appendOptionToSelectTagForMember(data){
    let memberTag = getEl("member_id");
    memberTag.innerHTML = null;

    data.forEach((val)=>{
        var newOption = createEl("option");
        newOption.value = val.id;
        newOption.innerHTML = val.name;

        memberTag.append(newOption);
    });
}
function loadMembersToSelectTag(){
    BaseRequest({
        url : "http://localhost:9600/member/gets",
        method : "get",
        onSuccess : (data)=>{
            var parsedJSON = JSON.parse(data).message;
            appendOptionToSelectTagForMember(parsedJSON);
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}

loadMembersToSelectTag();
loadAllCards();

function submitCard(){
    let cardId = getEl("id").value;
    let cardType = getEl("type").value;
    let memberId = getEl("member_id").value;

    if(cardId === "" || cardId === undefined){
        alert("form still empty");
    }else{
        BaseRequest({
            url : "http://localhost:9600/card/add",
            method  : "post",
            data : `id=${cardId}&type=${cardType}&member_id=${memberId}`,
            onSuccess : (data)=>{
                console.log(data);
                clearForm(["id"]);
                loadAllCards();
            },
            onError : (err)=>{
                console.log(err);
            }
        });
    }
}