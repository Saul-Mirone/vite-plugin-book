import scrollIntoView from 'scroll-into-view-if-needed';
var memoizedNow;

var now = function now() {
  if (!memoizedNow) {
    memoizedNow = 'performance' in window ? performance.now.bind(performance) : Date.now;
  }

  return memoizedNow();
};

function step(context) {
  var time = now();
  var elapsed = Math.min((time - context.startTime) / context.duration, 1);
  var value = context.ease(elapsed);
  var currentX = context.startX + (context.x - context.startX) * value;
  var currentY = context.startY + (context.y - context.startY) * value;
  context.method(currentX, currentY);

  if (currentX !== context.x || currentY !== context.y) {
    requestAnimationFrame(function () {
      return step(context);
    });
  } else {
    context.cb();
  }
}

function smoothScroll(el, x, y, duration, ease, cb) {
  if (duration === void 0) {
    duration = 600;
  }

  if (ease === void 0) {
    ease = function ease(t) {
      return 1 + --t * t * t * t * t;
    };
  }

  var scrollable;
  var startX;
  var startY;
  var method;
  scrollable = el;
  startX = el.scrollLeft;
  startY = el.scrollTop;

  method = function method(x, y) {
    el.scrollLeft = Math.ceil(x);
    el.scrollTop = Math.ceil(y);
  };

  step({
    scrollable: scrollable,
    method: method,
    startTime: now(),
    startX: startX,
    startY: startY,
    x: x,
    y: y,
    duration: duration,
    ease: ease,
    cb: cb
  });
}

var shouldSmoothScroll = function shouldSmoothScroll(options) {
  return options && !options.behavior || options.behavior === 'smooth';
};

function scroll(target, options) {
  var overrides = options || {};

  if (shouldSmoothScroll(overrides)) {
    return scrollIntoView(target, {
      block: overrides.block,
      inline: overrides.inline,
      scrollMode: overrides.scrollMode,
      boundary: overrides.boundary,
      behavior: function behavior(actions) {
        return Promise.all(actions.reduce(function (results, _ref) {
          var el = _ref.el,
              left = _ref.left,
              top = _ref.top;
          var startLeft = el.scrollLeft;
          var startTop = el.scrollTop;

          if (startLeft === left && startTop === top) {
            return results;
          }

          return [].concat(results, [new Promise(function (resolve) {
            return smoothScroll(el, left, top, overrides.duration, overrides.ease, function () {
              return resolve({
                el: el,
                left: [startLeft, left],
                top: [startTop, top]
              });
            });
          })]);
        }, []));
      }
    });
  }

  return Promise.resolve(scrollIntoView(target, options));
}

var smoothScrollIntoView = scroll;
export default smoothScrollIntoView;