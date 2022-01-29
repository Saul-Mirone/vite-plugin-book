import { PluginKey, TextSelection, Selection, SelectionRange, NodeSelection, Plugin } from 'prosemirror-state';
import { Fragment, Slice } from 'prosemirror-model';
import { keydownHandler } from 'prosemirror-keymap';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Transform } from 'prosemirror-transform';

// Because working with row and column-spanning cells is not quite
// trivial, this code builds up a descriptive structure for a given
// table node. The structures are cached with the (persistent) table
// nodes as key, so that they only have to be recomputed when the
// content of the table changes.
//
// This does mean that they have to store table-relative, not
// document-relative positions. So code that uses them will typically
// compute the start position of the table and offset positions passed
// to or gotten from this structure by that amount.

var readFromCache, addToCache;
// Prefer using a weak map to cache table maps. Fall back on a
// fixed-size cache if that's not supported.
if (typeof WeakMap != "undefined") {
  var cache = new WeakMap;
  readFromCache = function (key) { return cache.get(key); };
  addToCache = function (key, value) {
    cache.set(key, value);
    return value
  };
} else {
  var cache$1 = [], cacheSize = 10, cachePos = 0;
  readFromCache = function (key) {
    for (var i = 0; i < cache$1.length; i += 2)
      { if (cache$1[i] == key) { return cache$1[i + 1] } }
  };
  addToCache = function (key, value) {
    if (cachePos == cacheSize) { cachePos = 0; }
    cache$1[cachePos++] = key;
    return cache$1[cachePos++] = value
  };
}

var Rect = function Rect(left, top, right, bottom) {
  this.left = left; this.top = top; this.right = right; this.bottom = bottom;
};

// ::- A table map describes the structore of a given table. To avoid
// recomputing them all the time, they are cached per table node. To
// be able to do that, positions saved in the map are relative to the
// start of the table, rather than the start of the document.
var TableMap = function TableMap(width, height, map, problems) {
  // :: number The width of the table
  this.width = width;
  // :: number The table's height
  this.height = height;
  // :: [number] A width * height array with the start position of
  // the cell covering that part of the table in each slot
  this.map = map;
  // An optional array of problems (cell overlap or non-rectangular
  // shape) for the table, used by the table normalizer.
  this.problems = problems;
};

// :: (number) → Rect
// Find the dimensions of the cell at the given position.
TableMap.prototype.findCell = function findCell (pos) {
  for (var i = 0; i < this.map.length; i++) {
    var curPos = this.map[i];
    if (curPos != pos) { continue }
    var left = i % this.width, top = (i / this.width) | 0;
    var right = left + 1, bottom = top + 1;
    for (var j = 1; right < this.width && this.map[i + j] == curPos; j++) { right++; }
    for (var j$1 = 1; bottom < this.height && this.map[i + (this.width * j$1)] == curPos; j$1++) { bottom++; }
    return new Rect(left, top, right, bottom)
  }
  throw new RangeError("No cell with offset " + pos + " found")
};

// :: (number) → number
// Find the left side of the cell at the given position.
TableMap.prototype.colCount = function colCount (pos) {
  for (var i = 0; i < this.map.length; i++)
    { if (this.map[i] == pos) { return i % this.width } }
  throw new RangeError("No cell with offset " + pos + " found")
};

// :: (number, string, number) → ?number
// Find the next cell in the given direction, starting from the cell
// at `pos`, if any.
TableMap.prototype.nextCell = function nextCell (pos, axis, dir) {
  var ref = this.findCell(pos);
    var left = ref.left;
    var right = ref.right;
    var top = ref.top;
    var bottom = ref.bottom;
  if (axis == "horiz") {
    if (dir < 0 ? left == 0 : right == this.width) { return null }
    return this.map[top * this.width + (dir < 0 ? left - 1 : right)]
  } else {
    if (dir < 0 ? top == 0 : bottom == this.height) { return null }
    return this.map[left + this.width * (dir < 0 ? top - 1 : bottom)]
  }
};

// :: (number, number) → Rect
// Get the rectangle spanning the two given cells.
TableMap.prototype.rectBetween = function rectBetween (a, b) {
  var ref = this.findCell(a);
    var leftA = ref.left;
    var rightA = ref.right;
    var topA = ref.top;
    var bottomA = ref.bottom;
  var ref$1 = this.findCell(b);
    var leftB = ref$1.left;
    var rightB = ref$1.right;
    var topB = ref$1.top;
    var bottomB = ref$1.bottom;
  return new Rect(Math.min(leftA, leftB), Math.min(topA, topB),
                  Math.max(rightA, rightB), Math.max(bottomA, bottomB))
};

// :: (Rect) → [number]
// Return the position of all cells that have the top left corner in
// the given rectangle.
TableMap.prototype.cellsInRect = function cellsInRect (rect) {
  var result = [], seen = {};
  for (var row = rect.top; row < rect.bottom; row++) {
    for (var col = rect.left; col < rect.right; col++) {
      var index = row * this.width + col, pos = this.map[index];
      if (seen[pos]) { continue }
      seen[pos] = true;
      if ((col != rect.left || !col || this.map[index - 1] != pos) &&
          (row != rect.top || !row || this.map[index - this.width] != pos))
        { result.push(pos); }
    }
  }
  return result
};

// :: (number, number, Node) → number
// Return the position at which the cell at the given row and column
// starts, or would start, if a cell started there.
TableMap.prototype.positionAt = function positionAt (row, col, table) {
  for (var i = 0, rowStart = 0;; i++) {
    var rowEnd = rowStart + table.child(i).nodeSize;
    if (i == row) {
      var index = col + row * this.width, rowEndIndex = (row + 1) * this.width;
      // Skip past cells from previous rows (via rowspan)
      while (index < rowEndIndex && this.map[index] < rowStart) { index++; }
      return index == rowEndIndex ? rowEnd - 1 : this.map[index]
    }
    rowStart = rowEnd;
  }
};

// :: (Node) → TableMap
// Find the table map for the given table node.
TableMap.get = function get (table) {
  return readFromCache(table) || addToCache(table, computeMap(table))
};

// Compute a table map.
function computeMap(table) {
  if (table.type.spec.tableRole != "table") { throw new RangeError("Not a table node: " + table.type.name) }
  var width = findWidth(table), height = table.childCount;
  var map = [], mapPos = 0, problems = null, colWidths = [];
  for (var i = 0, e = width * height; i < e; i++) { map[i] = 0; }

  for (var row = 0, pos = 0; row < height; row++) {
    var rowNode = table.child(row);
    pos++;
    for (var i$1 = 0;; i$1++) {
      while (mapPos < map.length && map[mapPos] != 0) { mapPos++; }
      if (i$1 == rowNode.childCount) { break }
      var cellNode = rowNode.child(i$1);
      var ref = cellNode.attrs;
      var colspan = ref.colspan;
      var rowspan = ref.rowspan;
      var colwidth = ref.colwidth;
      for (var h = 0; h < rowspan; h++) {
        if (h + row >= height) {
          (problems || (problems = [])).push({type: "overlong_rowspan", pos: pos, n: rowspan - h});
          break
        }
        var start = mapPos + (h * width);
        for (var w = 0; w < colspan; w++) {
          if (map[start + w] == 0)
            { map[start + w] = pos; }
          else
            { (problems || (problems = [])).push({type: "collision", row: row, pos: pos, n: colspan - w}); }
          var colW = colwidth && colwidth[w];
          if (colW) {
            var widthIndex = ((start + w) % width) * 2, prev = colWidths[widthIndex];
            if (prev == null || (prev != colW && colWidths[widthIndex + 1] == 1)) {
              colWidths[widthIndex] = colW;
              colWidths[widthIndex + 1] = 1;
            } else if (prev == colW) {
              colWidths[widthIndex + 1]++;
            }
          }
        }
      }
      mapPos += colspan;
      pos += cellNode.nodeSize;
    }
    var expectedPos = (row + 1) * width, missing = 0;
    while (mapPos < expectedPos) { if (map[mapPos++] == 0) { missing++; } }
    if (missing) { (problems || (problems = [])).push({type: "missing", row: row, n: missing}); }
    pos++;
  }

  var tableMap = new TableMap(width, height, map, problems), badWidths = false;

  // For columns that have defined widths, but whose widths disagree
  // between rows, fix up the cells whose width doesn't match the
  // computed one.
  for (var i$2 = 0; !badWidths && i$2 < colWidths.length; i$2 += 2)
    { if (colWidths[i$2] != null && colWidths[i$2 + 1] < height) { badWidths = true; } }
  if (badWidths) { findBadColWidths(tableMap, colWidths, table); }

  return tableMap
}

function findWidth(table) {
  var width = -1, hasRowSpan = false;
  for (var row = 0; row < table.childCount; row++) {
    var rowNode = table.child(row), rowWidth = 0;
    if (hasRowSpan) { for (var j = 0; j < row; j++) {
      var prevRow = table.child(j);
      for (var i = 0; i < prevRow.childCount; i++) {
        var cell = prevRow.child(i);
        if (j + cell.attrs.rowspan > row) { rowWidth += cell.attrs.colspan; }
      }
    } }
    for (var i$1 = 0; i$1 < rowNode.childCount; i$1++) {
      var cell$1 = rowNode.child(i$1);
      rowWidth += cell$1.attrs.colspan;
      if (cell$1.attrs.rowspan > 1) { hasRowSpan = true; }
    }
    if (width == -1)
      { width = rowWidth; }
    else if (width != rowWidth)
      { width = Math.max(width, rowWidth); }
  }
  return width
}

function findBadColWidths(map, colWidths, table) {
  if (!map.problems) { map.problems = []; }
  for (var i = 0, seen = {}; i < map.map.length; i++) {
    var pos = map.map[i];
    if (seen[pos]) { continue }
    seen[pos] = true;
    var node = table.nodeAt(pos), updated = null;
    for (var j = 0; j < node.attrs.colspan; j++) {
      var col = (i + j) % map.width, colWidth = colWidths[col * 2];
      if (colWidth != null && (!node.attrs.colwidth || node.attrs.colwidth[j] != colWidth))
        { (updated || (updated = freshColWidth(node.attrs)))[j] = colWidth; }
    }
    if (updated) { map.problems.unshift({type: "colwidth mismatch", pos: pos, colwidth: updated}); }
  }
}

function freshColWidth(attrs) {
  if (attrs.colwidth) { return attrs.colwidth.slice() }
  var result = [];
  for (var i = 0; i < attrs.colspan; i++) { result.push(0); }
  return result
}

// Helper for creating a schema that supports tables.

function getCellAttrs(dom, extraAttrs) {
  var widthAttr = dom.getAttribute("data-colwidth");
  var widths = widthAttr && /^\d+(,\d+)*$/.test(widthAttr) ? widthAttr.split(",").map(function (s) { return Number(s); }) : null;
  var colspan = Number(dom.getAttribute("colspan") || 1);
  var result = {
    colspan: colspan,
    rowspan: Number(dom.getAttribute("rowspan") || 1),
    colwidth: widths && widths.length == colspan ? widths : null
  };
  for (var prop in extraAttrs) {
    var getter = extraAttrs[prop].getFromDOM;
    var value = getter && getter(dom);
    if (value != null) { result[prop] = value; }
  }
  return result
}

