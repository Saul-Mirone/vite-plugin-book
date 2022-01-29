import { isValidSelector, isAttributifySelector, extractorSplit } from '@unocss/core';

const strippedPrefixes = [
  "v-bind:",
  ":"
];
const splitterRE = /[\s'"`;]+/g;
const elementRE = /<\w[\w:\.$-]*\s((?:'[\s\S]*?'|"[\s\S]*?"|`[\s\S]*?`|\{[\s\S]*?\}|[\s\S]*?)*?)>/g;
const valuedAttributeRE = /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-]+)(?:=(["'])([^\2]*?)\2)?/g;
const extractorAttributify = (options) => {
  const ignoreAttributes = options?.ignoreAttributes ?? [];
  const nonValuedAttribute = options?.nonValuedAttribute ?? true;
  return {
    name: "attributify",
    extract({ code }) {
      const result = Array.from(code.matchAll(elementRE)).flatMap((match) => Array.from((match[1] || "").matchAll(valuedAttributeRE))).flatMap(([, name, _, content]) => {
        if (ignoreAttributes.includes(name))
          return [];
        for (const prefix of strippedPrefixes) {
          if (name.startsWith(prefix)) {
            name = name.slice(prefix.length);
            break;
          }
        }
        if (!content) {
          if (isValidSelector(name) && nonValuedAttribute !== false)
            return [`[${name}=""]`];
          return [];
        }
        if (["class", "className"].includes(name)) {
          return content.split(splitterRE).filter(isValidSelector);
        } else {
          return content.split(splitterRE).filter(Boolean).map((v) => `[${name}~="${v}"]`);
        }
      });
      return new Set(result);
    }
  };
};

const variantsRE = /^(?!\[(?:[^:]+):(?:.+)\]$)(.+:!?)?(.*)$/;
const variantAttributify = (options = {}) => {
  const prefix = options.prefix ?? "un-";
  const prefixedOnly = options.prefixedOnly ?? false;
  return (input) => {
    const match = isAttributifySelector(input);
    if (!match)
      return;
    let name = match[1];
    if (name.startsWith(prefix))
      name = name.slice(prefix.length);
    else if (prefixedOnly)
      return;
    const content = match[2];
    const [, variants = "", body = content] = content.match(variantsRE) || [];
    if (body === "~" || !body)
      return `${variants}${name}`;
    else
      return `${variants}${name}-${body}`;
  };
};

const preset = (options = {}) => {
  options.strict = options.strict ?? false;
  options.prefix = options.prefix ?? "un-";
  options.prefixedOnly = options.prefixedOnly ?? false;
  options.nonValuedAttribute = options.nonValuedAttribute ?? true;
  options.ignoreAttributes = options.ignoreAttributes ?? [];
  const variants = [
    variantAttributify(options)
  ];
  const extractors = [
    extractorAttributify(options)
  ];
  if (!options.strict)
    extractors.unshift(extractorSplit);
  return {
    name: "@unocss/preset-attributify",
    variants,
    extractors,
    options
  };
};

export { preset as default, extractorAttributify, variantAttributify };
