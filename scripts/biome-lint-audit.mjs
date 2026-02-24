import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const OUTPUT_JSON = 'biome-lint-audit.json';
const OUTPUT_MD = 'biome-lint-audit.md';

function extractJsonPayload(text) {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    return null;
  }

  return text.slice(firstBrace, lastBrace + 1);
}

function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function mapToSortedObject(map) {
  return Object.fromEntries([...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

const biomeCmd = process.platform === 'win32' ? 'node_modules/.bin/biome.cmd' : 'node_modules/.bin/biome';
const args = ['check', '.', '--reporter=json'];
const result = spawnSync(biomeCmd, args, {
  encoding: 'utf-8',
  maxBuffer: 50 * 1024 * 1024,
});

const combinedOutput = [result.stdout, result.stderr].filter(Boolean).join('\n');
const jsonText =
  extractJsonPayload(result.stdout ?? '') ??
  extractJsonPayload(combinedOutput);

if (!jsonText) {
  console.error('Failed to find JSON in Biome output.');
  if (combinedOutput) {
    console.error(combinedOutput);
  }
  process.exit(result.status ?? 1);
}

let report;
try {
  report = JSON.parse(jsonText);
} catch (error) {
  console.error('Failed to parse Biome JSON output:', error.message);
  process.exit(1);
}

const diagnostics = Array.isArray(report.diagnostics) ? report.diagnostics : [];
const bySeverity = new Map();
const byCategory = new Map();
const byDomain = new Map();
const byFile = new Map();
let fixableCount = 0;

for (const diagnostic of diagnostics) {
  const severity = diagnostic.severity ?? 'unknown';
  const category = diagnostic.category ?? 'unknown';
  const domain = String(category).split('/')[0] || 'unknown';
  const file = diagnostic.location?.path?.file ?? 'unknown';
  const tags = Array.isArray(diagnostic.tags) ? diagnostic.tags : [];

  increment(bySeverity, severity);
  increment(byCategory, category);
  increment(byDomain, domain);
  increment(byFile, file);

  if (tags.includes('fixable')) {
    fixableCount += 1;
  }
}

const summary = {
  command: `${biomeCmd} ${args.join(' ')}`,
  exitCode: result.status,
  totals: {
    diagnostics: diagnostics.length,
    errors: report.summary?.errors ?? 0,
    warnings: report.summary?.warnings ?? 0,
    fixableDiagnostics: fixableCount,
    nonFixableDiagnostics: diagnostics.length - fixableCount,
    filesWithDiagnostics: byFile.size,
  },
  biomeSummary: report.summary ?? {},
  counts: {
    bySeverity: mapToSortedObject(bySeverity),
    byDomain: mapToSortedObject(byDomain),
    byCategory: mapToSortedObject(byCategory),
    topFiles: Object.fromEntries([...byFile.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 25)),
  },
};

fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(summary, null, 2)}\n`, 'utf-8');

const topCategories = Object.entries(summary.counts.byCategory).slice(0, 20);
const topFiles = Object.entries(summary.counts.topFiles);
const md = [
  '# Biome Lint Audit Summary',
  '',
  `- Command: \`${summary.command}\``,
  `- Exit code: ${summary.exitCode}`,
  `- Total diagnostics: ${summary.totals.diagnostics}`,
  `- Errors: ${summary.totals.errors}`,
  `- Warnings: ${summary.totals.warnings}`,
  `- Fixable diagnostics (tagged): ${summary.totals.fixableDiagnostics}`,
  `- Non-fixable diagnostics: ${summary.totals.nonFixableDiagnostics}`,
  `- Files with diagnostics: ${summary.totals.filesWithDiagnostics}`,
  '',
  '## By Severity',
  '',
  ...Object.entries(summary.counts.bySeverity).map(([key, value]) => `- ${key}: ${value}`),
  '',
  '## By Domain',
  '',
  ...Object.entries(summary.counts.byDomain).map(([key, value]) => `- ${key}: ${value}`),
  '',
  '## Top Categories (first 20)',
  '',
  ...topCategories.map(([key, value]) => `- ${key}: ${value}`),
  '',
  '## Top Files (first 25)',
  '',
  ...topFiles.map(([key, value]) => `- ${key}: ${value}`),
  '',
].join('\n');

fs.writeFileSync(OUTPUT_MD, md, 'utf-8');

console.log(`Wrote ${OUTPUT_JSON} and ${OUTPUT_MD}`);
console.log(`Diagnostics: ${summary.totals.diagnostics} (${summary.totals.errors} errors, ${summary.totals.warnings} warnings)`);
console.log(`Fixable tagged diagnostics: ${summary.totals.fixableDiagnostics}`);

process.exit(0);