function setCellAttrs(node, extraAttrs) {
  var attrs = {};
  if (node.attrs.colspan != 1) { attrs.colspan = node.attrs.colspan; }
  if (node.attrs.rowspan != 1) { attrs.rowspan = node.attrs.rowspan; }
  if (node.attrs.colwidth)
    { attrs["data-colwidth"] = node.attrs.colwidth.join(","); }
  for (var prop in extraAttrs) {
    var setter = extraAttrs[prop].setDOMAttr;
    if (setter) { setter(node.attrs[prop], attrs); }
  }
  return attrs
}

// :: (Object) → Object
//
// This function creates a set of [node
// specs](http://prosemirror.net/docs/ref/#model.SchemaSpec.nodes) for
// `table`, `table_row`, and `table_cell` nodes types as used by this
// module. The result can then be added to the set of nodes when
// creating a a schema.
//
//   options::- The following options are understood:
//
//     tableGroup:: ?string
//     A group name (something like `"block"`) to add to the table
//     node type.
//
//     cellContent:: string
//     The content expression for table cells.
//
//     cellAttributes:: ?Object
//     Additional attributes to add to cells. Maps attribute names to
//     objects with the following properties:
//
//       default:: any
//       The attribute's default value.
//
//       getFromDOM:: ?(dom.Node) → any
//       A function to read the attribute's value from a DOM node.
//
//       setDOMAttr:: ?(value: any, attrs: Object)
//       A function to add the attribute's value to an attribute
//       object that's used to render the cell's DOM.
function tableNodes(options) {
  var extraAttrs = options.cellAttributes || {};
  var cellAttrs = {
    colspan: {default: 1},
    rowspan: {default: 1},
    colwidth: {default: null}
  };
  for (var prop in extraAttrs)
    { cellAttrs[prop] = {default: extraAttrs[prop].default}; }

  return {
    table: {
      content: "table_row+",
      tableRole: "table",
      isolating: true,
      group: options.tableGroup,
      parseDOM: [{tag: "table"}],
      toDOM: function toDOM() { return ["table", ["tbody", 0]] }
    },
    table_row: {
      content: "(table_cell | table_header)*",
      tableRole: "row",
      parseDOM: [{tag: "tr"}],
      toDOM: function toDOM() { return ["tr", 0] }
    },
    table_cell: {
      content: options.cellContent,
      attrs: cellAttrs,
      tableRole: "cell",
      isolating: true,
      parseDOM: [{tag: "td", getAttrs: function (dom) { return getCellAttrs(dom, extraAttrs); }}],
      toDOM: function toDOM(node) { return ["td", setCellAttrs(node, extraAttrs), 0] }
    },
    table_header: {
      content: options.cellContent,
      attrs: cellAttrs,
      tableRole: "header_cell",
      isolating: true,
      parseDOM: [{tag: "th", getAttrs: function (dom) { return getCellAttrs(dom, extraAttrs); }}],
      toDOM: function toDOM(node) { return ["th", setCellAttrs(node, extraAttrs), 0] }
    }
  }
}

function tableNodeTypes(schema) {
  var result = schema.cached.tableNodeTypes;
  if (!result) {
    result = schema.cached.tableNodeTypes = {};
    for (var name in schema.nodes) {
      var type = schema.nodes[name], role = type.spec.tableRole;
      if (role) { result[role] = type; }
    }
  }
  return result
}

// Various helper function for working with tables

var key = new PluginKey("selectingCells");

function cellAround($pos) {
  for (var d = $pos.depth - 1; d > 0; d--)
    { if ($pos.node(d).type.spec.tableRole == "row") { return $pos.node(0).resolve($pos.before(d + 1)) } }
  return null
}

function cellWrapping($pos) {
  for (var d = $pos.depth; d > 0; d--) { // Sometimes the cell can be in the same depth.
    var role = $pos.node(d).type.spec.tableRole;
    if (role === "cell" || role === 'header_cell') { return $pos.node(d) }
  }
  return null
}

function isInTable(state) {
  var $head = state.selection.$head;
  for (var d = $head.depth; d > 0; d--) { if ($head.node(d).type.spec.tableRole == "row") { return true } }
  return false
}

function selectionCell(state) {
  var sel = state.selection;
  if (sel.$anchorCell) {
    return sel.$anchorCell.pos > sel.$headCell.pos ? sel.$anchorCell : sel.$headCell;
  } else if (sel.node && sel.node.type.spec.tableRole == "cell") {
    return sel.$anchor
  }
  return cellAround(sel.$head) || cellNear(sel.$head)
}

function cellNear($pos) {
  for (var after = $pos.nodeAfter, pos = $pos.pos; after; after = after.firstChild, pos++) {
    var role = after.type.spec.tableRole;
    if (role == "cell" || role == "header_cell") { return $pos.doc.resolve(pos) }
  }
  for (var before = $pos.nodeBefore, pos$1 = $pos.pos; before; before = before.lastChild, pos$1--) {
    var role$1 = before.type.spec.tableRole;
    if (role$1 == "cell" || role$1 == "header_cell") { return $pos.doc.resolve(pos$1 - before.nodeSize) }
  }
}

function pointsAtCell($pos) {
  return $pos.parent.type.spec.tableRole == "row" && $pos.nodeAfter
}

function moveCellForward($pos) {
  return $pos.node(0).resolve($pos.pos + $pos.nodeAfter.nodeSize)
}

function inSameTable($a, $b) {
  return $a.depth == $b.depth && $a.pos >= $b.start(-1) && $a.pos <= $b.end(-1)
}

function findCell($pos) {
  return TableMap.get($pos.node(-1)).findCell($pos.pos - $pos.start(-1))
}

function colCount($pos) {
  return TableMap.get($pos.node(-1)).colCount($pos.pos - $pos.start(-1))
}

function nextCell($pos, axis, dir) {
  var start = $pos.start(-1), map = TableMap.get($pos.node(-1));
  var moved = map.nextCell($pos.pos - start, axis, dir);
  return moved == null ? null : $pos.node(0).resolve(start + moved)
}

function setAttr(attrs, name, value) {
  var result = {};
  for (var prop in attrs) { result[prop] = attrs[prop]; }
  result[name] = value;
  return result
}

function removeColSpan(attrs, pos, n) {
  if ( n === void 0 ) n=1;

  var result = setAttr(attrs, "colspan", attrs.colspan - n);
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    result.colwidth.splice(pos, n);
    if (!result.colwidth.some(function (w) { return w > 0; })) { result.colwidth = null; }
  }
  return result
}

function addColSpan(attrs, pos, n) {
  if ( n === void 0 ) n=1;

  var result = setAttr(attrs, "colspan", attrs.colspan + n);
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    for (var i = 0; i < n; i++) { result.colwidth.splice(pos, 0, 0); }
  }
  return result
}

function columnIsHeader(map, table, col) {
  var headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (var row = 0; row < map.height; row++)
    { if (table.nodeAt(map.map[col + row * map.width]).type != headerCell)
      { return false } }
  return true
}

// This file defines a ProseMirror selection subclass that models

