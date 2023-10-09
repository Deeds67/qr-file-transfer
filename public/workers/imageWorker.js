importScripts('jsQR.js');

this.sent = new Set();
this.onmessage = function (event) {
  // console.log('Worker data received ', event.data);
  //  var array = new Uint8ClampedArray(event.data.imageArray);
  //  var image = new ImageData(event.data.data, event.data.width, event.data.height);
  try {
    var code = jsQR(event.data.data, event.data.width, event.data.height, {
      inversionAttempts: "dontInvert",
    });
    // array = null;
    image = null;
    if (code) {
      console.log('Worker recognized data ', code.data);
      var codeId = code.data.slice(0, 7);
      if (!(this.sent.has(codeId))) {
        this.postMessage(code.data);
        this.sent.add(codeId);
      }
    }
  }
  catch (ex) {
    console.log('ERROR', ex);
    // self.close();
  }
};