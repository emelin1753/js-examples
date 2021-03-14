const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  //самовызывающая функция, чтобы закрыться от изменения глобальных переменных, пересечений и для безопасности
  //удобнее перевести массив в объект объектов, чтобы не искать и не перебирать постоянно задачи в массиве
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      "--base-text-color": "#212529",
      "--header-bg": "#007bff",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#007bff",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#0069d9",
      "--default-btn-border-color": "#0069d9",
      "--danger-btn-bg": "#dc3545",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#bd2130",
      "--danger-btn-border-color": "#dc3545",
      "--complete-btn-bg": "#6adc35",
      "--complete-btn-text-color": "#fff",
      "--complete-btn-hover-bg": "#26bd21",
      "--complete-btn-border-color": "#6adc35",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#80bdff",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    },
    dark: {
      "--base-text-color": "#212529",
      "--header-bg": "#343a40",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#58616b",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#292d31",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#b52d3a",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#88222c",
      "--danger-btn-border-color": "#88222c",
      "--complete-btn-bg": "#26bd21",
      "--complete-btn-text-color": "#fff",
      "--complete-btn-hover-bg": "#077936",
      "--complete-btn-border-color": "#26bd21",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    },
    light: {
      "--base-text-color": "#212529",
      "--header-bg": "#fff",
      "--header-text-color": "#212529",
      "--default-btn-bg": "#fff",
      "--default-btn-text-color": "#212529",
      "--default-btn-hover-bg": "#e8e7e7",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#f1b5bb",
      "--danger-btn-text-color": "#212529",
      "--danger-btn-hover-bg": "#ef808a",
      "--danger-btn-border-color": "#e2818a",
      "--complete-btn-bg": "#a9dd6d",
      "--complete-btn-text-color": "#212529",
      "--complete-btn-hover-bg": "#6adc35",
      "--complete-btn-border-color": "#a9dd6d",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    },
  };
  let NowAllTasks = true; // находимся в списке всех задач
  const localStorageThemeKey = "app_theme";
  let lastSelectedTheme =
    localStorage.getItem(localStorageThemeKey) || "default";

  //Elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"]; // здесь хранятся все формы
  const inputTitle = form.elements["title"]; // id элементов
  const inputBody = form.elements["body"];
  const btnNoCompletedTasks = document.querySelector("#nocomleted-tasks");
  const btnAllTasks = document.querySelector("#all-tasks");
  const noTasks = document.querySelector(".no-tasks");
  const themeSelect = document.getElementById("themeSelect");
  themeSelect.value = lastSelectedTheme;

  //Events
  // renderAllTasks(arrOfTasks);
  setTheme(lastSelectedTheme);
  showAllTasksHandler();
  form.addEventListener("submit", onFormSubmitHandler); // обрабатываем события на форме (enter)
  //listContainer.addEventListener("click", onDeleteHandler1);
  listContainer.addEventListener("click", onEventHandler);
  btnNoCompletedTasks.addEventListener("click", showNoCompletedTasksHandler);
  btnAllTasks.addEventListener("click", showAllTasksHandler);
  themeSelect.addEventListener("change", onThemSelectHandler);

  function renderAllTasks(tasksList) {
    // воспроизводим список задач на экране
    if (!tasksList) {
      console.error("Передайте список задач");
      return;
    }

    const fragment = document.createDocumentFragment();
    //Object.values(tasksList).forEach(task => {console.log(task)}); // зачем обратно в массив переводить?
    tasksList.forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    //сразу делаем деструктуризацию аргумента, прикольно
    //создаем отдельную li с задачей
    const li = document.createElement("li");
    li.classList.add(
      // классы от фреймформка
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id); //по-моему лишнее это

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete task";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete task";
    completeBtn.classList.add("btn", "ml-auto", "complete-btn");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    li.appendChild(span); //можно элементы добавить в массив, а потом перебрать массив и добавить в li
    li.appendChild(deleteBtn);
    li.appendChild(article);
    li.appendChild(completeBtn);
    completeTaskHtml(completed, li);

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault(); //прекращаем перезгрузку страницы, т.к. обработчик формы обновляет страницу
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body"); //пустые строки нам не нужны
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset(); // очистка формы
    showNoTasks();
  }

  function createNewTask(title, body) {
    //создаем новый объект и добавляем в список задач
    const newTask = {
      title, // новый синтаксис объявления одноименных полей
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask; // добавляем в наш объект объектов
    return { ...newTask }; // возвращаем копию(неглубокую) объекта
  }

  //делигирование событий на родительский элемент
  //при клике будем проверять
  // мой пример рабочий и элегантный, но не масштабируемый
  /*
  function onDeleteHandler(e) {
    const id = e.toElement.parentNode.getAttribute("data-task-id");
    if (
      !(
        e.target.classList.contains("delete-btn") &&
        confirm(`Удалить: ${objOfTasks[id].title}?`)
      )
    )
      return;

    delete objOfTasks[id];
    e.toElement.parentNode.remove();
    showNoTasks();
  }*/

  // пример препода 3 функции, сделано для расширения функционала в будущем
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Удалить: ${title}?`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, element) {
    if (!confirmed) return;
    element.remove();
  }

  /*function onDeleteHandler1({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]"); //ищет ближайшего родителя с таким атрибутом
      const id = parent.dataset.taskId; //получаем этот атрибут
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      showNoTasks();
    }
  }*/
  function completeTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Выполнить\\восстановить: ${title}?`);
    if (!isConfirm) return isConfirm;
    objOfTasks[id].completed = !objOfTasks[id].completed;
    return isConfirm;
  }

  function completeTaskHtml(confirmed, element) {
    if (!confirmed) return;
    element.classList.toggle("complete-task");
  }

  function onEventHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]"); //ищет ближайшего родителя с таким атрибутом
      const id = parent.dataset.taskId; //получаем этот атрибут
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      showNoTasks();
    } else if (target.classList.contains("complete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = completeTask(id);
      completeTaskHtml(confirmed, parent);
      if (!NowAllTasks) showNoCompletedTasksHandler();
    }
  }

  function showNoTasks() {
    const firstTask = document.querySelector("[data-task-id]"); //есть хоть кто-то?
    if (!firstTask) noTasks.classList.remove("d-none");
    else noTasks.classList.add("d-none");
  }

  function showNoCompletedTasksHandler() {
    clearAllTasks();
    const arrayOfTasks = Object.values(objOfTasks);
    const arrayOfNoComletedTasks = arrayOfTasks.filter(
      (task) => !task.completed
    );
    renderAllTasks(arrayOfNoComletedTasks);
    showNoTasks();
    NowAllTasks = false;
  }

  function showAllTasksHandler() {
    clearAllTasks();
    const arrayOfTasks = Object.values(objOfTasks);
    arrayOfTasks.sort((prev, next) => prev.completed - next.completed);
    renderAllTasks(arrayOfTasks);
    showNoTasks();
    NowAllTasks = true;
  }

  function clearAllTasks() {
    const [...allTasks] = document.querySelectorAll("[data-task-id]");
    allTasks.forEach((task) => {
      deleteTaskFromHtml(true, task);
    });
  }

  function onThemSelectHandler(e) {
    const selectedThem = themeSelect.value;
    const isConfirmed = confirm(`Изменить тему на: ${selectedThem}`);
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedThem);
    lastSelectedTheme = selectedThem;
    localStorage.setItem(localStorageThemeKey, selectedThem);
  }

  function setTheme(name) {
    const selectedThemObj = themes[name];
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);
