'use strict';

const fs   = require('fs');
const path = require('path');
const { lightTheme, darkTheme } = require('bold-ui');

const boldVersion = require('bold-ui/package.json').version;

function tokens(t) {
  const p = t.pallete;
  return {
    bg:              p.surface.main,
    layer:           p.surface.background,
    divider:         p.divider,
    text:            p.text.main,
    textSecondary:   p.text.secondary,
    textDisabled:    p.text.disabled,
    accent:          p.primary.main,
    accentLight:     p.primary.c60 ?? p.primary.c50,
    accentDark:      p.primary.c30 ?? p.primary.c40,
    error:           p.status.danger.main,
    errorBg:         p.status.danger.background,
    success:         p.status.success.main,
    successBg:       p.status.success.background,
    info:            p.status.info.main,
    infoBg:          p.status.info.background,
    warning:         p.status.alert.main,
    warningBg:       p.status.alert.background,
    highlight:       p.highlight,
  };
}

function vars(t, prefix) {
  const v = tokens(t);
  return `
  --${prefix}-bg:              ${v.bg};
  --${prefix}-layer:           ${v.layer};
  --${prefix}-divider:         ${v.divider};

  --${prefix}-text:            ${v.text};
  --${prefix}-text-secondary:  ${v.textSecondary};
  --${prefix}-text-disabled:   ${v.textDisabled};

  --${prefix}-accent:          ${v.accent};
  --${prefix}-accent-light:    ${v.accentLight};
  --${prefix}-accent-dark:     ${v.accentDark};

  --${prefix}-error:           ${v.error};
  --${prefix}-error-bg:        ${v.errorBg};
  --${prefix}-success:         ${v.success};
  --${prefix}-success-bg:      ${v.successBg};
  --${prefix}-info:            ${v.info};
  --${prefix}-info-bg:         ${v.infoBg};
  --${prefix}-warning:         ${v.warning};
  --${prefix}-warning-bg:      ${v.warningBg};
  --${prefix}-highlight:       ${v.highlight};`.trimStart();
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');`;

function buildLight() {
  const lv = tokens(lightTheme);
  const dv = tokens(darkTheme);

  return `/*!
 * @theme bold
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 *
 * Marp theme based on the Bold Design System by Laboratório Bridge / UFSC.
 * Not affiliated with Laboratório Bridge or UFSC.
 * https://bold.bridge.ufsc.tech/
 *
 * Generated from bold-ui@${boldVersion}
 * Run \`npm run build\` to regenerate from an updated bold-ui release.
 */

${FONT_IMPORT}

section {
  --bold-font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --bold-font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  ${vars(lightTheme, 'bold')}

  --bold-pad: 56px;
  --bold-rule: 4px;

  font-family: var(--bold-font-sans);
  font-size: 22px;
  line-height: 1.5;
  color: var(--bold-text);
  background: var(--bold-bg);
  padding: var(--bold-pad);
  padding-top: calc(var(--bold-pad) + var(--bold-rule));
  border-top: var(--bold-rule) solid var(--bold-accent);
  box-sizing: border-box;
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--bold-font-sans);
  font-weight: 700;
  line-height: 1.2;
  color: var(--bold-text);
  margin: 0 0 0.4em;
}

h1 { font-size: 2.4em; font-weight: 300; letter-spacing: -0.01em; }
h2 { font-size: 1.8em; font-weight: 700; }
h3 { font-size: 1.4em; font-weight: 600; }
h4 { font-size: 1.1em; font-weight: 600; }
h5, h6 {
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bold-accent);
  margin-bottom: 0.25em;
}

p, ul, ol {
  margin: 0 0 0.6em;
  font-size: 0.9em;
}

ul, ol { padding-left: 1.4em; }
li + li { margin-top: 0.25em; }
li > ul, li > ol { margin-top: 0.25em; margin-bottom: 0; }

strong { font-weight: 700; }
em { font-style: italic; }

a {
  color: var(--bold-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Blockquote */
blockquote {
  border-left: 3px solid var(--bold-accent);
  margin: 0.5em 0;
  padding: 0.3em 0 0.3em 1em;
  color: var(--bold-text-secondary);
  font-style: italic;
}
blockquote p { margin: 0; font-size: inherit; }

/* Code */
code {
  font-family: var(--bold-font-mono);
  font-size: 0.82em;
  background: var(--bold-layer);
  color: var(--bold-text);
  padding: 0.15em 0.35em;
  border-radius: 3px;
  border: 1px solid var(--bold-divider);
}

pre {
  background: var(--bold-layer);
  border: 1px solid var(--bold-divider);
  border-radius: 4px;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  overflow: hidden;
}
pre code {
  font-size: 0.78em;
  padding: 0;
  background: transparent;
  border: none;
  line-height: 1.55;
  white-space: pre;
}

/* Syntax highlight — mapped to Bold palette */
.hljs-keyword,
.hljs-selector-tag,
.hljs-built_in  { color: ${lv.accent}; font-weight: 600; }
.hljs-string,
.hljs-attr      { color: ${lightTheme.pallete.primary.c20}; }
.hljs-comment,
.hljs-quote     { color: ${lightTheme.pallete.status.success.main}; font-style: italic; }
.hljs-number,
.hljs-literal   { color: ${lightTheme.pallete.status.alert.main}; }
.hljs-title,
.hljs-function  { color: ${lightTheme.pallete.status.danger.main}; }
.hljs-type,
.hljs-class     { color: ${lightTheme.pallete.primary.c30}; }
.hljs-deletion  { color: ${lv.error}; }
.hljs-addition  { color: ${lv.success}; }

/* Tables */
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.85em;
  margin: 0.5em 0;
}
th {
  background: var(--bold-layer);
  color: var(--bold-text);
  font-weight: 600;
  text-align: left;
  padding: 0.5em 0.75em;
  border-bottom: 2px solid var(--bold-accent);
}
td {
  padding: 0.4em 0.75em;
  border-bottom: 1px solid var(--bold-divider);
}
tr:last-child td { border-bottom: none; }

/* Images — Marp canonical embedding (inline, ![bg], ![bg left/right]) */
img {
  max-width: 100%;
  height: auto;
  display: block;
}
p > img {
  border: 1px solid var(--bold-border);
}
p img + img { margin-left: 0.5em; }
figure { margin: 0.6em 0; }
figure img {
  display: block;
  border: 1px solid var(--bold-border);
}
figcaption {
  font-family: var(--bold-font-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--bold-text-secondary);
  margin-top: 0.5em;
  line-height: 1.4;
}

/* Mark / highlight */
mark {
  background: var(--bold-highlight);
  color: var(--bold-text);
  padding: 0 0.2em;
  border-radius: 2px;
}

/* Mermaid diagrams */
.mermaid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
}
.mermaid svg {
  max-width: 100%;
  height: auto;
  font-family: var(--bold-font-sans) !important;
}

/* Header / footer */
header, footer {
  position: absolute;
  left: var(--bold-pad);
  right: var(--bold-pad);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bold-text-disabled);
  font-family: var(--bold-font-sans);
  padding: 0;
  height: auto;
  line-height: 1.4;
}
header { top: 20px; }
footer { bottom: 20px; }

section::after {
  position: absolute;
  right: var(--bold-pad);
  bottom: 20px;
  left: auto;
  top: auto;
  width: auto;
  height: auto;
  padding: 0;
  font-family: var(--bold-font-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--bold-text-disabled);
}

/* ── Class variants ─────────────────────────────────────── */

/* lead: title slide */
section.lead {
  justify-content: center;
  border-top: none;
  border-left: var(--bold-rule) solid var(--bold-accent);
}
section.lead h1 {
  font-size: 3em;
  font-weight: 300;
  line-height: 1.1;
  max-width: 20ch;
  color: var(--bold-text);
}
section.lead h2 {
  font-size: 1.1em;
  font-weight: 400;
  color: var(--bold-text-secondary);
  margin-top: 0.5em;
}

/* split: two-column grid */
section.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 48px;
}
section.split h1,
section.split h2,
section.split h3 { grid-column: 1 / -1; }

/* dark / invert */
section.dark,
section.invert {
  ${vars(darkTheme, 'bold')}
  color-scheme: dark;
  border-top-color: var(--bold-accent);
}

section.dark.lead,
section.invert.lead {
  border-top: none;
  border-left-color: var(--bold-accent);
}

/* explicit light override inside a dark deck */
section.light {
  ${vars(lightTheme, 'bold')}
  color-scheme: light;
  border-top-color: var(--bold-accent);
}
`;
}

function buildDark() {
  const lv = tokens(lightTheme);
  const dv = tokens(darkTheme);

  return `/*!
 * @theme bold-dark
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 *
 * Marp theme based on the Bold Design System by Laboratório Bridge / UFSC.
 * Dark variant — Bold dark palette by default.
 * Not affiliated with Laboratório Bridge or UFSC.
 * https://bold.bridge.ufsc.tech/
 *
 * Generated from bold-ui@${boldVersion}
 * Run \`npm run build\` to regenerate from an updated bold-ui release.
 */

${FONT_IMPORT}

section {
  --bold-font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --bold-font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  ${vars(darkTheme, 'bold')}

  --bold-pad: 56px;
  --bold-rule: 4px;

  font-family: var(--bold-font-sans);
  font-size: 22px;
  line-height: 1.5;
  color: var(--bold-text);
  background: var(--bold-bg);
  padding: var(--bold-pad);
  padding-top: calc(var(--bold-pad) + var(--bold-rule));
  border-top: var(--bold-rule) solid var(--bold-accent);
  box-sizing: border-box;
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  color-scheme: dark;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--bold-font-sans);
  font-weight: 700;
  line-height: 1.2;
  color: var(--bold-text);
  margin: 0 0 0.4em;
}

h1 { font-size: 2.4em; font-weight: 300; letter-spacing: -0.01em; }
h2 { font-size: 1.8em; font-weight: 700; }
h3 { font-size: 1.4em; font-weight: 600; }
h4 { font-size: 1.1em; font-weight: 600; }
h5, h6 {
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bold-accent);
  margin-bottom: 0.25em;
}

p, ul, ol {
  margin: 0 0 0.6em;
  font-size: 0.9em;
}

ul, ol { padding-left: 1.4em; }
li + li { margin-top: 0.25em; }
li > ul, li > ol { margin-top: 0.25em; margin-bottom: 0; }

strong { font-weight: 700; }
em { font-style: italic; }

a {
  color: var(--bold-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

blockquote {
  border-left: 3px solid var(--bold-accent);
  margin: 0.5em 0;
  padding: 0.3em 0 0.3em 1em;
  color: var(--bold-text-secondary);
  font-style: italic;
}
blockquote p { margin: 0; font-size: inherit; }

code {
  font-family: var(--bold-font-mono);
  font-size: 0.82em;
  background: var(--bold-layer);
  color: var(--bold-text);
  padding: 0.15em 0.35em;
  border-radius: 3px;
  border: 1px solid var(--bold-divider);
}

pre {
  background: var(--bold-layer);
  border: 1px solid var(--bold-divider);
  border-radius: 4px;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  overflow: hidden;
}
pre code {
  font-size: 0.78em;
  padding: 0;
  background: transparent;
  border: none;
  line-height: 1.55;
  white-space: pre;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-built_in  { color: ${dv.accent}; font-weight: 600; }
.hljs-string,
.hljs-attr      { color: ${darkTheme.pallete.primary.c30}; }
.hljs-comment,
.hljs-quote     { color: ${darkTheme.pallete.status.success.main}; font-style: italic; }
.hljs-number,
.hljs-literal   { color: ${darkTheme.pallete.status.alert ? darkTheme.pallete.status.alert.main : '#FF8C54'}; }
.hljs-title,
.hljs-function  { color: ${darkTheme.pallete.status.danger.main}; }
.hljs-type,
.hljs-class     { color: ${darkTheme.pallete.primary.c40}; }
.hljs-deletion  { color: ${dv.error}; }
.hljs-addition  { color: ${dv.success}; }

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.85em;
  margin: 0.5em 0;
}
th {
  background: var(--bold-layer);
  color: var(--bold-text);
  font-weight: 600;
  text-align: left;
  padding: 0.5em 0.75em;
  border-bottom: 2px solid var(--bold-accent);
}
td {
  padding: 0.4em 0.75em;
  border-bottom: 1px solid var(--bold-divider);
}
tr:last-child td { border-bottom: none; }

/* Images — Marp canonical embedding (inline, ![bg], ![bg left/right]) */
img {
  max-width: 100%;
  height: auto;
  display: block;
}
p > img {
  border: 1px solid var(--bold-border);
}
p img + img { margin-left: 0.5em; }
figure { margin: 0.6em 0; }
figure img {
  display: block;
  border: 1px solid var(--bold-border);
}
figcaption {
  font-family: var(--bold-font-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--bold-text-secondary);
  margin-top: 0.5em;
  line-height: 1.4;
}

mark {
  background: var(--bold-highlight);
  color: var(--bold-text);
  padding: 0 0.2em;
  border-radius: 2px;
}

.mermaid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
}
.mermaid svg {
  max-width: 100%;
  height: auto;
  font-family: var(--bold-font-sans) !important;
}

header, footer {
  position: absolute;
  left: var(--bold-pad);
  right: var(--bold-pad);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bold-text-disabled);
  font-family: var(--bold-font-sans);
  padding: 0;
  height: auto;
  line-height: 1.4;
}
header { top: 20px; }
footer { bottom: 20px; }

section::after {
  position: absolute;
  right: var(--bold-pad);
  bottom: 20px;
  left: auto;
  top: auto;
  width: auto;
  height: auto;
  padding: 0;
  font-family: var(--bold-font-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--bold-text-disabled);
}

/* lead */
section.lead {
  justify-content: center;
  border-top: none;
  border-left: var(--bold-rule) solid var(--bold-accent);
}
section.lead h1 {
  font-size: 3em;
  font-weight: 300;
  line-height: 1.1;
  max-width: 20ch;
}
section.lead h2 {
  font-size: 1.1em;
  font-weight: 400;
  color: var(--bold-text-secondary);
  margin-top: 0.5em;
}

/* split */
section.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 48px;
}
section.split h1,
section.split h2,
section.split h3 { grid-column: 1 / -1; }

/* light override inside dark deck */
section.light {
  ${vars(lightTheme, 'bold')}
  color-scheme: light;
  border-top-color: var(--bold-accent);
}

section.light.lead {
  border-top: none;
  border-left-color: var(--bold-accent);
}
`;
}

const OUT = path.resolve(__dirname, '..', 'themes');
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'bold.css'), buildLight());
fs.writeFileSync(path.join(OUT, 'bold-dark.css'), buildDark());

console.log(`Generated themes/bold.css and themes/bold-dark.css from bold-ui@${boldVersion}`);