// ::- A [`Selection`](http://prosemirror.net/docs/ref/#state.Selection)
// subclass that represents a cell selection spanning part of a table.
// With the plugin enabled, these will be created when the user
// selects across cells, and will be drawn by giving selected cells a
// `selectedCell` CSS class.
var CellSelection = /*@__PURE__*/(function (Selection) {
  function CellSelection($anchorCell, $headCell) {
    if ( $headCell === void 0 ) $headCell = $anchorCell;

    var table = $anchorCell.node(-1), map = TableMap.get(table), start = $anchorCell.start(-1);
    var rect = map.rectBetween($anchorCell.pos - start, $headCell.pos - start);
    var doc = $anchorCell.node(0);
    var cells = map.cellsInRect(rect).filter(function (p) { return p != $headCell.pos - start; });
    // Make the head cell the first range, so that it counts as the
    // primary part of the selection
    cells.unshift($headCell.pos - start);
    var ranges = cells.map(function (pos) {
      var cell = table.nodeAt(pos), from = pos + start + 1;
      return new SelectionRange(doc.resolve(from), doc.resolve(from + cell.content.size))
    });
    Selection.call(this, ranges[0].$from, ranges[0].$to, ranges);
    // :: ResolvedPos
    // A resolved position pointing _in front of_ the anchor cell (the one
    // that doesn't move when extending the selection).
    this.$anchorCell = $anchorCell;
    // :: ResolvedPos
    // A resolved position pointing in front of the head cell (the one
    // moves when extending the selection).
    this.$headCell = $headCell;
  }

  if ( Selection ) CellSelection.__proto__ = Selection;
  CellSelection.prototype = Object.create( Selection && Selection.prototype );
  CellSelection.prototype.constructor = CellSelection;

  CellSelection.prototype.map = function map (doc, mapping) {
    var $anchorCell = doc.resolve(mapping.map(this.$anchorCell.pos));
    var $headCell = doc.resolve(mapping.map(this.$headCell.pos));
    if (pointsAtCell($anchorCell) && pointsAtCell($headCell) && inSameTable($anchorCell, $headCell)) {
      var tableChanged = this.$anchorCell.node(-1) != $anchorCell.node(-1);
      if (tableChanged && this.isRowSelection())
        { return CellSelection.rowSelection($anchorCell, $headCell) }
      else if (tableChanged && this.isColSelection())
        { return CellSelection.colSelection($anchorCell, $headCell) }
      else
        { return new CellSelection($anchorCell, $headCell) }
    }
    return TextSelection.between($anchorCell, $headCell)
  };

  // :: () → Slice
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  CellSelection.prototype.content = function content () {
    var table = this.$anchorCell.node(-1), map = TableMap.get(table), start = this.$anchorCell.start(-1);
    var rect = map.rectBetween(this.$anchorCell.pos - start, this.$headCell.pos - start);
    var seen = {}, rows = [];
    for (var row = rect.top; row < rect.bottom; row++) {
      var rowContent = [];
      for (var index = row * map.width + rect.left, col = rect.left; col < rect.right; col++, index++) {
        var pos = map.map[index];
        if (!seen[pos]) {
          seen[pos] = true;
          var cellRect = map.findCell(pos), cell = table.nodeAt(pos);
          var extraLeft = rect.left - cellRect.left, extraRight = cellRect.right - rect.right;
          if (extraLeft > 0 || extraRight > 0) {
            var attrs = cell.attrs;
            if (extraLeft > 0) { attrs = removeColSpan(attrs, 0, extraLeft); }
            if (extraRight > 0) { attrs = removeColSpan(attrs, attrs.colspan - extraRight, extraRight); }
            if (cellRect.left < rect.left) { cell = cell.type.createAndFill(attrs); }
            else { cell = cell.type.create(attrs, cell.content); }
          }
          if (cellRect.top < rect.top || cellRect.bottom > rect.bottom) {
            var attrs$1 = setAttr(cell.attrs, "rowspan", Math.min(cellRect.bottom, rect.bottom) - Math.max(cellRect.top, rect.top));
            if (cellRect.top < rect.top) { cell = cell.type.createAndFill(attrs$1); }
            else { cell = cell.type.create(attrs$1, cell.content); }
          }
          rowContent.push(cell);
        }
      }
      rows.push(table.child(row).copy(Fragment.from(rowContent)));
    }

    var fragment = this.isColSelection() && this.isRowSelection() ? table : rows;
    return new Slice(Fragment.from(fragment), 1, 1)
  };

  CellSelection.prototype.replace = function replace (tr, content) {
    if ( content === void 0 ) content = Slice.empty;

    var mapFrom = tr.steps.length, ranges = this.ranges;
    for (var i = 0; i < ranges.length; i++) {
      var ref = ranges[i];
      var $from = ref.$from;
      var $to = ref.$to;
      var mapping = tr.mapping.slice(mapFrom);
      tr.replace(mapping.map($from.pos), mapping.map($to.pos), i ? Slice.empty : content);
    }
    var sel = Selection.findFrom(tr.doc.resolve(tr.mapping.slice(mapFrom).map(this.to)), -1);
    if (sel) { tr.setSelection(sel); }
  };

  CellSelection.prototype.replaceWith = function replaceWith (tr, node) {
    this.replace(tr, new Slice(Fragment.from(node), 0, 0));
  };

  CellSelection.prototype.forEachCell = function forEachCell (f) {
    var table = this.$anchorCell.node(-1), map = TableMap.get(table), start = this.$anchorCell.start(-1);
    var cells = map.cellsInRect(map.rectBetween(this.$anchorCell.pos - start, this.$headCell.pos - start));
    for (var i = 0; i < cells.length; i++)
      { f(table.nodeAt(cells[i]), start + cells[i]); }
  };

  // :: () → bool
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  CellSelection.prototype.isColSelection = function isColSelection () {
    var anchorTop = this.$anchorCell.index(-1), headTop = this.$headCell.index(-1);
    if (Math.min(anchorTop, headTop) > 0) { return false }
    var anchorBot = anchorTop + this.$anchorCell.nodeAfter.attrs.rowspan,
        headBot = headTop + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(anchorBot, headBot) == this.$headCell.node(-1).childCount
  };

  // :: (ResolvedPos, ?ResolvedPos) → CellSelection
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  CellSelection.colSelection = function colSelection ($anchorCell, $headCell) {
    if ( $headCell === void 0 ) $headCell = $anchorCell;

    var map = TableMap.get($anchorCell.node(-1)), start = $anchorCell.start(-1);
    var anchorRect = map.findCell($anchorCell.pos - start), headRect = map.findCell($headCell.pos - start);
    var doc = $anchorCell.node(0);
    if (anchorRect.top <= headRect.top) {
      if (anchorRect.top > 0)
        { $anchorCell = doc.resolve(start + map.map[anchorRect.left]); }
      if (headRect.bottom < map.height)
        { $headCell = doc.resolve(start + map.map[map.width * (map.height - 1) + headRect.right - 1]); }
    } else {
      if (headRect.top > 0)
        { $headCell = doc.resolve(start + map.map[headRect.left]); }
      if (anchorRect.bottom < map.height)
        { $anchorCell = doc.resolve(start + map.map[map.width * (map.height - 1) + anchorRect.right - 1]); }
    }
    return new CellSelection($anchorCell, $headCell)
  };

  // :: () → bool
  // True if this selection goes all the way from the left to the
  // right of the table.
  CellSelection.prototype.isRowSelection = function isRowSelection () {
    var map = TableMap.get(this.$anchorCell.node(-1)), start = this.$anchorCell.start(-1);
    var anchorLeft = map.colCount(this.$anchorCell.pos - start),
        headLeft = map.colCount(this.$headCell.pos - start);
    if (Math.min(anchorLeft, headLeft) > 0) { return false }
    var anchorRight = anchorLeft + this.$anchorCell.nodeAfter.attrs.colspan,
        headRight = headLeft + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(anchorRight, headRight) == map.width
  };

  CellSelection.prototype.eq = function eq (other) {
    return other instanceof CellSelection && other.$anchorCell.pos == this.$anchorCell.pos &&
      other.$headCell.pos == this.$headCell.pos
  };

  // :: (ResolvedPos, ?ResolvedPos) → CellSelection
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  CellSelection.rowSelection = function rowSelection ($anchorCell, $headCell) {
    if ( $headCell === void 0 ) $headCell = $anchorCell;

    var map = TableMap.get($anchorCell.node(-1)), start = $anchorCell.start(-1);
    var anchorRect = map.findCell($anchorCell.pos - start), headRect = map.findCell($headCell.pos - start);
    var doc = $anchorCell.node(0);
    if (anchorRect.left <= headRect.left) {
      if (anchorRect.left > 0)
        { $anchorCell = doc.resolve(start + map.map[anchorRect.top * map.width]); }
      if (headRect.right < map.width)
        { $headCell = doc.resolve(start + map.map[map.width * (headRect.top + 1) - 1]); }
    } else {
      if (headRect.left > 0)
        { $headCell = doc.resolve(start + map.map[headRect.top * map.width]); }
      if (anchorRect.right < map.width)
        { $anchorCell = doc.resolve(start + map.map[map.width * (anchorRect.top + 1) - 1]); }
    }
    return new CellSelection($anchorCell, $headCell)
  };

  CellSelection.prototype.toJSON = function toJSON () {
    return {type: "cell", anchor: this.$anchorCell.pos, head: this.$headCell.pos}
  };

  CellSelection.fromJSON = function fromJSON (doc, json) {
    return new CellSelection(doc.resolve(json.anchor), doc.resolve(json.head))
  };

  // :: (Node, number, ?number) → CellSelection
  CellSelection.create = function create (doc, anchorCell, headCell) {
    if ( headCell === void 0 ) headCell = anchorCell;

    return new CellSelection(doc.resolve(anchorCell), doc.resolve(headCell))
  };

  CellSelection.prototype.getBookmark = function getBookmark () { return new CellBookmark(this.$anchorCell.pos, this.$headCell.pos) };

  return CellSelection;
}(Selection));

CellSelection.prototype.visible = false;

Selection.jsonID("cell", CellSelection);

var CellBookmark = function CellBookmark(anchor, head) {
  this.anchor = anchor;
  this.head = head;
};
CellBookmark.prototype.map = function map (mapping) {
  return new CellBookmark(mapping.map(this.anchor), mapping.map(this.head))
};
CellBookmark.prototype.resolve = function resolve (doc) {
  var $anchorCell = doc.resolve(this.anchor), $headCell = doc.resolve(this.head);
  if ($anchorCell.parent.type.spec.tableRole == "row" &&
      $headCell.parent.type.spec.tableRole == "row" &&
      $anchorCell.index() < $anchorCell.parent.childCount &&
      $headCell.index() < $headCell.parent.childCount &&
      inSameTable($anchorCell, $headCell))
    { return new CellSelection($anchorCell, $headCell) }
  else
    { return Selection.near($headCell, 1) }
};

function drawCellSelection(state) {
  if (!(state.selection instanceof CellSelection)) { return null }
  var cells = [];
  state.selection.forEachCell(function (node, pos) {
    cells.push(Decoration.node(pos, pos + node.nodeSize, {class: "selectedCell"}));
  });
  return DecorationSet.create(state.doc, cells)
}

function isCellBoundarySelection(ref) {
  var $from = ref.$from;
  var $to = ref.$to;

  if ($from.pos == $to.pos || $from.pos < $from.pos - 6) { return false } // Cheap elimination
  var afterFrom = $from.pos, beforeTo = $to.pos, depth = $from.depth;
  for (; depth >= 0; depth--, afterFrom++)
    { if ($from.after(depth + 1) < $from.end(depth)) { break } }
  for (var d = $to.depth; d >= 0; d--, beforeTo--)
    { if ($to.before(d + 1) > $to.start(d)) { break } }
  return afterFrom == beforeTo && /row|table/.test($from.node(depth).type.spec.tableRole)
}

function isTextSelectionAcrossCells(ref) {
  var $from = ref.$from;
  var $to = ref.$to;

  var fromCellBoundaryNode;
  var toCellBoundaryNode;

  for (var i = $from.depth; i > 0; i--) {
    var node = $from.node(i);
    if (node.type.spec.tableRole === 'cell' || node.type.spec.tableRole === 'header_cell') {
      fromCellBoundaryNode = node;
      break;
    }
  }

  for (var i$1 = $to.depth; i$1 > 0; i$1--) {
    var node$1 = $to.node(i$1);
    if (node$1.type.spec.tableRole === 'cell' || node$1.type.spec.tableRole === 'header_cell') {
      toCellBoundaryNode = node$1;
      break;
    }
  }

  return fromCellBoundaryNode !== toCellBoundaryNode && $to.parentOffset === 0
}

function normalizeSelection(state, tr, allowTableNodeSelection) {
  var sel = (tr || state).selection, doc = (tr || state).doc, normalize, role;
  if (sel instanceof NodeSelection && (role = sel.node.type.spec.tableRole)) {
    if (role == "cell" || role == "header_cell") {
      normalize = CellSelection.create(doc, sel.from);
    } else if (role == "row") {
      var $cell = doc.resolve(sel.from + 1);
      normalize = CellSelection.rowSelection($cell, $cell);
    } else if (!allowTableNodeSelection) {
      var map = TableMap.get(sel.node), start = sel.from + 1;
      var lastCell = start + map.map[map.width * map.height - 1];
      normalize = CellSelection.create(doc, start + 1, lastCell);
    }
  } else if (sel instanceof TextSelection && isCellBoundarySelection(sel)) {
    normalize = TextSelection.create(doc, sel.from);
  } else if (sel instanceof TextSelection && isTextSelectionAcrossCells(sel)) {
    normalize = TextSelection.create(doc, sel.$from.start(), sel.$from.end());
  }
  if (normalize)
    { (tr || (tr = state.tr)).setSelection(normalize); }
  return tr
}

// Utilities used for copy/paste handling.

// Utilities to help with copying and pasting table cells

// : (Slice) → ?{width: number, height: number, rows: [Fragment]}
// Get a rectangular area of cells from a slice, or null if the outer
// nodes of the slice aren't table cells or rows.
function pastedCells(slice) {
  if (!slice.size) { return null }
  var content = slice.content;
  var openStart = slice.openStart;
  var openEnd = slice.openEnd;
  while (content.childCount == 1 && (openStart > 0 && openEnd > 0 || content.firstChild.type.spec.tableRole == "table")) {
    openStart--;
    openEnd--;
    content = content.firstChild.content;
  }
  var first = content.firstChild, role = first.type.spec.tableRole;
  var schema = first.type.schema, rows = [];
  if (role == "row") {
    for (var i = 0; i < content.childCount; i++) {
      var cells = content.child(i).content;
      var left = i ? 0 : Math.max(0, openStart - 1);
      var right = i < content.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
      if (left || right) { cells = fitSlice(tableNodeTypes(schema).row, new Slice(cells, left, right)).content; }
      rows.push(cells);
    }
  } else if (role == "cell" || role == "header_cell") {
    rows.push(openStart || openEnd ? fitSlice(tableNodeTypes(schema).row, new Slice(content, openStart, openEnd)).content : content);
  } else {
    return null
  }
  return ensureRectangular(schema, rows)
}

