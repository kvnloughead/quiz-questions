/*
Contains tests for each of the tasks. Each test is a function and its hash
is the id of the corresponding task.

If the test fails, return an object with an "error" property. The error should
be a string or a lit-html template.

If the test passes, it returns a success message. The error should
be a string or a lit-html template.
*/

import { html } from "lit";

import {
  misplacedPositionProperty,
  hasPropertyValue,
  hasBeenShifted,
  hasCorrectOffsets,
  getDeclaredStyle,
  compareDeclaredStyle,
} from "./helpers.js";

import {
  grandparent,
  parent,
  firstChild,
  secondChild,
  yellow,
  green,
  staticDivs,
  staticButtons,
  flexBoxDisplays,
} from "./constants";

export const tests = {
  "tutorial-1-1": () => {
    if (
      hasPropertyValue(firstChild, "background-color", green) &&
      hasPropertyValue(secondChild, "background-color", yellow)
    ) {
      return "Correct! You've completed the tutorial. Click the 'Next task' button to move onto the next task.";
    } else {
      return {
        error:
          "Make sure the colors of the two child elements have been switched. If you are struggling, check out the tutorial video.",
      };
    }
  },

  "static-1-1": () => {
    if (
      Array.from(staticDivs).some((div) => {
        return !hasPropertyValue(div, "display", "block");
      })
    ) {
      return {
        error: html`Please don't change the <code>display</code> property of the
          <code>static-task__div</code> class.`,
      };
    } else if (
      compareDeclaredStyle(".static-task__button", "display", "block")
    ) {
      return html`Correct. But note that there are other values of
        <code>display</code> that will have the same effect. For instance,
        elements with <code>display: flex</code> are treated the same as
        <code>block</code> elements in the normal flow.`;
    } else if (
      Array.from(staticButtons).some((button) => {
        console.log(button);
        return hasPropertyValue(button, "display", flexBoxDisplays);
      })
    ) {
      const declared = getDeclaredStyle(".static-task__button", "display");
      return html`This will work, because elements with
        <code>display: ${declared}</code> are treated the same externally as
        those with <code>display: block</code>. But since we aren't making use
        of the additional capabilities offered by
        <code>display: ${declared}</code>, it may make more sense to go with
        <code>display: block</code>`;
    }
    return {
      error: html`Please turn the buttons into block elements using the
        <code>display</code> property.`,
    };
  },

  "relative-1-1": () => {
    // wrong element has been positioned
    if (misplacedPositionProperty([grandparent, parent, secondChild])) {
      return {
        error: "Make sure to only change styles on the first child element.",
      };
      // first child doesn't have position: relative
    } else if (!hasPropertyValue(firstChild, "position", "relative")) {
      return {
        error: "Apply relative position to the first child.",
      };
      // first child has not been shifted vertically
    } else if (
      !(
        hasPropertyValue(firstChild, "top", ["0px", "auto"]) &&
        hasPropertyValue(firstChild, "bottom", ["0px", "auto"])
      )
    ) {
      return {
        error: "Don't change the vertical position of the first child.",
      };
      // first child has bee positioned correctly
    } else if (
      hasPropertyValue(firstChild, "left", "60px") ||
      (hasPropertyValue(firstChild, "left", "auto") &&
        hasPropertyValue(firstChild, "right", "-60px"))
    ) {
      return html`Did you notice that when you moved the first child, the
        position of the second child stayed the same? This is how
        <code>position: relative</code> works: you can reposition it with
        <code>top</code>, <code>right</code>, etc., but other elements behave as
        if it hadn't moved at all. This is what it means when we say that a
        regularly positioned element "remains in the normal document flow".`;
    } else {
      // first child has not been positioned properly
      return {
        error:
          "Move the first child to the right by a distance equal to its width.",
      };
    }
  },

  "relative-2-1": () => {
    // wrong element has been positioned
    if (misplacedPositionProperty([grandparent, parent, firstChild])) {
      return {
        error: "Make sure to only change styles on the second child element.",
      };
      // second child has not been relatively positioned
    } else if (!hasPropertyValue(secondChild, "position", "relative")) {
      return {
        error: "Apply relative position to the second child.",
      };
      // second child has incorrect vertical position
    } else if (
      !(
        hasPropertyValue(secondChild, "top", "-60px") ||
        (hasPropertyValue(secondChild, "top", "auto") &&
          hasPropertyValue(secondChild, "bottom", "60px"))
      )
    ) {
      return {
        error:
          "Move the second child up by a distance equal to one and a half times its height.",
      };
    } else if (
      // second child has incorrect horizontal position
      !(
        hasPropertyValue(secondChild, "left", "-30px") ||
        (hasPropertyValue(secondChild, "left", "auto") &&
          hasPropertyValue(secondChild, "right", "30px"))
      )
    ) {
      return {
        error:
          "Move the second child to the left by a distance equal to half its width.",
      };
    } else {
      return "Good work!";
    }
  },

  "relative-3-1": () => {
    // wrong element has been positioned
    if (misplacedPositionProperty([grandparent])) {
      return {
        error:
          "Only change the position property on elements that you need to move.",
      };
      // not all necessary elements have position: relative
    } else if (
      [firstChild, secondChild, parent].some((element) => {
        return !hasPropertyValue(element, "position", "relative");
      })
    ) {
      return {
        error: html`Apply <code>position: relative</code> to both child elements
          and their immediate parent.`,
      };
    }
    // parent is not positioned correctly
    else if (
      !(
        hasBeenShifted(parent, "top", -58) &&
        hasBeenShifted(parent, "left", -82)
      )
    ) {
      return {
        error:
          "Move the parent element to the upper left hand corner of the grandparent element.",
      };
      // first child not positioned correctly
    } else if (
      !hasBeenShifted(firstChild, "top", -40) &&
      !hasBeenShifted(firstChild, "left", 0)
    ) {
      return {
        error: "Move the first child up a distance equal to its height.",
      };
      // second child not positioned correctly
    } else if (
      !(
        hasBeenShifted(secondChild, "top", 44) &&
        hasBeenShifted(secondChild, "left", 136)
      )
    ) {
      return {
        error:
          "Move the second child as shown in the picture to the right. To get the precise distances, subtract the width or height of the child from the corresponding dimension of the parent.",
      };
    }
    return "You got it! Now let's move on to the next type of positioning: absolute.";
  },

  "absolute-1-1": () => {
    // wrong element has been positioned
    if (misplacedPositionProperty([grandparent, parent, secondChild])) {
      return {
        error: "Make sure to only change styles on the first child element.",
      };
      // first child has not been absolutely positioned
    } else if (!hasPropertyValue(firstChild, "position", "absolute")) {
      return {
        error: "Apply absolute position to the first child.",
      };
    }
    return html`When we applied <code>position: absolute</code> to the first
      child, the second child disappeared! That is probably not what you
      expected.`;
  },

  "absolute-1-2": () => {
    // first child still present in DOM
    if (document.querySelector(".child_pos_first")) {
      return {
        error:
          "Remove the first child from the DOM to see what happened to the second child.",
      };
    }
    return html`If you looked through the element inspector you would have found
      that the second child didn't disappear at all — it moved to the top of its
      parent container and was obscured by the first child. This is what happens
      when you apply <code>position: absolute</code> to an element: it stays
      where it is, but it's neighbors act as if it wasn't there.`;
  },

  "absolute-1-3": () => {
    return "Click 'Next task' to continue.";
  },

  "absolute-2-1": () => {
    // wrong element has been positioned
    if (misplacedPositionProperty([grandparent, firstChild, secondChild])) {
      return {
        error: "Make sure to only change styles of the parent element.",
      };
      // parent doesn't have position: absolute
    } else if (!hasPropertyValue(parent, "position", "absolute")) {
      return {
        error: html`Apply <code>position: absolute</code> to the parent element.`,
      };
      // parent doesn't have top: 0 (or top: 0px)
    } else if (!hasPropertyValue(parent, "top", ["0", "0px"])) {
      return {
        error: html`Apply <code>top: 0</code> to the parent element.`,
      };
    }
    return html`As soon as we apply <code>top: 0</code>, the parent element
      jumps to the top of the workspace! Why would that be? Well, that's because
      absolutely positioned elements are positioned relative to their "closest
      positioned ancestor". An ancestor is positioned if it has a non-default
      position. You can verify for yourself that the grandparent element is not
      positioned, and the the closest positioned ancestor is in fact the
      workspace.`;
  },
  "absolute-2-2": () => {
    // Wrong element has been positioned. It's ok for parent to be positioned.
    if (misplacedPositionProperty([firstChild, secondChild])) {
      return {
        error:
          "Make sure to only change styles of the parent and grandparent elements.",
      };
    } else if (!hasPropertyValue(grandparent, "position", "relative")) {
      return {
        error: html`Apply <code>position: relative</code> to the grandparent
          element.`,
      };
    }
    return "Great! Now if we position the parent element absolutely, it will be positioned with respect to its immediate parent.";
  },
  "absolute-2-3": () => {
    // grandparent should be relatively positioned
    if (!hasPropertyValue(grandparent, "position", "relative")) {
      return {
        error: html`Apply <code>position: relative</code> to the grandparent
          element.`,
      };
      // other elements should be absolutely positioned
    } else if (
      [firstChild, secondChild, parent].some(
        (element) => !hasPropertyValue(element, "position", "absolute")
      )
    ) {
      return {
        error:
          "Please use absolute position to move the parent element and both of its children.",
      };
    } else if (!hasCorrectOffsets(parent, 0, 0)) {
      return {
        error:
          "Move the parent element to the upper left corner of the grandparent element.",
      };
    } else if (!hasCorrectOffsets(firstChild, 0, -40)) {
      return {
        error: "Move the first child element as shown in the picture.",
      };
    } else if (!hasCorrectOffsets(secondChild, 136, 84)) {
      return {
        error: "Move the second child element as shown in the picture.",
      };
    }
    return "You got it!";
  },
};
