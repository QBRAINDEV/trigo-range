const $ = (el) => document.querySelector(el);

const getClientState = (el) => {
  const { width, height, x, y } = el.getBoundingClientRect();
  return {
    x0: x + width / 2,
    y0: y + height / 2,
    r: width / 2,
    w: width,
    h: height,
    xc: width / 2,
    yc: height / 2
  };
};

const normalizeCoords = ({ x0, y0, r }, xm, ym, k = 0) => {
  return {
    x: Math.floor(
      (r + k) *
        ((xm - x0) / Math.sqrt(Math.pow(xm - x0, 2) + Math.pow(ym - y0, 2)))
    ),

    y: Math.floor(
      (r + k) *
        ((ym - y0) / Math.sqrt(Math.pow(xm - x0, 2) + Math.pow(ym - y0, 2)))
    ),
    d: r
  };
};

const setCursor = (cursor, options = {}) => {
  if (options.align) {
    // base-line
    cursor.align = 0;
    if (options.align === `in`) {
      cursor.align = -cursor.r;
    } else if (options.align === `out`) {
      cursor.align = cursor.r;
    }
  }
  return cursor;
};

const moveCursor = (e, el, options = {}) => {
  let cursor = {
    ...getClientState(el.querySelector(`.cursor`))
  };
  cursor = { ...setCursor(cursor, options.cursor) };

  let { x, y, d } = normalizeCoords(getClientState(el), e.clientX, e.clientY);

  applyCoordsToElement(el.querySelector(`.cursor`), {
    x: x + d,
    y: y + d
  });
};

const applyCoordsToElement = (el, { x, y }) => {
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
};

const setCursorDefaultPosition = (el, options) => {
  const client = getClientState(el);

  let k = 0;
  let teta = options.range / options.max;
  let alpha = options.range;

  return {
    x: client.xc + client.r * Math.cos((alpha - k) * teta),
    y: client.yc + client.r * Math.sin((alpha - k) * teta)
  };
};

export const rangeButton = (el, options = {}) => {
  let range = $(el);

  console.log();
  applyCoordsToElement(
    range.querySelector(`.cursor`),
    setCursorDefaultPosition(range, options.cursor)
  );
  range.addEventListener(`mousemove`, (e) => moveCursor(e, range, options));
};
