#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

// Support both legacy location (src/pages/api/types) and new location (src/server/graphql/types)
const candidatePaths = [
	path.join(__dirname, '..', 'src', 'server', 'graphql', 'types', 'pothos.ts'),
	path.join(__dirname, '..', 'src', 'pages', 'api', 'types', 'pothos.ts'),
];

let updated = false;
for (const file of candidatePaths) {
	if (!fs.existsSync(file)) continue;
	let src = fs.readFileSync(file, 'utf8');
		const replaced = src
			// Absolute container path produced in some environments
			.replace(/from\s+"\\\/app\\\/node_modules\\\/@prisma\\\/client"/g, 'from "@prisma/client"')
			// Generic any path ending with @prisma/client
			.replace(/from\s+"[^"']*@prisma\/client"\s*;/g, 'from "@prisma/client";')
			// Relative node_modules traversal
			.replace(/from\s+"\.\.\/node_modules\/@prisma\/client"\s*;/g, 'from "@prisma/client";');
	if (replaced !== src) {
		fs.writeFileSync(file, replaced);
		console.log('[fix] Rewrote Pothos import to @prisma/client at', file);
		updated = true;
	}
}
if (!updated) console.log('[fix] No pothos.ts import rewrite needed');
