/**
 * Check if the application is running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if admin features should be available
 * Only available in development environment
 */
export function isAdminAvailable(): boolean {
  return isDevelopment();
}

/**
 * Admin route guard - redirects to home if not in development
 */
export function requireDevelopment() {
  if (!isDevelopment()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return false;
  }
  return true;
}
