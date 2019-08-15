var btn = document.getElementById("btn");
var textarea = document.getElementById("textarea");
var select = document.getElementById("color");
var btnBackground = document.getElementById("btn-background");
var btnHistory = document.getElementById("clearHistory");

//load
loadNotes();
loadStyling();
loadBackground();
loadHistory();
 

//button listener
btn.addEventListener("click", createNote);
btnBackground.addEventListener("click", changeBackground);
btnHistory.addEventListener("click", clearHistory);

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

    if(key != "color" && key != "background" && key.substring(0, 8) != "history-")
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

  addHistory(text);
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
      e.style.backgroundColor = color;
  } )

  textarea.style.border = color + " 2px solid";
  btn.style.backgroundColor = color;
  select.style.backgroundColor = color;
  btnBackground.style.backgroundColor = color;
  btnHistory.style.backgroundColor = color;
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

function DrowpDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function addHistory(text)
{
  localStorage.setItem("history-" + text, text);
  addDrowdown(text)
}

function addDrowdown(text)
{
  let dropDown = document.getElementById("myDropdown"); 

  //Create Elements
  let newDiv = document.createElement("div");
  let node = document.createTextNode(text);

  //Appending Elements
  newDiv.append(node);
  dropDown.append(newDiv);

  //event listener for delete button
  addListenerPullBack(newDiv);
}

function addListenerPullBack(div) 
{
  div.addEventListener('click', function (e) 
  {
    let containerDiv = document.getElementById("notes-container"); 
    let text = e.target.innerText;

    //Create Elements
    let newDiv = document.createElement("div");
    let para = document.createElement("p");
    let newNote = document.createTextNode(text); 
    let deleteButton = document.createElement("div");

    //Styling Elements
    newDiv.classList.add("note");
    deleteButton.classList.add("deleteButton");

    //Appending Elements
    para.appendChild(newNote);
    newDiv.appendChild(deleteButton);
    newDiv.appendChild(para);
    containerDiv.append(newDiv);

    localStorage.setItem(text, text);
    localStorage.removeItem("history-" + text, text);

    //event listener for delete button
    addListenerDeleteButton(deleteButton,text);

    changeColor(localStorage.getItem("color"));

    let parent = e.target.parentNode;
    parent.removeChild(e.target);
  });
}

function loadHistory()
{
  Object.keys(localStorage).forEach(function(key){

    if(key.substring(0,8) == "history-")
    {
      addDrowdown(key.substring(8,key.length));
    }
  });
}

function clearHistory()
{
  var dropDown = document.getElementById("myDropdown"); 

  while(dropDown.childElementCount > 1)
  {
    dropDown.removeChild(dropDown.lastChild);
  }

  Object.keys(localStorage).forEach(function(key){

    if(key.substring(0,8) == "history-")
    {
      localStorage.removeItem(key);

    }
  });
}
