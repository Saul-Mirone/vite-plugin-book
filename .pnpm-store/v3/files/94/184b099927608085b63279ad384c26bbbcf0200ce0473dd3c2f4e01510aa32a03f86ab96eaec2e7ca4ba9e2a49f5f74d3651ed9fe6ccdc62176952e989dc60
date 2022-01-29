(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.scrollIntoView = factory());
}(this, (function () { 'use strict';

  function t(t){return "object"==typeof t&&null!=t&&1===t.nodeType}function e(t,e){return (!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return !1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}function compute(e,i){var o=window,l=i.scrollMode,d=i.block,u=i.inline,h=i.boundary,a=i.skipOverflowHiddenElements,c="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=e;t(p)&&c(p);){if((p=p.parentElement)===f){s.push(p);break}null!=p&&p===document.body&&n(p)&&!n(document.documentElement)||null!=p&&n(p,a)&&s.push(p);}for(var m=o.visualViewport?o.visualViewport.width:innerWidth,g=o.visualViewport?o.visualViewport.height:innerHeight,w=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,W=e.getBoundingClientRect(),b=W.height,H=W.width,y=W.top,E=W.right,M=W.bottom,V=W.left,x="start"===d||"nearest"===d?y:"end"===d?M:y+b/2,I="center"===u?V+H/2:"end"===u?E:V,C=[],T=0;T<s.length;T++){var k=s[T],B=k.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,L=B.left;if("if-needed"===l&&y>=0&&V>=0&&M<=g&&E<=m&&y>=R&&M<=Y&&V>=L&&E<=X)return C;var S=getComputedStyle(k),j=parseInt(S.borderLeftWidth,10),q=parseInt(S.borderTopWidth,10),z=parseInt(S.borderRightWidth,10),A=parseInt(S.borderBottomWidth,10),F=0,G=0,J="offsetWidth"in k?k.offsetWidth-k.clientWidth-j-z:0,K="offsetHeight"in k?k.offsetHeight-k.clientHeight-q-A:0;if(f===k)F="start"===d?x:"end"===d?x-g:"nearest"===d?r(v,v+g,g,q,A,v+x,v+x+b,b):x-g/2,G="start"===u?I:"center"===u?I-m/2:"end"===u?I-m:r(w,w+m,m,j,z,w+I,w+I+H,H),F=Math.max(0,F+v),G=Math.max(0,G+w);else {F="start"===d?x-R-q:"end"===d?x-Y+A+K:"nearest"===d?r(R,Y,D,q,A+K,x,x+b,b):x-(R+D/2)+K/2,G="start"===u?I-L-j:"center"===u?I-(L+O/2)+J/2:"end"===u?I-X+z+J:r(L,X,O,j,z+J,I,I+H,H);var N=k.scrollLeft,P=k.scrollTop;x+=P-(F=Math.max(0,Math.min(P+F,k.scrollHeight-D+K))),I+=N-(G=Math.max(0,Math.min(N+G,k.scrollWidth-O+J)));}C.push({el:k,top:F,left:G});}return C}

  function isOptionsObject(options) {
    return options === Object(options) && Object.keys(options).length !== 0;
  }

  function defaultBehavior(actions, behavior) {
    if (behavior === void 0) {
      behavior = 'auto';
    }

    var canSmoothScroll = ('scrollBehavior' in document.body.style);
    actions.forEach(function (_ref) {
      var el = _ref.el,
          top = _ref.top,
          left = _ref.left;

      if (el.scroll && canSmoothScroll) {
        el.scroll({
          top: top,
          left: left,
          behavior: behavior
        });
      } else {
        el.scrollTop = top;
        el.scrollLeft = left;
      }
    });
  }

  function getOptions(options) {
    if (options === false) {
      return {
        block: 'end',
        inline: 'nearest'
      };
    }

    if (isOptionsObject(options)) {
      return options;
    }

    return {
      block: 'start',
      inline: 'nearest'
    };
  }

  function scrollIntoView(target, options) {
    var targetIsDetached = !target.ownerDocument.documentElement.contains(target);

    if (isOptionsObject(options) && typeof options.behavior === 'function') {
      return options.behavior(targetIsDetached ? [] : compute(target, options));
    }

    if (targetIsDetached) {
      return;
    }

    var computeOptions = getOptions(options);
    return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
  }

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

  return smoothScrollIntoView;

})));
