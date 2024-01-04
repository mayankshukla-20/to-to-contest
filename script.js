
const data= document.getElementById("todoInput")
let pri = document.getElementById("priority")
const submitButton = document.querySelector("form > button");
const main = document.querySelector("section > .main");
const cardsContainer = document.querySelector(".cards");

const highPriorityCount = document.getElementById("hp-span")
const todoCount = document.getElementById("todo-span");
let tdct = 0;


function deleteCard(event){
  const buttonRef = event.target;
  const cardToDelete = buttonRef.parentNode.parentNode;
  const checkedButton = document.querySelector(".card > #unchecked");
  let hpct = highPriorityCount.innerText;
  let tdct = todoCount.innerText;
  if(checkedButton.innerText === "check-circle"){
    hpct--;
  }
  else{
    tdct--;
  }
  cardToDelete.remove();
  highPriorityCount.innerText = hpct;
  todoCount.innerText = tdct;
  
}
// const hpct = 0;
function createCard(text , priority, duedate){
  const card = document.createElement("div");
  card.classList.add("card");
  card.draggable = true;

  const check = document.createElement("button");
  check.setAttribute("id","unchecked")
  check.className = "material-icons"
  check.innerText = "radio_button_unchecked";
  check.style.color = "white";


  const para = document.createElement("p");
  para.innerText = `${text}`;

  const para1 = document.createElement("p");
  para1.innerText = `${priority}`.toUpperCase();

  const para2 = document.createElement("p");
  para2.innerText = `${duedate}`

  const buttons = document.createElement("div");

  const edit = document.createElement("button");
  edit.className = "material-icons";
  edit.innerText = "edit";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.className = "material-icons";

  card.appendChild(check);
  card.append(para , para1, para2);
  buttons.append(deleteButton,edit);
  card.appendChild(buttons);
  cardsContainer.append(card);
  tdct++;
  todoCount.innerText = tdct;
  deleteButton.addEventListener("click" , deleteCard);
  check.addEventListener("click" , toggling);
  edit.addEventListener("click" , editing);
}

function toggling(event){
  let hpct = highPriorityCount.innerText;
  const check = event.target;
  check.innerText = "check_circle";
  hpct++;
  highPriorityCount.innerText = hpct;

}

function editing(event){
  let buttonref = event.target;
  let paraToBeEdited = buttonref.parentNode.parentNode;
  const newTask = prompt("Enter New Task");
  const para = document.querySelector(".card > p");
  para.innerText = `${newTask}`;

 
  
}



function onSubmitForm(){
    // event.preventDefault();
    let text = data.value;
    let priority = pri.value;
    let duedate = document.getElementById("duedate").value;
    
      createCard(text,priority,duedate);
}

let draggedElement = null;
function onDragStart(event) {
  // as soon as an element is started dragging , assign that element to draggedElement variable
  draggedElement = event.target;
}

function onDragOver(event) {
  // event.currentTarget => TODO, INPROGRESS, DONE
  draggedElement.parentNode

  if (draggedElement.parentNode.id === event.currentTarget.id) {
      // self container 
      return;
  }
  event.preventDefault();
}

function onDrop(event) {
  // drop the draggedElement into drop zone
  // currentTarget = "TODO" , "INPROGRESS", "DONE"
  event.currentTarget.appendChild(draggedElement);
  if (event.currentTarget.id === "done") {
      // add an animation class for the draggedElement
      draggedElement.classList.add("done");
      console.log("dropped")
  }
}
for (let i = 0; i < cardsContainer.length; i++) {
  // each container should have dragover and drop events 

  containers[i].addEventListener("dragover", onDragOver)
  containers[i].addEventListener("drop", onDrop)
}

