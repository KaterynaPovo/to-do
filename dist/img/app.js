const addTxt = document.querySelector(".todoinput");

let todos = JSON.parse(localStorage.getItem("todo-list"));
let data = todos.length ? todos : [];

//Add new todos to the list
function addTodos(todo) {
  todo.preventDefault();
  let addRoutine = {};
  addRoutine.routine = addTxt.value;
  addRoutine.checked = "";
  data.push(addRoutine);
  addTxt.value = "";
  localStorage.setItem("todo-list", JSON.stringify(data));
  renderList();
}

addTxt.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (!data) {
      data = [];
    }
    addTodos(e);
  }
});

const list = document.querySelector(".task-box");
const unfishedNum = document.querySelector(".unfinished");

function renderList() {
  let newTodos = "";
  let count = 0;
  if (data) {
    data.forEach((item, index) => {
      newTodos += `
    <li class="task">
        <div >
            <input class="form-check-input" type="checkbox" id="${index}" ${item.checked} >
            <label for="${index}" data-id="${index}"> ${item.routine}</label>
        </div>
        <a href="#" class="cross">
          <svg
             xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             
             data-num="${index}"
             data-delete = "garbageCan" 
           >
            <path
               fill="#494C6B"
               fill-rule="evenodd"
               d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </a>
    </li>`;
      if (item.checked === "") {
        count += 1;
      }
    });
  }

  list.innerHTML = newTodos;
  unfishedNum.textContent = `${count} undone list`;
}

renderList();

function newRenderList(showData) {
  let changeTodos = "";
  showData.forEach((item, index) => {
    changeTodos += `
  <li class="task">
      <div>
          <input type="checkbox" id="${index}" ${item.checked} >
          <label for="${index}" data-id="${index}">${item.routine}</label>
      </div>
      <a href="#" class="cross">
        <svg
           xmlns="http://www.w3.org/2000/svg"
           width="18"
           height="18"
           
           data-delete = "garbageCan" 
           data-num="${index}"
         >
           <path
             fill="#494C6B"
             fill-rule="evenodd"
             d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
           />
        </svg>
      </a>   
  </li>`;
  });
  list.innerHTML = changeTodos;
}

//Mark todos as complete
list.addEventListener("click", (e) => {
  let num = e.target.getAttribute("data-num");
  let id = e.target.getAttribute("data-id");
  let routineId = e.target.getAttribute("id");

  if (e.target.getAttribute("data-delete") == "garbageCan") {
    e.preventDefault();
    data.splice(num, 1);
  } else {
    data.forEach((item, index) => {
      if (id == index || routineId == index) {
        if (item.checked === "checked") {
          item.checked = "";
        } else {
          item.checked = "checked";
        }
      }
      //cross.style.visibility = "visible";
    });
  }
  localStorage.setItem("todo-list", JSON.stringify(data));
  renderList();
});

//Filter by all/active/complete todos
const tabMenu = document.querySelector(".filters");
const filters = document.querySelectorAll(".filters span");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
  });
});

tabMenu.addEventListener("click", (e) => {
  e.preventDefault();
  let toggleStatus = e.target.getAttribute("data-tab");
  let showData = [];
  if (toggleStatus === "all") {
    renderList();
  } else if (toggleStatus === "active") {
    showData = data.filter((item) => item.checked === "");
    newRenderList(showData);
  } else if (toggleStatus === "completed") {
    showData = data.filter((item) => item.checked === "checked");
    newRenderList(showData);
  }
});

//Clear all completed todos
const deleteAllDone = document.querySelector(".clear-btn");
deleteAllDone.addEventListener("click", (e) => {
  e.preventDefault();
  let deleteData = [];
  data.forEach((item) => {
    if (!item.checked) {
      deleteData.push(item);
    }
  });
  data = deleteData;
  localStorage.setItem("todo-list", JSON.stringify(data));
  renderList();
});
