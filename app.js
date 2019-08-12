var btn = document.getElementById("btn");
var textarea = document.getElementById("textarea");
var select = document.getElementById("color");

btn.addEventListener("click", createNote);

//change styling on option
changeStyling();
select.addEventListener("change", changeStyling);

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

        changeStyling();
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

function changeStyling()
{
  let selected = select.options[select.selectedIndex].value;
  let notes = document.querySelectorAll(".note");
  let red = "#F76262";
  let blue ="#216583";
  let green = "#32a852";
  let yellow = "#ffd359";

  if(selected == "red")
  {
    changeColor(notes, red);
  }

  if(selected == "blue")
  {
    changeColor(notes, blue);
  }

  if(selected == "green")
  {
    changeColor(notes, green);
  }
  if(selected == "yellow")
  {
    changeColor(notes, yellow);
  }
}


//changes styling colors
function changeColor(element, color)
{
  element.forEach(e => {
      e.style.backgroundColor = color;
  } )

  textarea.style.border = color + " 2px solid";
  btn.style.backgroundColor = color;
  select.style.backgroundColor = color;
}

