const ytdl = require('ytdl-core')
const stream = require('stream-browserify')
const ffmpeg = require('./dist/ffmpeg')
const miniget = require('miniget')
class Stream extends stream.Writable {
    constructor() {
        super()
        this.data = Buffer.alloc(0)
    }
    _write(chunk, enc, next) {
        this.data = Buffer.concat([this.data, chunk])
        next()
    }
    end() {
        this.callback(this.data)
    }
    onEnd(cb) {
        this.callback = cb
        return this
    }
}
const extractYoutubeCode = urlString => {
    const tmp = urlString.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)
    const ytCode = tmp && tmp.length > 0 ? tmp[1] : urlString
    return ytCode
}
const whiteListedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
const cleanString = str => str.replace(/ /g, '-').split('')
    .map(c => whiteListedChars.indexOf(c) !== -1 ?  c : '')
    .join('')
// ----
const downloadYtImg = (ytCode, finishedCallback) => {
    const url = `https://img.youtube.com/vi/${ytCode}/hqdefault.jpg`
    miniget(url).pipe(new Stream().onEnd(finishedCallback))
}
const downloadYtVideo = (info, finishedCallback) =>
    ytdl.downloadFromInfo(info).pipe(new Stream().onEnd(finishedCallback))

const ytInfo = (ytCode, finishedCallback) => {
    const youtubeVideoURL = 'http://www.youtube.com/watch?v='
    const ytURL = youtubeVideoURL + ytCode
    ytdl.getInfo(ytURL, (err, songInfo) => err ?  console.log(err) : finishedCallback(songInfo))
}

const fetchMP3 = (str, log, whenDone) => {
    const ytCode = extractYoutubeCode(str)
    ytInfo(ytCode, info => {
        const title = cleanString(info.title)
        const duration = info.length_seconds
        log(`Fetched info - title: ${title} Duration: ${duration}`) //<br><img src='https://img.youtube.com/vi/${ytCode}/hqdefault.jpg'>`)
        downloadYtVideo(info, videoData => {
            log('Downloaded video ...')
            downloadYtImg(ytCode, imageData => {
                log('Downloaded image ...')
                
                videoName = `${ytCode}.avi`
                imageName = `${ytCode}.jpg`
                audioName = `${ytCode}.mp3`
                finalName = `${title}.mp3`
                //
                MEMFS = [{name: videoName, data: new Uint8Array(videoData)}]
                out = ffmpeg({ MEMFS, arguments: `-i ${videoName} -vn -sn -c:a libmp3lame ${audioName}`.split(' '), stdin: () => {}})
                log('converted video to audio with success')
                out.MEMFS.push({name: imageName, data: new Uint8Array(imageData)})
                out = ffmpeg({ MEMFS: out.MEMFS, arguments: `-i ${audioName} -i ${imageName} -map 0 -map 1 -c copy -id3v2_version 3 -metadata:s:v title="AlbumCover" -metadata:s:v comment="Cover(front)" -f mp3 ${finalName}`.split(' '), stdin: () => {}}) //-f mp3
                // url = window.URL.createObjectURL(new Blob([out.MEMFS[0].data], {type: 'audio/mpeg'}));
                log('added thumbnail to audio<br>...<br>Opening ' + title)
                whenDone(finalName, out.MEMFS[0].data)
                // window.location = url
                // cordova.plugins.disusered.open(url,
                //     () => console.log(`File ${title}.mp3 opened`),
                //     code => console.log('Could not open file, ' + (code === 1 ? 'No file handler found' : 'Undefined error')),
                //     progressEvent => console.log(progressEvent.lengthComputable ? 'Opening ' + Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%' : 'Opening ...')
                // )
            })
        })
    })
}

window.fetchMP3 = fetchMP3
// url = 'http://youtube.com/watch?v=GZjt_sA2eso'  //for now everything 1 url
// fetchMP3(url)


// worker = new Worker('./ffmpeg.js')
// worker.onmessage = e => console.log(e.data.type)
// worker.postMessage({type: "run", MEMFS: [], arguments: ['-version']})
