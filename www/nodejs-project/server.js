
const youtubeVideoURL = 'http://www.youtube.com/watch?v='
let youtubeRequestsCounter = 0
const cordova = require('cordova-bridge')
const ytdl = require('ytdl-core')

const fs = require('fs')
const get = require('simple-get')
// const ffmpeg = require('fluent-ffmpeg')

const extractYoutubeCode = urlString => {
    const tmp = urlString.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)
    const ytCode = tmp && tmp.length > 0 ? tmp[1] : urlString
    return ytCode
}
const downloadYtImg = (path, ytCode, imageDownloadedCallback) => {
    get.concat(`https://img.youtube.com/vi/${ytCode}/hqdefault.jpg`, 
        (downloadError, res, data) => {
            if (downloadError) throw downloadError
            // console.log(res.statusCode) // 200
            var filePath = `${path}/${ytCode}.jpg`
            fs.writeFile(filePath, data, fileError => {
                if(fileError) throw fileError
                imageDownloadedCallback(filePath) //image saved
            })
    })
}
// const downloadYtVideo = (json) => {
    
//     let {   //required
//         ytURL,
//         output,
//         mp3ConvertedCallback,
//             //optional
//         downloadProgressCallback,
//         convertProgressCallback 
//     } = json;

//     downloadProgressCallback = downloadProgressCallback || (()=>{})
//     convertProgressCallback = convertProgressCallback || (()=>{})
//     ffmpeg(ytdl(ytURL).on('progress', downloadProgressCallback))
//     .addOptions(['-vn', '-c:a', 'libmp3lame'])
//     .on('error', error => console.log(error))
//     .on('end', mp3ConvertedCallback)
//     .on('progress', convertProgressCallback)
//     .output(output)
//     .run()
// }
// const addCoverArt = json => {
//     json.coverArtProgressCallback = json.coverArtProgressCallback || (()=>{})
//     const mp3 = `${json.ytFileName}.mp3`
//     ffmpeg()
//     .input(mp3)
//     .input(json.imgFile)
//     .addOptions(['-c:a', 'copy', '-map', '0', '-map', '1'])
//     .outputFormat('mp3')
//     .on('error', error => console.log(error))
//     .on('end', () => {
//         fs.unlinkSync(mp3)
//         fs.unlinkSync(json.imgFile)
//         json.doneCallback()
//     })
//     .on('progress', json.coverArtProgressCallback)
//     .output(json.ytFileName)
//     .run()
// }
const whiteListedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_ '
const cleanString = str => str.split('')
    .map(c => whiteListedChars.indexOf(c) !== -1 ?  c : '')
    .join('')

const ytInfo = (ytCode, ytInfoRetrievedCallback) => {
    ytdl.getInfo(youtubeVideoURL + ytCode, (err, songInfo) => {
        if (err) console.log(err)
        else {
            const audioFormats = ytdl.filterFormats(songInfo.formats, 'audioonly')
            const title = cleanString(songInfo.title)
            ytInfoRetrievedCallback(title, audioFormats, songInfo.length_seconds)
        }
    })
}

const fetchMP3 = (str, finished) => {
    const ytCode = extractYoutubeCode(str)
    // const ytFileName = `${__dirname}/cache/${ytCode}`
    // const ytURL = youtubeVideoURL + ytCode
    finished(__dirname, {})
    // ytInfo(ytCode, (title, audioFormats, songLength) => {
        // finished(title, audioFormats)
        // downloadYtImg(__dirname + '/cache', ytCode, imgFile => {
//             downloadYtVideo({
//                 ytURL,
//                 output: `${ytFileName}.mp3`,
//                 mp3ConvertedCallback: () => {
//                     addCoverArt({
//                         imgFile,
//                         ytFileName,
//                         doneCallback: finished
//                     })
//                 }
//             })
//         })
    // })
}

cordova.channel.on('fetchMP3', (url) => {
    cordova.channel.post('status', 'Processing Url: ' + url)
    fetchMP3('http://youtube.com/watch?v=GZjt_sA2eso', (title, audioFormats) => {
       cordova.channel.post('ready', youtubeRequestsCounter++ + ':' + title)
       cordova.channel.post('status', JSON.stringify(audioFormats) )
    })
})