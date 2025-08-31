/**
 * Utility function to check if password reset functionality should be available
 * based on the specific conditions required for production/staging environments
 */

/**
 * Check if password reset should be available based on environmental conditions:
 * - Development: Always show password reset button
 * - Production/Staging: Show only when all conditions are met:
 *   1. RESEND_FROM is empty
 *   2. Environment is production or staging
 *   3. Email provider is Resend
 */
export function shouldShowPasswordReset(): boolean {
  // Get environment variables from process.env (client-side accessible ones)
  // In Next.js, client-side environment variables must be prefixed with NEXT_PUBLIC_
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'development';
  
  // In development environment, always show password reset for easier testing
  if (appEnv === 'development') {
    return true;
  }
  
  // For production/staging, apply the conditional logic
  const emailProvider = process.env.NEXT_PUBLIC_EMAIL_PROVIDER;
  const resendFrom = process.env.NEXT_PUBLIC_RESEND_FROM;

  // Condition 1: RESEND_FROM must be empty or undefined
  const isResendFromEmpty = !resendFrom || resendFrom.trim() === '';

  // Condition 2: Environment must be production or staging
  const isProductionOrStaging = appEnv === 'production' || appEnv === 'staging';

  // Condition 3: Provider must be Resend
  const isResendProvider = emailProvider === 'resend';

  // All three conditions must be met for production/staging
  return isResendFromEmpty && isProductionOrStaging && isResendProvider;
}