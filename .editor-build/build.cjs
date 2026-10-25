const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');

const file = path.resolve(__dirname, '../json-tool.html');
const result = esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'editor.js')],
  bundle: true,
  minify: true,
  write: false,
  format: 'iife',
  globalName: 'JsonToolEditor',
  target: ['es2020'],
  legalComments: 'inline'
});

const licensePackages = [
  '@codemirror/state', '@codemirror/view', '@codemirror/commands', '@codemirror/language', '@codemirror/lang-json',
  '@lezer/common', '@lezer/highlight', '@lezer/lr', '@lezer/json', '@marijn/find-cluster-break', 'style-mod', 'w3c-keyname', 'crelt'
];
const licenses = licensePackages.map(name => {
  const folder = path.join(__dirname, 'node_modules', name);
  const pkg = JSON.parse(fs.readFileSync(path.join(folder, 'package.json'), 'utf8'));
  const filename = fs.readdirSync(folder).find(n => /^license(?:\.txt|\.md)?$/i.test(n));
  if (!filename) throw new Error('Missing license: ' + name);
  return name + '@' + pkg.version + '\n' + fs.readFileSync(path.join(folder, filename), 'utf8');
}).join('\n\n');
const safe = s => s.replace(/<\/script/gi, '<\\/script');
const code = safe('/*\n' + licenses.replace(/\*\//g, '* /') + '\n*/\n' + result.outputFiles[0].text);
const script = '<script id="cm6-bundle">\n' + code + '\n</script>\n';
let html = fs.readFileSync(file, 'utf8');
if (html.includes('<script id="cm6-bundle">')) {
  html = html.replace(/<script id="cm6-bundle">[\s\S]*?<\/script>\n?/, () => script);
} else {
  const marker = '<script>\n(function () {';
  if (!html.includes(marker)) throw new Error('Application script not found');
  html = html.replace(marker, script + marker);
}
fs.writeFileSync(file, html);
console.log('Embedded CodeMirror bundle:', Buffer.byteLength(code), 'bytes');
console.log('Standalone HTML:', Buffer.byteLength(html), 'bytes');
