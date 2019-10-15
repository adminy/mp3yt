const $ = id => document.getElementById(id)
document.addEventListener('deviceready', function() {
  nodejs.start('server.js', function startupCallback(err) {
    if (err) console.error(err)
    else {
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
          $('data').innerHTML = data
      })
      //listen for nodejs status events
      nodejs.channel.on('status', function(status) {
        $('status').innerHTML = status
      })

    }
  })


}, false)