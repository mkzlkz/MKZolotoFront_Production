<template>
    <div  v-if="videoList.length==1 || 1==1"class="video-list" v-on:click="onClick" >
        <div v-for="item in videoList"
             v-bind:video="item"
             v-bind:key="item.id"
             class="video-item">
            <video   controls autoplay playsinline ref="videos" :height="cameraHeight" :muted="item.muted" :id="item.id" :dataType="(localVideo && localVideo.id==item.id) ? 'local':'remote'"></video>
        </div>
        </div>
         <div v-else="videoList.length==2">

         <div class="video-item">
            <video class="user-stream"  controls autoplay playsinline ref="videos" :height="cameraHeight" :muted="videoList[0].muted" :id="videoList[0].id" :dataType="(localVideo && localVideo.id==videoList[0].id) ? 'local':'remote'"></video>
         </div>
         <div class="video-item">
            <video class="pc-stream" controls autoplay playsinline ref="videos" :height="cameraHeight" :muted="videoList[1].muted" :id="videoList[1].id" :dataType="(localVideo && localVideo.id==videoList[1].id) ? 'local':'remote'"></video>
             </div>
         </div>




    </div>
</template>

<script>
    import RTCMultiConnection from 'rtcmulticonnection';
    require('adapterjs');
    export default {
        name: 'WebRTC',
        components: {
            RTCMultiConnection
        },
        data() {
            return {
                rtcmConnection: null,
                localVideo: null,
                videoList: [],
                canvas: null,
//                roomId:"wally",
            };
        },
        props: {
            roomId: {
                type: String,
                default: 'public-room'
            },
            socketURL: {
                type: String,
                default: 'https://rtcmulticonnection.herokuapp.com:443/'
            },
            cameraHeight: {
                type: [Number, String],
                default: 160
            },
            autoplay: {
                type: Boolean,
                default: true
            },
            screenshotFormat: {
                type: String,
                default: 'image/jpeg'
            },
            enableAudio: {
                type: Boolean,
                default: true
            },
            enableVideo: {
                type: Boolean,
                default: true
            },
            enableLogs: {
                type: Boolean,
                default: false
            },
        },
        watch: {
        },
        mounted() {
            var that = this;
            console.log("room",this.roomId);
            var iceServers = {
                'urls':
                    'turn:genius.wally.kz:3478',
                        credential: '123456',
                        username: 'slava'

                    };


            this.rtcmConnection = new RTCMultiConnection();
            this.rtcmConnection.iceServers = [];

// second step, set STUN url
            this.rtcmConnection.iceServers.push({
                urls: 'stun:stun4.l.google.com:19302'
            });
            this.rtcmConnection.iceServers.push({
                urls: 'stun:stun2.l.google.com:19302'
            });

// last step, set TURN url (recommended)
            this.rtcmConnection.iceServers.push(
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                    });
//            {
//                        url: 'turn:genius.wally.kz:3478',
//                        credential: '123456',
//                        username: 'slava'
//                    });


//            this.rtcmConnection.iceServers = [];
//            this.rtcmConnection.iceServers.push(iceServers)
            this.rtcmConnection.socketURL = this.socketURL;
            this.rtcmConnection.autoCreateMediaElement = false;
            this.rtcmConnection.enableLogs = this.enableLogs;
            console.log(this.rtcmConnection.iceServers)
            if (this.teacher) {
                this.rtcmConnection.session = {
                    audio: this.enableAudio,
                    video: this.enableVideo,
                    oneway: true,
                };
                this.rtcmConnection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: this.enableAudio,
                    OfferToReceiveVideo: this.enableVideo
                };

            } else {
                this.rtcmConnection.session = {
                    audio: this.enableAudio,
                    video: this.enableVideo,
                    oneway: true,
                };

                this.rtcmConnection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: false,
                    OfferToReceiveVideo: false
                };
            }
            this.rtcmConnection.onstream = function (stream) {
                let found = that.videoList.find(video => {
                            return video.id === stream.streamid
                        })
                if (found === undefined) {
                    let video = {
                        id: stream.streamid,
                        muted: stream.type === 'local'
                    };

                    that.videoList.unshift(video);

                    if (stream.type === 'local') {
                        that.localVideo = video;
                    }
                }

                setTimeout(function(){
                    if (that.$refs.videos) {
                        for (var i = 0, len = that.$refs.videos.length; i < len; i++) {
                            if (that.$refs.videos[i].id === stream.streamid) {
                                that.$refs.videos[i].srcObject = stream.stream;
//                                that.$refs.videos[i].play()
                                break;
                            }
                        }
                    }
                }, 1000);




                            that.$emit('joined-room', stream.streamid);
            };
            this.rtcmConnection.onstreamended = function (stream) {
                var newList = [];
                that.videoList.forEach(function (item) {
                    if (item.id !== stream.streamid) {
                        newList.unshift(item);
                    }
                });
                that.videoList = newList;
                that.$emit('left-room', stream.streamid);
            };
        },
        methods: {
            onClick(e) {
                var that = this
                setTimeout(function() {
                    if (that.$refs.videos) {
                        for (var i = 0, len = that.$refs.videos.length; i < len; i++) {
//                            if (!this.teacher) {
//                                that.$refs.videos[i].muted = true
//                                that.$refs.videos[i].play()
//                                that.$refs.videos[i].muted = false
//                            }
//
//                            console.log("play",that.$refs.videos[i])
                        }
                    }
                },1000)
            },

            join() {
                var that = this;
                this.rtcmConnection.openOrJoin(this.roomId, function (isRoomExist, roomid) {
                    if (isRoomExist === false && that.rtcmConnection.isInitiator === true) {
                        that.$emit('opened-room', roomid);
                    }
                });
            },
            leave() {
                this.rtcmConnection.attachStreams.forEach(function (localStream) {
                    localStream.stop();
                });
                this.videoList = [];
            },
            capture() {
                return this.getCanvas().toDataURL(this.screenshotFormat);
            },
            getCanvas() {
                let video = this.getCurrentVideo();
                if (video !== null && !this.ctx) {
                    let canvas = document.createElement('canvas');
                    canvas.height = video.clientHeight;
                    canvas.width = video.clientWidth;
                    this.canvas = canvas;
                    this.ctx = canvas.getContext('2d');
                }
                const { ctx, canvas } = this;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                return canvas;
            },
            getCurrentVideo() {
                if (this.localVideo === null) {
                    return null;
                }
                if (!this.$refs.videos) {
                    return null;
                }
                for (var i = 0, len = this.$refs.videos.length; i < len; i++) {
                    if (this.$refs.videos[i].id === this.localVideo.id)
                        return this.$refs.videos[i];
                }
                return null;
            },
            shareScreen() {
                var that = this;
                if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
                    function addStreamStopListener(stream, callback) {
                        console.log("addStreamStopListener")
                        var streamEndedEvent = 'ended';

                        if ('oninactive' in stream) {
                            streamEndedEvent = 'inactive';
                        }

                        stream.addEventListener(streamEndedEvent, function() {
                            callback();
                            callback = function() {};
                        }, false);
                    }

                    function onGettingSteam(stream) {
                        console.log("onGettingSteam")

                        that.rtcmConnection.addStream(stream);
                        that.$emit('share-started', stream.streamid);
                        setTimeout(function(){
                            console.log(that.$refs.videos)
                            if (that.$refs.videos) {
                                for (var i = 0, len = that.$refs.videos.length; i < len; i++) {
                                    if (that.$refs.videos[i].id === stream.streamid) {
                                        that.$refs.videos[i].srcObject = stream.stream;
                                        break;
                                    }
                                }
                            }
                        }, 1000);

                        addStreamStopListener(stream, function() {
                            that.rtcmConnection.removeStream(stream.streamid);
                            that.$emit('share-stopped', stream.streamid);
                        });
                    }

                    function getDisplayMediaError(error) {
                        console.log("getDisplayMediaError")

                        console.log('Media error: ' + JSON.stringify(error));
                    }

                    if (navigator.mediaDevices.getDisplayMedia) {
                        console.log("getDisplayMedia")

                        navigator.mediaDevices.getDisplayMedia({video: true, audio: false}).then(stream => {
                            onGettingSteam(stream);
                    }, getDisplayMediaError).catch(getDisplayMediaError);
                    }
                    else if (navigator.getDisplayMedia) {
                        navigator.getDisplayMedia({video: true}).then(stream => {
                            onGettingSteam(stream);
                    }, getDisplayMediaError).catch(getDisplayMediaError);
                    }
                }
            }
        }
    };
</script>
<style scoped>
    .video-list {
        background: whitesmoke;
        height: auto;
    }

    .video-list div {
        padding: 0px;
    }

    .video-item {
        background: #c5c4c4;
        display: inline-block;
        width:100%;
    }
    .video-item:nth-child(2) {
        width: 200px;
        height: 150px;
        margin-top: -150px;
        position: relative;
        top: -16px;
    }
    .video-item:nth-child(2) video {
        height: 150px!important;
    }
</style>
