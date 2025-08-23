#!/usr/bin/env node

/**
 * Email testing CLI tool
 * Usage:
 *   node scripts/email/test-email.js --to user@example.com --type welcome --name "Test User" --handle testuser
 *   node scripts/email/test-email.js --to user@example.com --type test --subject "Test Email" --content "This is a test email"
 */

const path = require('path');
const { execSync } = require('child_process');

// Set up TypeScript compilation for this script
const tsConfigPath = path.resolve(__dirname, '../../tsconfig.json');
const scriptPath = path.resolve(__dirname, 'test-email.ts');

try {
  // Compile and execute the TypeScript version
  const command = `npx ts-node --project "${tsConfigPath}" --transpile-only "${scriptPath}" ${process.argv.slice(2).join(' ')}`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to execute email test script:', error.message);
  process.exit(1);
}