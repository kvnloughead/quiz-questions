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

export const tasks = [];
