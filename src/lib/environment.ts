/**
 * Check if the application is running in development mode
 * Safe for both client and server environments
 */
export function isDevelopment(): boolean {
  // In static export mode, we need to check for client-side indicators
  if (typeof window !== 'undefined') {
    // Client-side check - development typically runs on localhost
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('localhost');
  }
  
  // Server-side check
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if admin features should be available
 * Only available in development environment
 */
export function isAdminAvailable(): boolean {
  try {
    return isDevelopment();
  } catch (error) {
    // If environment check fails, default to false for security
    console.warn('Environment check failed:', error);
    return false;
  }
}

/**
 * Admin route guard - redirects to home if not in development
 */
export function requireDevelopment() {
  try {
    if (!isDevelopment()) {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Development check failed:', error);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return false;
  }
}
