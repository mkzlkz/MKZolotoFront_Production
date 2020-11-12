<template>
  <div class="teacher webinars webinarView webinarForConductingWebinar padding-30">
    <input type="hidden" id="urlServer" style="display: none" v-model="url">
    <input type="hidden" id="streamName" style="display: none" v-model="streamName">

    <div class="bg-white padding-20 mb-10">
      <div class="title-n">{{webinar.Webinarname}}</div>
      <div class="table-responsive">
        <table class="table">
          <tr>
            <th class="width-1">{{ $t('description') }}</th>
            <th class="width-2">{{ $t('webinar_start_date') }}</th>
            <th class="width-3">{{ $t('webinar_beginner_time') }}</th>
            <th class="width-4">{{ $t('until_webinar') }}</th>
            <th rowspan="2" class="width-5">
              <button class="button-blue" @click="endWebinar"><span>{{ $t('complete_webinar') }}</span>
              </button>
            </th>
          </tr>
          <tr>
            <td class="width-1">{{webinar.Description}}</td>
            <td class="width-2">{{webinar.Startdate | momentDate}}</td>
            <td class="width-3"><span class="blue">{{timeFromStart}}</span></td>
            <td class="width-4"><span class="blue">{{timeToEnd}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="webinarView-flex">
      <div class="webinarView-left">
        <div class="video">
          <a class="share-screen" style="cursor: pointer;" v-if="1==2  && !shared" v-on:click="onShareScreen">{{ $t('share_screen') }}</a>
          <a class="share-screen" style="cursor: pointer;"  v-if="1==2 && shared" v-on:click="onShareScreenStop">{{ $t('off_share_screen') }}</a>
          <iframe allow="camera;microphone" :src="urlStream" style="width:100%; height:900px; border:none!important;"></iframe>

          <!--<div id="display" style="width: 100%; height: 400px"></div>-->

        </div>
      </div>
      <div class="webinarView-right">
        <div class="bg-white mb-10 box-5">
          <div class="bx5-1" style="position: relative">
            <p><img :src="require('@/assets/img/icon/people.svg')" alt="">{{ $t('watch_now') }}</p>
            <p>{{getCountOnline(webinar.Online)}}/{{webinar.TotalStudents}} <a class="moreinfo" @click="openOnline()">Подробнее</a></p>
            <div class="onlinelist" v-if="showOnline">
              <div class="head-of-block"><span class="closelink" @click="openOnline()">X</span></div>
              <div class="online-table">
                <table style="width:100%">
                  <tbody>
                  <tr v-for="item in webinar.UsersOnline ">
                    <td style="width:25%">
                      {{item.IDNumber}}
                    </td>
                    <td style="width:50%">{{item.Fullname}}</td>
                    <td style="width:25%" class="status-td" v-html="getStatus(item)">
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white mb-10 box-5">
          <div class="bx5-1">
            <p><img :src="require('@/assets/img/icon/test-list.svg')" alt=""> {{ $tc('test', webinar.Testcount) }}: {{webinar.Testcount}}</p>
            <router-link :to="'/admin/webinar-exams/' + webinar.ID" class="more">{{ $t('more') }}</router-link>
          </div>
        </div>
        <div class="bg-white mb-10 box-6">
          <div class="text" @scroll="onScroll" ref="chatBody">
            <p v-if="!messages.length && !loadingMsg">{{ $t('no_message') }}</p>
            <div class="bx6" v-for="(msg, index) in messages" :key="index">
              <div class="bx6-title">
                <p>
                  <span class="blue-purple">{{msg.UserName}}</span>
                </p>
                <span>{{msg.CreatedAt | chatDate}}</span>
              </div>
              <p>{{msg.Message}}</p>
            </div>
          </div>
          <div class="send" ref="y">
            <input type="text" :disabled="loading" :placeholder="`${$t('write')}...`" v-model="newMessage" @keyup.enter="sendChatMessage" ref="write" data-x="x">
            <button :disabled="loading" @click="sendChatMessage"><img :src="require('@/assets/img/icon/send.svg')" alt=""></button>
          </div>
        </div>
        <div class="bg-white mb-10 box-7">
          <input type="file" ref="file" style="display: none" @change="uploadFile">
          <button class="button-blue-line" @click="$refs.file.click()">{{ $t('upload_file') }}</button>
          <div class="bx7 load">
            <div class="bx7-1" v-if="loading">
              <img :src="require('@/assets/img/icon/file-load.svg')" alt="">
              <p class="progress-bar-wrapper">
                <span>{{ $t('uploading') }}...</span>
                <!--<progress-bar-->
                  <!--:options="barOptions"-->
                  <!--:value="barValue"-->
                <!--/>-->
              </p>
            </div>
          </div>
          <div class="bx7" v-for="(doc, index) in webinar.Docs" :key="index">
            <div class="bx7-1">
              <img :src="require('@/assets/img/icon/file.svg')" alt="">
              <p><span style="text-overflow: ellipsis; max-width: 153px; overflow-x: hidden;">{{doc.Name}}</span> <span>{{doc.CreatedAt | momentTime}}</span></p>
            </div>
            <div class="bx7-2">
              <p>{{doc.Size | size}}</p>
              <img :src="require('@/assets/img/icon/delete-gray.svg')" @click="deleteFile(doc.ID)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

import WebRTC from './../webrtc.vue'
import { find, head } from 'lodash'

import * as io from 'socket.io-client'
import {timeFormatted} from '../../helpers'

window.io = io
// import *  as StreamFL from './stream'
// import *  as ConferenceFL from './conference'

export default {
  name: 'webinarForConductingWebinar',
  components: {
    WebRTC
  },
  data () {
    return {
      urlStream: 'https://stream.mars.studio/?wid=' + this.$route.params.id + '&username=teacher' + '&teacher=1',
      last: 0,
      url: '',
      id: this.$route.params.id,
      now: moment(),
      file: null,
      webinar: {},
      rtcmConnection: null,
      localVideo: null,
      videoList: [],
      canvas: null,
      showOnline:false,
      img: null,
      shared: false,
      roomId: this.$route.params.id,
      fileTitle: '',
      chatMessages: [],
      newMessage: '',
      timeFunc: null,
      chatFunc: null,
      loading: false,
      chatPage: 1,
      chatPagesCount: 1,
      loadingMsg: false,
      loadingFile: false,
      streamName: 'test',
      currentSession: null,
      streamDisplay: null,
      streamStatusDisplay: null,
      display: document.getElementById('display'),
      barOptions: {
        text: {
          hideText: true
        },
        progress: {
          color: '#0056E0',
          backgroundColor: '#EDEEF2'
        },
        layout: {
          height: 6,
          width: 230,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: 'line'
        }
      },
      barValue: 0
    }
  },
  props: {
    socketURL: {
      type: String,
      default: 'https://rtcmulticonnection.herokuapp.com:443/'
    },
    cameraHeight: {
      type: [Number, String],
      default: 500
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
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    },
    momentTime (date) {
      let q = moment(date)
      return q.format('HH:mm')
    },
    size (size) {
      let q = Math.round(size / 1000)
      if (q < 1000) {
        return `${q}кб`
      } else {
        q = Math.round(q / 1000)
        return `${q}мб`
      }
    },
    chatDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' ' + q.format('HH:mm')
    }
  },
  computed: {
    timeFromStart () {
      let date = moment(this.webinar.Startdate)
      let diff = this.now.diff(date, 'seconds')
      return diff < 0 ? '-' : timeFormatted(diff)
    },
    timeToEnd () {
      let date = moment(this.webinar.Startdate).add(this.webinar.Duration, 'minutes')
      const isSame = moment(this.webinar.Startdate).isSame(moment())
      const isBefore = moment(this.webinar.Startdate).isBefore(moment())
      let diff = date.diff(this.now, 'seconds')
      if (isSame || isBefore) {
        return diff < 0 ? '-' : timeFormatted(diff)
      }
      return '-'
    },
    messages () {
      return [].concat.apply([], this.chatMessages)
    }
  },
  methods: {

    openOnline() {
      if (this.showOnline==false) {
        this.showOnline=true
      } else {
        this.showOnline=false

      }
    },

    getStatus(item) {
      if (item.Connected==0) {
        return "<span class='notcome'>Отсутствует</span>";
      }
      if (item.Connected>0 && item.Online==0) {
        return "<span class='disconnected'>Отключился</span>";
      }
      if (item.Connected>0 && item.Online>0) {
        return "<span class='online'>Онлайн</span>";
      }
    },
    streamConnect() {

      // ConferenceFL.start();
    },
    onCapture () {
      //      this.img = this.$refs.webrtc.capture();
    },
    onJoin () {
      //      this.$refs.webrtc.join();
    },
    onLeave () {
      //      this.$refs.webrtc.leave();
    },
    onShareScreen () {
      //      this.shared=true
      //      this.img = this.$refs.webrtc.shareScreen();
    },
    onShareScreenStop () {
      //      this.shared=false
      //      window.console.log("streams",this.$refs.webrtc.rtcmConnection.attachStreams)
      // this.$refs.webrtc.rtcmConnection.attachStreams[this.$refs.webrtc.rtcmConnection.attachStreams.length-1]
      //      (this.$refs.webrtc.rtcmConnection.removeStream(this.$refs.webrtc.rtcmConnection.attachStreams[this.$refs.webrtc.rtcmConnection.attachStreams.length-1].streamid));
      //      window.console.log(this.$refs.webrtc.rtcmConnection.attachStreams[this.$refs.webrtc.rtcmConnection.attachStreams.length-1].streamid);
      //      this.$refs.webrtc.rtcmConnection.attachStreams[this.$refs.webrtc.rtcmConnection.attachStreams.length-1].getAudioTracks()[0].stop();
      //      this.$refs.webrtc.rtcmConnection.attachStreams[this.$refs.webrtc.rtcmConnection.attachStreams.length-1].getVideoTracks()[0].stop();
      //      this.$refs.webrtc.$emit('share-stopped', this.$refs.webrtc.rtcmConnection.attachStreams[this.$refs.webrtc.rtcmConnection.attachStreams.length-1].streamid);

      //      this.$refs.webrtc.rtcmConnection.attachStreams = [this.$refs.webrtc.rtcmConnection.attachStreams[0]]

    },
    onError (error, stream) {
      console.log('On Error Event', error, stream)
    },
    logEvent (event) {
      console.log('Event : ', event)
    },
    getCountOnline(count){
      if (count>0) {
        return count-1;
      } else {
        return 0;
      }
    },
    getWebinar () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + this.id)
        .then(response => {
          this.webinar = response.data.data
        })
    },
    startWebinar () {
      this.$axios.post(this.$axios.baseURL + '/api/web/startweb', {WebID: parseInt(this.id)})
        .then(response => {
          console.log(response)
        })
    },
    endWebinar () {
      var that = this
      this.$axios.post(this.$axios.baseURL + '/api/web/endweb/id:' + this.id, {})
        .then(response => {
          that.onLeave()
          that.$router.push('/admin/webinar')
        })
    },
    // timeFormatted (time) {
    //   let result = ''
    //   let h = Math.floor(time / 3600)
    //   h = h < 10 ? '0' + h : h
    //   let m = Math.floor((time - h * 3600) / 60)
    //   m = m < 10 ? '0' + m : m
    //   let s = (time - h * 3600 - m * 60)
    //   s = s < 10 ? '0' + s : s
    //   result += h ? h + ':' : ''
    //   result += m ? m + ':' : ''
    //   result += s
    //   return result
    // },
    uploadFile () {
      this.file = this.$refs.file.files[0]
      this.fileTitle = this.file.name
      let formData = new FormData()
      console.log(formData)
      formData.append('file', this.file)
      formData.append('WebID', this.id)
      this.loading = true

      this.$axios.post(this.$axios.baseURL + '/uploadF', formData)
        .then(response => {
          this.getWebinar()
          this.loading = false
          this.$refs.file.value=null;

        })
    },
    deleteFile (id) {
      this.$axios.delete(this.$axios.baseURL + '/delete/docs/id:' + id)
        .then(response => {
          this.webinar.Docs = this.webinar.Docs.filter(e => e.ID !== id)
          this.file = null
          this.fileTitle=null
        })
    },
    async getChatMessages () {
      //      this.chatMessages = []
      if (this.chatMessages.length > 0) {
        this.loadingMsg = true
      }

      await this.$axios.get(this.$axios.baseURL + '/api/chat/get?web=' + this.id)
        .then(response => {
          const obj = this

          for (const item of response.data.data) {
            if (item.ID > obj.last) {
              obj.chatMessages.push(item)
              obj.last = item.ID
            }
          }
          this.chatPagesCount = response.data.pages
          // if (i === this.chatPage) {
          //   this.loadingMsg = false
          // }
        })
      this.scrollDown()
    },
    sendChatMessage () {
      //this.loading = true
      if (!this.newMessage) {
        //this.loading = false
      } else {
        var text = this.newMessage
        this.newMessage=''
        this.$axios.post(this.$axios.baseURL + '/api/chat/message', {'Message': text, 'WebID': parseInt(this.id)})
          .then(() => {
           // this.loading = false
           // this.newMessage = ''
            this.$refs.write.focus()

            this.getChatMessages()
          })
      }
    },
    onScroll ({target: { scrollTop, clientHeight, scrollHeight }}) {
      if (!this.messages.length) {
        return
      }
      if (scrollTop + clientHeight >= scrollHeight) {
        this.getChatMessages()
      } else if (scrollTop === 0 && !this.loadingMsg) {
        if (this.chatPage < this.chatPagesCount) {
          this.chatPage++
        }
        this.getChatMessages()
      }
    },
    onStart () {
      this.timeFunc = setInterval(() => {
        this.getWebinar()
        this.$refs.write.focus()

        this.getChatMessages()

        // this.scrollDown()
      }, 5000)
    },
    scrollDown () {
      let scrollingElement = this.$refs.chatBody
      scrollingElement.scrollTop = scrollingElement.scrollHeight
    }
  },
  mounted () {


    this.getWebinar()
    this.$refs.write.focus()

    console.log("start watcher chat")
//    StreamFL.connect();
//    setTimeout(function () {
//      StreamFL.publish();
//      console.log("start publish")
//
//    },5000)

//    console.log("rooms")
//    var rooms = [];
//    setInterval(function () {
//      rooms = StreamFL.currentSession.getStreams();
//      console.log("rooms",rooms)
//    },1000)
    //StreamFL.publish();


//    this.onJoin()
    this.onStart()

  },
  created () {
    setInterval(() => this.now = moment(), 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeFunc)
    clearInterval(this.chatFunc)
  }
}
</script>

