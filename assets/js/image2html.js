(function(window, document, undefined) {

var Image2HTML = function(){};

Image2HTML.prototype = {
  MAX_WORKERS: 4,

  OUTPUT_CLASSNAME: 'htmlized-image',

  convert: function(image, outputContainer) {
    var workers = [],
      imageParts = [],
      imageData, i, fragment, imageDataWidth, workerImageData;

    this.canvas = this.canvas || document.createElement('canvas');
    this.ctx = this.ctx || this.canvas.getContext('2d');

    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.ctx.drawImage(image,0,0);
    imageData = this.ctx.getImageData(0, 0, image.width, image.height).data;
    imageDataWidth = image.width * 4;

    fragment = document.createDocumentFragment();

    for(i = 0; i < this.MAX_WORKERS; i++) {
      imageParts[i] = document.createElement('ul');
      imageParts[i].className = this.OUTPUT_CLASSNAME;
      imageParts[i].style.listStyleType = 'none';
      imageParts[i].style.padding = 0;
      imageParts[i].style.margin = 0;
      fragment.appendChild(imageParts[i]);
    }

    for(i = 0; i < this.MAX_WORKERS; i++) {
      workers[i] = new Worker('/assets/js/htmlizer.js');
      workers[i].addEventListener('message', function(event) {
        var data = event.data;
        imageParts[data.sequence].innerHTML = data.imageHTML;
      }, false);

      workerImageData = Array.prototype.slice.call(imageData, i * imageData.length/this.MAX_WORKERS, (i + 1) * imageData.length/this.MAX_WORKERS);

      workers[i].postMessage({'sequence': i, 'imageDataWidth': imageDataWidth, 'imageData': workerImageData});
    }

    outputContainer.appendChild(fragment);
  }
};

window.Image2HTML = new Image2HTML();

}(window, document));


