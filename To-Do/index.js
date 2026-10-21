
const inputTask=document.getElementById('inputTask');
const taskDate=document.getElementById('taskDate');
const taskTime=document.getElementById('taskTime');
const addTaskBtn=document.getElementById('taskSubmit');
const todayTasks=document.getElementById('todayTasks');
const prevTasks=document.getElementById('prevTasks');
const todaySection = document.getElementById('todaySection');
const futureSection = document.getElementById('futureSection');
const futureTasks=document.getElementById('futureTasks');
const searchText=document.getElementById('searchTask');
const emptyState=document.getElementById('emptyState');
const tasks=JSON.parse(localStorage.getItem('tasks')) || [];

const addTask=()=>{
    
    const inputTaskText=inputTask.value;
    let inputDate=taskDate.value;
    const inputTime=taskTime.value;
    if(inputTaskText==="" || inputDate==="" || inputTime===""){
        return alert("Fill All the necessary details");
    }
    inputDate=inputDate.split("-").reverse().join("/");
    
    tasks.push({
        taskText:inputTaskText,
        date:inputDate,
        time:inputTime
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
    inputTask.value="";
    taskDate.value=null;
    taskTime.value=null;
    displayTasks(tasks);

}

const displayTasks=(tasks)=>{
    if (tasks.length === 0) {
        emptyState.style.display = "block";
    }
    else{
        emptyState.style.display = "none";
    }
    if (futureTasks) futureTasks.textContent = "";
    if (prevTasks) prevTasks.textContent = "";
    if (todayTasks) todayTasks.textContent = "";
    todaySection.style.display = "none";
    futureSection.style.display = "none";
    tasks.forEach((task,index)=>{
        const taskCard=document.createElement('div');
        const taskDetails=document.createElement('div');
        const taskActions=document.createElement('div');
        const taskHeaderDate=document.createElement('h1');
        const removeTaskBtn=document.createElement('button');
        const editTaskBtn=document.createElement('button');
        const taskText=document.createElement('p');
        taskText.textContent=`${task.taskText} ${task.time}`;
        removeTaskBtn.textContent='delete';
        editTaskBtn.textContent='Edit';
        taskHeaderDate.textContent=task.date;
        taskCard.appendChild(taskHeaderDate);
        taskDetails.appendChild(taskText);
        taskActions.appendChild(removeTaskBtn);
        taskActions.appendChild(editTaskBtn);
        taskActions.classList.add('taskActions');
        taskDetails.classList.add('innerDiv');
        taskCard.appendChild(taskDetails);
        taskCard.appendChild(taskActions);
        removeTaskBtn.classList.add('deleteBtn');
        removeTaskBtn.addEventListener('click',()=> removeTask(index));
        editTaskBtn.classList.add('editBtn');
        editTaskBtn.addEventListener('click',()=>editTask(task));
        taskCard.classList.add('taskItems')
        const category = getTaskdateCategory(task);

        if (category === 'prev') {
            prevTasks.appendChild(taskCard);
        } else if (category === 'today') {
            todaySection.style.display = "block";
            todayTasks.appendChild(taskCard);
        } else {
            futureSection.style.display = "block";
            futureTasks.appendChild(taskCard);
        }
    })
}

const getTaskdateCategory=(task)=>{
    const [day, month, year] = task.date.split('/').map(Number);

    const taskDate = new Date(year, month - 1, day);
    const today = new Date();
    if(taskDate.getFullYear() !== today.getFullYear() ){
        if(taskDate.getFullYear() > today.getFullYear()){
            return "future"
        }
        return "prev";
    }
    else if(taskDate.getMonth() !== today.getMonth() ){
        if(taskDate.getMonth() > today.getMonth()){
            return "future"
        }
        return "prev";
    }
    else if(taskDate.getDay() !== today.getDay() ){
        if(taskDate.getDay() > today.getDay()){
            return "future"
        }
        return "prev";
    }
    return "today";
}

const editTask=(task)=>{
    const updatedText = prompt('Enter the updated task description:',task.taskText);

    if (updatedText !== null && updatedText.trim() !== "") {
        task.taskText = updatedText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(tasks);
    }
}

const removeTask=(index)=>{
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(tasks);
}

const search = () => {
    
    const searchValue = searchText.value.toLowerCase().trim();

    if (searchValue === "") {
        emptyState.style.display = "none";
        displayTasks(tasks);
        return;
    }

    const filteredTasks = tasks.filter((task) =>
        task.taskText.toLowerCase().includes(searchValue)
    );

    if (filteredTasks.length === 0) {
        displayTasks([]);
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";
    displayTasks(filteredTasks);
    
};

displayTasks(tasks);

searchText.addEventListener('keydown', search);

addTaskBtn.addEventListener('click',addTask);
