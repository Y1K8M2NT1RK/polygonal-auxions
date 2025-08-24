#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

const file = path.join(__dirname, '..', 'src', 'pages', 'api', 'types', 'pothos.ts');
if (!fs.existsSync(file)) process.exit(0);
let src = fs.readFileSync(file, 'utf8');
src = src.replace(/from\s+"[^"]*@prisma\/client"\s*;/, 'from "@prisma/client";');
src = src.replace(/from\s+"\.\.\/node_modules\/\@prisma\/client"\s*;/, 'from "@prisma/client";');
fs.writeFileSync(file, src);
console.log('[fix] Rewrote Pothos import to @prisma/client');
