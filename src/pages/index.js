import "./index.css";
import "../components/quiz-app/quiz-app.js";
import "../components/bem-practice/bem-practice.js";
import "../components/quiz-question/quiz-question.js";
import "../components/number-form/number-form.js";

import { tasks } from "../scripts/data/tasks.js";
import { tests } from "../scripts/tests.js";

const taskElement = document.querySelector("task-content");
const taskStep = document.querySelector(".page__task-step");

const nextTaskButton = document.querySelector(".button_action_next");
const checkWorkButton = document.querySelector(".button_action_check");

const setTaskNumber = (task) => {
  if (taskStep) {
    taskStep.textContent = `/ Step ${task ? task.id.slice(-1) : 1}`;
  }
};

const disableButton = (button) => {
  button.setAttribute("disabled", "");
  button.classList.add("button_disabled");
};

const enableButton = (button) => {
  button.removeAttribute("disabled");
  button.classList.remove("button_disabled");
};

// Resets error/success method, and moves to the next task or chapter.
nextTaskButton?.addEventListener("click", () => {
  taskElement.message = {};
  if (taskElement.currentTask.next) {
    const currentTaskId = taskElement.getAttribute("id");
    const currentTask = tasks.find((task) => task.id === currentTaskId);
    taskElement.setAttribute("id", currentTask.next);
    taskElement.currentTask = tasks.find(
      (task) => task.id === currentTask.next
    );
    setTaskNumber(taskElement.currentTask);
  } else {
    window.location = `/${taskElement.currentTask.nextChapter}`;
  }
  disableButton(nextTaskButton);
  enableButton(checkWorkButton);
});

// Checks the students work, using tests defined in tests.js.
// Calls the task component's showMessage method to display the results.
checkWorkButton?.addEventListener("click", () => {
  const currentTaskId = taskElement.getAttribute("id");
  const result = tests[currentTaskId]();
  if (result.error) {
    taskElement.showMessage({ type: "error", content: result.error });
  } else {
    disableButton(checkWorkButton);
    enableButton(nextTaskButton);
    taskElement.showMessage({ type: "success", content: result });
  }
});

setTaskNumber();
