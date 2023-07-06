import { css, unsafeCSS } from "lit";

import { workspaceHeight } from "../../scripts/constants";

const taskContentStyles = css`
  .task__text-wrapper {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .task__text {
    margin: 0;
    font-size: 18px;
    line-height: 1.8;
    width: 100%;
  }

  .task__text:first-of-type {
    margin: 0;
  }

  .task__video {
    max-width: 100%;
    border: lightgrey 1px solid;
    border-radius: 10px;
  }

  .task__link {
    color: #3073e8;
    text-decoration: none;
  }

  .task__link:hover {
    color: rgba(48, 116, 232, 0.8);
  }

  .task__emphatic-text {
    font-style: italic;
  }

  code {
    color: #383a42;
    background: #f7f9fc;
    box-shadow: inset 0 0 0 1px #dfe5ee;
    border-radius: 4px;
    padding: 0.35em 0.55em;
    font-family: "Menlo", "Ubuntu Mono", consolas, source-code-pro, monospace;
    font-size: 0.8em;
    white-space: nowrap;
  }

  .task__hint-button {
    position: fixed;
    bottom: ${unsafeCSS(workspaceHeight)};
    left: 40px;
    background-color: #0000000f;
    padding: 9px 28px;
    color: #000000d9;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    align-self: flex-start;
    border-radius: 10px;
    border: none;
    margin-bottom: 42px;
    cursor: pointer;
    transition: 220ms all ease-in-out;
  }

  .task__hint-button:hover {
    background-color: #0000001f;
  }

  .task__hint-button:active {
    background-color: #00000040;
    transition: none;
  }

  .task__hint-button:disabled {
    cursor: auto;
  }

  .task__message {
    position: fixed;
    bottom: ${unsafeCSS(workspaceHeight)};
    border-radius: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.8;
    visibility: hidden;
    width: 700px;
    padding: 16px;
    box-sizing: border-box;
    margin-bottom: 44px;
    opacity: 0;
    transition: visibility 0s linear 0.25s, opacity 0.25s linear;
  }

  .task__message_type_error {
    background-color: #fdeeed;
    border: 1px solid #ed6f5d;
    color: #d15745;
    transition: opacity 0s linear 0.25s, all 0.25s linear;
  }

  .task__message_type_success {
    background-color: #edf7f4;
    border: 1px solid #66cca9;
    color: #129368;
    transition: opacity 0s linear 0.25s, all 0.5s linear;
  }

  .task__message_type_hint {
    background: #f7f9fc;
    border: 1px solid #dfe5ee;
    transition: all 0.25s linear;
  }

  .task__image {
    max-width: 350px;
  }

  .task__image-caption {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .task__buttons {
    align-self: flex-start;
    display: flex;
    gap: 17px;
  }

  .visible {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
  }
`;

export default taskContentStyles;
