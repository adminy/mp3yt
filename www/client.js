const $ = id => document.getElementById(id)
document.addEventListener('deviceready', function() {
  const log = $('status')
  log.innerHTML = 'device is ready'
  $('yt_url').onchange = function() {
    const val = this.value.trim()
    if(val) {
      window.fetchMP3(val, (...args) => log.innerHTML += args.join(' ') + '<br>', (url) => {
        cordova.plugins.disusered.open(url,
          () => {},
          code => {},
          progressEvent => log.innerHTML = (progressEvent.lengthComputable ? 'Opening ' + Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%' : 'Opening ...')
        )
      })
      this.value = ''
    }
  }
}, false)