// : (Schema, [Fragment]) → {width: number, height: number, rows: [Fragment]}
// Compute the width and height of a set of cells, and make sure each
// row has the same number of cells.
function ensureRectangular(schema, rows) {
  var widths = [];
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    for (var j = row.childCount - 1; j >= 0; j--) {
      var ref = row.child(j).attrs;
      var rowspan = ref.rowspan;
      var colspan = ref.colspan;
      for (var r = i; r < i + rowspan; r++)
        { widths[r] = (widths[r] || 0) + colspan; }
    }
  }
  var width = 0;
  for (var r$1 = 0; r$1 < widths.length; r$1++) { width = Math.max(width, widths[r$1]); }
  for (var r$2 = 0; r$2 < widths.length; r$2++) {
    if (r$2 >= rows.length) { rows.push(Fragment.empty); }
    if (widths[r$2] < width) {
      var empty = tableNodeTypes(schema).cell.createAndFill(), cells = [];
      for (var i$1 = widths[r$2]; i$1 < width; i$1++) { cells.push(empty); }
      rows[r$2] = rows[r$2].append(Fragment.from(cells));
    }
  }
  return {height: rows.length, width: width, rows: rows}
}

function fitSlice(nodeType, slice) {
  var node = nodeType.createAndFill();
  var tr = new Transform(node).replace(0, node.content.size, slice);
  return tr.doc
}

// : ({width: number, height: number, rows: [Fragment]}, number, number) → {width: number, height: number, rows: [Fragment]}
// Clip or extend (repeat) the given set of cells to cover the given
// width and height. Will clip rowspan/colspan cells at the edges when
// they stick out.
function clipCells(ref, newWidth, newHeight) {
  var width = ref.width;
  var height = ref.height;
  var rows = ref.rows;

  if (width != newWidth) {
    var added = [], newRows = [];
    for (var row = 0; row < rows.length; row++) {
      var frag = rows[row], cells = [];
      for (var col = added[row] || 0, i = 0; col < newWidth; i++) {
        var cell = frag.child(i % frag.childCount);
        if (col + cell.attrs.colspan > newWidth)
          { cell = cell.type.create(removeColSpan(cell.attrs, cell.attrs.colspan, col + cell.attrs.colspan - newWidth), cell.content); }
        cells.push(cell);
        col += cell.attrs.colspan;
        for (var j = 1; j < cell.attrs.rowspan; j++)
          { added[row + j] = (added[row + j] || 0) + cell.attrs.colspan; }
      }
      newRows.push(Fragment.from(cells));
    }
    rows = newRows;
    width = newWidth;
  }

  if (height != newHeight) {
    var newRows$1 = [];
    for (var row$1 = 0, i$1 = 0; row$1 < newHeight; row$1++, i$1++) {
      var cells$1 = [], source = rows[i$1 % height];
      for (var j$1 = 0; j$1 < source.childCount; j$1++) {
        var cell$1 = source.child(j$1);
        if (row$1 + cell$1.attrs.rowspan > newHeight)
          { cell$1 = cell$1.type.create(setAttr(cell$1.attrs, "rowspan", Math.max(1, newHeight - cell$1.attrs.rowspan)), cell$1.content); }
        cells$1.push(cell$1);
      }
      newRows$1.push(Fragment.from(cells$1));
    }
    rows = newRows$1;
    height = newHeight;
  }

  return {width: width, height: height, rows: rows}
}

// Make sure a table has at least the given width and height. Return
// true if something was changed.
function growTable(tr, map, table, start, width, height, mapFrom) {
  var schema = tr.doc.type.schema, types = tableNodeTypes(schema), empty, emptyHead;
  if (width > map.width) {
    for (var row = 0, rowEnd = 0; row < map.height; row++) {
      var rowNode = table.child(row);
      rowEnd += rowNode.nodeSize;
      var cells = [], add = (void 0);
      if (rowNode.lastChild == null || rowNode.lastChild.type == types.cell)
        { add = empty || (empty = types.cell.createAndFill()); }
      else
        { add = emptyHead || (emptyHead = types.header_cell.createAndFill()); }
      for (var i = map.width; i < width; i++) { cells.push(add); }
      tr.insert(tr.mapping.slice(mapFrom).map(rowEnd - 1 + start), cells);
    }
  }
  if (height > map.height) {
    var cells$1 = [];
    for (var i$1 = 0, start$1 = (map.height - 1) * map.width; i$1 < Math.max(map.width, width); i$1++) {
      var header = i$1 >= map.width ? false :
          table.nodeAt(map.map[start$1 + i$1]).type == types.header_cell;
      cells$1.push(header
                 ? (emptyHead || (emptyHead = types.header_cell.createAndFill()))
                 : (empty || (empty = types.cell.createAndFill())));
    }

    var emptyRow = types.row.create(null, Fragment.from(cells$1)), rows = [];
    for (var i$2 = map.height; i$2 < height; i$2++) { rows.push(emptyRow); }
    tr.insert(tr.mapping.slice(mapFrom).map(start + table.nodeSize - 2), rows);
  }
  return !!(empty || emptyHead)
}

// Make sure the given line (left, top) to (right, top) doesn't cross
// any rowspan cells by splitting cells that cross it. Return true if
// something changed.
function isolateHorizontal(tr, map, table, start, left, right, top, mapFrom) {
  if (top == 0 || top == map.height) { return false }
  var found = false;
  for (var col = left; col < right; col++) {
    var index = top * map.width + col, pos = map.map[index];
    if (map.map[index - map.width] == pos) {
      found = true;
      var cell = table.nodeAt(pos);
      var ref = map.findCell(pos);
      var cellTop = ref.top;
      var cellLeft = ref.left;
      tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + start), null, setAttr(cell.attrs, "rowspan", top - cellTop));
      tr.insert(tr.mapping.slice(mapFrom).map(map.positionAt(top, cellLeft, table)),
                cell.type.createAndFill(setAttr(cell.attrs, "rowspan", (cellTop + cell.attrs.rowspan) - top)));
      col += cell.attrs.colspan - 1;
    }
  }
  return found
}

// Make sure the given line (left, top) to (left, bottom) doesn't
// cross any colspan cells by splitting cells that cross it. Return
// true if something changed.
function isolateVertical(tr, map, table, start, top, bottom, left, mapFrom) {
  if (left == 0 || left == map.width) { return false }
  var found = false;
  for (var row = top; row < bottom; row++) {
    var index = row * map.width + left, pos = map.map[index];
    if (map.map[index - 1] == pos) {
      found = true;
      var cell = table.nodeAt(pos), cellLeft = map.colCount(pos);
      var updatePos = tr.mapping.slice(mapFrom).map(pos + start);
      tr.setNodeMarkup(updatePos, null, removeColSpan(cell.attrs, left - cellLeft, cell.attrs.colspan - (left - cellLeft)));
      tr.insert(updatePos + cell.nodeSize, cell.type.createAndFill(removeColSpan(cell.attrs, 0, left - cellLeft)));
      row += cell.attrs.rowspan - 1;
    }
  }
  return found
}

// Insert the given set of cells (as returned by `pastedCells`) into a
// table, at the position pointed at by rect.
function insertCells(state, dispatch, tableStart, rect, cells) {
  var table = tableStart ? state.doc.nodeAt(tableStart - 1) : state.doc, map = TableMap.get(table);
  var top = rect.top;
  var left = rect.left;
  var right = left + cells.width, bottom = top + cells.height;
  var tr = state.tr, mapFrom = 0;
  function recomp() {
    table = tableStart ? tr.doc.nodeAt(tableStart - 1) : tr.doc;
    map = TableMap.get(table);
    mapFrom = tr.mapping.maps.length;
  }
  // Prepare the table to be large enough and not have any cells
  // crossing the boundaries of the rectangle that we want to
  // insert into. If anything about it changes, recompute the table
  // map so that subsequent operations can see the current shape.
  if (growTable(tr, map, table, tableStart, right, bottom, mapFrom)) { recomp(); }
  if (isolateHorizontal(tr, map, table, tableStart, left, right, top, mapFrom)) { recomp(); }
  if (isolateHorizontal(tr, map, table, tableStart, left, right, bottom, mapFrom)) { recomp(); }
  if (isolateVertical(tr, map, table, tableStart, top, bottom, left, mapFrom)) { recomp(); }
  if (isolateVertical(tr, map, table, tableStart, top, bottom, right, mapFrom)) { recomp(); }

  for (var row = top; row < bottom; row++) {
    var from = map.positionAt(row, left, table), to = map.positionAt(row, right, table);
    tr.replace(tr.mapping.slice(mapFrom).map(from + tableStart), tr.mapping.slice(mapFrom).map(to + tableStart),
               new Slice(cells.rows[row - top], 0, 0));
  }
  recomp();
  tr.setSelection(new CellSelection(tr.doc.resolve(tableStart + map.positionAt(top, left, table)),
                                    tr.doc.resolve(tableStart + map.positionAt(bottom - 1, right - 1, table))));
  dispatch(tr);
}

// This file defines a number of helpers for wiring up user input to

var handleKeyDown = keydownHandler({
  "ArrowLeft": arrow("horiz", -1),
  "ArrowRight": arrow("horiz", 1),
  "ArrowUp": arrow("vert", -1),
  "ArrowDown": arrow("vert", 1),

  "Shift-ArrowLeft": shiftArrow("horiz", -1),
  "Shift-ArrowRight": shiftArrow("horiz", 1),
  "Shift-ArrowUp": shiftArrow("vert", -1),
  "Shift-ArrowDown": shiftArrow("vert", 1),

  "Backspace": deleteCellSelection,
  "Mod-Backspace": deleteCellSelection,
  "Delete": deleteCellSelection,
  "Mod-Delete": deleteCellSelection
});

function maybeSetSelection(state, dispatch, selection) {
  if (selection.eq(state.selection)) { return false }
  if (dispatch) { dispatch(state.tr.setSelection(selection).scrollIntoView()); }
  return true
}

