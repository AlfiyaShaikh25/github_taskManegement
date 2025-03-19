function submitForm(event) {
    event.preventDefault(); // Prevent form from refreshing

    const taskData = {
        taskOwner: document.getElementById("taskOwner").value,
        taskName: document.getElementById("taskName").value,
        description: document.getElementById("description").value,
        startDate: document.getElementById("startDate").value,
        dueDate: document.getElementById("dueDate").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };
    

    fetch("http://localhost:5000/api/task", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            alert("Task added successfully!");
            document.getElementById("taskForm").reset();
        })
        .catch(error => console.error("Error:", error));
}


// **********************************data Retrive ************************************//
let currentTaskId = null; 
// Fetch all tasks 

document.addEventListener("DOMContentLoaded", function () {
    fetchTasks(); 
});
function fetchTasks() {
    fetch("http://localhost:5000/api/task")
        .then(response => response.json())
        .then(tasks => {
            console.log("Fetched Tasks:", tasks);
            displayTasks(tasks);
        })
        .catch(error => console.error("Error fetching tasks:", error));
}

function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks

   
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-responsive"; // Enables scrolling on small screens

    
    const table = document.createElement("table");
    table.className = "table table-hover align-middle"; // Clean look

   
    table.innerHTML = `
        <thead class="table-secondary">
            <tr>
                <th class="py-2">Task & Owner</th>
                <th class="py-2">Start Date</th>
                <th class="py-2">Description</th>
                <th class="py-2">Priority</th>
                <th class="py-2">Status</th>
                <th class="py-2">Actions</th>
            </tr>
        </thead>
        <tbody class="bg-white">
    `;

  
    tasks.forEach(task => {
        table.innerHTML += `
            <tr id="taskRow-${task.id}">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="user.png" width="40" height="40" class="me-2 rounded-circle">
                        <div>
                            <p class="mb-0 fw-bold">${task.task_name}</p>
                            <p class="mb-0 text-muted">${task.task_owner}</p>
                        </div>
                    </div>
                </td>

                <td>${formatDate(task.start_date)}</td>
                <td>${task.description}</td>
                <td class="fw-bold">${task.priority}</td>
                <td>${task.status}</td>

                <td>
                   
    <div class="icons d-flex jus">
<!-- Edit Icon -->
         <div class="icon-hover me-5" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
            <img class="default-icon" src="edit.svg" alt="Edit" onclick="editTask(${task.id})">
            <img class="hover-icon" src="edit-blue.svg" alt="Edit" onclick="editTask(${task.id})">
        </div>

        
                <!-- Delete Icon -->
         <div class="icon-hover" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete ">
            <img class="default-icon" src="delete.png" alt="Delete"  onclick="deleteTask(${task.id})">
            <img class="hover-icon" src="delete-blue.svg" alt="Delete" onclick="deleteTask(${task.id})">
        </div>
    </div>
</td>

                </td>
                
            </tr>
        `;
    });

    table.innerHTML += `</tbody>`;
    tableContainer.appendChild(table);
    taskList.appendChild(tableContainer);
}





function formatDate(dateString) {
    if (!dateString) return ""; 
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; 
}


// Edit task - Open form and fill data
function editTask(taskId) {
    fetch(`http://localhost:5000/api/task/${taskId}`)
        .then(response => response.json())
        .then(task => {
            console.log("Editing Task:", task);
            currentTaskId = task.id; // Store current task ID

            
            document.getElementById("taskOwner").value = task.task_owner;
            document.getElementById("taskName").value = task.task_name;
            document.getElementById("description").value = task.description;

            document.getElementById("priority").value = task.priority;
            document.getElementById("status").value = task.status;
            document.getElementById("startDate").value = formatDate(task.start_date);
            document.getElementById("dueDate").value = formatDate(task.due_date);

            function formatDate(dateString) {
                if (!dateString) return ""; 
                const date = new Date(dateString);
                return date.toISOString().split("T")[0];
            }
            // Show the form
            document.getElementById("taskFormContainer").style.display = "block";
        })
        .catch(error => console.error("Error fetching task details:", error));
}

// Update task when form is submitted
function updateTask(event) {
    event.preventDefault(); 

    if (!currentTaskId) {
        console.error("Error: No task selected for update.");
        return;
    }

    const updatedTaskData = {
        taskOwner: document.getElementById("taskOwner").value,
        taskName: document.getElementById("taskName").value,
        description: document.getElementById("description").value,
        startDate: document.getElementById("startDate").value,
        dueDate: document.getElementById("dueDate").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };

    fetch(`http://localhost:5000/api/task/${currentTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTaskData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Task updated successfully!");

        
        closePopup(); 

       
        fetchTasks();
    })
    .catch(error => console.error("Error updating task:", error));
}

//delete task
function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) return; 
    fetch(`http://localhost:5000/api/task/${taskId}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Deleted Task:", data);

           
            const taskRow = document.getElementById(`taskRow-${taskId}`);
            if (taskRow) {
                taskRow.remove();
                console.log("Task removed from UI.");
            }

            alert("Task deleted successfully!");

           
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
        .catch(error => console.error("Error deleting task:", error));
}

//pop up form
function editTask(taskId) {
    fetch(`http://localhost:5000/api/task/${taskId}`)
        .then(response => response.json())
        .then(task => {
            console.log("Editing Task:", task);
            currentTaskId = task.id; // Store current task ID

            // Fill the form with task details
            document.getElementById("taskOwner").value = task.task_owner;
            document.getElementById("taskName").value = task.task_name;
            document.getElementById("description").value = task.description;
            document.getElementById("priority").value = task.priority;
            document.getElementById("status").value = task.status;
            document.getElementById("startDate").value = formatDate(task.start_date);
            document.getElementById("dueDate").value = formatDate(task.due_date);

            function formatDate(dateString) {
                if (!dateString) return ""; // Handle empty values
                const date = new Date(dateString);
                return date.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
            }

            // Show overlay and form smoothly
            document.getElementById("overlay").style.display = "block";
            document.getElementById("taskFormContainer").style.display = "block";
            setTimeout(() => {
                document.getElementById("taskFormContainer").classList.add("popup-show");
            }, 10);
        })
        .catch(error => console.error("Error fetching task details:", error));
}

// Close form and overlay
function closePopup() {
    document.getElementById("taskFormContainer").classList.remove("popup-show");
    setTimeout(() => {
        document.getElementById("taskFormContainer").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }, 300); 
}


function resetForm() {
    document.getElementById("taskForm").reset(); 
}
