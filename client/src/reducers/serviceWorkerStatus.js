const serviceWorkerStatus = (state = 'UNREGISTERED', action) => {
  switch (action.type) {
    case 'SET_SERVICE_WORKER_STATUS':
      return action.status;
    default:
      return state;
  }
}

export default serviceWorkerStatus;
