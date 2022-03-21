import { rangeButton } from "./range-button.js";

const thermo = rangeButton(`#thermo`, {
  cursor: { align: `in`, start: 270, stop: 360, min: 0, max: 100, range: 270 }
});
