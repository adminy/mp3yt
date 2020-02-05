const $ = id => document.getElementById(id)
document.addEventListener('deviceready', function() {
  function writeFile(fileEntry, dataObj, isAppend, whenDone) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            // readFile(fileEntry);
            whenDone()
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }
        fileWriter.write(dataObj);
    });
  }
  function createFile(dirEntry, fileName, isAppend, data, whenDone) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        writeFile(fileEntry, data, isAppend, whenDone);
    }, () => console.error('error loading fs 1'));
  }
  function putToFile(fileName, fileData, whenDone) {
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
    //   window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
    //     console.log('file system open: ' + dirEntry.name);
    //     var isAppend = true;
    //     createFile(dirEntry, "fileToAppend.txt", isAppend);
    // }, onErrorLoadFs);
      console.log('file system open: ' + fs.name);
      createFile(fs.root, fileName, false, fileData, () => whenDone(fs.root.name + fileName))
    }, () => console.error('error loading fs 2'))
  }
  const log = $('status')
  log.innerHTML = 'device is ready'
  $('yt_url').onchange = function() {
    const val = this.value.trim()
    if(val) {
      window.fetchMP3(val, (...args) => log.innerHTML += args.join(' ') + '<br>', (fileName, fileData) => {
        putToFile(fileName, new Blob([fileData], {type: 'audio/mpeg'}), path => {
          console.log('<<<<<< ' + path)
          cordova.plugins.disusered.open('file://'+path,
            () => {log.innerHTML += '<font color=green>Opened!</font><br>'},
            code => {log.innerHTML = 'Could not open file, ' + (code === 1 ? 'No file handler found' : 'Undefined error')},
            progressEvent => log.innerHTML += (progressEvent.lengthComputable ? 'Opening ' + Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%' : 'Opening ...')
          )
        })
      })
      this.value = ''
    }
  }
}, false)
