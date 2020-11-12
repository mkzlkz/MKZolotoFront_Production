<template>
  <div>
    <div class="webinars padding-30" v-if="webinars">
      <div class="dflex-link">
        <div class="title">{{ $t('current_webinars') }}</div>
        <div class="link" v-if="isMainPage">
          <router-link to="/user/webinars">{{ $t('all_webinars') }}</router-link>
        </div>
      </div>
      <div class="bg-white padding-20 mb-40" v-for="webinar in currentWebinars" :key="webinar.ID">
        <div class="title-n">{{webinar.Webinarname}}
          <div class="live">{{ $t('live_stream') }}</div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th class="width-1">{{ $t('description') }}</th>
              <th class="width-2">{{ $t('webinar_start_date') }}</th>
              <th class="width-3">{{ $t('webinar_beginner_time') }}</th>
              <th class="width-4">{{ $t('until_webinar') }}</th>
              <th rowspan="2" class="width-5">
                <a v-bind:href="'/user/chat-webinar/'+webinar.ID" target="_blank" class="button-gray-line"><img
                  :src="require('@/assets/img/icon/support.svg')" alt=""><span>{{ $t('ask_question') }}</span></a>
              </th>
              <th rowspan="2" class="width-6">
                <button class="button-blue" data-toggle="modal" data-target="#Modal1" @click="openModal(webinar.ID)">
                  {{ $t('connect') }}
                </button>
              </th>
            </tr>
            <tr>
              <td class="width-1">{{webinar.Description}}</td>
              <td class="width-2">{{webinar.Startdate | momentDate}}</td>
              <td class="width-3"><span class="blue">{{timeFromStart(webinar.Startdate)}}</span></td>
              <td class="width-4"><span class="blue">{{timeToEnd(webinar.Startdate, webinar.Duration)}}</span></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="dflex-link">
        <div class="title">{{ $t('coming_webinar') }}</div>
        <div class="link" v-if="isMainPage">
          <router-link to="/user/webinars">{{ $t('all_webinars') }}</router-link>
        </div>
      </div>
      <div class="bg-white padding-20 mb-40" v-for="webinar in futureWebinars" :key="webinar.ID">
        <div class="title-n">{{webinar.Webinarname}}</div>
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th class="width-1">{{ $t('description') }}</th>
              <th class="width-2">{{ $t('webinar_start_date') }}</th>
              <th class="width-3">{{ $t('will_start') }}</th>
              <th class="width-4"></th>
              <th class="width-5"></th>
              <th class="width-6"></th>
            </tr>
            <tr>
              <td class="width-1">{{webinar.Description}}</td>
              <td class="width-2">{{webinar.Startdate | momentDate}}</td>
              <td class="width-3"><span>{{startsInDays(webinar.Startdate)}}</span></td>
              <td class="width-4"></td>
              <td class="width-5"></td>
              <td class="width-6"></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="modal-webinar">

        <div id="Modal1" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-flex">
                  <div class="modal-left">
                    <div class="title-m">{{ $t('camera') }}</div>
                    <div :class="[(videoError) ? 'img error':'img']">
                      <vue-web-cam
                        ref="webcam"
                        :device-id="deviceId"
                        width="100%"
                        @started="onStarted"
                        @stopped="onStopped"
                        @error="onError"
                        @cameras="onCameras"
                        @camera-change="onCameraChange"

                      />
                      <p class="error" v-if="videoError" style="color:darkred; text-align:center; margin-bottom:15px;">
                        {{ $t('face_not_recognized') }}</p>
                    </div>
                    <button class="button-blue-two" data-dismiss="modal">{{ $t('cancel') }}</button>
                  </div>
                  <div class="modal-right">
                    <div class="title-m">{{ $t('image') }}</div>
                    <div class="img">
                      <img :src="userMainImage" alt="" class="img-main">
                      <div class="img-list">
                        <img :src="image" alt="" v-for="(image, index) in userImages" :key="index">
                      </div>
                    </div>
                    <div class="box-4">
                      <div class="title-4">{{ $t('important') }}!</div>
                      <div class="bx4" v-for="(txt, index) in $t('check_camera')" :key="index">
                        <span>{{ index + 1 }}</span> {{ txt }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dflex-link">
          <div class="title">{{ $t('past_webinar') }}</div>
          <div class="link" v-if="isMainPage">
            <router-link to="/user/webinars">{{ $t('all_webinars') }}</router-link>
          </div>
        </div>
        <div class="bg-white padding-20 mb-40" v-for="webinar in pastWebinars" :key="webinar.ID">
          <div class="title-n">{{webinar.Webinarname}}</div>
          <div class="table-responsive">
            <table class="table">
              <tr>
                <th class="width-1">{{ $t('description') }}</th>
                <th class="width-2">{{ $t('webinar_date') }}</th>
                <th class="width-3"></th>
                <th class="width-4"></th>
                <th rowspan="2" class="width-5">
                  <button class="button-gray-line" @click="$router.push('/user/chat-webinar/' + webinar.ID)"><img
                    :src="require('@/assets/img/icon/support.svg')" alt=""><span>Задать вопрос</span></button>
                  <span v-if="webinar.MessageStatus" class="number">1</span></th>
                <th rowspan="2" class="width-6">
                  <button v-if="1==2" class="button-blue">{{ $t('watch_record') }}</button>
                </th>
              </tr>
              <tr>
                <td class="width-1">{{webinar.Description}}</td>
                <td class="width-2">{{webinar.Startdate | momentDate}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>


    </div>
    <loader v-if="!webinars" />
  </div>

</template>

<script>
import moment from 'moment'
import {WebCam} from 'vue-web-cam'

export default {
  name: 'Webinars',
  components: {
    'vue-web-cam': WebCam,
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      webinars: null,
      now: moment(),
      activeWebID: 0,
      videoError: false,
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      opened: false,
      userPhoto: null,
      user: JSON.parse(localStorage.getItem('user')),
      isMainPage: window.location.href.includes('user/main')
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  computed: {
    currentWebinars () {
      return this.webinars.filter(w => w.Status === 'В процессе').sort((a, b) => b.ID - a.ID)
    },
    pastWebinars () {
      return this.webinars.filter(w => w.Status === 'Завершен').sort((a, b) => b.ID - a.ID)
    },
    futureWebinars () {
      return this.webinars.filter(w => w.Status === 'Ожидается').sort((a, b) => b.ID - a.ID)
    },
    device: function () {
      return this.devices.find(n => n.deviceId === this.deviceId)
    },
    userMainImage () {
      return (this.user.Image && this.user.Image.length) ? this.user.Image[0] : null
    },
    userImages () {
      return (this.user.Image && this.user.Image.length > 1) ? this.user.Image.slice(1) : []
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },

  methods: {
    routerPage () {
      this.opened = false
      this.$axios.post(this.$axios.baseURL + '/api/web/setattend', {WebID: this.activeWebID})
        .then(response => {
          this.$router.push('/user/webinar-view/' + this.activeWebID)
        })
    },
    getWebinars () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getuserweb')
        .then(response => {
          this.webinars = response.data.data
        })
    },
    startsInDays (date) {
      date = moment(date)
      let days = date.diff(this.now, 'days')
      let hours = date.diff(this.now, 'hours')
      hours -= days * 24
      return `${days} дней | ${hours} часов`
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
    timeFromStart (date) {
      date = moment(date)
      let diff = this.now.diff(date, 'seconds')
      return diff > 0 ? '-' : this.timeFormatted(diff)
    },
    timeToEnd (date, duration) {
      date = moment(date).add(duration, 'minutes')
      let diff = date.diff(this.now, 'seconds')
      return diff > 0 ? '-' : this.timeFormatted(diff)
    },
    openModal (id) {
      //      this.activeWebID = id
      //      this.opened = true
      location.replace('/user/webinar-view/' + id)
    },
    onCapture () {
      //                console.log(this.$refs.webcam.capture())
      console.log('captured')
      this.img = this.$refs.webcam.capture()
      // console.log(this.img);
      var obj = this
      var formdata = new FormData()
      obj.videoError = false

      this.urltoFile(this.img, 'source.jpg', 'image/jpeg')
        .then(function (file) {
          formdata.append('source', file)
          if (!obj.userPhoto) {
            var user = JSON.parse(localStorage.getItem('user'))
            if (user.Image && user.Image[0]) {
              obj.urltoFile(user.Image[0].replace('http://138.68.103.82:8085', 'https://wally-backend.mars.studio'), 'source.jpg', 'image/jpeg')
                .then(function (file) {
                  formdata.append('target', file)
                  obj.$axios.post('https://cors-any-kz.herokuapp.com//https://wally-backend.mars.studio/facer', formdata).then(function (data) {
                    if (data.data.FaceMatches == true) {
                      location.replace('/user/webinar-view/' + obj.activeWebID)
                    } else {
                      obj.videoError = true
                    }
                  }).catch(
                    function () {
                      obj.videoError = true
                    }
                  )
                }
                )
            }
          } else {
            formdata.append('target', obj.userPhoto)

            obj.$axios.post('https://cors-any-kz.herokuapp.com/https://wally-backend.mars.studio/facer', formdata).then(function (data) {
              if (data.data.FaceMatches == true) {
                location.replace('/user/webinar-view/' + obj.activeWebID)
              } else {
                obj.videoError = true
              }
            }).catch(
              function () {
                obj.videoError = true
              }
            )
          }

          //                            console.log(file);
        })
    },
    onStarted (stream) {
      console.log('On Started Event', stream)
    },
    urltoFile (url, filename, mimeType) {
      return (fetch(url)
        .then(function (res) {
          return res.arrayBuffer()
        })
        .then(function (buf) {
          return new File([buf], filename, {type: mimeType})
        })
      )
    },

    onStopped (stream) {
      console.log('On Stopped Event', stream)
    },
    onStop () {
      this.$refs.webcam.stop()
    },
    onStart () {
      this.$refs.webcam.start()
    },
    onError (error) {
      console.log('On Error Event', error)
    },
    onCameras (cameras) {
      this.devices = cameras
      //                console.log("On Cameras Event", cameras);
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    }
  },
  mounted () {
    this.getWebinars()
    var obj = this
    var user = JSON.parse(localStorage.getItem('user'))
    if (user.Image && user.Image[0]) {
      obj.urltoFile(user.Image[0].replace('http://138.68.103.82:8085', 'https://wally-backend.mars.studio'), 'source.jpg', 'image/jpeg')
        .then(function (file) {
          obj.userPhoto = file
        })
    }

    setInterval(function () {
      if (obj.opened === true) {
        obj.onCapture()
      }
    }, 10000)
  },
  created () {
    setInterval(() => this.now = moment(), 1000)
  }
}
</script>

<style scoped>
  .img {
    border: 5px solid #2a4077;
    height: 364px;
  }

  .img video {
    height: 372px;
    position: relative;
    top: -9px;
  }

  .img.error {
    border: 5px solid red;

  }
</style>
