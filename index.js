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
  let x0 = coords.range.x;
  let y0 = coords.range.y;

  let xmp = Math.floor(
    d / 2 +
      d * ((x0 - xm) / Math.sqrt(Math.pow(xm - x0, 2) + Math.pow(ym - y0, 2)))
  );

  let ymp = Math.floor(
    d / 2 +
      d * ((ym - y0) / Math.sqrt(Math.pow(xm - x0, 2) + Math.pow(ym - y0, 2)))
  );
  console.log(xmp, ymp);
  $(`.cursor`).style.left = `${xmp + 30}px`;
  $(`.cursor`).style.top = `${ymp + 30}px`;
};

document.addEventListener(`mousemove`, moveCursor);
