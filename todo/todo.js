import fs from 'fs';

const filePath = "./tasks.js";

// Load tasks from JSON file
const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath, "utf8");
    return JSON.parse(dataBuffer);
  } catch (error) {
    return []; // Return empty array if file doesn't exist or error occurs
  }
};

// Save tasks to JSON file
const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // Pretty-print JSON
};

// Add a new task
const addTask = (task) => {
  if (!task) {
    console.log("Error: Task description required.");
    return;
  }
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log(`Task added: "${task}"`);
};

// List all tasks
const listTasks = () => {
    const tasks = loadTasks();
    console.log("Loaded tasks:", tasks); // Debugging line
  
    if (tasks.length === 0) {
      console.log("No tasks found.");
    } else {
      tasks.forEach((task, index) => {
        console.log("Task structure:", task); // Debugging line
        console.log(`${index + 1}. ${task.task}`);
      });
    }
  };
  
  

// Remove a task by index
const removeTask = (index) => {
  const tasks = loadTasks();
  if (isNaN(index) || index < 1 || index > tasks.length) {
    console.log("Invalid task number.");
    return;
  }
  const removedTask = tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log(`Removed task: "${removedTask[0].task}"`);
};

// Handle CLI commands
const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case "add":
    addTask(argument);
    break;
  case "list":
    listTasks();
    break;
  case "remove":
    removeTask(parseInt(argument));
    break;
  default:
    console.log("Invalid command. Use 'add', 'list', or 'remove'.");
}

