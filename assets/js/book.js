
function addBooksToTable(books){
    var tBooks = getEl("table-book");
    tBooks.innerHTML = null;


    var trHeader = createEl("tr");

    var tdId = createEl("td");
    var tdName = createEl("td");
    var tdPrice = createEl("td");
    

    appendInnerHTML([tdId,tdName,tdPrice],["Book Id","Book Name","Book Price"]);

    appendAll(trHeader,[tdId,tdName,tdPrice]);
    tBooks.append(trHeader);

    books.forEach((val)=>{
        var newTr = createEl("tr");

        var newTdId = createEl("td");
    
        var newTdName = createEl("td");
        
        var newTdPrice = createEl("td");

        appendInnerHTML([newTdId,newTdName,newTdPrice],[val.id,val.name,val.price]);
        appendAll(newTr,[newTdId,newTdName,newTdPrice]);

        tBooks.append(newTr);
    });

}

function loadAllBooks(){
    BaseRequest({
        url : "http://localhost:9600/book/gets",
        method : "get",
        onSuccess : (result)=>{
            var toJSONArr = 
                JSON.parse(result);
            var jsonObj = toJSONArr.message;                         
            addBooksToTable(jsonObj);
        },
        onError : (err)=>{
            console.log(err);
        }
    });
}

loadAllBooks();


function submitBook(){
    var name = getEl("name").value;
    var price = getEl("price").value;

    if(name === "" || name === undefined 
    || price === "" || price === undefined){
        alert("form still empty");
    }else{
        BaseRequest({
            url : "http://localhost:9600/book/add",
            method : "Post",
            data : `name=${name}&price=${price}`,
            onSuccess : function (result) {
                console.log(result);
                clearForm(["name","price"]);
                loadAllBooks();
            },
            onError : function (err) {
                console.log(err);
            }
        });
    }

    
}