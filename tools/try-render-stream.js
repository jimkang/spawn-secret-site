var phantom = require('phantom-render-stream');
var fs = require('fs');

var urls = [
  process.argv[2],
  process.argv[3]
];
var urlIndex = -1;

var outfilename = process.argv[4];

var writeStream = fs.createWriteStream(outfilename);

var render = phantom({
  format: 'pdf'
});

function writeToFile(chunk) {
  writeStream.write(chunk);
}

function renderNext() {
  urlIndex += 1;
  if (urlIndex < urls.length) {
    render(urls[urlIndex])
      .on('data', writeToFile)
      .on('end', renderNext);
  }
  else {
    writeStream.end();
  }
}

renderNext();
