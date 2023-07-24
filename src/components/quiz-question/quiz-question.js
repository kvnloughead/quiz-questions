import { html, LitElement } from "lit";

import { NumberForm } from "../number-form/number-form";
import { demoQuestions } from "../../data/index.js";

class QuizQuestion extends LitElement {
  constructor() {
    super();
    this._numberQuestions = 5;
    this._questions = demoQuestions;
    this._questionNumber = 1;
    this._correctAnswers = 0;
    this._maxQuestions = 10;
    this._currentQuestion = this._getQuestion();
  }

  static get properties() {
    return {
      _numberQuestions: { type: Number },
    };
  }

  _getQuestion = () => {
    return this._questions[Math.floor(Math.random() * this._questions.length)];
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

  _renderOptions() {
    if (this._currentQuestion.type === "text") {
      return html`
        <label class="quiz__answer">
          Your answer:
          <input name="answer" type="text" class="quiz__input" />
        </label>
      `;
    } else if (this._currentQuestion.type === "single-choice") {
      let options = [],
        possibleOptions = [];
      this._currentQuestion.options.forEach((option) => {
        if (option.alwaysInclude) {
          options.push(option);
        } else {
          possibleOptions.push(option);
        }
      });
      if (options.length < this._currentQuestion.numberOfOptions) {
        options = options.concat(
          possibleOptions
            .sort(() => 0.5 - Math.random())
            .slice(0, this._currentQuestion.numberOfOptions - options.length)
        );
      }
      options.sort(() => 0.5 - Math.random());

      return html`
        <fieldset>
          <legend>Choose your answer:</legend>
          ${options.map((option) => {
            return html`
              <div>
                <input
                  type="radio"
                  id=${option.option}
                  name=${option.option}
                  value=${option.option}
                />
                <label for=${options.option}>${option.option}</label>
              </div>
            `;
          })}
        </fieldset>
      `;
    } else if (this._currentQuestion.type === "true-or-false") {
      const labels = this._currentQuestion.alternateLabels || ["True", "False"];
      return html`
        <fieldset>
          <legend>True or false:</legend>
          <div>
            <input
              type="radio"
              id="answer-true"
              name="answer-true"
              value="answer-true"
            />
            <label for="answer-true">${labels[0]}</label>
          </div>
          <div>
            <input
              type="radio"
              id="answer-false"
              name="answer-false"
              value="answer-false"
            />
            <label for="answer-false">${labels[1]}</label>
          </div>
        </fieldset>
      `;
    }
  }

  render() {
    return html`
      <number-form
        name="num-questions"
        label="Select the number of questions to answer."
        buttonText="Start quiz"
        min="3"
        max="100"
        value="10"
        @submit-number-form="${(evt) => {
          this._numberQuestions = evt.detail;
        }}"
      ></number-form>
      <form class="quiz">
        ${this._numberQuestions}
        <style>
          code {
            background-color: lightgray;
          }
          .button_hidden {
            visibility: hidden;
          }
        </style>
        <p class="quiz__question">
          ${this._questionNumber}. ${this._currentQuestion.question}
        </p>
        ${this._renderOptions()}
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
      </button>
    `;
  }
}

//   _render(options) {

// }

customElements.define("quiz-question", QuizQuestion);
