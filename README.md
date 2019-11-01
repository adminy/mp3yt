# Setup Instructions
```
sh buildIcons.sh
npm install
cordova platform add https://github.com/apache/cordova-ios
cd www/nodejs-project && npm install && cd ../..
```

#### Plugins install
`cordova plugin add https://github.com/adminy/cordova-plugin-ffmpeg.git`

## Test
`npm run ios` or `cordova emulate ios`

## Deploy
`cordova build ios --release --device`
