var pdfjs = require('./../pdfjs/pdf.js');
console.log('pdf?', pdfjs);
var loadingTask = pdfjs.getDocument('macbookair-ad.pdf');
loadingTask.promise.then(function (pdf) {
    console.log(pdf.page(1));
});
// Remember though that PDF.js uses promises, and the above will return a PDFDocumentLoadingTask instance that has a promise property which is resolved with the document object.
// var loadingTask = pdfjsLib.getDocument('helloworld.pdf');
// loadingTask.promise.then(function(pdf) {
//   // you can now use *pdf* here
// });
//# sourceMappingURL=pdf-service.js.map