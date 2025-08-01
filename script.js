const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

function checkReminders() {
  const now = new Date();
  const items = document.querySelectorAll("li");

  items.forEach((item) => {
    const dueDate = new Date(item.getAttribute("data-due"));
    const timeDiff = (dueDate - now) / (1000 * 60 * 60 * 24); // in days

    if (timeDiff <= 1 && !item.classList.contains("complete")) {
      item.classList.add("reminder");
      const taskName = item.querySelector("span").textContent;
      const assignedBy = item.getAttribute("data-assigned-by");

      // Simulated email reminder
      console.log(`📧 Reminder: Task '${taskName}' is due soon. Assigned by ${assignedBy}`);
    }
  });
}

function createTaskElement(task, assignedBy, assignedDate, dueDate) {
  const li = document.createElement("li");
  li.setAttribute("data-due", dueDate);
  li.setAttribute("data-assigned-by", assignedBy);

  li.innerHTML = `
    <span>${task}</span><br/>
    <small>Assigned by: ${assignedBy} | Assigned: ${assignedDate} | Due: ${dueDate}</small>
    <br/>
    <button onclick="markComplete(this)">✔ Done</button>
    <button onclick="removeTask(this)">🗑 Remove</button>
  `;

  return li;
}

function markComplete(button) {
  const li = button.parentElement;
  li.classList.toggle("complete");
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = document.getElementById("task").value.trim();
  const assignedBy = document.getElementById("assignedBy").value.trim();
  const assignedDate = document.getElementById("assignedDate").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!task || !assignedBy || !assignedDate || !dueDate) {
    alert("Please fill out all fields.");
    return;
  }

  const taskElement = createTaskElement(task, assignedBy, assignedDate, dueDate);
  taskList.appendChild(taskElement);

  taskForm.reset();
});

// Check reminders every 10 seconds (for demo)
setInterval(checkReminders, 10000);
