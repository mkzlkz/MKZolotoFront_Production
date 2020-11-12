
<template>
  <div class="notteacher webinars webinarView padding-30">
    <input type="hidden" id="urlServer" style="display: none" v-model="url">
    <input type="hidden" id="streamName" style="display: none" v-model="streamName">

    <button style="display: none" data-toggle="modal" data-target="#webinar-preview" ref="preview"></button>
    <button style="display: none" data-toggle="modal" data-target="#webinar-active-test-modal" ref="activeTestModal"></button>
    <div class="bg-white padding-20 mb-10" v-if="webinar">
      <div class="title-n">{{webinar.Webinarname}}</div>
      <div class="table-responsive">
        <table class="table">
          <tr>
            <th class="width-1">{{ $t('description') }}</th>
            <th class="width-2">{{ $t('webinar_start_date') }}</th>
            <th class="width-3">{{ $t('webinar_beginner_time') }}</th>
            <th class="width-4">{{ $t('until_webinar') }}</th>
            <th rowspan="2" class="width-5">
              <a  target="_blank" v-bind:href="'/user/chat-webinar/'+webinar.ID" v-if="1==1" class="button-gray-line" ><img
                :src="require('@/assets/img/icon/support.svg')" alt=""><span>{{ $t('ask_question') }}</span></a>
            </th>
          </tr>
          <tr>
            <td class="width-1">{{webinar.Description}}</td>
            <td class="width-2">{{webinar.Startdate | momentDate}}</td>
            <td class="width-3"><span class="blue">{{timeFromStart}}</span></td>
            <td class="width-4"><span class="pink">{{timeToEnd}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="webinarView-flex">
      <div class="webinarView-left">
        <div class="video">
          <iframe allow="camera;microphone;autoplay" :src="urlStream" style="width:100%; height:900px; border:none!important"></iframe>
        </div>
      </div>
      <div class="webinarView-right" v-if="webinar">
        <div class="bg-white mb-10 box-5" v-if="webinar.Testcount">
          <div class="bx5">
            <img :src="require('@/assets/img/icon/test.svg')" alt="">
            <p>{{ $t('webinar_testing_desc') }}</p>
          </div>
          <div class="bx5-1">
            <p>{{ $tc('test', 10) }}: {{webinar.Testcount}}</p>
            <button class="button-blue-line" @click="$router.push('/user/test-list/' + id)">{{ $t('more') }}</button>
          </div>
        </div>
        <div class="bg-white mb-10 box-6"  >
          <div class="text" @scroll="onScroll" ref="chatBody">
            <p v-if="!messages.length">{{ $t('no_message') }}</p>
            <div class="bx6" v-for="(msg, index) in messages" :key="index">
              <span>{{msg.CreatedAt | chatDate}}</span>
              <p>{{msg.Message}}</p>
            </div>
          </div>
          <div class="send">
            <input type="text" :disabled="loading" :placeholder="`${$t('write')}...`" @keyup.enter="sendChatMessage" v-model="newMessage" ref="write">
            <button :disabled="loading" @click="sendChatMessage"><img :src="require('@/assets/img/icon/send.svg')" alt=""></button>
          </div>
        </div>
        <div class="bg-white mb-10 box-7" v-if="webinar.Docs">
          <div class="bx7" v-for="(doc, index) in webinar.Docs" :key="index">
            <div class="bx7-1">
              <img :src="require('@/assets/img/icon/file.svg')" alt="">
              <p><span style="text-overflow: ellipsis; max-width: 153px; overflow-x: hidden;">{{doc.Name}}</span> <span>{{doc.CreatedAt | momentTime}}</span></p>
            </div>
            <div class="bx7-2">
              <p>{{doc.Size | size}}</p>
              <a download target="_blank" :href="doc.Path"><img :src="require('@/assets/img/icon/save.svg')" alt=""></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="webinar-preview" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-flex">
              <div class="modal-left">
                <div class="title-m mb-10">Webinar Preview</div>
                <!--<img :src="previewLink" style="max-width: 100%">-->
                <video controls style="width: 100%" class="mb-20" :src="previewLink">
              </video>
                <button class="button-blue-two" data-dismiss="modal">{{ $t('close') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-window">
      <div id="webinar-active-test-modal" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
              <div class="md-title">{{ $t('testing_time') }}</div>
              <button class="button-blue" data-dismiss="modal" @click="startActiveTest">{{ $t('start_testing') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /*.video-item {*/
    /*display: none!important;*/
  /*}*/
  /*.video-item:last-child {*/
    /*display: block!important;*/
  /*}*/
</style>
<script>
import moment from 'moment'
import WebRTC from './../webrtc.vue'
import { find, head } from 'lodash'
import * as io from 'socket.io-client'
window.io = io

export default {
  name: 'webinarView',
  components: {
    WebRTC
  },
  data () {
    return {
      last: 0,
      urlStream: 'https://stream.mars.studio/user.html?wid=' + this.$route.params.id + '&username=' + btoa(encodeURIComponent(JSON.parse(localStorage.getItem('user')).Fullname))  + '&teacher=0&hideconnect=false',
      id: this.$route.params.id,
      webinar: null,
      now: moment(),
      rtcmConnection: null,
      localVideo: null,
      videoList: [],
      canvas: null,
      img: null,
      roomId: this.$route.params.id,
      chatMessages: [],
      newMessage: '',
      streamName: 'test',
      url: 'wss://ec2-35-177-164-154.eu-west-2.compute.amazonaws.com:8443/52c8a538',

      timeFunc: null,
      isSeenPreview: false,
      loading: false,
      chatPage: 1,
      chatPagesCount: 1,
      loadingMsg: false,
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
    chatDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' ' + q.format('HH:mm')
    },
    momentTime (date) {
      let q = moment(date)
      return q.format('DD.MM.YY HH:mm')
    },
    size (size) {
      let q = Math.round(size / 1000)
      if (q < 1000) {
        return `${q}кб`
      } else {
        q = Math.round(q / 1000)
        return `${q}мб`
      }
    }
  },
  computed: {
    timeFromStart () {
      let date = moment(this.webinar.Startdate)
      let diff = this.now.diff(date, 'seconds')
      return diff < 0 ? '-' : this.timeFormatted(diff)
    },
    timeToEnd () {
      let date = moment(this.webinar.Startdate).add(this.webinar.Duration, 'minutes')
      let diff = date.diff(this.now, 'seconds')
      return diff < 0 ? '-' : this.timeFormatted(diff)
    },
    isWebinarFinished () {
      if (!this.webinar) return false
      return this.webinar.Status === 'Завершен'
    },
    mainTest () {
      return this.webinar ? this.webinar.MainTest : null
    },
    activeTest () {
      return (this.webinar && this.webinar.ActiveTest) ? this.webinar.ActiveTest : null
    },
    previewLink () {
      if (this.webinar && this.webinar.Preview && this.webinar.Preview.ID) {
        return this.webinar.Preview.Path
      } else {
        return ''
      }
    },
    messages () {
      return [].concat.apply([], this.chatMessages)
    }
  },
  watch: {
    isWebinarFinished (newVal) {
      if (newVal && this.mainTest) {
        this.$router.push({name: 'testing', params: {id: this.mainTest.ID, testInfo: this.mainTest}})
      } else if (newVal && this.mainTest) {
        this.$router.push('/user/webinars')
      } else if (newVal && !this.mainTest) {
        this.$router.push('/user/webinars')
      }
    }
  },
  methods: {
    onCapture () {
      this.img = this.$refs.webrtc.capture()
    },
    onJoin () {
     // StreamFL.connect()
      setTimeout(function () {
      //  StreamFL.play()
       // console.log('start play')
      }, 5000)

      // this.$refs.webrtc.join()
    },
    onLeave () {
     // this.$refs.webrtc.leave()
    },
    onShareScreen () {
      this.img = this.$refs.webrtc.shareScreen()
    },
    onError (error, stream) {
      console.log('On Error Event', error, stream)
    },
    logEvent (event) {
      console.log('Event : ', event)
    },
    getWebinar () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + this.id)
        .then(response => {
          this.webinar = response.data.data
          if (this.webinar.Preview && this.webinar.Preview.ID && !this.isSeenPreview && !this.isWebinarFinished) {
            this.isSeenPreview = true
            this.showPreview()
          }
        })
    },
    timeFormatted (time) {
      let result = ''
      let h = Math.floor(time / 3600)
      h = h < 10 ? '0' + h : h
      let m = Math.floor((time - h * 3600) / 60)
      m = m < 10 ? '0' + m : m
      let s = (time - h * 3600 - m * 60)
      s = s < 10 ? '0' + s : s
      result += h ? h + ':' : ''
      result += m ? m + ':' : ''
      result += s
      return result
    },
    async getChatMessages () {
      //      this.chatMessages = []
      this.loadingMsg = true
      // for (let i = 1; i <= this.chatPage; i++) {
      //
      // }
      await this.$axios.get(this.$axios.baseURL + '/api/chat/get?web=' + this.id)
        .then(response => {
          if (this.chatMessages.length === 0) {
            for (const item of response.data.data) {
              this.chatMessages.push(item)
              this.last = item.ID

            }
          } else {
            const obj = this
            for (const item of response.data.data) {
              if (item.ID > obj.last) {
                obj.chatMessages.push(item)
                obj.last = item.ID
              }
            }
          }
          this.chatPagesCount = response.data.pages
          // if (i === this.chatPage) {
          //   this.loadingMsg = false
          // }
        })
      this.scrollDown()
      this.$refs.write.focus()

    },

    sendChatMessage () {
      this.loading = true
      if (!this.newMessage) {
        this.loading = false
      } else {

        this.$axios.post(this.$axios.baseURL + '/api/chat/message', {'Message': this.newMessage, 'WebID': parseInt(this.id)})
          .then(response => {
            this.loading = false
            this.newMessage = ''
            this.$refs.write.focus()
            this.getChatMessages()
          })
      }
    },
    onStart () {

      this.timeFunc = setInterval(() => {
        this.getWebinar();
        this.getChatMessages()


    }, 5000)
    },
    showPreview () {
      this.$refs.preview.click()
    },
    showActiveTestModal () {
      this.$refs.activeTestModal.click()
    },
    startActiveTest () {
      this.$router.push({name: 'testing', params: {id: this.activeTest.ID, testInfo: this.activeTest}})
    },

    publishStream () {
     // StreamFL.connect()
     // StreamFL.publish('test1')
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
    scrollDown () {
      let scrollingElement = this.$refs.chatBody
      scrollingElement.scrollTop = scrollingElement.scrollHeight
    }
  },
  mounted () {
    this.onStart()
    this.onJoin()
    this.onLeave()
  },
  created () {
    setInterval(() => this.now = moment(), 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeFunc)
  }
}
</script>
<style>
  .notteacher .video-item video[datatype=local] {
    display: none!important;
  }
</style>
