PRE_JS = build/pre.js
POST_JS = build/post-sync.js #build/post-worker.js

MP4_MUXERS = mp4
FFMPEG_MP4_BC = build/ffmpeg/ffmpeg.bc
all: mp4 #mp4-asm
mp4: ffmpeg.js
#mp4-asm: ffmpeg-asm.js
clean: clean-js clean-ffmpeg
clean-js:
	rm -f -- dist/ffmpeg*.js
clean-ffmpeg:
	-cd build/ffmpeg && rm -f ffmpeg.bc && make clean

# FFMPEG_COMMON_ARGS = \
# 	--cc=emcc \
# 	--enable-cross-compile \
# 	--target-os=none \
# 	--arch=x86 \
# 	\
# 	--disable-runtime-cpudetect \
# 	--disable-asm \
# 	--disable-fast-unaligned \
# 	--disable-pthreads \
# 	--disable-w32threads \
# 	--disable-os2threads \
# 	--disable-debug \
# 	--disable-stripping \
# 	\
# 	--disable-all \
# 	--disable-avcodec \
# 	--disable-avutil \
# 	--disable-swresample \
# 	--disable-swscale \
# 	--disable-avfilter \
# 	--disable-network \
# 	--disable-d3d11va \
# 	--disable-dxva2 \
# 	--disable-vaapi \
# 	--disable-vdpau \
# 	--disable-bzlib \
# 	--disable-iconv \
# 	--disable-libxcb \
# 	--disable-lzma \
# 	--disable-securetransport \
# 	--disable-xlib \
# 	--disable-zlib \
# 	--disable-decoders \
# 	--disable-parsers \
# 	--disable-filters \
# 	--enable-ffmpeg \
# 	--enable-avformat \
# 	--enable-muxer=mp4 \
# 	--enable-protocol=file \
# 	--enable-gpl \
# 	--enable-version3 \
# 	--enable-nonfree

FFMPEG_COMMON_ARGS = \
	--cc=emcc \
	--enable-cross-compile \
	--target-os=none \
	--arch=x86 \
	--disable-runtime-cpudetect \
	--disable-asm \
	--disable-fast-unaligned \
	--disable-pthreads \
	--disable-w32threads \
	--disable-os2threads \
	--disable-stripping \
	--disable-doc \
	--disable-debug \
	--disable-ffplay \
	--disable-ffprobe \
	--enable-ffmpeg \
	--enable-avformat \
	--disable-network \
	--disable-sdl2 \
	\
	--disable-gpl \
	--disable-opencl \
	--disable-swscale \
	\
	--disable-protocol=cache,concat,crypto,hls,pipe \
	--disable-lzma \
	--disable-xlib \
	--disable-lzo \
	--enable-libmp3lame \
	--extra-ldflags=-L/usr/local/lib --extra-cflags=-I/usr/local/include \
	# --disable-encoders \
	# --disable-decoders \
	# --disable-muxers \
	# --disable-demuxers \
	# --enable-encoder=libmp3lame,mp3,image2,mjpeg,yuvj420p \
	# --enable-decoder=mov,mp4,m4a,3gp,3g2,mj2,aac,mp3,image2,mjpeg,yuvj420p \
	# --enable-muxer=mp3 \
	# --enable-demuxer=avi,mp3 \

	# --enable-encoder=mp4,vqavideo,h264,hevc,aac,webvtt,ass,srt,mjpeg,mjpegb \
	# --enable-decoder=mp4,vqavideo,h264,hevc,aac,mp3float,mp3,mp3adufloat,mp3adu,mp3on4float,mp3on4,webvtt,ass,srt,,mjpeg,mjpegb,adpcm_ima_smjpeg \
	# --enable-muxer=mp4,h264,hevc,aac,mp3,webvtt,ass,srt,rawvideo,mjpeg,smjpeg \
	# --enable-demuxer=mp4,avi,h264,hevc,aac,mp3,webvtt,ass,srt,rawvideo,null,mjpeg,smjpeg,mjpeg_2000 \

