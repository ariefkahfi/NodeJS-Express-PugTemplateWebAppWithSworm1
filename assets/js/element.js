
function clearForm(listOfIds){
    listOfIds.forEach(function(val){
        getEl(val).value = "";
    });
}



function appendAll(parElement,childsEl){
    childsEl.forEach((val)=>{
        parElement.append(val);
    });
}
function appendInnerHTML(parElement,textEl){
    if(parElement.length === textEl.length){
        parElement.forEach((val,idx)=>{
            val.innerHTML = textEl[idx];
        });
    }else{
        console.error("length doesn't match");
    }
}
function createEl(elName){
    return document.createElement(elName);
}
function getEl(elementId){
    return document.getElementById(elementId);
}