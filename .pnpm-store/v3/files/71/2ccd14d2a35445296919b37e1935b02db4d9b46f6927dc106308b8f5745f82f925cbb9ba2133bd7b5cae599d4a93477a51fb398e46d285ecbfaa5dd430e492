'use strict';

const path = require('path');
const url = require('url');
const sirv = require('sirv');
const gzipSize = require('gzip-size');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);
const gzipSize__default = /*#__PURE__*/_interopDefaultLegacy(gzipSize);

const _dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(url.fileURLToPath((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.cjs', document.baseURI).href))));
function UnocssInspector(ctx) {
  async function configureServer(server) {
    await ctx.ready;
    server.middlewares.use("/__unocss", sirv__default(path.resolve(_dirname, "../dist/client"), {
      single: true,
      dev: true
    }));
    server.middlewares.use("/__unocss_api", async (req, res, next) => {
      if (!req.url)
        return next();
      if (req.url === "/") {
        const info = {
          version: ctx.uno.version,
          root: server.config.root,
          modules: Array.from(ctx.modules.keys()),
          config: ctx.uno.config,
          configSources: (await ctx.ready).sources
        };
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(info, null, 2));
        res.end();
        return;
      }
      if (req.url.startsWith("/module")) {
        const query = new URLSearchParams(req.url.slice(8));
        const id = query.get("id") || "";
        const code = ctx.modules.get(id);
        if (code == null) {
          res.statusCode = 404;
          res.end();
          return;
        }
        const result = await ctx.uno.generate(code, { id, preflights: false });
        const mod = {
          ...result,
          matched: Array.from(result.matched),
          gzipSize: await gzipSize__default(result.css),
          code,
          id
        };
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(mod, null, 2));
        res.end();
        return;
      }
      if (req.url.startsWith("/repl")) {
        const query = new URLSearchParams(req.url.slice(5));
        const token = query.get("token") || "";
        const result = await ctx.uno.generate(token, { preflights: false });
        const mod = {
          ...result,
          matched: Array.from(result.matched)
        };
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(mod, null, 2));
        res.end();
        return;
      }
      if (req.url.startsWith("/overview")) {
        const result = await ctx.uno.generate(ctx.tokens);
        const mod = {
          ...result,
          matched: Array.from(result.matched),
          gzipSize: await gzipSize__default(result.css)
        };
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(mod, null, 2));
        res.end();
        return;
      }
      next();
    });
  }
  return {
    name: "unocss:inspector",
    apply: "serve",
    configureServer
  };
}

module.exports = UnocssInspector;
