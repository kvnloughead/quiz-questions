import { html, LitElement } from "lit";

class NumberForm extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      label: { type: String },
      buttonText: { type: String },
      buttonText: { type: String },
      min: { type: Number },
      max: { type: Number },
      value: { type: Number },
    };
  }

  _submit(evt) {
    evt.preventDefault();
    this.dispatchEvent(
      new CustomEvent("submit-number-form", { detail: evt.target[0].value })
    );
  }

  render() {
    return html`
      <form
        id="${this.name}-form"
        class="form"
        action=""
        @submit="${this._submit}"
      >
        <label class="form__label" for="${this.name}">
          ${this.label}
          <input
            class="form__input"
            type="number"
            id="${this.name}"
            name="${this.name}"
            min="${this.min}"
            max="${this.max}"
            value="${this.value}"
          />
          <button type="submit" class="button button_action_submit">
            ${this.buttonText}
          </button>
        </label>
      </form>
    `;
  }
}

customElements.define("number-form", NumberForm);
