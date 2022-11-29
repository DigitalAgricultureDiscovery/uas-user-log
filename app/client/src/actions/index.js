export const setServiceWorkerStatus = status => ({
  type: 'SET_SERVICE_WORKER_STATUS',
  status,
});

export const ServiceWorkerStatuses = {
  REGISTERED: 'REGISTERED',
  UPDATED: 'UPDATED',
  ERROR: 'ERROR',
  UNREGISTERED: 'UNREGISTERED',
};
