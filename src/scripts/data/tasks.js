/* Contains data for all the tasks in an array full of objects.
   Each object corresponds to a task and contains the following properties:

   - id: a unique identifier for the task
   - next: the next task in the sequence. Omit for the last task in the lesson
           Example: absolute-1-1 -> absolute-1-2
   - nextChapter: used when the next task is in the next chapter
           Example: absolute-1-3 -> absolute-2-1
   - content: a lit-html template string containing the text content and images
              for the task
   - hint: [optional] a lit-html template string containing the
                      content of the hint toggle, if it exists
*/

import { html } from "lit";
import { images, video } from "./assets";
import { expectedImage } from "../../components/expected-image.js";

export const tasks = [
  {
    id: "tutorial-1-1",
    nextChapter: "static-position",
    hint: "Check out the tutorial video if you are struggling!",
    content: html`
      <p class="task__text">
        This site contains a collection of interactive tasks designed to help
        you understand how the CSS <code>position</code> property effects
        elements on a webpage. The tasks make use of a workspace that looks
        similar to the one at the bottom of this page. They are designed to be
        solved by using the developer's tools to manipulate the elements in the
        workspace, usually by changing their CSS styles. If you're not, familiar
        with the developer's tools, please refer to this
        <a
          class="task__link"
          href="https://www.youtube.com/watch?v=AQxG7ESi1dM&ab_channel=Practicum%3ACodingbootcamps"
        >
          introductory screencast
        </a>
        before proceeding.
      </p>
      <p class="task__text">
        Now let's go through an easy example task. Consider the image below.
      </p>
      ${expectedImage(images.tutorial)}
      <p class="task__text">
        Use the DevTools to make the workspace match the colors in the image.
        When you're finished, click the "Check my work" button. Once you've got
        it right, you'll be able to move to the next task.
      </p>
      <p class="task__text">
        If you're struggling, check out this quick solution video:
      </p>
      <video class="task__video" controls src=${video}></video>
    `,
  },

  {
    id: "static-1-1",
    nextChapter: "relative-position-1",
    hint: html`Have you tried applying the <code>display</code> property to the
      <code>static-task__button</code> class? `,
    content: html`
      <p class="task__text">
        Below we have a series of HTML elements, all of which have the default
        <code>position</code> value of <code>static</code>.
      </p>
      <p class="task__text">
        Note how the <code>&lt;div&gt;</code> elements are all placed
        vertically, one after another, but the
        <code>&lt;button&gt;</code> elements are placed horizontally. This is
        how these elements are placed according to the default document flow.
        The difference is due to their <code>display</code> property. HTML
        elements with <code>display: block</code> (like
        <code>&lt;div&gt;</code> elements) are placed vertically, whereas those
        with <code>display: inline</code> (like
        <code>&lt;button&gt;</code> elements) are placed horizontally.
      </p>
      <p class="task__text">
        This default placement can be altered by the
        <code>position</code> property, as you'll soon see. But there are other
        ways that you can effect an element's placement.
      </p>
      <p class="task__text">
        Try to change the <code>display</code> property on the appropriate class
        to make the buttons render in a column, as shown below.
      </p>
      ${expectedImage(images.static)}
    `,
  },

  {
    id: "relative-1-1",
    nextChapter: "relative-position-2",
    hint: html`Apply <code>position: relative</code> to the first child element.
      Then move first child it to the right by a distance equal to its width.`,
    content: html`
      <p class="task__text">
        Below we have a parent <code>&lt;div&gt;</code> that contains two child
        <code>&lt;div&gt;</code> elements. Currently, the children have the
        default <code>position</code>, so they are placed vertically starting
        from the upper left corner of their parent. We can shift the position of
        these elements using the <code>top</code>, <code>right</code>,
        <code>bottom</code>, and <code>left</code> properties. Try using
        relative positioning to match the layout on the below.
      </p>
      ${expectedImage(images.relPos1)}
    `,
  },

  {
    id: "relative-2-1",
    nextChapter: "relative-position-3",
    hint: "Move the second child to the right by half of its width and up one and a half times its height.",
    content: html`
      <p class="task__text">
        So, relatively positioned elements can be moved without affecting the
        placement of their neighbors. With this in mind, use relative
        positioning to shift the second child as shown in the image below.
      </p>
      ${expectedImage(images.relPos2)}
    `,
  },

  {
    id: "relative-3-1",
    nextChapter: "absolute-position-1",
    hint: "Note that the distance you need to shift the parent container is the same as the margins that surround it inside the grandparent",
    content: html`
      <p class="task__text">
        Let's have one more challenge. This time you'll need to move the parent
        <code>&lt;div&gt;</code> as well as both of its children so that they
        match the position shown in the image below.
      </p>
      ${expectedImage(images.relPos3)}
    `,
  },

  {
    id: "absolute-1-1",
    next: "absolute-1-2",
    content: html`
      <p class="task__text">
        Absolute positioning works a bit differently then relative positioning.
        First off, if you give an element <code>position: absolute</code> it
        will be pulled out of the normal document flow. Let's try that out here
        on the child elements.
      </p>
      <p class="task__text">
        Apply <code>position: absolute</code> to the first child element and
        note what happens.
      </p>
    `,
  },

  {
    id: "absolute-1-2",
    next: "absolute-1-3",
    content: html`
      <p class="task__text">
        When we applied <code>position: absolute</code> to the first child, the
        second child disappeared. Can you figure out why that happened? This is
        a great chance to use the elements tab. Once you've finished, click the
        'Check my work' and 'Next' to continue.
      </p>
    `,
    hint: html`
      If you right click on an element in the elements tab you have the option
      to temporarily delete it from the DOM. Try deleting the first child
      element.
    `,
  },
  {
    id: "absolute-1-3",
    nextChapter: "absolute-position-2",
    content: html`
      <p class="task__text">
        Like with relative positioning, when an element is absolutely
        positioned, you can use the <code>top</code>, <code>right</code>,
        <code>bottom</code> and <code>left</code> properties to adjust its
        position. But there's a difference to note. Instead of shifting their
        position with respect to
        <span class="task__emphatic-text">itself</span>, you shift it with
        respect to its closest positioned ancestor.
      </p>
      <p class="task__text">
        Wow, what does
        <span class="task__emphatic-text"> closest positioned ancestor </span>
        mean? Go ahead to the next task to learn more.
      </p>
    `,
  },
  {
    id: "absolute-2-1",
    next: "absolute-2-2",
    content: html`
      <p class="task__text">
        So, what is this “closest positioned ancestor”? Well, it'll be easier to
        explain if you see it for yourself. Try adding
        <code>position: absolute</code> and <code>top: 0</code> to the parent
        container and see what happens.
      </p>
    `,
  },
  {
    id: "absolute-2-2",
    next: "absolute-2-3",
    nextChapter: "",
    content: html`
      <p class="task__text">
        So, how can we position the parent element with respect to the
        grandparent, not the workspace? By giving the grandparent a non-default
        position. Apply <code>position: relative</code> to the grandparent
        element.
      </p>
    `,
  },
  {
    id: "absolute-2-3",
    nextChapter: "",
    hint: html`Try using <code>bottom: 0</code> and <code>right: 0</code> on the
      second child.`,
    content: html`
      <p class="task__text">
        You may recall that we had you create this layout in the relative
        positioning task.
      </p>
      ${expectedImage(images.relPos3)}
      <p class="task__text">
        You now have enough information to create the same layout using absolute
        positioning. Position the child elements relative to the parent element,
        and the parent element relative to the grandparent element.
      </p>
    `,
  },
];
