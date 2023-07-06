/* Web component to render task content, error, success, and hint messages.

   - Tasks, images and hints are defined in src/scripts/tasks.js. 
   - Error/success messages are defined in src/scripts/tests.js.
   - Internal CSS classes are defined in ./styles.js.
   - External CSS classes (for 'task' and 'task-content') are defined in src/blocks/task.css.

   Usage in HTML looks like this:

    <section class="task">
      <task-content id="task-id" class="task__body"></task-content>
    </section>
*/

import { LitElement, html } from "lit";

import { tasks } from "../../scripts/data/tasks";
import taskContentStyles from "./styles";

export class TaskContent extends LitElement {
  static styles = taskContentStyles;

  static get properties() {
    return {
      id: {
        type: String,
      },
      currentTask: {},
      message: {},
    };
  }

  firstUpdated() {
    this._hintButton = this.renderRoot.querySelector(".task__hint-button");
  }

  _goToNextTask() {
    const nextTaskId = this.currentTask.next;
    this.currentTask = tasks.find((task) => task.id === nextTaskId);
  }

  // Display error or success message
  showMessage(message) {
    this.message = message;
  }

  // Return classList for message element
  _messageClasses = () => {
    return `${this.message && "visible"} task__message task__message_type_${
      this.message && this.message.type
    }`;
  };

  _hideMessage() {
    const message = this.renderRoot.querySelector(".task__message");
    message.classList.remove("visible");
    setTimeout(() => {
      this.message = null;
    }, 250);
  }

  _showHint() {
    if (this.message && this.message.type == "hint") {
      this._hideMessage();
    } else {
      this.showMessage({ content: this.currentTask.hint, type: "hint" });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._taskIdentifier = this.id;
    this.currentTask = tasks.find((task) => task.id === this._taskIdentifier);
  }

  _keydownHandler(e) {
    if (e.code === "Escape") {
      this._hideMessage();
    }
  }

  updated() {
    if (this.message || this.hint) {
      this.getRootNode().addEventListener("keydown", (e) =>
        this._keydownHandler(e)
      );
    } else {
      this.getRootNode().removeEventListener("keydown", (e) =>
        this._keydownHandler(e)
      );
    }
  }

  render() {
    return html`
      <div class="task__text-wrapper">${this.currentTask.content}</div>
      ${this.currentTask.hint &&
      html`
        <button class="task__hint-button" @click="${this._showHint}">
          Show a hint
        </button>
      `}
      <p id="message" class="${this._messageClasses()}">
        ${this.message && this.message.content}
      </p>
    `;
  }
}

customElements.define("task-content", TaskContent);
