
getEl("member-book-container").hidden = true;

getEl("member-book-component-a").onclick = ()=>{
    hideAllComponent(["form-component","list-component"]);
    getEl("member-book-container").hidden = false;
}

loadMemberAndBookToTable();
function loadMemberAndBookToTable(){
    var tableMB = getEl("table-member-book");

    tableMB.innerHTML = null;

    var trHeader = createEl("tr");

    var tdMname = createEl("td");
    var tdMBName = createEl("td");
    var tdDeleteR = createEl("td");


    appendInnerHTML([tdMname,tdMBName,tdDeleteR],["Member Name","Members's Book Name","Delete"]);
    appendAll(trHeader,[tdMname,tdMBName,tdDeleteR]);

    tableMB.append(trHeader);

    BaseRequest({
        url : "http://localhost:9600/member-book/gets",
        method : "get",
        onSuccess : (data)=>{
            let parsedJSON = JSON.parse(data).message;
            console.log(parsedJSON);
            parsedJSON.forEach((val)=>{
                var newTr = createEl("tr");

                var tdName1 =  createEl("td");
                var tdName2 = createEl("td");
                var tdDelete = createEl("td");

                appendInnerHTML([tdName1,tdName2,tdDelete],
                    [
                        val.member_name,
                        val.book_name,
                        `<a 
                            class="a-no-underline" 
                            href='http://localhost:9600/member-book/delete/${val.member_id}/${val.book_id}'>
                                Delete
                            </a>`
                    ]);
                appendAll(newTr,[tdName1,tdName2,tdDelete]);

                tableMB.append(newTr);
            });
        },
        onError : (err)=>{
            console.log(err);
        }
    });

}

function submitMemberBook(){
    var selectMId = getEl("member_id").value;
    var selectBId = getEl("book_id").value;

    BaseRequest({
        url : "http://localhost:9600/member-book/add",
        method : "post",
        data : `member_id=${selectMId}&book_id=${selectBId}`,
        onSuccess : (data)=>{
            console.log(data);
            loadMemberAndBookToTable();
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}

addMembersToMemberSelectTag();
function addMembersToMemberSelectTag(){
    BaseRequest({
        url : "http://localhost:9600/member/gets",
        method : "get",
        onSuccess : (data)=>{
            let parsedJSON = JSON.parse(data).message;
            parsedJSON.forEach((val)=>{
                var selectMId = getEl("member_id");
                var newOption = createEl("option");

                newOption.value = val.id;
                newOption.innerHTML = val.name;


                selectMId.append(newOption);
            });
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}
addBooksToBookSelectTag();
function addBooksToBookSelectTag(){
    BaseRequest({
        url : "http://localhost:9600/book/gets",
        method : "get",
        onSuccess : (data)=>{
            let parsedJSON = JSON.parse(data).message;
            parsedJSON.forEach((val)=>{
                var selectMId = getEl("book_id");
                var newOption = createEl("option");

                newOption.value = val.id;
                newOption.innerHTML = val.name;


                selectMId.append(newOption);
            });
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}

function addMembersToTable(members){
    var tMember = getEl("table-member");

    tMember.innerHTML = null;

    var trHeader = createEl("tr");
    
    var tdHeaderId = createEl("td");
    var tdHeaderName = createEl("td");
    var tdHeaderAddress = createEl("td");

    appendInnerHTML([tdHeaderId,tdHeaderName,tdHeaderAddress],["Member ID","Member Name","Member Address"]);
    
    appendAll(trHeader,[tdHeaderId,tdHeaderName,tdHeaderAddress]);

    tMember.append(trHeader);

    members.forEach((val)=>{
        var newTr = createEl("tr");

        var newTdId = createEl("td");
        var newTdName = createEl("td");
        var newTdAddress = createEl("td");

        appendInnerHTML([newTdId,newTdName,newTdAddress],[val.id,val.name,val.address]);
        appendAll(newTr,[newTdId,newTdName,newTdAddress]);

        tMember.append(newTr);
    });
}

function loadAllMembers(){
    BaseRequest({
        url : "http://localhost:9600/member/gets",
        method : "get",
        onSuccess : (data)=>{
            let jsonMessage = JSON.parse(data);
            let jsonMembers = jsonMessage.message;
            addMembersToTable(jsonMembers);
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}



loadAllMembers();

function submitMember(){
    var id  = getEl("id").value;
    var name = getEl("name").value;
    var address =  getEl("address").value;

    if(id === "" || id === undefined 
    || name === "" || name === undefined
    || address === "" || address === undefined){
        alert("form still empty");
    }else{
        BaseRequest({
            url : "http://localhost:9600/member/add",
            method : "post",
            data : `id=${id}&name=${name}&address=${address}`,
            onSuccess : (result)=>{
                console.log(result);
                clearForm(["id","name","address"]);
                loadAllMembers();
            },
            onError : (err)=>{
                console.log(err);
            }
        });
    }
}