function arrow(axis, dir) {
  return function (state, dispatch, view) {
    var sel = state.selection;
    if (sel instanceof CellSelection) {
      return maybeSetSelection(state, dispatch, Selection.near(sel.$headCell, dir))
    }
    if (axis != "horiz" && !sel.empty) { return false }
    var end = atEndOfCell(view, axis, dir);
    if (end == null) { return false }
    if (axis == "horiz") {
      return maybeSetSelection(state, dispatch, Selection.near(state.doc.resolve(sel.head + dir), dir))
    } else {
      var $cell = state.doc.resolve(end), $next = nextCell($cell, axis, dir), newSel;
      if ($next) { newSel = Selection.near($next, 1); }
      else if (dir < 0) { newSel = Selection.near(state.doc.resolve($cell.before(-1)), -1); }
      else { newSel = Selection.near(state.doc.resolve($cell.after(-1)), 1); }
      return maybeSetSelection(state, dispatch, newSel)
    }
  }
}

function shiftArrow(axis, dir) {
  return function (state, dispatch, view) {
    var sel = state.selection;
    if (!(sel instanceof CellSelection)) {
      var end = atEndOfCell(view, axis, dir);
      if (end == null) { return false }
      sel = new CellSelection(state.doc.resolve(end));
    }
    var $head = nextCell(sel.$headCell, axis, dir);
    if (!$head) { return false }
    return maybeSetSelection(state, dispatch, new CellSelection(sel.$anchorCell, $head))
  }
}

function deleteCellSelection(state, dispatch) {
  var sel = state.selection;
  if (!(sel instanceof CellSelection)) { return false }
  if (dispatch) {
    var tr = state.tr, baseContent = tableNodeTypes(state.schema).cell.createAndFill().content;
    sel.forEachCell(function (cell, pos) {
      if (!cell.content.eq(baseContent))
        { tr.replace(tr.mapping.map(pos + 1), tr.mapping.map(pos + cell.nodeSize - 1),
                   new Slice(baseContent, 0, 0)); }
    });
    if (tr.docChanged) { dispatch(tr); }
  }
  return true
}

function handleTripleClick(view, pos) {
  var doc = view.state.doc, $cell = cellAround(doc.resolve(pos));
  if (!$cell) { return false }
  view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
  return true
}

function handlePaste(view, _, slice) {
  if (!isInTable(view.state)) { return false }
  var cells = pastedCells(slice), sel = view.state.selection;
  if (sel instanceof CellSelection) {
    if (!cells) { cells = {width: 1, height: 1, rows: [Fragment.from(fitSlice(tableNodeTypes(view.state.schema).cell, slice))]}; }
    var table = sel.$anchorCell.node(-1), start = sel.$anchorCell.start(-1);
    var rect = TableMap.get(table).rectBetween(sel.$anchorCell.pos - start, sel.$headCell.pos - start);
    cells = clipCells(cells, rect.right - rect.left, rect.bottom - rect.top);
    insertCells(view.state, view.dispatch, start, rect, cells);
    return true
  } else if (cells) {
    var $cell = selectionCell(view.state), start$1 = $cell.start(-1);
    insertCells(view.state, view.dispatch, start$1, TableMap.get($cell.node(-1)).findCell($cell.pos - start$1), cells);
    return true
  } else {
    return false
  }
}

function handleMouseDown(view, startEvent) {
  if (startEvent.ctrlKey || startEvent.metaKey) { return }

  var startDOMCell = domInCell(view, startEvent.target), $anchor;
  if (startEvent.shiftKey && (view.state.selection instanceof CellSelection)) {
    // Adding to an existing cell selection
    setCellSelection(view.state.selection.$anchorCell, startEvent);
    startEvent.preventDefault();
  } else if (startEvent.shiftKey && startDOMCell &&
             ($anchor = cellAround(view.state.selection.$anchor)) != null &&
             cellUnderMouse(view, startEvent).pos != $anchor.pos) {
    // Adding to a selection that starts in another cell (causing a
    // cell selection to be created).
    setCellSelection($anchor, startEvent);
    startEvent.preventDefault();
  } else if (!startDOMCell) {
    // Not in a cell, let the default behavior happen.
    return
  }

  // Create and dispatch a cell selection between the given anchor and
  // the position under the mouse.
  function setCellSelection($anchor, event) {
    var $head = cellUnderMouse(view, event);
    var starting = key.getState(view.state) == null;
    if (!$head || !inSameTable($anchor, $head)) {
      if (starting) { $head = $anchor; }
      else { return }
    }
    var selection = new CellSelection($anchor, $head);
    if (starting || !view.state.selection.eq(selection)) {
      var tr = view.state.tr.setSelection(selection);
      if (starting) { tr.setMeta(key, $anchor.pos); }
      view.dispatch(tr);
    }
  }

  // Stop listening to mouse motion events.
  function stop() {
    view.root.removeEventListener("mouseup", stop);
    view.root.removeEventListener("dragstart", stop);
    view.root.removeEventListener("mousemove", move);
    if (key.getState(view.state) != null) { view.dispatch(view.state.tr.setMeta(key, -1)); }
  }

  function move(event) {
    var anchor = key.getState(view.state), $anchor;
    if (anchor != null) {
      // Continuing an existing cross-cell selection
      $anchor = view.state.doc.resolve(anchor);
    } else if (domInCell(view, event.target) != startDOMCell) {
      // Moving out of the initial cell -- start a new cell selection
      $anchor = cellUnderMouse(view, startEvent);
      if (!$anchor) { return stop() }
    }
    if ($anchor) { setCellSelection($anchor, event); }
  }
  view.root.addEventListener("mouseup", stop);
  view.root.addEventListener("dragstart", stop);
  view.root.addEventListener("mousemove", move);
}

// Check whether the cursor is at the end of a cell (so that further
// motion would move out of the cell)
function atEndOfCell(view, axis, dir) {
  if (!(view.state.selection instanceof TextSelection)) { return null }
  var ref = view.state.selection;
  var $head = ref.$head;
  for (var d = $head.depth - 1; d >= 0; d--) {
    var parent = $head.node(d), index = dir < 0 ? $head.index(d) : $head.indexAfter(d);
    if (index != (dir < 0 ? 0 : parent.childCount)) { return null }
    if (parent.type.spec.tableRole == "cell" || parent.type.spec.tableRole == "header_cell") {
      var cellPos = $head.before(d);
      var dirStr = axis == "vert" ? (dir > 0 ? "down" : "up") : (dir > 0 ? "right" : "left");
      return view.endOfTextblock(dirStr) ? cellPos : null
    }
  }
  return null
}

function domInCell(view, dom) {
  for (; dom && dom != view.dom; dom = dom.parentNode)
    { if (dom.nodeName == "TD" || dom.nodeName == "TH") { return dom } }
}

function cellUnderMouse(view, event) {
  var mousePos = view.posAtCoords({left: event.clientX, top: event.clientY});
  if (!mousePos) { return null }
  return mousePos ? cellAround(view.state.doc.resolve(mousePos.pos)) : null
}

// This file defines helpers for normalizing tables, making sure no

var fixTablesKey = new PluginKey("fix-tables");

// Helper for iterating through the nodes in a document that changed
// compared to the given previous document. Useful for avoiding
// duplicate work on each transaction.
function changedDescendants(old, cur, offset, f) {
  var oldSize = old.childCount, curSize = cur.childCount;
  outer: for (var i = 0, j = 0; i < curSize; i++) {
    var child = cur.child(i);
    for (var scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
      if (old.child(scan) == child) {
        j = scan + 1;
        offset += child.nodeSize;
        continue outer
      }
    }
    f(child, offset);
    if (j < oldSize && old.child(j).sameMarkup(child))
      { changedDescendants(old.child(j), child, offset + 1, f); }
    else
      { child.nodesBetween(0, child.content.size, f, offset + 1); }
    offset += child.nodeSize;
  }
}

// :: (EditorState, ?EditorState) → ?Transaction
// Inspect all tables in the given state's document and return a
// transaction that fixes them, if necessary. If `oldState` was
// provided, that is assumed to hold a previous, known-good state,
// which will be used to avoid re-scanning unchanged parts of the
// document.
function fixTables(state, oldState) {
  var tr, check = function (node, pos) {
    if (node.type.spec.tableRole == "table") { tr = fixTable(state, node, pos, tr); }
  };
  if (!oldState) { state.doc.descendants(check); }
  else if (oldState.doc != state.doc) { changedDescendants(oldState.doc, state.doc, 0, check); }
  return tr
}

// : (EditorState, Node, number, ?Transaction) → ?Transaction
// Fix the given table, if necessary. Will append to the transaction
// it was given, if non-null, or create a new one if necessary.
function fixTable(state, table, tablePos, tr) {
  var map = TableMap.get(table);
  if (!map.problems) { return tr }
  if (!tr) { tr = state.tr; }

  // Track which rows we must add cells to, so that we can adjust that
  // when fixing collisions.
  var mustAdd = [];
  for (var i = 0; i < map.height; i++) { mustAdd.push(0); }
  for (var i$1 = 0; i$1 < map.problems.length; i$1++) {
    var prob = map.problems[i$1];
    if (prob.type == "collision") {
      var cell = table.nodeAt(prob.pos);
      for (var j = 0; j < cell.attrs.rowspan; j++) { mustAdd[prob.row + j] += prob.n; }
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, removeColSpan(cell.attrs, cell.attrs.colspan - prob.n, prob.n));
    } else if (prob.type == "missing") {
      mustAdd[prob.row] += prob.n;
    } else if (prob.type == "overlong_rowspan") {
      var cell$1 = table.nodeAt(prob.pos);
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, setAttr(cell$1.attrs, "rowspan", cell$1.attrs.rowspan - prob.n));
    } else if (prob.type == "colwidth mismatch") {
      var cell$2 = table.nodeAt(prob.pos);
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, setAttr(cell$2.attrs, "colwidth", prob.colwidth));
    }
  }
  var first, last;
  for (var i$2 = 0; i$2 < mustAdd.length; i$2++) { if (mustAdd[i$2]) {
    if (first == null) { first = i$2; }
    last = i$2;
  } }
  // Add the necessary cells, using a heuristic for whether to add the
  // cells at the start or end of the rows (if it looks like a 'bite'
  // was taken out of the table, add cells at the start of the row
  // after the bite. Otherwise add them at the end).
  for (var i$3 = 0, pos = tablePos + 1; i$3 < map.height; i$3++) {
    var row = table.child(i$3);
    var end = pos + row.nodeSize;
    var add = mustAdd[i$3];
    if (add > 0) {
      var tableNodeType = 'cell';
      if (row.firstChild) {
        tableNodeType = row.firstChild.type.spec.tableRole;
      }
      var nodes = [];
      for (var j$1 = 0; j$1 < add; j$1++)
        { nodes.push(tableNodeTypes(state.schema)[tableNodeType].createAndFill()); }
      var side = (i$3 == 0 || first == i$3 - 1) && last == i$3 ? pos + 1 : end - 1;
      tr.insert(tr.mapping.map(side), nodes);
    }
    pos = end;
  }
  return tr.setMeta(fixTablesKey, { fixTables: true })
}

// This file defines a number of table-related commands.

