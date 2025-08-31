/**
 * Test script to manually verify password reset condition logic
 * Run with: ts-node --compiler-options '{"module":"CommonJS"}' scripts/test-password-reset-conditions.ts
 */

// Mock Next.js environment for testing
process.env.NEXT_PUBLIC_APP_ENV = process.env.APP_ENV || 'development';
process.env.NEXT_PUBLIC_EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'smtp';
process.env.NEXT_PUBLIC_RESEND_FROM = process.env.RESEND_FROM || '';

import { shouldShowPasswordReset } from '../src/utils/passwordResetConditions';

function testConditions() {
  console.log('=== Password Reset Condition Test ===\n');
  
  console.log('Current Environment Variables:');
  console.log(`  NEXT_PUBLIC_APP_ENV: ${process.env.NEXT_PUBLIC_APP_ENV}`);
  console.log(`  NEXT_PUBLIC_EMAIL_PROVIDER: ${process.env.NEXT_PUBLIC_EMAIL_PROVIDER}`);
  console.log(`  NEXT_PUBLIC_RESEND_FROM: ${process.env.NEXT_PUBLIC_RESEND_FROM}`);
  console.log('');
  
  const result = shouldShowPasswordReset();
  console.log(`Password Reset Button should be: ${result ? 'VISIBLE' : 'HIDDEN'}`);
  console.log('');
  
  console.log('Visibility conditions:');
  console.log('  - Development: Always visible');
  console.log('  - Production/Staging: All conditions must be met:');
  console.log('    1. APP_ENV must be "production" or "staging"');
  console.log('    2. EMAIL_PROVIDER must be "resend"');
  console.log('    3. RESEND_FROM must be empty');
  console.log('');

  // Test different scenarios
  console.log('=== Testing Different Scenarios ===\n');
  
  const testCases = [
    {
      name: "Production + Resend + Empty RESEND_FROM",
      env: { APP_ENV: 'production', EMAIL_PROVIDER: 'resend', RESEND_FROM: '' },
      expected: true
    },
    {
      name: "Staging + Resend + Empty RESEND_FROM", 
      env: { APP_ENV: 'staging', EMAIL_PROVIDER: 'resend', RESEND_FROM: '' },
      expected: true
    },
    {
      name: "Development + Resend + Empty RESEND_FROM",
      env: { APP_ENV: 'development', EMAIL_PROVIDER: 'resend', RESEND_FROM: '' },
      expected: true
    },
    {
      name: "Development + SMTP + Non-empty RESEND_FROM (should still show)",
      env: { APP_ENV: 'development', EMAIL_PROVIDER: 'smtp', RESEND_FROM: 'test@example.com' },
      expected: true
    },
    {
      name: "Production + SMTP + Empty RESEND_FROM",
      env: { APP_ENV: 'production', EMAIL_PROVIDER: 'smtp', RESEND_FROM: '' },
      expected: false
    },
    {
      name: "Production + Resend + Non-empty RESEND_FROM",
      env: { APP_ENV: 'production', EMAIL_PROVIDER: 'resend', RESEND_FROM: 'test@example.com' },
      expected: false
    }
  ];

  testCases.forEach((testCase, index) => {
    // Backup current env
    const backup = {
      APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
      EMAIL_PROVIDER: process.env.NEXT_PUBLIC_EMAIL_PROVIDER,
      RESEND_FROM: process.env.NEXT_PUBLIC_RESEND_FROM
    };

    // Set test environment
    process.env.NEXT_PUBLIC_APP_ENV = testCase.env.APP_ENV;
    process.env.NEXT_PUBLIC_EMAIL_PROVIDER = testCase.env.EMAIL_PROVIDER;
    process.env.NEXT_PUBLIC_RESEND_FROM = testCase.env.RESEND_FROM;

    const result = shouldShowPasswordReset();
    const passed = result === testCase.expected;

    console.log(`${index + 1}. ${testCase.name}`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result} ${passed ? '✅' : '❌'}`);

    // Restore environment
    process.env.NEXT_PUBLIC_APP_ENV = backup.APP_ENV;
    process.env.NEXT_PUBLIC_EMAIL_PROVIDER = backup.EMAIL_PROVIDER;
    process.env.NEXT_PUBLIC_RESEND_FROM = backup.RESEND_FROM;
  });
}

testConditions();