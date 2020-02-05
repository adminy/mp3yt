#!/usr/bin/env node
var ffmpeg = require("./dist/ffmpeg.js")

ffmpeg({ MEMFS: [], arguments: ["-decoders"], stdin: function() {}})

// -buildconf          show build configuration
// -formats            show available formats
// -muxers             show available muxers
// -demuxers           show available demuxers
// -devices            show available devices
// -codecs             show available codecs
// -decoders           show available decoders
// -encoders           show available encoders
// -bsfs               show available bit stream filters
// -protocols          show available protocols
// -filters            show available filters
// -pix_fmts           show available pixel formats
// -layouts            show standard channel layouts
// -sample_fmts        show available audio sample formats
// -colors             show available color names
// -sources device     list sources of the input device
// -sinks device       list sinks of the output device
// -hwaccels           show available HW acceleration methods