// Helper to get the selected rectangle in a table, if any. Adds table
// map, table node, and table start offset to the object for
// convenience.
function selectedRect(state) {
  var sel = state.selection, $pos = selectionCell(state);
  var table = $pos.node(-1), tableStart = $pos.start(-1), map = TableMap.get(table);
  var rect;
  if (sel instanceof CellSelection)
    { rect = map.rectBetween(sel.$anchorCell.pos - tableStart, sel.$headCell.pos - tableStart); }
  else
    { rect = map.findCell($pos.pos - tableStart); }
  rect.tableStart = tableStart;
  rect.map = map;
  rect.table = table;
  return rect
}

// Add a column at the given position in a table.
function addColumn(tr, ref, col) {
  var map = ref.map;
  var tableStart = ref.tableStart;
  var table = ref.table;

  var refColumn = col > 0 ? -1 : 0;
  if (columnIsHeader(map, table, col + refColumn))
    { refColumn = col == 0 || col == map.width ? null : 0; }

  for (var row = 0; row < map.height; row++) {
    var index = row * map.width + col;
    // If this position falls inside a col-spanning cell
    if (col > 0 && col < map.width && map.map[index - 1] == map.map[index]) {
      var pos = map.map[index], cell = table.nodeAt(pos);
      tr.setNodeMarkup(tr.mapping.map(tableStart + pos), null,
                       addColSpan(cell.attrs, col - map.colCount(pos)));
      // Skip ahead if rowspan > 1
      row += cell.attrs.rowspan - 1;
    } else {
      var type = refColumn == null ? tableNodeTypes(table.type.schema).cell
          : table.nodeAt(map.map[index + refColumn]).type;
      var pos$1 = map.positionAt(row, col, table);
      tr.insert(tr.mapping.map(tableStart + pos$1), type.createAndFill());
    }
  }
  return tr
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Command to add a column before the column with the selection.
function addColumnBefore(state, dispatch) {
  if (!isInTable(state)) { return false }
  if (dispatch) {
    var rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.left));
  }
  return true
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Command to add a column after the column with the selection.
function addColumnAfter(state, dispatch) {
  if (!isInTable(state)) { return false }
  if (dispatch) {
    var rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.right));
  }
  return true
}

function removeColumn(tr, ref, col) {
  var map = ref.map;
  var table = ref.table;
  var tableStart = ref.tableStart;

  var mapStart = tr.mapping.maps.length;
  for (var row = 0; row < map.height;) {
    var index = row * map.width + col, pos = map.map[index], cell = table.nodeAt(pos);
    // If this is part of a col-spanning cell
    if ((col > 0 && map.map[index - 1] == pos) || (col < map.width - 1 && map.map[index + 1] == pos)) {
      tr.setNodeMarkup(tr.mapping.slice(mapStart).map(tableStart + pos), null,
                       removeColSpan(cell.attrs, col - map.colCount(pos)));
    } else {
      var start = tr.mapping.slice(mapStart).map(tableStart + pos);
      tr.delete(start, start + cell.nodeSize);
    }
    row += cell.attrs.rowspan;
  }
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Command function that removes the selected columns from a table.
function deleteColumn(state, dispatch) {
  if (!isInTable(state)) { return false }
  if (dispatch) {
    var rect = selectedRect(state), tr = state.tr;
    if (rect.left == 0 && rect.right == rect.map.width) { return false }
    for (var i = rect.right - 1;; i--) {
      removeColumn(tr, rect, i);
      if (i == rect.left) { break }
      rect.table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
      rect.map = TableMap.get(rect.table);
    }
    dispatch(tr);
  }
  return true
}

function rowIsHeader(map, table, row) {
  var headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (var col = 0; col < map.width; col++)
    { if (table.nodeAt(map.map[col + row * map.width]).type != headerCell)
      { return false } }
  return true
}

function addRow(tr, ref, row) {
  var map = ref.map;
  var tableStart = ref.tableStart;
  var table = ref.table;

  var rowPos = tableStart;
  for (var i = 0; i < row; i++) { rowPos += table.child(i).nodeSize; }
  var cells = [], refRow = row > 0 ? -1 : 0;
  if (rowIsHeader(map, table, row + refRow))
    { refRow = row == 0 || row == map.height ? null : 0; }
  for (var col = 0, index = map.width * row; col < map.width; col++, index++) {
    // Covered by a rowspan cell
    if (row > 0 && row < map.height && map.map[index] == map.map[index - map.width]) {
      var pos = map.map[index], attrs = table.nodeAt(pos).attrs;
      tr.setNodeMarkup(tableStart + pos, null, setAttr(attrs, "rowspan", attrs.rowspan + 1));
      col += attrs.colspan - 1;
    } else {
      var type = refRow == null ? tableNodeTypes(table.type.schema).cell
          : table.nodeAt(map.map[index + refRow * map.width]).type;
      cells.push(type.createAndFill());
    }
  }
  tr.insert(rowPos, tableNodeTypes(table.type.schema).row.create(null, cells));
  return tr
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Add a table row before the selection.
function addRowBefore(state, dispatch) {
  if (!isInTable(state)) { return false }
  if (dispatch) {
    var rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.top));
  }
  return true
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Add a table row after the selection.
function addRowAfter(state, dispatch) {
  if (!isInTable(state)) { return false }
  if (dispatch) {
    var rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.bottom));
  }
  return true
}

function removeRow(tr, ref, row) {
  var map = ref.map;
  var table = ref.table;
  var tableStart = ref.tableStart;

  var rowPos = 0;
  for (var i = 0; i < row; i++) { rowPos += table.child(i).nodeSize; }
  var nextRow = rowPos + table.child(row).nodeSize;

  var mapFrom = tr.mapping.maps.length;
  tr.delete(rowPos + tableStart, nextRow + tableStart);

  for (var col = 0, index = row * map.width; col < map.width; col++, index++) {
    var pos = map.map[index];
    if (row > 0 && pos == map.map[index - map.width]) {
      // If this cell starts in the row above, simply reduce its rowspan
      var attrs = table.nodeAt(pos).attrs;
      tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + tableStart), null, setAttr(attrs, "rowspan", attrs.rowspan - 1));
      col += attrs.colspan - 1;
    } else if (row < map.width && pos == map.map[index + map.width]) {
      // Else, if it continues in the row below, it has to be moved down
      var cell = table.nodeAt(pos);
      var copy = cell.type.create(setAttr(cell.attrs, "rowspan", cell.attrs.rowspan - 1), cell.content);
      var newPos = map.positionAt(row + 1, col, table);
      tr.insert(tr.mapping.slice(mapFrom).map(tableStart + newPos), copy);
      col += cell.attrs.colspan - 1;
    }
  }
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Remove the selected rows from a table.
function deleteRow(state, dispatch) {
  if (!isInTable(state)) { return false }
  if (dispatch) {
    var rect = selectedRect(state), tr = state.tr;
    if (rect.top == 0 && rect.bottom == rect.map.height) { return false }
    for (var i = rect.bottom - 1;; i--) {
      removeRow(tr, rect, i);
      if (i == rect.top) { break }
      rect.table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
      rect.map = TableMap.get(rect.table);
    }
    dispatch(tr);
  }
  return true
}

function isEmpty(cell) {
  var c = cell.content;
  return c.childCount == 1 && c.firstChild.isTextblock && c.firstChild.childCount == 0
}

