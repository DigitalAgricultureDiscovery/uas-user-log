module.exports = {
  clientLocation: function() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Unable to use geolocation services');
      }

      function success(position) {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(coords);
      }

      function error(error) {
        reject('ERROR(' + error.code + '): ' + error.message);
      }
      navigator.geolocation.getCurrentPosition(success, error);
    });
  }
}
