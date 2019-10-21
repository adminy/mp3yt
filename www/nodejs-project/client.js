const $ = id => document.getElementById(id)

// ffmpeg.exec("-version", success => alert(success), failure => alert(failure))
let isFileOpened = false, finalFile = ''

document.addEventListener('deviceready', function() {
  $('status').innerHTML = 'device is ready'
  const open = cordova.plugins.disusered.open
  nodejs.start('server.js', function startupCallback(err) {
    if (err) $('status').innerHTML = `<font color=red>${err}</font>`
    else {
      $('status').innerHTML = 'nodejs started'
      //on enter tell nodejs to do work
      $('yt_url').onchange = function() {
        const val = this.value.trim()
        if(val) {
          nodejs.channel.post('fetchMP3', this.value)
          this.value = ''
        }
      }
      
      //listen for nodejs ready events
      nodejs.channel.on('ready', function(data) {
        const {counter, videoFile, imgFile, title, ytCode, CACHE_DIR } = JSON.parse(data)
        $('status').innerHTML = `Requested ${counter} times from youtbe<br><img src='https://img.youtube.com/vi/${ytCode}/hqdefault.jpg'>`
        const mp3Out = `${CACHE_DIR}/${ytCode}.mp3`
        ffmpeg.exec(`-i ${videoFile} -vn -sn ${mp3Out}`, s => {
          $('status').innerHTML = 'converted video to audio with success'
          finalFile = `${CACHE_DIR}/${title}.mp3`
          ffmpeg.exec(`-i ${mp3Out} -i ${imgFile} -c:a copy -map 0 -map 1 -f mp3 ${finalFile}`, s => {
            nodejs.channel.post('cleanup', JSON.stringify([videoFile, imgFile, mp3Out]))
            $('status').innerHTML = 'added thumbnail to audio<br>...<br>Opening ' + title
            open(`file:${CACHE_DIR}/${title}.mp3`,
              () => { isFileOpened = true; $('status').innerHTML = `File ${title}.mp3 opened` },
              (code) => $('status').innerHTML = 'Could not open file, ' + (code === 1 ? 'No file handler found' : 'Undefined error'),
              progressEvent => $('status').innerHTML = (progressEvent.lengthComputable) ? 'Opening ' + Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%' : 'Opening ...'
            )


          }, f => $('status').innerHTML = f)

        }, f => $('status').innerHTML = f)

      })
      //listen for nodejs status events
      nodejs.channel.on('status', function(status) {
        $('status').innerHTML = status
      })
      // init nodejs stuff
      nodejs.channel.post('init', cordova.file.dataDirectory.slice(7))

    }
  })
  document.addEventListener("resume", () => {
    if(isFileOpened) {
      isFileOpened = false
      nodejs.channel.post('cleanup', JSON.stringify([finalFile]))
    }
  }, false);

}, false)