import { css, unsafeCSS } from "lit";

const quizQuestionStyles = css`
  code {
    background-color: lightgray;
    font-family: monospace;
  }

  .message {
    color: grey;
  }

  .message_correct.message_type_success {
    color: green;
  }

  .message_type_error {
    color: red;
  }

  .message_correct.message_type_error {
    color: grey;
  }

  .message_hidden {
    display: none;
  }

  .button_hidden {
    visibility: hidden;
  }
`;

export default quizQuestionStyles;
