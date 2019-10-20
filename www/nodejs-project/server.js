
const youtubeVideoURL = 'http://www.youtube.com/watch?v='
const CACHE_DIR = `${__dirname}/cache`
let youtubeRequestsCounter = 0
const cordova = require('cordova-bridge')
const ytdl = require('ytdl-core')
const get = require('simple-get')
const fs = require('fs')

const extractYoutubeCode = urlString => {
    const tmp = urlString.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)
    const ytCode = tmp && tmp.length > 0 ? tmp[1] : urlString
    return ytCode
}

const downloadYtImg = (path, ytCode, imageDownloadedCallback) => {
    get.concat(`https://img.youtube.com/vi/${ytCode}/hqdefault.jpg`, 
        (downloadError, res, data) => {
            if (downloadError) throw downloadError // console.log(res.statusCode) // 200
            var filePath = `${path}/${ytCode}.jpg`
            fs.writeFile(filePath, data, fileError => {
                if(fileError) throw fileError
                imageDownloadedCallback(filePath) //image saved
            })
    })
}

const downloadYtVideo = (CACHE_PATH, ytCode, finishedCallback) => {
    const ytFileName = `${CACHE_PATH}/${ytCode}.flv`
    const ytURL = youtubeVideoURL + ytCode
    ytdl(ytURL).pipe(fs.createWriteStream(ytFileName)).on('close', () => finishedCallback(ytFileName))
}

const whiteListedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
const cleanString = str => str.replace(/ /g, '-').split('')
    .map(c => whiteListedChars.indexOf(c) !== -1 ?  c : '')
    .join('')

const ytInfo = (ytCode, ytInfoRetrievedCallback) => {
    ytdl.getInfo(youtubeVideoURL + ytCode, (err, songInfo) => {
        if (err) console.log(err)
        else {
            const audioFormats = [] //ytdl.filterFormats(songInfo.formats, 'audioonly')
            const title = cleanString(songInfo.title)
            ytInfoRetrievedCallback(title, audioFormats, songInfo.length_seconds)
        }
    })
}

const fetchMP3 = (str, finished) => {
    const ytCode = extractYoutubeCode(str)
    ytInfo(ytCode, (title, audioFormats, songLength) => {
        cordova.channel.post('status', `Fetched info - title: ${title} <br><img src='https://img.youtube.com/vi/${ytCode}/hqdefault.jpg'>`)
        downloadYtImg(CACHE_DIR, ytCode, imgFile => {
            cordova.channel.post('status', `Downloaded image ...<br><img src='https://img.youtube.com/vi/${ytCode}/hqdefault.jpg'>`)
            downloadYtVideo(CACHE_DIR, ytCode, videoFile => {
                cordova.channel.post('status', `Downloaded video ...<br><img src='https://img.youtube.com/vi/${ytCode}/hqdefault.jpg'>`)
                finished(ytCode, title, imgFile, videoFile)
            })
        })
    })
}

cordova.channel.on('fetchMP3', (url) => {
    // url = 'http://youtube.com/watch?v=GZjt_sA2eso'  //for now everything 1 url
    cordova.channel.post('status', 'Processing Url: ' + url + '<br>')
    fetchMP3(url, (ytCode, title, imgFile, videoFile) => {
       cordova.channel.post('ready', JSON.stringify({ counter: youtubeRequestsCounter++, videoFile, imgFile, title, ytCode, CACHE_DIR }))
    })
})

cordova.channel.on('init', () => {
    if (!fs.existsSync(CACHE_DIR))
        fs.mkdirSync(CACHE_DIR)
    //TODO: clean the CACHE_DIR every time
    cordova.channel.post('status', 'init complete')
})

cordova.channel.on('cleanup', (files) => {
    files = JSON.parse(files)
    files.forEach(file => fs.unlinkSync(file))
    cordova.channel.post('status', 'cleaned files '  + files.length)
})

