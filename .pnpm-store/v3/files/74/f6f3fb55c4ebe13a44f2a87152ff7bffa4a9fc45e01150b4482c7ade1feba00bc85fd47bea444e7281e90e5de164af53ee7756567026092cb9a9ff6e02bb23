// src/index.ts
import { compare } from "./customisations/compare.mjs";
import {
  defaults,
  mergeCustomisations
} from "./customisations/index.mjs";
import { toBoolean } from "./customisations/bool.mjs";
import {
  flipFromString,
  alignmentFromString
} from "./customisations/shorthand.mjs";
import { rotateFromString } from "./customisations/rotate.mjs";
import { stringToIcon, validateIcon } from "./icon/name.mjs";
import { matchName } from "./icon/index.mjs";
import { mergeIconData } from "./icon/merge.mjs";
import {
  iconDefaults,
  fullIcon
} from "./icon/index.mjs";
import { parseIconSet, isVariation } from "./icon-set/parse.mjs";
import { validateIconSet } from "./icon-set/validate.mjs";
import { expandIconSet } from "./icon-set/expand.mjs";
import { minifyIconSet } from "./icon-set/minify.mjs";
import { getIcons } from "./icon-set/get-icons.mjs";
import { getIconData } from "./icon-set/get-icon.mjs";
import { convertIconSetInfo } from "./icon-set/convert-info.mjs";
import { iconToSVG } from "./svg/build.mjs";
import { replaceIDs } from "./svg/id.mjs";
import { calculateSize } from "./svg/size.mjs";
import { colorKeywords } from "./colors/keywords.mjs";
import { stringToColor, compareColors, colorToString } from "./colors/index.mjs";
import { tryInstallPkg, mergeIconProps } from "./loader/utils.mjs";
import { FileSystemIconLoader } from "./loader/loaders.mjs";
import { getCustomIcon } from "./loader/custom.mjs";
import { loadCollection, searchForIcon } from "./loader/modern.mjs";
import { camelize, camelToKebab, pascalize } from "./misc/strings.mjs";
export {
  FileSystemIconLoader,
  alignmentFromString,
  calculateSize,
  camelToKebab,
  camelize,
  colorKeywords,
  colorToString,
  compareColors,
  compare as compareCustomisations,
  convertIconSetInfo,
  defaults as defaultCustomisations,
  iconDefaults as defaultIconData,
  expandIconSet,
  flipFromString,
  fullIcon as fullIconData,
  getCustomIcon,
  getIconData,
  getIcons,
  iconToSVG,
  isVariation,
  loadCollection,
  matchName as matchIconName,
  mergeCustomisations,
  mergeIconData,
  mergeIconProps,
  minifyIconSet,
  parseIconSet,
  pascalize,
  replaceIDs,
  rotateFromString,
  searchForIcon,
  stringToColor,
  stringToIcon,
  toBoolean,
  tryInstallPkg,
  validateIcon as validateIconName,
  validateIconSet
};
