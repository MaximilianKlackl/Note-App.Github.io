var btn = document.getElementById("btn");
var textarea = document.getElementById("textarea");
var select = document.getElementById("color");
var btnBackground = document.getElementById("btn-background");

loadNotes();
loadStyling();
loadBackground();
 
btn.addEventListener("click", createNote);
btnBackground.addEventListener("click", changeBackground);

//change styling on option
changeColor(localStorage.getItem("color"));
select.addEventListener("change", changeStyling);
displayRightSelect(select);

function loadBackground()
{
  if(localStorage.getItem("background") != null)
  {
    setBackground();
  }
  else
  {
    changeBackground();
  }
}

function changeBackground()
{
  if(localStorage.getItem("background") >= 14)
  {
    localStorage.removeItem("background");
    localStorage.setItem("background", 1);
  }
  else
  {
    let tempNum = localStorage.getItem("background");
    localStorage.removeItem("background");
    tempNum++;
    localStorage.setItem("background", tempNum);
  }
  setBackground();
}

function setBackground()
{
  document.body.style.background = "url(Images/Wallpapers/background" + localStorage.getItem("background") + ".jpg";
}

function loadStyling()
{
  if(localStorage.getItem("color") == null)
  {
  localStorage.setItem("color", "#F76262");
  }
}

function loadNotes()
{ 
  Object.keys(localStorage).forEach(function(key){
    if(key != "color" && key != "background")
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
  btnBackground.style.backgroundColor = color;
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




