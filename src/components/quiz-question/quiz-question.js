import { html, LitElement } from "lit";

import { demoQuestions } from "../../data/index.js";

class QuizQuestion extends LitElement {
  constructor() {
    super();
    // this.numberQuestions = 5;
    // this._maxQuestions = 10;
    this._questions = demoQuestions;
    this._questionNumber = 1;
    this._correctAnswers = 0;
    this._currentQuestion = this._getQuestion();
    this._options = this._getOptions();
  }

  static get properties() {
    return {
      numberQuestions: { type: Number },
      _selectedAnswer: { type: { value: String, correct: Boolean } },
      _options: { attribute: false, type: [], default: [] },
      _showFeedback: {
        attribute: false,
        type: { string: Boolean },
        default: false,
      },
      _showAll: { type: Boolean, default: false },
    };
  }

  _getQuestion = () => {
    return this._questions[Math.floor(Math.random() * this._questions.length)];
  };

  _getOptions = () => {
    if (this._currentQuestion.type === "single-choice") {
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
      return options;
    } else if (this._currentQuestion.type === "true-or-false") {
      return this._currentQuestion.options;
    }
  };

  _setEventListeners() {
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

  _checkAnswer(evt) {
    debugger;
    evt.preventDefault();
    this._showFeedback =
      this._currentQuestion.showAll || this._selectedAnswer.id;
    return this._selectedAnswer.correct;
  }

  _handleRadioChange(evt, correct, id) {
    this._selectedAnswer = { value: evt.target.value, correct, id };
  }

  _renderOptions() {
    if (this._currentQuestion.type === "text") {
      return html`
        <label class="quiz__answer">
          Your answer:
          <input name="answer" type="text" class="quiz__input" />
        </label>
      `;
    } else if (
      this._currentQuestion.type === "single-choice" ||
      this._currentQuestion.type === "true-or-false"
    ) {
      return html`
        <fieldset>
          <legend>Choose your answer:</legend>
          ${this._options.map((option, i) => {
            return html`
              <div>
                <input
                  type="radio"
                  id=${i}
                  name="single-choice-${option.id}"
                  value=${option.option}
                  @change=${(evt) => {
                    this._handleRadioChange(evt, option.correct, i);
                  }}
                />
                <label for=${this._options.option}>${option.option}</label>
                <span
                  id="${i}-message"
                  class="message 
                    ${this._showFeedback === true || this._showFeedback === i
                    ? ""
                    : " message_hidden"}  
                    ${option.correct
                    ? " message_type_success"
                    : "message_type_error"}
                    ${this._selectedAnswer?.correct ? " message_correct" : ""}"
                >
                  ${option.feedback || this._currentQuestion.feedback}
                </span>
              </div>
            `;
          })}
        </fieldset>
      `;
    }
  }
  // updated() {
  //   // Schedule the moving of the children to the next microtask
  //   Promise.resolve().then(() => {
  //     // mimic a <slot> in a component without shadow DOM
  //     const slot = this.querySelector(".slot");
  //     while (this.firstChild) {
  //       console.log(this.firstChild);
  //       slot.appendChild(this.firstChild);
  //     }
  //   });
  // }

  updated() {
    // Schedule the moving of the children to the next microtask
    Promise.resolve().then(() => {
      // Select the children that have a slot attribute
      const slottedChildren = this.querySelectorAll("[slot='buttons']");
      const slot = this.querySelector(".slot");
      slottedChildren.forEach((child) => {
        slot.appendChild(child);
      });
    });
  }

  createRenderRoot() {
    // disable shadow dom
    return this;
  }

  render() {
    return html`
      <form class="quiz" @submit="${this._checkAnswer}">
        <p class="quiz__question">
          ${this._questionNumber}. ${this._currentQuestion.question}
        </p>
        ${this._renderOptions()}

        <div class="slot">
          <button class="quiz__btn quiz__btn_action_check" type="submit">
            Check
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("quiz-question", QuizQuestion);