#DEMUXERS 
#MUXERS
#--disable-decoder=a64multi,a64multi5,alias_pix,amv,asv1,asv2,avrp,avui,ayuv,bmp,cinepak,cljr,vc2,dnxhd,dpx,dvvideo,ffv1,ffvhuff,fits,flv,h261,h263,h263p,huffyuv,jpeg2000,jpegls,ljpeg,magicyuv,mjpeg,mpeg1video,mpeg2video,pam,pbm,pcx,pgm,pgmyuv,ppm,prores,prores_aw,prores_ks,qtrle,r10k,r210,roqvideo,rv10,rv20,sgi,snow,sunrast,svq1,targa,tiff,utvideo,v210,v308,v408,v410,wmv1,wmv2,wrapped_avframe,xbm,xface,xwd,y41p,yuv4,adpcm_adx,g722,g726,g726le,adpcm_ima_qt,adpcm_ima_wav,adpcm_ms,adpcm_swf,adpcm_yamaha,aptx,aptx_hd,comfortnoise,dca,eac3,g723_1,mlp,mp2,mp2fixed,nellymoser,pcm_alaw,pcm_dvd,pcm_f32be,pcm_f32le,pcm_vidc,real_144,roq_dpcm,s302m,sbc,sonic,sonicls,truehd,tta,wavpack,wmav1,wmav2,arbc,asv1,asv2,aura,aura2,avrn,avrp,avs,avui,ayuv,bethsoftvid,bfi,binkvideo,bmp,bmv_video,brender_pix,c93,cavs,cdgraphics,cdxl,cfhd,cinepak,clearvideo,cljr,cllc,eacmv,cpia,camstudio,cyuv,dds,dfa,dirac,dnxhd,dpx,dsicinvideo,dvvideo,dxtory,dxv,escape124,escape130,ffv1,ffvhuff,fic,fits,flic,flv,fmvc,fraps,frwu,gdv,h261,h263,h263i,h263p,hap,hnm4video,hq_hqa,hqx,hymt,idcinvideo,idf,iff,imm4,indeo2,indeo3,indeo4,indeo5,interplayvideo,jpeg2000,jpegls,jv,kgv1,kmvc,lagarith,loco,m101,eamad,magicyuv,mdec,mimic,mjpeg,mjpegb,mmvideo,motionpixels,mpeg1video,mpeg2video,mpegvideo,msa1,msmpeg4v1,msmpeg4v2,msmpeg4,msrle,mss1,mss2,msvideo1,mszh,mts2,mvc1,mvc2,mxpeg,nuv,paf_video,pam,pbm,pcx,pgm,pgmyuv,pictor,pixlet,ppm,prores,prosumer,psd,ptx,qdraw,qpeg,qtrle,r10k,r210,rl2,roqvideo,rpza,rv10,rv20,rv30,rv40,sanm,scpr,sgi,sgirle,sheervideo,smackvid,smc,smvjpeg,snow,sp5x,speedhq,sunrast,svq1,svq3,targa,targa_y216,eatgq,eatgv,thp,tiertexseqvideo,tiff,tmv,eatqi,truemotion1,truemotion2,truemotion2rt,tscc2,txd,ultimotion,utvideo,v210,v210x,v308,v408,v410,vb,vble,vc1,vc1image,vcr1,xl,vmdvideo,vmnc,vp3,vp5,vp6,vp6a,vp6f,vp7,vp8,vp9,webp,wmv1,wmv2,wmv3,wmv3image,wnv1,vqavideo,xan_wc3,xan_wc4,xbm,xface,xpm,xwd,y41p,012v,4xm,8bps,aasc,aic,anm,ansi,binkvideo,bintext,bitpacked,hnm4video,idcinvideo,iff,interplayvideo,roqvideo,smackvid,ultimotion,vqavideo,ylc,yop,8svx_exp,8svx_fib,adpcm_4xm,adpcm_afc,adpcm_aica,adpcm_ct,adpcm_dtk,adpcm_ea,adpcm_ea_maxis_xa,adpcm_ea_r1,adpcm_ea_r2,adpcm_ea_r3,adpcm_ea_xas,g722,g726,g726le,adpcm_ima_amv,adpcm_ima_apc,adpcm_ima_dat4,adpcm_ima_dk3,adpcm_ima_dk4,adpcm_ima_ea_eacs,adpcm_ima_ea_sead,adpcm_ima_iss,adpcm_ima_oki,adpcm_ima_rad,adpcm_ima_smjpeg,adpcm_ima_ws,adpcm_mtaf,adpcm_psx,adpcm_sbpro_2,adpcm_sbpro_3,adpcm_sbpro_4,adpcm_thp,adpcm_thp_le,adpcm_vima,adpcm_xa,amrnb,amrwb,ape,atrac1,atrac3,atrac3al,atrac3plus,atrac3plusal,atrac9,on2avc,binkaudio_dct,binkaudio_rdft,bmv_audio,cook,dolby_e,dsd_lsbf,dsd_lsbf_planar,dsd_msbf,dsd_msbf_planar,dsicinaudio,dss_sp,dst,dvaudio,evrc,g729,gremlin_dpcm,gsm,gsm_ms,hcom,iac,ilbc,imc,interplay_dpcm,interplayacm,mace3,mace6,als,mpc7,mpc8,paf_audio,pcm_bluray,pcm_f16le,pcm_f24le,pcm_f64be,pcm_f64le,pcm_lxf,pcm_mulaw,pcm_s16be,pcm_s16be_planar,pcm_s16le,pcm_s16le_planar,pcm_s24be,pcm_s24daud,pcm_s24le,pcm_s24le_planar,pcm_s32be,pcm_s32le,pcm_s32le_planar,pcm_s64be,pcm_s64le,pcm_s8,pcm_s8_planar,pcm_u16be,pcm_u16le,pcm_u24be,pcm_u24le,pcm_u32be,pcm_u32le,pcm_u8,pcm_zork,qcelp,qdm2,qdmc,real_144,real_288,ralf,sdx2_dpcm,shorten,sipr,smackaud,sol_dpcm,tak,truespeech,twinvq,vmdaudio,wavesynth,ws_snd1,wmalossless,wmapro,wmavoice,xan_dpcm,xma1,xma2,012v,4xm,8bps,binkvideo,hnm4video,idcinvideo,iff,interplayvideo,roqvideo,smackvid,ultimotion,vqavideo,xbin,8svx_exp,8svx_fib,g722,g726,g726le,atrac3plus,atrac3plusal,interplayacm,metasound,mp1,mp1float,mp2float,mp3float,mp3,mp3adufloat,mp3adu,mp3on4float,mp3on4,real_144,real_288,wavesynth,dvbsub,dvdsub,cc_dec,pgssub,jacosub,microdvd,mov_text,mpl2,pjs,realtext,sami,stl,subviewer,subviewer1,vplayer,xsub,gif,h264 \
#--disable-encoder=a64multi,a64multi5,alias_pix,amv,asv1,asv2,avrp,avui,ayuv,bmp,cinepak,cljr,vc2,dnxhd,dpx,dvvideo,ffv1,ffvhuff,fits,flv,h261,h263,h263p,huffyuv,jpeg2000,jpegls,ljpeg,magicyuv,mjpeg,mpeg1video,mpeg2video,pam,pbm,pcx,pgm,pgmyuv,ppm,prores,prores_aw,prores_ks,qtrle,r10k,r210,roqvideo,rv10,rv20,sgi,snow,sunrast,svq1,targa,tiff,utvideo,v210,v308,v408,v410,wmv1,wmv2,wrapped_avframe,xbm,xface,xwd,y41p,yuv4,adpcm_adx,g722,g726,g726le,adpcm_ima_qt,adpcm_ima_wav,adpcm_ms,adpcm_swf,adpcm_yamaha,aptx,aptx_hd,comfortnoise,dca,eac3,g723_1,mlp,mp2,mp2fixed,nellymoser,pcm_alaw,pcm_dvd,pcm_f32be,pcm_f32le,pcm_vidc,real_144,roq_dpcm,s302m,sbc,sonic,sonicls,truehd,tta,wavpack,wmav1,wmav2,arbc,asv1,asv2,aura,aura2,avrn,avrp,avs,avui,ayuv,bethsoftvid,bfi,binkvideo,bmp,bmv_video,brender_pix,c93,cavs,cdgraphics,cdxl,cfhd,cinepak,clearvideo,cljr,cllc,eacmv,cpia,camstudio,cyuv,dds,dfa,dirac,dnxhd,dpx,dsicinvideo,dvvideo,dxtory,dxv,escape124,escape130,ffv1,ffvhuff,fic,fits,flic,flv,fmvc,fraps,frwu,gdv,h261,h263,h263i,h263p,hap,hnm4video,hq_hqa,hqx,hymt,idcinvideo,idf,iff,imm4,indeo2,indeo3,indeo4,indeo5,interplayvideo,jpeg2000,jpegls,jv,kgv1,kmvc,lagarith,loco,m101,eamad,magicyuv,mdec,mimic,mjpeg,mjpegb,mmvideo,motionpixels,mpeg1video,mpeg2video,mpegvideo,msa1,msmpeg4v1,msmpeg4v2,msmpeg4,msrle,mss1,mss2,msvideo1,mszh,mts2,mvc1,mvc2,mxpeg,nuv,paf_video,pam,pbm,pcx,pgm,pgmyuv,pictor,pixlet,ppm,prores,prosumer,psd,ptx,qdraw,qpeg,qtrle,r10k,r210,rl2,roqvideo,rpza,rv10,rv20,rv30,rv40,sanm,scpr,sgi,sgirle,sheervideo,smackvid,smc,smvjpeg,snow,sp5x,speedhq,sunrast,svq1,svq3,targa,targa_y216,eatgq,eatgv,thp,tiertexseqvideo,tiff,tmv,eatqi,truemotion1,truemotion2,truemotion2rt,tscc2,txd,ultimotion,utvideo,v210,v210x,v308,v408,v410,vb,vble,vc1,vc1image,vcr1,xl,vmdvideo,vmnc,vp3,vp5,vp6,vp6a,vp6f,vp7,vp8,vp9,webp,wmv1,wmv2,wmv3,wmv3image,wnv1,vqavideo,xan_wc3,xan_wc4,xbm,xface,xpm,xwd,y41p,roqvideo,g722,g726,g726le,pcm_f64be,pcm_f64le,pcm_mulaw,pcm_s16be,pcm_s16be_planar,pcm_s16le,pcm_s16le_planar,pcm_s24be,pcm_s24daud,pcm_s24le,pcm_s24le_planar,pcm_s32be,pcm_s32le,pcm_s32le_planar,pcm_s64be,pcm_s64le,pcm_s8,pcm_s8_planar,pcm_u16be,pcm_u16le,pcm_u24be,pcm_u24le,roqvideo,g722,g726,g726le,real_144,sonicls,dvbsub,dvdsub,mov_text,xsub,pcm_u32be,pcm_u32le,pcm_u8,real_144,sonicls,gif \
#--disable-bsf=av1_metadata,chomp,dump_extra,dca_core,eac3_core,extract_extradata,filter_units,h264_metadata,h264_mp4toannexb,h264_redundant_pps,hapqa_extract,imxdump,mjpeg2jpeg,mjpegadump,mp3decomp,mpeg2_metadata,mpeg4_unpack_bframes,mov2textsub,noise,prores_metadata,remove_extra,text2movsub,truehd_core,vp9_metadata,vp9_raw_reorder,vp9_superframe,vp9_superframe_split \
#--disable-demuxer=3dostr,4xm,acm,act,adf,adp,ads,adx,aea,afc,aiff,aix,alaw,alias_pix,amr,amrnb,amrwb,anm,apc,ape,apng,aptx,aptx_hd,aqtitle,asf,asf_o,ast,au,avi,avr,avs,avs2,bethsoftvid,bfi,bfstm,bink,bit,bmp_pipe,bmv,boa,brender_pix,brstm,c93,caf,cavsvideo,cdg,cdxl,cine,daud,dcstr,dds_pipe,dfa,dhav,dirac,dnxhd,dpx_pipe,dsf,dsicin,dss,dts,dtshd,dv,dvbsub,dvbtxt,dxa,ea,ea_cdata,eac3,epaf,exr_pipe,f32be,f32le,f64be,f64le,film_cpk,filmstrip,fits,flic,flv,frm,fsb,g722,g723_1,g726,g726le,g729,gdv,genh,gif,gif_pipe,gsm,gxf,h261,h263,hcom,hnm,ico,idcin,idf,iff,ilbc,image2,image2pipe,ingenient,ipmovie,ircam,iss,iv8,ivf,ivr,j2k_pipe,jacosub,jpeg_pipe,jpegls_pipe,jv,lavfi,live_flv,lmlm4,loas,lrc,lvf,lxf,,webm,mgsts,microdvd,mjpeg,mjpeg_2000,mlp,mlv,mm,3gp,3g2,mj2,mpc,mpc8,mpeg,mpegts,mpegtsraw,mpegvideo,mpjpeg,mpl2,mpsub,msf,msnwctcp,mtaf,mtv,mulaw,musx,mv,mvi,mxf,mxg,nc,nistsphere,nsp,nsv,nut,nuv,oma,paf,pam_pipe,pbm_pipe,pcx_pipe,pgm_pipe,pgmyuv_pipe,pictor_pipe,pmp,png_pipe,ppm_pipe,psd_pipe,psxstr,pva,pvf,qcp,qdraw_pipe,r3d,realtext,redspark,rl2,rm,roq,rpl,rsd,rso,s16be,s16le,s24be,s24le,s32be,s32le,s337m,s8,sami,sbc,sbg,scc,sdr2,sds,sdx,ser,sgi_pipe,shn,siff,sln,smjpeg,smk,smush,sol,sox,spdif,stl,subviewer,subviewer1,sunrast_pipe,sup,svag,svg_pipe,swf,tak,tedcaptions,thp,tiertexseq,tiff_pipe,tmv,truehd,tta,tty,txd,ty,u16be,u16le,u24be,u24le,u32be,u32le,u8,v210,v210x,vag,vc1,vc1test,vidc,vividas,vivo,vmd,vobsub,voc,vpk,vplayer,vqf,w64,wav,wc3movie,webm_dash_manifest,webp_pipe,wsaud,wsd,wsvqa,wtv,wv,wve,xa,xmv,xpm_pipe,xvag,xwd_pipe,xwma,yop,yuv4mpegpipe,3dostr,4xm,aa,ac3,alaw,bin,bmp_pipe,codec2,codec2raw,concat,data,dds_pipe,dpx_pipe,exr_pipe,f32be,f32le,f64be,f64le,ffmetadata,film_cpk,flac,gif_pipe,h264,hls,applehttp,j2k_pipe,jpeg_pipe,jpegls_pipe,lavfi,m4v,matroska,webm,mmf,mov,m4a,3gp,3g2,mj2,mp3,mpeg,msnwctcp,mulaw,ogg,pam_pipe,pbm_pipe,pcx_pipe,pgm_pipe,pgmyuv_pipe,pictor_pipe,pjs,png_pipe,ppm_pipe,psd_pipe,psxstr,qdraw_pipe,rawvideo,s16be,s16le,s24be,s24le,s32be,s32le,s8,sgi_pipe,shn,smk,srt,sunrast_pipe,svg_pipe,tiff_pipe,u16be,u16le,u24be,u24le,u32be,u32le,u8,vc1test,vidc,wc3movie,webp_pipe,xbin,xpm_pipe,xwd_pipe \
#--disable-muxer=3g2,3gp,a64,ac3,adts,adx,aiff,alaw,amr,apng,aptx,aptx_hd,asf,asf_stream,ast,au,avi,avm2,avs2,bit,caf,cavsvideo,codec2,codec2raw,crc,dash,data,daud,dirac,dnxhd,dts,dv,dvd,eac3,f32be,f32le,f4v,f64be,f64le,ffmetadata,fifo_test,film_cpk,filmstrip,fits,flv,framecrc,framehash,framemd5,g722,g723_1,g726,g726le,gif,gsm,gxf,h261,h263,h264,hash,hds,hls,ico,ilbc,image2,image2pipe,ipod,ircam,ismv,jacosub,latm,lrc,m4v,matroska,md5,microdvd,mjpeg,mkvtimestamp_v2,mlp,mmf,mpeg,mpeg1video,mpeg2video,mpegts,mpjpeg,mulaw,mxf,mxf_d10,mxf_opatom,nut,oga,oma,opus,psp,rawvideo,rm,roq,rso,rtp,rtp_mpegts,s16be,s16le,s24be,s24le,s32be,s32le,ogv,s8,sbc,scc,segment,singlejpeg,smjpeg,smoothstreaming,sox,spdif,spx,srt,stream_segment,ssegment,sup,svcd,swf,tee,truehd,tta,u16be,u16le,u24be,u24le,u32be,u32le,u8,uncodedframecrc,vc1,vc1test,vcd,vidc,vob,voc,w64,wav,webm,webm_chunk,webm_dash_manifest,webp,wtv,wv,yuv4mpegpipe,mp2,mov,mp3,ogg,flac \
	
