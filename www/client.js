const $ = id => document.getElementById(id)
document.addEventListener('deviceready', function() {
    //   window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
    //     console.log('file system open: ' + dirEntry.name);
    //     var isAppend = true;
    //     createFile(dirEntry, "fileToAppend.txt", isAppend);
    // }, onErrorLoadFs);

  function putToFile(fileName, fileData, whenDone) {
    const totalSize = 8 * 1024 * 1024
    const filePerms = {create: true, exclusive: false}
    const error1 = () => console.error('error loading fs 1')
    const error2 =  () => console.error('error loading fs 2')
    const error3 = e => console.log("Failed file write: " + e.toString())

    window.requestFileSystem(window.TEMPORARY, totalSize, fs => {
      console.log('file system open: ' + fs.name)
      fs.root.getFile(fileName, filePerms, fileEntry => {
        fileEntry.createWriter(fileWriter => {
          fileWriter.onerror = error3
          fileWriter.onwriteend = () => !console.log("Successful file write...") && whenDone(fileEntry.nativeURL) // readFile(fileEntry)
          fileWriter.write(new Blob([fileData], {type: 'audio/mpeg'}))
        })
      }, error2)
    }, error1)
  }
  const log = $('status')
  log.innerHTML = 'device is ready<br>'
  $('yt_url').onchange = function() {
    const val = this.value.trim()
    if(val) {
      window.fetchMP3(val, (...args) => log.innerHTML += args.join(' ') + '<br>', (fileName, fileData) => {
        putToFile(fileName, fileData, url => {
          // console.log('<<<<<< ' + url)
          cordova.plugins.disusered.open(url,
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
