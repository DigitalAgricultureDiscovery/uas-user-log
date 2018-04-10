module.exports = {
  rgb: function() {
    return [
      {
        id: 1,
        make: 'Canon',
        model: 'S110',
        length: 1.06,  // inches
        width: 3.89,  // inches
        height: 2.32,  // inches
        lensType: '',
        weight: 6.1,  // ounces, camera only
        pixelCount: '12.1 Megapixel',  // effective pixels
        pixelPitch: null,
        url: 'https://www.usa.canon.com/internet/portal/us/home/products/details/cameras/point-and-shoot/advanced-cameras/powershot-s110',
      },
      {
        id: 2,
        make: 'Sony',
        model: 'A6000',
        length: 1.78,  // inches
        width: 4.72,  // inches
        height: 2.63,  // inches
        lensType: 'APS-C',
        weight: 10.05,  // ounces, camera only
        pixelCount: '24.3 Megapixel',  // effective pixels
        pixelPitch: null,
        url: 'https://www.sony.com/electronics/interchangeable-lens-cameras/ilce-6000-body-kit/specifications#specifications',
      },
      {
        id: 3,
        make: 'Canon',
        model: 'EOS Rebel T5i 18-55mm',
        length: 3.1,
        width: 5.2,
        height: 3.9,
        lensType: 'Canon EF lenses',
        weight: 18.5,  // ounces, camera only
        pixelCount: '18.0 Megapixel',  // effective pixels
        pixelPitch: '4.3 µm',
        url: 'https://www.usa.canon.com/internet/portal/us/home/products/details/cameras/dslr/eos-rebel-t5i-ef-s-18-55-is-stm-kit?'
      },
      {
        id: 4,
        make: 'Nikon',
        model: 'D5300',
        length: 3.0,  // inches
        width: 4.92,  // inches
        height: 3.9,  // inches
        lensType: 'AF-S and AF-I CPU',
        weight: 16.9,  // ounces, camera only
        pixelCount: '24.2 Megapixel',
        pixelPitch: null,
        url: 'https://www.nikonusa.com/en/nikon-products/product/dslr-cameras/d5300.html#tab-ProductDetail-ProductTabs-TechSpecs',
      },
      {
        id: 5,
        make: 'DJI',
        model: 'Zenmuse X5S',
        length: 5.2,  // inches
        width: 5.51,  // inches
        height: 3.86,  // inches
        lensType: 'DJI MFT 15mm/1.7 ASPH',
        weight: 16.3,  // ounces, lens kit
        pixelCount: '20.8 Megapixel',
        pixelPitch: null,
        url: 'https://www.dji.com/zenmuse-x5s/info#specs',
      },
    ];
  },
  multi: function() {
    return [
      {
        id: 1,
        make: 'MicaSense',
        model: 'RedEdge-M',
        length: 3.7,  // inches
        width: 2.5,   // inches
        height: 1.8,  // inches
        weight: 6,  // ounces
        bands: 5,
        gsd: 3.1,  // inches
        hfov: 47.2,  // degrees
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
        volt: '4.2 V DC - 15.6 V DC',
        watt: '4 W nominal, 8 W peak',
        url: 'https://www.micasense.com/rededge-m/',
      },
      {
        id: 2,
        make: 'Parrot',
        model: 'Sequoia',
        length: 2.3,  // inches
        width: 1.6,  // inches
        height: 1.1,  // inches
        weight: 2.5,  // ounces
        bands: 4,
        gsd: null,
        hfov: 63.9,  // degrees
        vfov: 50.1,  // degrees
        dfov: 73.5,  // degrees
        triggeringOptions: [],
        pixelSize: null,
        pixelDepth: null,
        frameRate: null,
        imageFormat: null,
        videoFormat: null,
        shutter: null,
        gain: null,
        volt: null,
        watt: '5 W (~12 W peak)',
        url: 'https://www.parrot.com/business-solutions-us/parrot-professional/parrot-sequoia#parrot-sequoia-details',
      },
      {
        id: 3,
        make: 'Tetracam',
        model: 'ADC',
        length: 4.8,  // inches
        width: 3.0,  // inches
        height: 1.6,  // inches
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
        volt: '+9 VDC to +12 VDC',
        watt: '2 W nominal',
        url: 'http://www.tetracam.com/Products-ADC.htm',
      }
    ];
  },
  hyper: function() {
    return [
      {
      }
    ];
  },
  thermal: function() {
    return [
      {
        id: 1,
        make: 'ICI',
        model: '8640 P-Series',
        length: 1.5,  // inches
        width: 1.5,  // inches
        height: 1.8,  // inches
        weight: 2.6,  // without batteries
        spectralBand: '7µm-14µm',
        frameRate: '30 Hz',
        imager: null,
        accuracy: null,
        sensorWidth: null,
        sensorHeight: null,
        lens: '12.5 mm Manual Focus Lens',
        visFOV: '50x37.5 FOV',
        visCameraWidth: null,
        visCameraHeight: null,
        volt: null,
        watt: null,
        url: 'https://www.coptersource.com/products/8640-p-series-usb-uav-thermal-imaging-infrared-camera',
      },
      {
        id: 2,
        make: 'FLIR',
        model: 'Vue',
        length: null,  // inches
        width: null,  // inches
        height: null,  // inches
        weight: null,  // without batteries
        spectralBand: '7.5µm-13.5µm',
        frameRate: '30 Hz (NTSC), 25 Hz (PAL)',
        imager: null,
        accuracy: null,
        sensorWidth: null,
        sensorHeight: null,
        lens: null,
        visFOV: null,
        visCameraWidth: null,
        visCameraHeight: null,
        volt: '4.8 - 6.0 VDC',
        watt: '1.2 W (2.2 W)',
        url: 'https://www.flir.com/support/products/vue',
      },
      {
        id: 3,
        make: 'FLIR',
        model: 'Tau 2',
        length: 1.75,  // inches compact
        width: 1.75,  // inches compact
        height: 1.18,  // inches compact
        spectralBand: '7.5µm-13.5µm',
        frameRate: '30/60 Hz (NTSC), 25/50 Hz (PAL)',
        imager: 'Uncooled VOx Microbolometer',
        accuracy: null,
        sensorWidth: null,
        sensorHeight: null,
        lens: null,
        visFOV: null,
        visCameraWidth: null,
        visCameraHeight: null,
        volt: '4.0 - 6.0 VDC',
        watt: '1.0 W approx.',
        url: 'https://www.flir.com/products/tau-2/',
      },
    ]
  }
}
