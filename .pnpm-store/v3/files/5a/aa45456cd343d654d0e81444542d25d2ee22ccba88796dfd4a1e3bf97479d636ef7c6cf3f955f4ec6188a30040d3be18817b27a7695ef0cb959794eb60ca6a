'use strict';

const core = require('@unocss/core');

const variantMatcher = (name, selector) => {
  const re = new RegExp(`^${core.escapeRegExp(name)}[:-]`);
  return (input) => {
    const match = input.match(re);
    if (match) {
      return {
        matcher: input.slice(match[0].length),
        selector
      };
    }
  };
};
const variantParentMatcher = (name, parent) => {
  const re = new RegExp(`^${core.escapeRegExp(name)}[:-]`);
  return (input) => {
    const match = input.match(re);
    if (match) {
      return {
        matcher: input.slice(match[0].length),
        parent
      };
    }
  };
};

exports.variantMatcher = variantMatcher;
exports.variantParentMatcher = variantParentMatcher;
