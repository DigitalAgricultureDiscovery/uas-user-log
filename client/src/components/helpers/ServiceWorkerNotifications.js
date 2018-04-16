import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export const ServiceWorkerRegistered = () => (
  <Snackbar
    open={true}
    message="Offline access is ready"
    autoHideDuration={5000}
  />
);

export const ServiceWorkerUpdated = () => (
  <Snackbar
    open={true}
    message="Update available. Please refresh."
    autoHideDuration={5000}
  />
);

export const ServiceWorkerError = () => (
  <Snackbar
    open={true}
    message="An error has occurred. Offline access may not be available."
    autoHideDuration={5000}
  />
);
