import { createCmdKey, createCmd } from "@milkdown/core";
import { undo, redo, history as history$1, keymap } from "@milkdown/prose";
import { createPlugin } from "@milkdown/utils";
const Undo = createCmdKey("Undo");
const Redo = createCmdKey("Redo");
const history = createPlugin(() => ({
  commands: () => [createCmd(Undo, () => undo), createCmd(Redo, () => redo)],
  prosePlugins: () => [
    history$1(),
    keymap({
      "Mod-z": undo,
      "Mod-y": redo,
      "Shift-Mod-z": redo
    })
  ]
}))();
export { Redo, Undo, history };
//# sourceMappingURL=index.es.js.map
