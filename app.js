let express  = require('express')
let YoutubeMp3Downloader = require("youtube-mp3-downloader");
let morgan = require('morgan')
let app = express()
console.log('asdASDSasdas')

app.use(morgan('dev'))

function extractVideoID(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    if ( match && match[7].length == 11 ){
        return match[7];
    }else{
        return null
    }
}
app.get('/download', (req, res) => {
    let id = extractVideoID(req.query.url)
    if(!id) {
        res.send('no id found')
        return
    }
    // /usr/local/bin/ffmpeg

    let YD = new YoutubeMp3Downloader({
        "ffmpegPath": "/usr/bin/ffmpeg",        // Where is the FFmpeg binary located?
        "outputPath": __dirname+"/here",    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 2000                 // How long should be the interval of the progress reports
    });
    
    YD.download(id);
    
    YD.on("finished", function(err, data) {
        console.log(JSON.stringify(data));
        res.sendFile(data.file)
    });
})

app.listen(4000)

