(function(window, document, undefined) {

var Image2HTML = function(){};

Image2HTML.prototype = {
  OUTPUT_CLASSNAME: 'htmlized-image',

  convert: function(image, outputContainer) {
    var imageData, i, r, g, b, a, tmpPixel, fragment, pixelDataWidth, pixelTemplate;

    this.canvas = this.canvas || document.createElement('canvas');
    this.ctx = this.ctx || this.canvas.getContext('2d');

    this.ctx.drawImage(image,0,0);
    imageData = this.ctx.getImageData(0, 0, image.width, image.height).data;
    pixelDataWidth = image.width * 4;

    fragment = document.createDocumentFragment();

    this.htmlizedImage = document.createElement('ul');
    this.htmlizedImage.className = this.OUTPUT_CLASSNAME;
    this.htmlizedImage.style.listStyleType = 'none';
    this.htmlizedImage.style.padding = 0;
    this.htmlizedImage.style.margin = 0;
    fragment.appendChild(this.htmlizedImage);

    pixelTemplate = document.createElement('li');
    pixelTemplate.style.float = 'left';
    pixelTemplate.style.width = '1px';
    pixelTemplate.style.height = '1px';

    for(i = 0; i < imageData.length; i += 4) {
      r = imageData[i];
      g = imageData[i + 1];
      b = imageData[i + 2];
      a = imageData[i + 3];

      tmpPixel = pixelTemplate.cloneNode(false);
      tmpPixel.style.backgroundColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

      if( i % pixelDataWidth === 0) {
        tmpPixel.style.clear = 'both';
      }

      this.htmlizedImage.appendChild(tmpPixel);
    }

    outputContainer.appendChild(fragment);
  }
};

window.Image2HTML = new Image2HTML();

}(window, document));


