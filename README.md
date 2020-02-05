# Setup Instructions
```
cd FFMPEG_JS && browserify server.js > ../www/data.js  && cd ..
sh buildIcons.sh
npm install
cordova platform add https://github.com/apache/cordova-ios
```

commit ed20fbcd48b02597a39ec25676615a9ef4bf3d00 for `ffmpeg` inside `FFMPEG_JS/build`

also inside `FFMPEG_JS` command `browserify server.js > ../www/data.js`

#### Plugins install
`cordova plugin add open`

## Test
`npm run ios` or `cordova emulate ios`

## Deploy
`cordova build ios --release --device`
