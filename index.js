const cursor = document.querySelector(`.btn`);

const getCoordsOfElement = (el) => {
  const { width, height, x, y } = el.getBoundingClientRect();
  return {
    x: x + width / 2,
    y: y + height / 2,
    r: width / 2,
    w: width,
    h: height
  };
};

const $ = (el) => document.querySelector(el);

const rangeCoord = getCoordsOfElement($(`.range`));
const rangeAreaCoord = getCoordsOfElement($(`.range-area`));
const cursorCoord = getCoordsOfElement($(`.cursor`));

const coords = { range: rangeCoord, area: rangeAreaCoord, cursor: cursorCoord };
console.log(coords);
const moveCursor = (e) => {
  let d = coords.area.r;
  let xm = e.pageX;
  let ym = e.pageY;

  let xmp =
    d *
    ((xm - coords.range.x) /
      Math.sqrt(
        Math.pow(xm - coords.range.x, 2) + Math.pow(ym - coords.range.y, 2)
      ));

  let ymp =
    d *
    ((ym - coords.range.y) /
      Math.sqrt(
        Math.pow(xm - coords.range.x, 2) + Math.pow(ym - coords.range.y, 2)
      ));
  console.log(xmp, ymp);
  $(`.cursor`).style.left = `${xmp}px`;
  $(`.cursor`).style.top = `${ymp}px`;
};

document.addEventListener(`mousemove`, moveCursor);
