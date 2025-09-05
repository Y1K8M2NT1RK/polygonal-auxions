#!/usr/bin/env node
// Lightweight JS version (faster than ts-node) to normalize pothos generated import path
const fs = require('fs');
const path = require('path');

const candidatePaths = [
  path.join(process.cwd(), 'src', 'server', 'graphql', 'types', 'pothos.ts'),
  path.join(process.cwd(), 'src', 'pages', 'api', 'types', 'pothos.ts'),
];

let changed = false;
for (const file of candidatePaths) {
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  const replaced = src
    .replace(/from\s+"\\\/app\\\/node_modules\\\/@prisma\\\/client"/g, 'from "@prisma/client"')
    .replace(/from\s+"[^"']*@prisma\/client"\s*;/g, 'from "@prisma/client";')
    .replace(/from\s+"\.\.\/node_modules\/@prisma\/client"\s*;/g, 'from "@prisma/client";');
  if (replaced !== src) {
    fs.writeFileSync(file, replaced);
    console.log('[fix] Rewrote Pothos import in', file);
    changed = true;
  }
}
if (!changed) console.log('[fix] No pothos import changes needed');
