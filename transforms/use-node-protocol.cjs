module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const builtins = new Set([
    'fs', 'path', 'child_process', 'os', 'crypto', 'util',
    'stream', 'events', 'http', 'https', 'url'
  ]);

  root.find(j.CallExpression, {
    callee: { name: 'require' }
  }).forEach((p) => {
    const [arg] = p.node.arguments || [];
    if (!arg || typeof arg.value !== 'string') return;
    if (!builtins.has(arg.value)) return;
    arg.value = `node:${arg.value}`;
    arg.raw = `'node:${arg.value}'`;
  });

  return root.toSource({ quote: 'single' });
};