function cellsOverlapRectangle(ref, rect) {
  var width = ref.width;
  var height = ref.height;
  var map = ref.map;

  var indexTop = rect.top * width + rect.left, indexLeft = indexTop;
  var indexBottom = (rect.bottom - 1) * width + rect.left, indexRight = indexTop + (rect.right - rect.left - 1);
  for (var i = rect.top; i < rect.bottom; i++) {
    if (rect.left > 0 && map[indexLeft] == map[indexLeft - 1] ||
        rect.right < width && map[indexRight] == map[indexRight + 1]) { return true }
    indexLeft += width; indexRight += width;
  }
  for (var i$1 = rect.left; i$1 < rect.right; i$1++) {
    if (rect.top > 0 && map[indexTop] == map[indexTop - width] ||
        rect.bottom < height && map[indexBottom] == map[indexBottom + width]) { return true }
    indexTop++; indexBottom++;
  }
  return false
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Merge the selected cells into a single cell. Only available when
// the selected cells' outline forms a rectangle.
function mergeCells(state, dispatch) {
  var sel = state.selection;
  if (!(sel instanceof CellSelection) || sel.$anchorCell.pos == sel.$headCell.pos) { return false }
  var rect = selectedRect(state);
  var map = rect.map;
  if (cellsOverlapRectangle(map, rect)) { return false }
  if (dispatch) {
    var tr = state.tr, seen = {}, content = Fragment.empty, mergedPos, mergedCell;
    for (var row = rect.top; row < rect.bottom; row++) {
      for (var col = rect.left; col < rect.right; col++) {
        var cellPos = map.map[row * map.width + col], cell = rect.table.nodeAt(cellPos);
        if (seen[cellPos]) { continue }
        seen[cellPos] = true;
        if (mergedPos == null) {
          mergedPos = cellPos;
          mergedCell = cell;
        } else {
          if (!isEmpty(cell)) { content = content.append(cell.content); }
          var mapped = tr.mapping.map(cellPos + rect.tableStart);
          tr.delete(mapped, mapped + cell.nodeSize);
        }
      }
    }
    tr.setNodeMarkup(mergedPos + rect.tableStart, null,
                     setAttr(addColSpan(mergedCell.attrs, mergedCell.attrs.colspan, (rect.right - rect.left) - mergedCell.attrs.colspan),
                             "rowspan", rect.bottom - rect.top));
    if (content.size) {
      var end = mergedPos + 1 + mergedCell.content.size;
      var start = isEmpty(mergedCell) ? mergedPos + 1 : end;
      tr.replaceWith(start + rect.tableStart, end + rect.tableStart, content);
    }
    tr.setSelection(new CellSelection(tr.doc.resolve(mergedPos + rect.tableStart)));
    dispatch(tr);
  }
  return true
}
// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Split a selected cell, whose rowpan or colspan is greater than one,
// into smaller cells. Use the first cell type for the new cells.
function splitCell(state, dispatch) {
  var nodeTypes = tableNodeTypes(state.schema);
  return splitCellWithType(function (ref) {
    var node = ref.node;

    return nodeTypes[node.type.spec.tableRole]
  })(state, dispatch)
}

// :: (getCellType: ({ row: number, col: number, node: Node}) → NodeType) → (EditorState, dispatch: ?(tr: Transaction)) → bool
// Split a selected cell, whose rowpan or colspan is greater than one,
// into smaller cells with the cell type (th, td) returned by getType function.
function splitCellWithType(getCellType) {
  return function (state, dispatch) {
    var sel = state.selection;
    var cellNode, cellPos;
    if (!(sel instanceof CellSelection)) {
      cellNode = cellWrapping(sel.$from);
      if (!cellNode) { return false }
      cellPos = cellAround(sel.$from).pos;
    } else {
      if (sel.$anchorCell.pos != sel.$headCell.pos) { return false }
      cellNode = sel.$anchorCell.nodeAfter;
      cellPos = sel.$anchorCell.pos;
    }
    if (cellNode.attrs.colspan == 1 && cellNode.attrs.rowspan == 1) {return false}
    if (dispatch) {
      var baseAttrs = cellNode.attrs, attrs = [], colwidth = baseAttrs.colwidth;
      if (baseAttrs.rowspan > 1) { baseAttrs = setAttr(baseAttrs, "rowspan", 1); }
      if (baseAttrs.colspan > 1) { baseAttrs = setAttr(baseAttrs, "colspan", 1); }
      var rect = selectedRect(state), tr = state.tr;
      for (var i = 0; i < rect.right - rect.left; i++)
        { attrs.push(colwidth ? setAttr(baseAttrs, "colwidth", colwidth && colwidth[i] ? [colwidth[i]] : null) : baseAttrs); }
      var lastCell;
      for (var row = rect.top; row < rect.bottom; row++) {
        var pos = rect.map.positionAt(row, rect.left, rect.table);
        if (row == rect.top) { pos += cellNode.nodeSize; }
        for (var col = rect.left, i$1 = 0; col < rect.right; col++, i$1++) {
          if (col == rect.left && row == rect.top) { continue }
          tr.insert(lastCell = tr.mapping.map(pos + rect.tableStart, 1), getCellType({ node: cellNode, row: row, col: col}).createAndFill(attrs[i$1]));
        }
      }
      tr.setNodeMarkup(cellPos, getCellType({ node: cellNode, row: rect.top, col: rect.left}), attrs[0]);
      if (sel instanceof CellSelection)
        { tr.setSelection(new CellSelection(tr.doc.resolve(sel.$anchorCell.pos),
                                          lastCell && tr.doc.resolve(lastCell))); }
      dispatch(tr);
    }
    return true
  }
}

// :: (string, any) → (EditorState, dispatch: ?(tr: Transaction)) → bool
// Returns a command that sets the given attribute to the given value,
// and is only available when the currently selected cell doesn't
// already have that attribute set to that value.
function setCellAttr(name, value) {
  return function(state, dispatch) {
    if (!isInTable(state)) { return false }
    var $cell = selectionCell(state);
    if ($cell.nodeAfter.attrs[name] === value) { return false }
    if (dispatch) {
      var tr = state.tr;
      if (state.selection instanceof CellSelection)
        { state.selection.forEachCell(function (node, pos) {
          if (node.attrs[name] !== value)
            { tr.setNodeMarkup(pos, null, setAttr(node.attrs, name, value)); }
        }); }
      else
        { tr.setNodeMarkup($cell.pos, null, setAttr($cell.nodeAfter.attrs, name, value)); }
      dispatch(tr);
    }
    return true
  }
}

function deprecated_toggleHeader(type) {
  return function(state, dispatch) {
    if (!isInTable(state)) { return false }
    if (dispatch) {
      var types = tableNodeTypes(state.schema);
      var rect = selectedRect(state), tr = state.tr;
      var cells = rect.map.cellsInRect(type == "column" ? new Rect(rect.left, 0, rect.right, rect.map.height) :
                                       type == "row" ? new Rect(0, rect.top, rect.map.width, rect.bottom) : rect);
      var nodes = cells.map(function (pos) { return rect.table.nodeAt(pos); });
      for (var i = 0; i < cells.length; i++) // Remove headers, if any
        { if (nodes[i].type == types.header_cell)
          { tr.setNodeMarkup(rect.tableStart + cells[i], types.cell, nodes[i].attrs); } }
      if (tr.steps.length == 0) { for (var i$1 = 0; i$1 < cells.length; i$1++) // No headers removed, add instead
        { tr.setNodeMarkup(rect.tableStart + cells[i$1], types.header_cell, nodes[i$1].attrs); } }
      dispatch(tr);
    }
    return true
  }
}

function isHeaderEnabledByType(type, rect, types) {
  // Get cell positions for first row or first column
  var cellPositions = rect.map.cellsInRect({
    left: 0,
    top: 0,
    right: type == "row" ? rect.map.width : 1,
    bottom: type == "column" ? rect.map.height : 1,
  });

  for (var i = 0; i < cellPositions.length; i++) {
    var cell = rect.table.nodeAt(cellPositions[i]);
    if (cell && cell.type !== types.header_cell) {
      return false
    }
  }

  return true
}

// :: (string, ?{ useDeprecatedLogic: bool }) → (EditorState, dispatch: ?(tr: Transaction)) → bool
// Toggles between row/column header and normal cells (Only applies to first row/column).
// For deprecated behavior pass `useDeprecatedLogic` in options with true.
function toggleHeader(type, options) {
  options = options || { useDeprecatedLogic: false };

  if (options.useDeprecatedLogic)
    { return deprecated_toggleHeader(type) }

  return function(state, dispatch) {
    if (!isInTable(state)) { return false }
    if (dispatch) {
      var types = tableNodeTypes(state.schema);
      var rect = selectedRect(state), tr = state.tr;

      var isHeaderRowEnabled = isHeaderEnabledByType("row", rect, types);
      var isHeaderColumnEnabled = isHeaderEnabledByType("column", rect, types);

      var isHeaderEnabled = type === "column" ? isHeaderRowEnabled :
                            type === "row"    ? isHeaderColumnEnabled : false;

      var selectionStartsAt = isHeaderEnabled ? 1 : 0;

      var cellsRect = type == "column" ? new Rect(0, selectionStartsAt, 1, rect.map.height) :
                      type == "row" ? new Rect(selectionStartsAt, 0, rect.map.width, 1) : rect;

      var newType = type == "column" ? isHeaderColumnEnabled ? types.cell : types.header_cell :
                    type == "row" ? isHeaderRowEnabled ? types.cell : types.header_cell : types.cell;

      rect.map.cellsInRect(cellsRect).forEach(function (relativeCellPos) {
        var cellPos = relativeCellPos + rect.tableStart;
        var cell = tr.doc.nodeAt(cellPos);

        if (cell) {
          tr.setNodeMarkup(cellPos, newType, cell.attrs);
        }
      });

      dispatch(tr);
    }
    return true
  }
}

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Toggles whether the selected row contains header cells.
var toggleHeaderRow = toggleHeader("row", { useDeprecatedLogic: true });

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Toggles whether the selected column contains header cells.
var toggleHeaderColumn = toggleHeader("column", { useDeprecatedLogic: true });

// :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Toggles whether the selected cells are header cells.
var toggleHeaderCell = toggleHeader("cell", { useDeprecatedLogic: true });

function findNextCell($cell, dir) {
  if (dir < 0) {
    var before = $cell.nodeBefore;
    if (before) { return $cell.pos - before.nodeSize }
    for (var row = $cell.index(-1) - 1, rowEnd = $cell.before(); row >= 0; row--) {
      var rowNode = $cell.node(-1).child(row);
      if (rowNode.childCount) { return rowEnd - 1 - rowNode.lastChild.nodeSize }
      rowEnd -= rowNode.nodeSize;
    }
  } else {
    if ($cell.index() < $cell.parent.childCount - 1) { return $cell.pos + $cell.nodeAfter.nodeSize }
    var table = $cell.node(-1);
    for (var row$1 = $cell.indexAfter(-1), rowStart = $cell.after(); row$1 < table.childCount; row$1++) {
      var rowNode$1 = table.child(row$1);
      if (rowNode$1.childCount) { return rowStart + 1 }
      rowStart += rowNode$1.nodeSize;
    }
  }
}

// :: (number) → (EditorState, dispatch: ?(tr: Transaction)) → bool
// Returns a command for selecting the next (direction=1) or previous
// (direction=-1) cell in a table.
function goToNextCell(direction) {
  return function(state, dispatch) {
    if (!isInTable(state)) { return false }
    var cell = findNextCell(selectionCell(state), direction);
    if (cell == null) { return }
    if (dispatch) {
      var $cell = state.doc.resolve(cell);
      dispatch(state.tr.setSelection(TextSelection.between($cell, moveCellForward($cell))).scrollIntoView());
    }
    return true
  }
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Deletes the table around the selection, if any.
function deleteTable(state, dispatch) {
  var $pos = state.selection.$anchor;
  for (var d = $pos.depth; d > 0; d--) {
    var node = $pos.node(d);
    if (node.type.spec.tableRole == "table") {
      if (dispatch) { dispatch(state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView()); }
      return true
    }
  }
  return false
}

var TableView = function TableView(node, cellMinWidth) {
  this.node = node;
  this.cellMinWidth = cellMinWidth;
  this.dom = document.createElement("div");
  this.dom.className = "tableWrapper";
  this.table = this.dom.appendChild(document.createElement("table"));
  this.colgroup = this.table.appendChild(document.createElement("colgroup"));
  updateColumns(node, this.colgroup, this.table, cellMinWidth);
  this.contentDOM = this.table.appendChild(document.createElement("tbody"));
};

TableView.prototype.update = function update (node) {
  if (node.type != this.node.type) { return false }
  this.node = node;
  updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
  return true
};

TableView.prototype.ignoreMutation = function ignoreMutation (record) {
  return record.type == "attributes" && (record.target == this.table || this.colgroup.contains(record.target))
};

function updateColumns(node, colgroup, table, cellMinWidth, overrideCol, overrideValue) {
  var totalWidth = 0, fixedWidth = true;
  var nextDOM = colgroup.firstChild, row = node.firstChild;
  for (var i = 0, col = 0; i < row.childCount; i++) {
    var ref = row.child(i).attrs;
    var colspan = ref.colspan;
    var colwidth = ref.colwidth;
    for (var j = 0; j < colspan; j++, col++) {
      var hasWidth = overrideCol == col ? overrideValue : colwidth && colwidth[j];
      var cssWidth = hasWidth ? hasWidth + "px" : "";
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) { fixedWidth = false; }
      if (!nextDOM) {
        colgroup.appendChild(document.createElement("col")).style.width = cssWidth;
      } else {
        if (nextDOM.style.width != cssWidth) { nextDOM.style.width = cssWidth; }
        nextDOM = nextDOM.nextSibling;
      }
    }
  }

  while (nextDOM) {
    var after = nextDOM.nextSibling;
    nextDOM.parentNode.removeChild(nextDOM);
    nextDOM = after;
  }

  if (fixedWidth) {
    table.style.width = totalWidth + "px";
    table.style.minWidth = "";
  } else {
    table.style.width = "";
    table.style.minWidth = totalWidth + "px";
  }
}

var key$1 = new PluginKey("tableColumnResizing");

function columnResizing(ref) {
  if ( ref === void 0 ) ref = {};
  var handleWidth = ref.handleWidth; if ( handleWidth === void 0 ) handleWidth = 5;
  var cellMinWidth = ref.cellMinWidth; if ( cellMinWidth === void 0 ) cellMinWidth = 25;
  var View = ref.View; if ( View === void 0 ) View = TableView;
  var lastColumnResizable = ref.lastColumnResizable; if ( lastColumnResizable === void 0 ) lastColumnResizable = true;

  var plugin = new Plugin({
    key: key$1,
    state: {
      init: function init(_, state) {
        this.spec.props.nodeViews[tableNodeTypes(state.schema).table.name] =
          function (node, view) { return new View(node, cellMinWidth, view); };
        return new ResizeState(-1, false)
      },
      apply: function apply(tr, prev) {
        return prev.apply(tr)
      }
    },
    props: {
      attributes: function attributes(state) {
        var pluginState = key$1.getState(state);
        return pluginState.activeHandle > -1 ? {class: "resize-cursor"} : null
      },

      handleDOMEvents: {
        mousemove: function mousemove(view, event) { handleMouseMove(view, event, handleWidth, cellMinWidth, lastColumnResizable); },
        mouseleave: function mouseleave(view) { handleMouseLeave(view); },
        mousedown: function mousedown(view, event) { handleMouseDown$1(view, event, cellMinWidth); }
      },

      decorations: function decorations(state) {
        var pluginState = key$1.getState(state);
        if (pluginState.activeHandle > -1) { return handleDecorations(state, pluginState.activeHandle) }
      },

      nodeViews: {}
    }
  });
  return plugin
}

var ResizeState = function ResizeState(activeHandle, dragging) {
  this.activeHandle = activeHandle;
  this.dragging = dragging;
};

ResizeState.prototype.apply = function apply (tr) {
  var state = this, action = tr.getMeta(key$1);
  if (action && action.setHandle != null)
    { return new ResizeState(action.setHandle, null) }
  if (action && action.setDragging !== undefined)
    { return new ResizeState(state.activeHandle, action.setDragging) }
  if (state.activeHandle > -1 && tr.docChanged) {
    var handle = tr.mapping.map(state.activeHandle, -1);
    if (!pointsAtCell(tr.doc.resolve(handle))) { handle = null; }
    state = new ResizeState(handle, state.dragging);
  }
  return state
};

function handleMouseMove(view, event, handleWidth, cellMinWidth, lastColumnResizable) {
  var pluginState = key$1.getState(view.state);

  if (!pluginState.dragging) {
    var target = domCellAround(event.target), cell = -1;
    if (target) {
      var ref = target.getBoundingClientRect();
      var left = ref.left;
      var right = ref.right;
      if (event.clientX - left <= handleWidth)
        { cell = edgeCell(view, event, "left"); }
      else if (right - event.clientX <= handleWidth)
        { cell = edgeCell(view, event, "right"); }
    }

    if (cell != pluginState.activeHandle) {
      if (!lastColumnResizable && cell !== -1) {
        var $cell = view.state.doc.resolve(cell);
        var table = $cell.node(-1), map = TableMap.get(table), start = $cell.start(-1);
        var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;

        if (col == map.width - 1) {
          return
        }
      }

      updateHandle(view, cell);
    }
  }
}

function handleMouseLeave(view) {
  var pluginState = key$1.getState(view.state);
  if (pluginState.activeHandle > -1 && !pluginState.dragging) { updateHandle(view, -1); }
}

function handleMouseDown$1(view, event, cellMinWidth) {
  var pluginState = key$1.getState(view.state);
  if (pluginState.activeHandle == -1 || pluginState.dragging) { return false }

  var cell = view.state.doc.nodeAt(pluginState.activeHandle);
  var width = currentColWidth(view, pluginState.activeHandle, cell.attrs);
  view.dispatch(view.state.tr.setMeta(key$1, {setDragging: {startX: event.clientX, startWidth: width}}));

  function finish(event) {
    window.removeEventListener("mouseup", finish);
    window.removeEventListener("mousemove", move);
    var pluginState = key$1.getState(view.state);
    if (pluginState.dragging) {
      updateColumnWidth(view, pluginState.activeHandle, draggedWidth(pluginState.dragging, event, cellMinWidth));
      view.dispatch(view.state.tr.setMeta(key$1, {setDragging: null}));
    }
  }
  function move(event) {
    if (!event.which) { return finish(event) }
    var pluginState = key$1.getState(view.state);
    var dragged = draggedWidth(pluginState.dragging, event, cellMinWidth);
    displayColumnWidth(view, pluginState.activeHandle, dragged, cellMinWidth);
  }

  window.addEventListener("mouseup", finish);
  window.addEventListener("mousemove", move);
  event.preventDefault();
  return true
}

function currentColWidth(view, cellPos, ref) {
  var colspan = ref.colspan;
  var colwidth = ref.colwidth;

  var width = colwidth && colwidth[colwidth.length - 1];
  if (width) { return width }
  var dom = view.domAtPos(cellPos);
  var node = dom.node.childNodes[dom.offset];
  var domWidth = node.offsetWidth, parts = colspan;
  if (colwidth) { for (var i = 0; i < colspan; i++) { if (colwidth[i]) {
    domWidth -= colwidth[i];
    parts--;
  } } }
  return domWidth / parts
}

function domCellAround(target) {
  while (target && target.nodeName != "TD" && target.nodeName != "TH")
    { target = target.classList.contains("ProseMirror") ? null : target.parentNode; }
  return target
}

function edgeCell(view, event, side) {
  var found = view.posAtCoords({left: event.clientX, top: event.clientY});
  if (!found) { return -1 }
  var pos = found.pos;
  var $cell = cellAround(view.state.doc.resolve(pos));
  if (!$cell) { return -1 }
  if (side == "right") { return $cell.pos }
  var map = TableMap.get($cell.node(-1)), start = $cell.start(-1);
  var index = map.map.indexOf($cell.pos - start);
  return index % map.width == 0 ? -1 : start + map.map[index - 1]
}

function draggedWidth(dragging, event, cellMinWidth) {
  var offset = event.clientX - dragging.startX;
  return Math.max(cellMinWidth, dragging.startWidth + offset)
}

function updateHandle(view, value) {
  view.dispatch(view.state.tr.setMeta(key$1, {setHandle: value}));
}

function updateColumnWidth(view, cell, width) {
  var $cell = view.state.doc.resolve(cell);
  var table = $cell.node(-1), map = TableMap.get(table), start = $cell.start(-1);
  var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  var tr = view.state.tr;
  for (var row = 0; row < map.height; row++) {
    var mapIndex = row * map.width + col;
    // Rowspanning cell that has already been handled
    if (row && map.map[mapIndex] == map.map[mapIndex - map.width]) { continue }
    var pos = map.map[mapIndex];
    var ref = table.nodeAt(pos);
    var attrs = ref.attrs;
    var index = attrs.colspan == 1 ? 0 : col - map.colCount(pos);
    if (attrs.colwidth && attrs.colwidth[index] == width) { continue }
    var colwidth = attrs.colwidth ? attrs.colwidth.slice() : zeroes(attrs.colspan);
    colwidth[index] = width;
    tr.setNodeMarkup(start + pos, null, setAttr(attrs, "colwidth", colwidth));
  }
  if (tr.docChanged) { view.dispatch(tr); }
}

function displayColumnWidth(view, cell, width, cellMinWidth) {
  var $cell = view.state.doc.resolve(cell);
  var table = $cell.node(-1), start = $cell.start(-1);
  var col = TableMap.get(table).colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  var dom = view.domAtPos($cell.start(-1)).node;
  while (dom.nodeName != "TABLE") { dom = dom.parentNode; }
  updateColumns(table, dom.firstChild, dom, cellMinWidth, col, width);
}

function zeroes(n) {
  var result = [];
  for (var i = 0; i < n; i++) { result.push(0); }
  return result
}

function handleDecorations(state, cell) {
  var decorations = [];
  var $cell = state.doc.resolve(cell);
  var table = $cell.node(-1), map = TableMap.get(table), start = $cell.start(-1);
  var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan;
  for (var row = 0; row < map.height; row++) {
    var index = col + row * map.width - 1;
    // For positions that are have either a different cell or the end
    // of the table to their right, and either the top of the table or
    // a different cell above them, add a decoration
    if ((col == map.width || map.map[index] != map.map[index + 1]) &&
        (row == 0 || map.map[index - 1] != map.map[index - 1 - map.width])) {
      var cellPos = map.map[index];
      var pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
      var dom = document.createElement("div");
      dom.className = "column-resize-handle";
      decorations.push(Decoration.widget(pos, dom));
    }
  }
  return DecorationSet.create(state.doc, decorations)
}

// This file defines a plugin that handles the drawing of cell

// :: () → Plugin
//
// Creates a [plugin](http://prosemirror.net/docs/ref/#state.Plugin)
// that, when added to an editor, enables cell-selection, handles
// cell-based copy/paste, and makes sure tables stay well-formed (each
// row has the same width, and cells don't overlap).
//
// You should probably put this plugin near the end of your array of
// plugins, since it handles mouse and arrow key events in tables
// rather broadly, and other plugins, like the gap cursor or the
// column-width dragging plugin, might want to get a turn first to
// perform more specific behavior.
function tableEditing(ref) {
  if ( ref === void 0 ) ref = {};
  var allowTableNodeSelection = ref.allowTableNodeSelection; if ( allowTableNodeSelection === void 0 ) allowTableNodeSelection = false;

  return new Plugin({
    key: key,

    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init: function init() { return null },
      apply: function apply(tr, cur) {
        var set = tr.getMeta(key);
        if (set != null) { return set == -1 ? null : set }
        if (cur == null || !tr.docChanged) { return cur }
        var ref = tr.mapping.mapResult(cur);
        var deleted = ref.deleted;
        var pos = ref.pos;
        return deleted ? null : pos
      }
    },

    props: {
      decorations: drawCellSelection,

      handleDOMEvents: {
        mousedown: handleMouseDown
      },

      createSelectionBetween: function createSelectionBetween(view) {
        if (key.getState(view.state) != null) { return view.state.selection }
      },

      handleTripleClick: handleTripleClick,

      handleKeyDown: handleKeyDown,

      handlePaste: handlePaste
    },

    appendTransaction: function appendTransaction(_, oldState, state) {
      return normalizeSelection(state, fixTables(state, oldState), allowTableNodeSelection)
    }
  })
}

export { CellSelection, TableMap, TableView, clipCells as __clipCells, insertCells as __insertCells, pastedCells as __pastedCells, addColSpan, addColumn, addColumnAfter, addColumnBefore, addRow, addRowAfter, addRowBefore, cellAround, colCount, columnIsHeader, columnResizing, key$1 as columnResizingPluginKey, deleteColumn, deleteRow, deleteTable, findCell, fixTables, fixTablesKey, goToNextCell, handlePaste, inSameTable, isInTable, mergeCells, moveCellForward, nextCell, pointsAtCell, removeColSpan, removeColumn, removeRow, rowIsHeader, selectedRect, selectionCell, setAttr, setCellAttr, splitCell, splitCellWithType, tableEditing, key as tableEditingKey, tableNodeTypes, tableNodes, toggleHeader, toggleHeaderCell, toggleHeaderColumn, toggleHeaderRow, updateColumns as updateColumnsOnResize };
//# sourceMappingURL=index.es.js.map
