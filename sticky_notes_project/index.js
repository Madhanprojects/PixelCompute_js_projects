let input=document.getElementById("note-text");
let noteSection=document.getElementById("noteSection");
let addButton=document.getElementById("add-button");
let colorCount=0;

let colors=["#d1e1ff","#fefffe"];

addButton.addEventListener('click',addNote);

function addNote(){

    let note=String(input.value.trim());

    if(note=="") return;

    let noteContainer=document.createElement('div');

    let removeBtn=document.createElement('button');

    noteContainer.innerText=note;

    noteContainer.className="noteContainer";

    noteContainer.style.backgroundColor=colors[colorCount];

    removeBtn.className="removeBtn";

    removeBtn.innerText="x";

    noteContainer.appendChild(removeBtn);

    noteSection.appendChild(noteContainer);

    colorCount=(colorCount+1)%2;

    input.value=null;

    removeBtn.addEventListener('click',removeNote);

}


function removeNote(event){

    event.target.parentElement.remove();

}