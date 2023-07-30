import { html, LitElement } from "lit";

class QuizApp extends LitElement {
  constructor() {
    super();
    this._numberQuestions = 5;
    this._maxQuestions = 10;
  }

  static get properties() {
    return {
      _numberQuestions: { type: Number },
      _maxQuestions: { type: Number, default: 10 },
    };
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
      <quiz-question numberQuestions="${this._numberQuestions}"></quiz-question>
    `;
  }
}

customElements.define("quiz-app", QuizApp);
