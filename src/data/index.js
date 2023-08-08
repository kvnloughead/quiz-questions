export const entities = ["block", "element", "modifier", "key", "value"];
export const bemNamingQuestions = [
  {
    id: "0",
    data: ["card", "button", "hidden", "", ""],
    answer: "card__button card__button_hidden",
  },
  {
    id: "1",
    data: ["card", "button", "", "", ""],
    answer: "card__button",
  },
  {
    id: "2",
    data: ["card", "", "", "type", "recipe"],
    answer: "card card_type_recipe",
  },
  { id: "3", data: ["navbar", "logo", "", "", ""], answer: "navbar__logo" },
  { id: "4", data: ["navbar", "menu", "", "", ""], answer: "navbar__menu" },
  {
    id: "5",
    data: ["navbar", "menu", "active", "", ""],
    answer: "navbar__menu navbar__menu_active",
  },
  {
    id: "6",
    data: ["navbar", "", "fixed", "", ""],
    answer: "navbar navbar_fixed",
  },
  {
    id: "7",
    data: ["form", "input", "", "type", "text"],
    answer: "form__input form__input_type_text",
  },
  {
    id: "8",
    data: ["form", "input", "", "", ""],
    answer: "form__input",
  },
  {
    id: "9",
    data: ["form", "input", "disabled", "", ""],
    answer: "form__input form__input_disabled",
  },
  {
    id: "10",
    data: ["button", "", "", "action", "submit"],
    answer: "button button_action_submit",
  },
  {
    id: "11",
    data: ["form", "button", "", "action", "submit"],
    answer: "form__button form__button_action_submit",
  },
  {
    id: "12",
    data: ["form", "button", "", "", ""],
    answer: "form__button",
  },
  {
    id: "13",
    data: ["form", "button", "", "action", "reset"],
    answer: "form__button form__button_action_reset",
  },
  {
    id: "14",
    data: ["button", "", "disabled", "", ""],
    answer: "button button_disabled",
  },
  {
    id: "15",
    data: ["footer", "social-icon", "", "network", "twitter"],
    answer: "footer__social-icon footer__social-icon_network_twitter",
  },
  {
    id: "16",
    data: ["footer", "social-icon", "", "", ""],
    answer: "footer__social-icon",
  },
  {
    id: "17",
    data: ["footer", "", "", "theme", "light"],
    answer: "footer footer_theme_light",
  },
];

export const demoQuestions = [
  {
    id: 0,
    type: "single-choice",
    question: "Which HTML tag is used to create hyperlinks?",
    feedback: "Actually, the correct answer is `<a>`.",
    numberOfOptions: 4,
    options: [
      {
        option: "<a>",
        correct: true,
        alwaysInclude: true,
        feedback: "That's right!",
      },
      {
        option: "<link>",
        feedback:
          "Actually, this is used to link external documents to an HTML document. The correct answer is `<a>`.",
        alwaysInclude: true,
      },
      { option: "<hyper>" },
      { option: "<p>" },
      { option: "<href>" },
      { option: "<li>" },
    ],
    showAll: true,
  },

  {
    id: 1,
    type: "true-or-false",
    difficulty: "hard",
    question: "`font-size` is not inherited by `<h1>` elements.",
    options: [
      {
        option: "True",
        feedback:
          "Actually, it is inherited. However, the inherited `font-size` may not be applied, because it is often overwritten by the browser's user agent.",
      },
      { option: "False", correct: true, feedback: "Correct" },
    ],
  },

  {
    id: 2,
    type: "true-or-false",
    difficulty: "hard",
    question: "Blah blah.",
    options: [
      {
        option: "True",
        feedback:
          "Actually, it is inherited. However, the inherited `font-size` may not be applied, because it is often overwritten by the browser's user agent.",
      },
      { option: "False", correct: true, feedback: "Correct" },
    ],
  },

  // {
  //   id: 2,
  //   type: "multiple-choice",
  //   question:
  //     "Choose the HTML elements that have default top and bottom margins.",
  //   correct: ["<p>", "<h1>", "<ul>", "<h4>"],
  //   wrong: ["<a>", "<li>", "<div>"],
  // },
  // {
  //   id: 3,
  //   type: "text",
  //   question:
  //     "Write a margin shorthand declaration that will center an element horizontally, give it 68px margin on the top, and 0 margin on the bottom.",
  //   correct: [
  //     { option: "margin: 68px auto 0", feedback: "Correct!" },
  //     {
  //       option: "margin: 68px auto 0 auto",
  //       feedback:
  //         "This will work, but the second `auto` is unnecessary. If only three values are specified, the left will be equal to the right.",
  //     },
  //   ],
  //   wrong: {
  //     feedback: "The correct answer is `margin: 68px auto 0`.",
  //   },
  // },
];
