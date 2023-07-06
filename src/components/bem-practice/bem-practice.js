import { entities, questions } from "./data.js";

class BemQuestion extends HTMLElement {
  constructor() {
    super();
    this._questions = questions;
    this._entities = entities;

    const quizElement = document.getElementById("quiz").content.cloneNode(true);
    this.appendChild(quizElement);

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
    this._heading.innerHTML = lines.join("\n");
  };

  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._input.value === this._question.answer) {
        this._message.textContent = "Correct!";
      } else {
        this._message.textContent = "Try again.";
      }
    });
    this._nextBtn.addEventListener("click", () => {
      this._writeQuestion();
      this._message.textContent = null;
      this._form.reset();
    });
  }
}

customElements.define("bem-question", BemQuestion);
