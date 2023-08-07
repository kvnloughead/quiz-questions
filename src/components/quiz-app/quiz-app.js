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
      <quiz-question numberQuestions="${this._numberQuestions}">
        <span slot="buttons">
          <button class="button button_action_next" type="button">Next</button>
        </span>
        <p class="message"></p>
        <p class="message message_type_summary"></p>
        <!-- <button class="button button_action_start button_hidden"> -->
        <button class="button button_action_start">Try again?</button>
      </quiz-question>
    `;
  }
}

customElements.define("quiz-app", QuizApp);
