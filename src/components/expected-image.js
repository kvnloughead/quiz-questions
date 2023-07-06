import { html } from "lit";

export const expectedImage = (
  src,
  caption = "Expected Result:",
  alt = "Expected result for the task"
) => html`
  <figure>
    <figcaption class="task__image-caption">${caption}</figcaption>
    <img class="task__image" src="${src}" alt="${alt}" />
  </figure>
`;
