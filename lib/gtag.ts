'use client'

/**
 * Compatibility proxy forwarding all tracking calls to Umami
 */
export * from './umami'
export { UmamiAnalyticsTracker as GoogleAnalyticsTracker } from './umami'
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