<style>
  .teacher .video-item video[datatype=remote] {
    display: none!important;
  }
  .progress-bar-wrapper {
    align-items: unset;
    flex-direction: column;
  }

  .notcome {
    color:darkred;
  }

  .online {
    color:darkgreen;
  }

  .onlinelist {
    position: absolute;
    top:30px;
    width:700px;
    max-height: 500px;
    overflow-y: auto;
    right: -15px;
    background-color: white;
    display: block;
    border:1px solid #2a4077;
    border-radius: 3px;
  }
  .onlinelist tr td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .onlinelist tr {
    border-top:1px solid #f5f6fa;
  }

  .online-table {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    max-height: 320px;
    overflow-y: auto;
  }
  .head-of-block {
    background-color: #f5f6fa;
    padding-top: 3px;
    padding-bottom: 3px;
    height:30px;
    padding-right: 10px;
  }
  .head-of-block span {
    float:right;
  }
  .moreinfo {
    cursor: pointer;
  }

  .status-td span {
    width:100%;
    text-align: right;
    display: inline-block;
  }
  .closelink {
    cursor: pointer;
  }
  .bx7-2 img {opacity: 0.8; cursor: pointer}
  .bx7-2 img {opacity: 1; cursor: pointer;
    transition:0.2s}

</style>
