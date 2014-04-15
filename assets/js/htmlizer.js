self.addEventListener('message', function(e) {
  var data = e.data,
   html = '',
   imageData = data.imageData,
   pixelStart = '<li style="float:left;width:1px;height:1px;background-color:rgba(',
   pixelEnd = '"></li>',
   i, r, g, b, a;

  for(i = 0; i < imageData.length; i += 4) {
    r = imageData[i];
    g = imageData[i + 1];
    b = imageData[i + 2];
    a = imageData[i + 3];

    if( i % data.imageDataWidth === 0) {
      html += (pixelStart + r + ',' + g + ',' + b + ',' + a + '); clear: both;' + pixelEnd);
    } else {
      html += (pixelStart + r + ',' + g + ',' + b + ',' + a + ');' + pixelEnd);
    }
  }

  self.postMessage({'sequence': data.sequence, 'imageHTML': html});
}, false);