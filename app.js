//***SAVING NOTES IN LOCAL STORAGE***

// function save()
// fcuntion loadNotes()
// function delete()

// transfer local storage into /list to work
// in deleteNote() param for created key to delete right one

//save()
//  key!

//delete()
//  identify which key to delete

var btn = document.getElementById("btn");
var textarea = document.getElementById("textarea");
var select = document.getElementById("color");

loadNotes();
 
btn.addEventListener("click", createNote);

//change styling on option
changeColor(localStorage.getItem("color"));
select.addEventListener("change", changeStyling);
displayRightSelect(select);

function loadNotes()
{ 
  Object.keys(localStorage).forEach(function(key){
    if(key != "color")
    {
      let containerDiv = document.getElementById("notes-container"); 

      //Create Elements
      let newDiv = document.createElement("div");
      let para = document.createElement("p");
      let newNote = document.createTextNode(localStorage.getItem(key)); 
      let deleteButton = document.createElement("div");

      //Styling Elements
      newDiv.classList.add("note");
      deleteButton.classList.add("deleteButton");

      //Appending Elements
      para.appendChild(newNote);
      newDiv.appendChild(deleteButton);
      newDiv.appendChild(para);
      containerDiv.append(newDiv);

      //event listener for delete button
      addListenerDeleteButton(deleteButton,textarea.value);

      changeColor(localStorage.getItem("color"));
    }
  });
}

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

    localStorage.setItem(textarea.value, textarea.value);

    //event listener for delete button
    addListenerDeleteButton(deleteButton,textarea.value);

    changeColor(localStorage.getItem("color"));

    //Clears textarea
    textarea.value = "";
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
  var text = note.children[1].innerText;

  Object.keys(localStorage).forEach(function(key){
    if(key == text)
    {
      localStorage.removeItem(key);
    }
  });
}

function changeStyling()
{
  let selected = select.options[select.selectedIndex].value;
  let red = "#F76262";
  let blue ="#216583";
  let green = "#32a852";
  let yellow = "#ffd359";

if(selected == "red")
  {
    localStorage.removeItem("color");
    localStorage.setItem("color", red);
    changeColor(localStorage.getItem("color"));
  }

  if(selected == "blue")
  {
    localStorage.removeItem("color");
    localStorage.setItem("color", blue);
    changeColor(localStorage.getItem("color"));
  }

  if(selected == "green")
  {
    localStorage.removeItem("color");
    localStorage.setItem("color", green);
    changeColor(localStorage.getItem("color"));
  }
  if(selected == "yellow")
  {
    localStorage.removeItem("color");
    localStorage.setItem("color", yellow);
    changeColor(localStorage.getItem("color"));
  }
}


  //changes styling colors
function changeColor(color)
{
  let notes = document.querySelectorAll(".note");

  notes.forEach(e => {
    console.log(color);
      e.style.backgroundColor = color;
  } )

  textarea.style.border = color + " 2px solid";
  btn.style.backgroundColor = color;
  select.style.backgroundColor = color;
}

function displayRightSelect(select)
{
  if(localStorage.getItem("color") =="#F76262")
  {
    select.value = "red";
  }

  if(localStorage.getItem("color") =="#216583")
  {
    select.value = "blue";
  }

  if(localStorage.getItem("color") =="#32a852")
  {
    select.value = "green";
  }

  if(localStorage.getItem("color") =="#ffd359")
  {
    select.value = "yellow";
  }
}




