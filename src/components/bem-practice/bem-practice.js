import { html } from "lit";

import { entities, questions } from "./data.js";

class BemQuestion extends HTMLElement {
  constructor() {
    super();
    this._questions = questions;
    this._entities = entities;
    this._questionNumber = 1;
    this._correctAnswers = 0;
    this._maxQuestions = 10;
    this._render();
    this._selectElements();
    this._writeQuestion();
    this._setEventListeners();
  }

  _selectElements = () => {
    this._form = this.querySelector(".quiz");
    this._nextBtn = this.querySelector(".quiz__btn_action_next");
    this._heading = this.querySelector(".quiz__heading");
    this._input = this.querySelector(".quiz__input");
    this._message = this.querySelector(".message");
    this._summary = this.querySelector(".message_type_summary");
    this._againBtn = this.querySelector(".button_action_start");
    this._numberQuestionsForm = this.querySelector("#num-questions-form");
  };

  _writeQuestion = () => {
    this._question = questions[Math.floor(Math.random() * questions.length)];
    const lines = this._question.data
      .map((item, i) => {
        return item.length === 0
          ? ""
          : `<span>${this._entities[i]}: <code>${item}</code></span>`;
      })
      .filter((line) => line.length > 0);
    this._heading.innerHTML = this._questionNumber++ + ".  " + lines.join("\n");
  };

  _setEventListeners() {
    this._numberQuestionsForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._maxQuestions = evt.currentTarget.elements["num-questions"].value;
    });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._input.value === this._question.answer) {
        this._message.textContent = "Correct!";
        this._correctAnswers += 1;
      } else {
        this._message.textContent = "Try again.";
      }
      if (this._questionNumber > this._maxQuestions) {
        this._summary.textContent = `You got ${this._correctAnswers} right, out of a total of ${this._maxQuestions}.`;
        this._againBtn.classList.remove("button_hidden");
      }
    });

    this._nextBtn.addEventListener("click", () => {
      this._writeQuestion();
      this._message.textContent = null;
      this._form.reset();
    });
  }

  _render() {
    this.innerHTML = html`<form id="num-questions-form" class="form" action="">
        <label class="form__label" for="num-questions">
          Select the number of questions to answer.
          <input
            class="form__input"
            type="number"
            id="num-questions"
            name="num-questions"
            min="3"
            max="100"
            value="10"
          />
          <button class="button button_action_submit">Start quiz</button>
        </label>
      </form>
      <form class="quiz">
        <style>
          code {
            background-color: lightgray;
          }
          .button_hidden {
            visibility: hidden;
          }
        </style>
        <h2 class="quiz__heading"></h2>
        <p class="quiz__instruction"></p>
        <label class="quiz__answer">
          Your answer:
          <input name="answer" type="text" class="quiz__input" />
        </label>
        <button class="quiz__btn quiz__btn_action_submit" type="submit">
          Check
        </button>
        <button class="quiz__btn quiz__btn_action_next" type="button">
          Next
        </button>
      </form>
      <p class="message"></p>
      <p class="message message_type_summary"></p>
      <button class="button button_action_start button_hidden">
        Try again?
      </button>`.strings[0];
  }
}

customElements.define("bem-question", BemQuestion);
