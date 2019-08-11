var btn = document.getElementById("btn");
var textarea = document.getElementById("textarea");

btn.addEventListener("click", createNote);

function createNote()
{
    if(textarea.value != "")
    {
        let containerDiv = document.getElementById("notes-container"); 

        //Create Elements
        let newDiv = document.createElement("div");
        let para = document.createElement("p");
        let newNote = document.createTextNode(textarea.value); 
        let deleteButton = document.createElement("div");

        //Styling Elements
        newDiv.classList.add("note");
        deleteButton.classList.add("deleteButton");

        //Appending Elements
        para.appendChild(newNote);
        newDiv.appendChild(deleteButton);
        newDiv.appendChild(para);
        containerDiv.append(newDiv);

        //Clears textarea
        textarea.value = "";

        //event listener for delete button
        addListenerDeleteButton(deleteButton);
    }
}

function addListenerDeleteButton(deleteButton) 
{
  deleteButton.addEventListener('click', function (e) 
  {
    deleteNote(e);
  });
}


//deletes notes
function deleteNote(e)
{
    let note = e.target.parentNode;
    note.parentNode.removeChild(note);
}
