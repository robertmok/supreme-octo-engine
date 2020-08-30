module.exports = {
    launchOptions: {
      headless: true
    },
    contextOptions: {
      ignoreHTTPSErrors: true,
      // viewport: {
      //   width: 1920,
      //   height: 1080
      // }
    },
    browsers: ["chromium", "firefox", "webkit"],
    devices: [
      {
        // Name of device
        name: '1440',
        // Page width and height
        viewport: {
          width: 1440,
          height: 900
        },
        // device scale factor
        deviceScaleFactor: 1,
        // is device is mobile
        isMobile: false,
        // support of touch events
        hasTouch: false
      },
      // {
      //   // Name of device
      //   name: '1280',
      //   // Page width and height
      //   viewport: {
      //     width: 1280,
      //     height: 720
      //   },
      //   // device scale factor
      //   deviceScaleFactor: 1,
      //   // is device is mobile
      //   isMobile: false,
      //   // support of touch events
      //   hasTouch: false
      // },
      // {
      //   // Name of device
      //   name: 'Tablet',
      //   // Page width and height
      //   viewport: {
      //     width: 768,
      //     height: 1024
      //   },
      //   // device scale factor
      //   deviceScaleFactor: 1,
      //   // is device is mobile
      //   isMobile: false,
      //   // support of touch events
      //   hasTouch: true
      // }
    ]
  }