#	sdl2 ???????????????????????????/
# 	--disable-encoders --disable-decoders --disable-filters --disable-bsfs --disable-demuxers --disable-muxers --enable-muxer=mp4 --disable-protocols --enable-protocol=file 
#--disable-avfilter --enable-gpl --disable-avcodec --disable-swresample --disable-swscale --disable-avfilter --enable-small --enable-avcodec --enable-avfilter --enable-swresample 
# --enable-swscale --enable-decoder=h264  --enable-encoder=rawvideo,libx264 --enable-parser=h264 --enable-demuxer=mov --enable-muxer=rawvideo,mp4 --enable-filter=scale
# --enable-gpl --enable-libx264 --extra-cflags="-I../x264" --extra-cxxflags="-I../x264" --extra-ldflags="-L../x264"

build/ffmpeg/ffmpeg.bc:
	cd build/ffmpeg && \
	git reset --hard && \
	emconfigure ./configure $(FFMPEG_COMMON_ARGS) && \
	emmake make -j8 && \
	cp ffmpeg ffmpeg.bc

# Compile bitcode to JavaScript.
# NOTE(Kagami): Bump heap size to 64M, default 16M is not enough even
# for simple tests and 32M tends to run slower than 64M.
EMCC_COMMON_ARGS = \
	--closure 1 \
	--pre-js $(PRE_JS) \
	--post-js $(POST_JS) \
	-s WARN_ON_UNDEFINED_SYMBOLS=0 \
	-O3 --memory-init-file 0 \
	-o $@

#	-s AGGRESSIVE_VARIABLE_ELIMINATION=1 \
#	-s MODULARIZE=1 \
# -s EXPORT_NAME=ffmpegjs \



#added  -s WARN_ON_UNDEFINED_SYMBOLS=0 coz ... fixes some shitty errors
ffmpeg.js: $(FFMPEG_MP4_BC) $(PRE_JS) $(POST_JS)
	emcc $(FFMPEG_MP4_BC) \
		-s ALLOW_MEMORY_GROWTH=1 \
		-s WASM=0 \
		$(EMCC_COMMON_ARGS) && \
	mv ffmpeg.js dist/ffmpeg.js

# ffmpeg-asm.js: $(FFMPEG_MP4_BC) $(PRE_JS) $(POST_JS)
# 	emcc $(FFMPEG_MP4_BC) \
# 		-s TOTAL_MEMORY=67108864 \
# 		-s OUTLINING_LIMIT=20000 \
# 		-O3 --memory-init-file 0 \
# 		-s WASM=0 \
# 		$(EMCC_COMMON_ARGS) && \
# 	mv ffmpeg-asm.js dist/ffmpeg-asm.js
