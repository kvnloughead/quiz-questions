import { html, LitElement } from "lit";

class QuizApp extends LitElement {
  constructor() {
    super();
    this._questionNumber = 1;
    this._numberQuestions = 5;
    this._maxQuestions = 10;
    this._numberCorrect = 0;
  }

  static get properties() {
    return {
      _numberCorrect: { type: Number },
      _questionNumber: { type: Number },
      _numberQuestions: { type: Number },
      _maxQuestions: { type: Number },
    };
  }

  createRenderRoot() {
    // disable shadow dom
    return this;
  }

  render() {
    return html`
      <number-form
        name="num-questions"
        label="Select the number of questions to answer."
        buttonText="Start quiz"
        min="3"
        max="${this._maxQuestions}"
        value="${this._numberQuestions}"
        @submit-number-form="${(evt) => {
          this._numberQuestions = evt.detail;
        }}"
      ></number-form>
      <quiz-question
        numberQuestions="${this._numberQuestions}"
        questionNumber="${this._questionNumber}"
        numberCorrect="${this._numberCorrect}"
        @question-answered="${(evt) => {
          this._questionAnswered = true;
          this._numberCorrect += evt.detail;
        }}"
      >
        <span slot="buttons">
          <button
            class="button button_action_next"
            type="button"
            @click="${(evt) => {
              this._questionNumber += 1;
            }}"
          >
            Next
          </button>
        </span>
      </quiz-question>
      <p class="message"></p>
      <p class="message message_type_summary"></p>
      <button class="button button_action_start">Try again?</button>
    `;
  }
}

customElements.define("quiz-app", QuizApp);
