import { directionMap } from "./constants.js";

/*
 * Returns the value of the given property that's declared in the stylesheets.
 * This includes styles added via devtools to existing class selectors.
 * Returns the last listed value, which has precedence, or undefined if no value
 * is listed.
 */
export const getDeclaredStyle = (selector, property) => {
  return Array.from(document.styleSheets[0].cssRules)
    .filter((declaration) => declaration.selectorText === selector)
    .reverse()
    .find((rule) => rule.style[property])?.style[property];
};

/**
 * Returns true if the declared value of the property matches the given value.
 */
export const compareDeclaredStyle = (selector, property, value) => {
  return getDeclaredStyle(selector, property) === value;
};

export const misplacedPositionProperty = (elements) => {
  // Returns true if a non-default position property has been applied to an
  // incorrect element.
  return elements.some((element) => {
    return window.getComputedStyle(element).position !== "static";
  });
};

// Returns true if the element's property value matches the expected value.
// Expected can be a string or an array of strings.
export const hasPropertyValue = (element, property, expected) => {
  const computedStyles = window.getComputedStyle(element);
  return typeof expected === "string"
    ? computedStyles[property] === expected
    : expected.includes(computedStyles[property]);
};

/* Returns true if the element has been shifted the appropriate distance
 * (in px) and direction. Relies on the fact that top overrides bottom and
 * left overrides right. Assumes that the correct position value has been
 * applied.
 *
 * @param element [HTMLElement] the element to check
 * @param direction ['top', 'left'] the direction of shifting.
 * @param distance [Number] distance in pixels
 */
export const hasBeenShifted = (element, direction, distance) => {
  return (
    hasPropertyValue(element, direction, `${distance}px`) ||
    (hasPropertyValue(element, direction, "auto") &&
      hasPropertyValue(element, directionMap[direction], `-${distance}px`))
  );
};

/* Returns true if element has the expected left and top offsets with respect
 * to its closest positioned ancestor.
 *
 * @param element [HTMLelement]
 * @param leftExpected [number] expected left offset in number of pixels
 * @param topExpected [number] expected top offset in number of pixels
 */
export const hasCorrectOffsets = (element, leftExpected, topExpected) => {
  return (
    element.offsetLeft === leftExpected && element.offsetTop === topExpected
  );
};
