importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
  // The most verbose - displays all logs.
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  // Queue failed /api/save requests
  const bgSyncPlugin = new workbox.backgroundSync.Plugin('communitySensorQueue', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 hours
  });

  // Queue /api/save requests if offline
  workbox.routing.registerRoute(
    '/api/save',
    workbox.strategies.networkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  );
} else {
  console.log(`Unable to load Workbox - background sync will not work.`);
}
