window.addEventListener("load", function(){

    class Task{
        constructor(id, task, check){
            this.id = id;
            this.task = task;
            this.check = check;
        }
    }

    let nameTask;
    let form = document.querySelector(".addTask");
    let editsection = document.querySelector(".editform");
    let editinput = editsection.querySelector("input");
    let input = document.querySelector(".task");
    let listTask = document.querySelector(".tasks");
    let emptyListTask = document.querySelector(".emptyTasks");
    let btnRemove = document.querySelector(".del");
    let error = document.querySelector(".error");
    let erroredit = document.querySelector(".erroredit");
    let tema = this.document.querySelector(".tema");
    form.addEventListener("submit", createTask);
    listTask.addEventListener("click", checkedTask);
    listTask.addEventListener("dblclick", editTask);
    listTask.addEventListener('click', removeTask);
    btnRemove.addEventListener('click', removeTaskAll);
    tema.addEventListener("click", changeTheme);

    function setLocal(){
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }

    function getLocal(){
        return localStorage.getItem("tasks");
    }

    let tasksArray = [];

    if(getLocal()){
        tasksArray = [...JSON.parse(getLocal())];
        emptyListTask.classList.add("nodisplay");
        let tasks = document.querySelector(".tasks");
        for(let j = 0; j < tasksArray.length; j++){
            let div = document.createElement('div');
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
            let task = document.createElement('p');
            let btn = document.createElement('button');
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", `task${tasksArray[j].id}`);
            checkbox.setAttribute("value", `${tasksArray[j].task}`);
            checkbox.classList.add("custom-checkbox");
            label.setAttribute("for", `task${tasksArray[j].id}`)
            task.innerHTML = tasksArray[j].task;
            btn.innerHTML = `<img src="./img/del.png" alt="">`;
            if(tasksArray[j].check){
                task.classList.add('checked');
                checkbox.setAttribute("checked", "");
            } else checkbox.removeAttribute("checked");
            tasks.appendChild(div);
            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(task);
            div.appendChild(btn);
        }
    }

    if(localStorage.getItem("theme")){
        document.documentElement.setAttribute("data-tema", localStorage.getItem("theme"));
    } else{
        localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-tema", "light");
    }

    function changeTheme(){
        if(document.documentElement.getAttribute("data-tema") === "light"){
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-tema", "dark");
        } else{
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-tema", "light");
        }
    }

    function createTask(event) {
        if(input.value !== ""){
            event.preventDefault();
            emptyListTask.classList.add("nodisplay");
            let tasks = document.querySelector(".tasks");
            let div = document.createElement('div');
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
            let task = document.createElement('p');
            let btn = document.createElement('button');
            if(tasksArray.length > 0){
                for (const key in tasksArray) {
                    if (Object.hasOwnProperty.call(tasksArray, key)) {
                        if(tasksArray[key].task === input.value){
                            error.classList.remove("visibility");
                            return;
                        }else{
                            error.classList.add("visibility");
                            for (let i = 0; i < tasks.children.length; i++) {
                                checkbox.setAttribute("type", "checkbox");
                                checkbox.setAttribute("id", `task${i}`);
                                checkbox.setAttribute("value", `${input.value}`);
                                checkbox.classList.add("custom-checkbox");
                                label.setAttribute("for", `task${i}`)
                                task.innerHTML = input.value;
                                btn.innerHTML = `<img src="./img/del.png" alt="">`;
                            }
                        }
                    }
                }
                let taskItem = new Task(tasks.children.length-1, input.value, false);
                tasksArray.push(taskItem);
                setLocal();
                tasks.appendChild(div);
                div.appendChild(checkbox);
                div.appendChild(label);
                div.appendChild(task);
                div.appendChild(btn);
                input.value = '';
                input.focus();
            } else{
                for (let i = 0; i < tasks.children.length; i++) {
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("id", `task${i}`);
                    checkbox.setAttribute("value", `${input.value}`);
                    checkbox.classList.add("custom-checkbox");
                    label.setAttribute("for", `task${i}`)
                    task.innerHTML = input.value;
                    btn.innerHTML = `<img src="./img/del.png" alt="">`;
                }
                let taskItem = new Task(tasks.children.length-1, input.value, false);
                tasksArray.push(taskItem);
                setLocal();
                tasks.appendChild(div);
                div.appendChild(checkbox);
                div.appendChild(label);
                div.appendChild(task);
                div.appendChild(btn);
                input.value = '';
                input.focus();
            }
        }
     }

     function checkedTask(event){
        let parent = event.target.closest('div');
        let check = parent.querySelector("input[type='checkbox']");
        let p = parent.querySelector("p");
        let task;
        for (const key in tasksArray) {
            if (Object.hasOwnProperty.call(tasksArray, key)) {
                if(tasksArray[key].task === p.innerHTML){ task = tasksArray[key];}
            }
        }
        if (check.checked) {
            p.classList.add('checked');
            task.check = true;
            setLocal();
        } else {
            p.classList.remove('checked');
            task.check = false;
            setLocal();
        }
     }

     function editTask(event){
        let parent = event.target.closest('div');
        let check = parent.querySelector("input[type='checkbox']");
        let p = parent.querySelector("p");
        if(check.checked){
            editsection.classList.remove("nodisplay");
            editinput.value = "Редактирование выполненной задачи ЗАПРЕЩЕНО!!!";
        } else{
            let task;
            for (const key in tasksArray) {
                if (Object.hasOwnProperty.call(tasksArray, key)) {
                    if(tasksArray[key].task === p.innerHTML){ task = tasksArray[key];}
                }
            }
            nameTask = parent.querySelector("p");
            editsection.classList.remove("nodisplay");
            let editform = editsection.querySelector("form");
            editinput.value = nameTask.innerHTML;
            editinput.focus();
            editform.addEventListener("submit", {handleEvent: edit, tasks: task})
        }
    }

    function edit(event){
        event.preventDefault();
        erroredit.classList.remove("visibility");
        for (const key in tasksArray) {
            if (Object.hasOwnProperty.call(tasksArray, key)) {
                if(tasksArray[key].task === editinput.value){
                    erroredit.classList.remove("visibility");
                    return;
                }else{
                    erroredit.classList.add("visibility");
                    nameTask.innerHTML = editinput.value;
                }
            }
        }
        this.tasks.task = nameTask.innerHTML;
        setLocal();
        editsection.classList.add("nodisplay");
    }

     function removeTask(event) {
        if(event.target.closest('button')){
            let parent = event.target.closest('div');
            let p = parent.querySelector("p");
            for (const key in tasksArray) {
                if (Object.hasOwnProperty.call(tasksArray, key)) {
                    if(tasksArray[key].task === p.innerHTML){ tasksArray.splice(key, 1);}
                }
            }
            setLocal();
            event.target.closest('div').remove();
        }
        if(listTask.children.length == 1){
            localStorage.clear();
            emptyListTask.classList.remove("nodisplay");
        }
     }

     function removeTaskAll(event) {
        listTask.replaceChildren();
        emptyListTask.classList.remove("nodisplay");
        listTask.append(emptyListTask);
        localStorage.clear();
     }

});