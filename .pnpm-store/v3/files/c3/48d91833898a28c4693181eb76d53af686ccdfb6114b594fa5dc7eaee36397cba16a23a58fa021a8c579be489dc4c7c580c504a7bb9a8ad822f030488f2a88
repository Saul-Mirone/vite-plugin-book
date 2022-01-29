const functionReplacer = (_, value) => typeof value === "function" ? "[Function]" : value;
const stringify = (x) => JSON.stringify(x, functionReplacer);
const docTypeError = (type) => new Error(`Doc type error, unsupported type: ${stringify(type)}`);
const contextNotFound = (name) => new Error(`Context "${name}" not found, do you forget to inject it?`);
const timerNotFound = () => new Error("Timer not found, do you forget to record it?");
const ctxCallOutOfScope = () => new Error("Should not call a context out of the plugin.");
const createNodeInParserFail = (...args) => {
  const message = args.reduce((msg, arg) => {
    if (!arg) {
      return msg;
    }
    const serialize = (x) => {
      if (Array.isArray(x)) {
        return x.map((y) => serialize(y)).join(", ");
      }
      if (x.toJSON) {
        return stringify(x.toJSON());
      }
      if (x.spec) {
        return stringify(x.spec);
      }
      return x.toString();
    };
    return `${msg}, ${serialize(arg)}`;
  }, "Create prosemirror node from remark failed in parser");
  return new Error(message);
};
const stackOverFlow = () => new Error("Stack over flow, cannot pop on an empty stack.");
const parserMatchError = (node) => new Error(`Cannot match target parser for node: ${stringify(node)}.`);
const serializerMatchError = (node) => new Error(`Cannot match target serializer for node: ${stringify(node)}.`);
const getAtomFromSchemaFail = (type, name) => new Error(`Cannot get ${type}: ${name} from schema.`);
const expectDomTypeError = (node) => new Error(`Expect to be a dom, but get: ${stringify(node)}.`);
const callCommandBeforeEditorView = () => new Error(`You're trying to call a command before editor view initialized, make sure to get commandManager from ctx after editor view has been initialized`);
const themeMustInstalled = () => new Error(`It seems that no theme found in editor, please make sure you have use theme in front of all plugins.
If you prefer to use an empty theme, you can use \`themeFactory({})\`.`);
export { callCommandBeforeEditorView, contextNotFound, createNodeInParserFail, ctxCallOutOfScope, docTypeError, expectDomTypeError, getAtomFromSchemaFail, parserMatchError, serializerMatchError, stackOverFlow, themeMustInstalled, timerNotFound };
//# sourceMappingURL=index.es.js.map
