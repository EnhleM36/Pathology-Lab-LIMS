import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
    
    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Release tracking
    release: process.env.REACT_APP_VERSION,
    
    // User context
    beforeSend(event) {
      // Don't send events in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Sentry Event:', event);
        return null;
      }
      return event;
    },
    
    // Filter out irrelevant errors
    ignoreErrors: [
      'Network Error',
      'ChunkLoadError',
      'Loading chunk',
      'ResizeObserver loop limit exceeded'
    ]
  });
};

// Custom error boundary component
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Manual error reporting
export const reportError = (error, context = {}) => {
  Sentry.withScope((scope) => {
    Object.keys(context).forEach(key => {
      scope.setTag(key, context[key]);
    });
    Sentry.captureException(error);
  });
};

// Performance monitoring
export const startTransaction = (name, operation = 'navigation') => {
  return Sentry.startTransaction({ name, op: operation });
};