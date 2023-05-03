let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  
  getDataFromLocalStorage();

  submit.onclick = function () {
    if (input.value !== "") {
      addTaskToArray(input.value);
      input.value = "";
    }
  };

  function addTaskToArray(taskText){

    const task ={
        id : Date.now(),
        title: taskText,
        completed: false,
    };

    arrayOfTasks.push(task);

    addElementsToPageFrom(arrayOfTasks);

  addDataToLocalStorageFrom(arrayOfTasks);
  };

  function addElementsToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach(element => {
        let div = document.createElement("div");
        div.className = "task";

    if (element.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", element.id);
    div.appendChild(document.createTextNode(element.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);


    });
  };

  function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }

  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementsToPageFrom(tasks);
    }
  }

  tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.remove();
    }
  });

  function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
  }