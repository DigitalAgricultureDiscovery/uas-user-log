module.exports = {
  rgb: function() {
    return [
      {
        id: 1,
        make: 'Canon',
        model: 'EOS Rebel T5i 18-55mm',
        width: 5.2,  // in
        height: 3.9,  // in
        depth: 3.1,  // in
        lensType: 'Canon EF lenses',
        weight: 18.5,  // oz, camera only
        pixelCount: '18.0 Megapixel',  // effective pixels
        pixelPitch: '4.3 µm',
        url: 'https://www.usa.canon.com/internet/portal/us/home/products/details/cameras/dslr/eos-rebel-t5i-ef-s-18-55-is-stm-kit?'
      },
      {
        id: 2,
        make: 'Canon',
        model: 'S110',
        width: 3.89,  // in
        height: 2.32,  // in
        depth: 1.06,  // in
        lensType: '',
        weight: 6.1,  // oz, camera only
        pixelCount: '12.1 Megapixel',  // effective pixels
        pixelPitch: null,
        url: 'https://www.usa.canon.com/internet/portal/us/home/products/details/cameras/point-and-shoot/advanced-cameras/powershot-s110',
      },
      {
        id: 3,
        make: 'DJI',
        model: 'Zenmuse X5S',
        width: 5.51,  // in
        height: 3.86,  // in
        depth: 5.2,  // in
        lensType: 'DJI MFT 15mm/1.7 ASPH',
        weight: 16.3,  // oz, lens kit
        pixelCount: '20.8 Megapixel',
        pixelPitch: null,
        url: 'https://www.dji.com/zenmuse-x5s/info#specs',
      },
      {
        id: 4,
        make: 'Nikon',
        model: 'D5300',
        width: 4.92,  // in
        height: 3.9,  // in
        depth: 3.0,  // in
        lensType: 'AF-S and AF-I CPU',
        weight: 16.9,  // oz, camera only
        pixelCount: '24.2 Megapixel',
        pixelPitch: null,
        url: 'https://www.nikonusa.com/en/nikon-products/product/dslr-cameras/d5300.html#tab-ProductDetail-ProductTabs-TechSpecs',
      },
      {
        id: 5,
        make: 'Sony',
        model: 'A6000',
        width: 4.72,  // in
        height: 2.63,  // in
        depth: 1.78,  // in
        lensType: 'APS-C',
        weight: 10.05,  // oz, camera only
        pixelCount: '24.3 Megapixel',  // effective pixels
        pixelPitch: null,
        url: 'https://www.sony.com/electronics/interchangeable-lens-cameras/ilce-6000-body-kit/specifications#specifications',
      },
    ];
  },
  multi: function() {
    return [
      {
        id: 1,
        make: 'MicaSense',
        model: 'RedEdge-M',
        width: 3.7,  // in
        height: 2.5,   // in
        depth: 1.8,  // in
        weight: 6,  // oz
        bands: 5,
        gsd: 3.1,  // in
        hfov: 47.2,  // deg
        triggeringOptions: [
          'Timer mode',
          'overlap mode',
          'external trigger mode (PWM, GPIO, serial, and Ethernet options)',
          'manual capture mode'
        ],
        pixelSize: null,
        pixelDepth: null,
        frameRate: null,
        imageFormat: null,
        videoFormat: null,
        shutter: null,
        gain: null,
        voltage: '4.2 V DC - 15.6 V DC',
        power: '4 W nominal, 8 W peak',
        url: 'https://www.micasense.com/rededge-m/',
      },
      {
        id: 2,
        make: 'Parrot',
        model: 'Sequoia',
        width: 2.32,  // in
        height: 1.61,  // in
        depth: 1.1,  // in
        weight: 2.5,  // oz
        bands: 4,
        gsd: null,
        hfov: 63.9,  // deg
        vfov: 50.1,  // deg
        dfov: 73.5,  // deg
        triggeringOptions: [],
        pixelSize: null,
        pixelDepth: null,
        frameRate: null,
        imageFormat: null,
        videoFormat: null,
        shutter: null,
        gain: null,
        voltage: null,
        power: '5 W (~12 W peak)',
        url: 'https://www.parrot.com/business-solutions-us/parrot-professional/parrot-sequoia#parrot-sequoia-details',
      },
      {
        id: 3,
        make: 'Tetracam',
        model: 'ADC',
        width: 4.8,  // in
        height: 3.0,  // in
        depth: 1.6,  // in
        weight: 12,  // without batteries
        bands: 3,  // red, green, nir
        gsd: null,
        hfov: null,
        triggeringOptions: [
          'shutter release',
          'auto-timer',
          'computer triggering',
          'optional remote shutter release',
          'RS-232 triggering',
        ],
        pixelSize: null,
        pixelDepth: null,
        frameRate: null,
        imageFormat: 'Tetracam 10 bit DCM lossless, 8 bit RAW, and 10 bit RAW formats',
        videoFormat: 'PAL or NTSC',
        shutter: null,
        gain: null,
        voltage: '+9 VDC to +12 VDC',
        power: '2 W nominal',
        url: 'http://www.tetracam.com/Products-ADC.htm',
      }
    ];
  },
  hyper: function() {
    return [
      {
        id: 1,
        make: 'Headwall',
        model: 'VNIR E-Series',
        weight: null,
        spatialBands: 1600,
        spectralBands: 369,
        spectralRange: '400 - 1000 nm',
        operationMode: null,
        frameRate: '250 Hz',
        dispersion: '1.6 nm',
        fwhm: '5 nm',
        lens: null,
        storage: 'Full CameraLink, 80-bit',
        interface: null,
        sizeMinusGPS: null,
        weightMinusLens: 49.6,  // oz
      },
      {
        id: 2,
        make: 'Resonon',
        model: 'Pika L',
        weight: 20.8,  // oz, imager only
        spatialBands: 249,  // no. channels
        spectralBands: 281,  // no. channels
        spectralRange: '400 - 1000 nm',
        operationMode: null,
        frameRate: '249 fps',
        dispersion: null,
        fwhm: null,
        lens: null,
        storage: null,
        interface: null,
        sizeMinusGPS: null,
        weightMinusLens: null,
        url: 'https://resonon.com/data-sheets/ResononHyperspectralAirborne.Datasheet.pdf',
      },
    ];
  },
  lidar: function() {
    return [
      {
        id: 1,
        make: 'Velodyne',
        model: 'VLP-16',
        weight:  1.83,  // lb
        hfov: '360',  // deg
        vfov: '+-15',  // deg
        minRange: null,
        maxRange: 328.08,  // ft
        distResolution: null,
        scanRate: null,
        angResolution: null,
        voltage: null,
        power: null,
        url: 'http://velodynelidar.com/vlp-16.html',
      }
    ]
  },
  thermal: function() {
    return [
      {
        id: 1,
        make: 'FLIR',
        model: 'Tau 2',
        width: 1.75,  // in compact
        height: 1.75,  // in compact
        depth: 1.18,  // in compact
        spectralBand: '7.5µm-13.5µm',
        frameRate: '30/60 Hz (NTSC), 25/50 Hz (PAL)',
        imager: 'Uncooled VOx Microbolometer',
        accuracy: null,
        lens: null,
        fov: null,
        voltage: '4.0 - 6.0 VDC',
        power: '1.0 W approx.',
        url: 'https://www.flir.com/products/tau-2/',
      },
      {
        id: 2,
        make: 'FLIR',
        model: 'Vue',
        width: null,  // in
        height: null,  // in
        depth: null,  // in
        weight: null,  // without batteries
        spectralBand: '7.5µm-13.5µm',
        frameRate: '30 Hz (NTSC), 25 Hz (PAL)',
        imager: null,
        accuracy: null,
        lens: null,
        fov: null,
        voltage: '4.8 - 6.0 VDC',
        power: '1.2 W (2.2 W)',
        url: 'https://www.flir.com/support/products/vue',
      },
      {
        id: 3,
        make: 'ICI',
        model: '8640 P-Series',
        width: 1.77,  // in
        height: 1.54,  // in
        depth: 1.5,  // in
        weight: 2.6,  // without batteries
        spectralBand: '7µm-14µm',
        frameRate: '30 Hz',
        imager: null,
        accuracy: null,
        lens: '12.5 mm Manual Focus Lens',
        fov: '50x37.5 FOV',
        voltage: null,
        power: null,
        url: 'https://www.coptersource.com/products/8640-p-series-usb-uav-thermal-imaging-infrared-camera',
      },
    ]
  }
}
