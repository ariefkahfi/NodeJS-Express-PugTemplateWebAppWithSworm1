var formComponent = document.getElementById("form-component");
var listComponent = document.getElementById("list-component");
var formComponentAHref = document.getElementById("form-component-a");
var listComponentAHref = document.getElementById("list-component-a");
var memberBookContainer  = document.getElementById("member-book-container");



if(formComponentAHref !== null && listComponentAHref !== null){
    formComponentAHref.onclick = function(){
        formComponent.hidden = false;
        listComponent.hidden = true;
        if(memberBookContainer !== null){
            memberBookContainer.hidden = true;
        }
    }
    listComponentAHref.onclick = function(){
        listComponent.hidden = false;
        formComponent.hidden = true;
        if(memberBookContainer !== null){
            memberBookContainer.hidden = true;
        }
    }
}

function hideAllComponent(listOfComponentIds){
    listOfComponentIds.forEach(function(val){
        document.getElementById(val).hidden = true;
    });
}
hideAllComponent(["form-component","list-component"]);

