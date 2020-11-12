<template>
  <div class="container production" v-if="webinars">
    <div>
      <h2>Текущие вебинары</h2>
      <div id="accordion" v-for="(webinar,index) in currentWebinars" :key="webinar.ID">
        <div class="card production-card">
          <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="`#collapse1${index}`">
            {{webinar.Webinarname}}
          </a>
          <div :id="`collapse1${index}`" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div class="card-content">
                <div class="card-inside">
                  <p class="card-text">Дата начала вебинара</p>
                  <p class="card-subtext">{{webinar.Startdate | momentDate}}</p>
                  <p class="card-text">Прошло с начала вебинара</p>
                  <p class="card-subtext">{{timeFromStart(webinar.Startdate)}}</p>
                  <p class="card-text">До окончания вебинара</p>
                  <p class="card-subtext">{{timeToEnd(webinar.Startdate, webinar.Duration)}}</p>
                  <button class="btn btn-start" @click="webinarView(webinar.ID)">Подключиться</button>
                  <button class="btn btn-ask" @click="webinarQuestions(webinar.ID)">Задать вопрос</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3>Предстоящие вебинары</h3>
      <div id="accordion" v-for="(webinar,index) in futureWebinars" :key="webinar.ID">
        <div class="card production-card">
          <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="`#collapse2${index}`">
            {{webinar.Webinarname}}
          </a>
          <div :id="`collapse2${index}`" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div class="card-content">
                <div class="card-inside">
                  <p class="card-text">Дата начала вебинара</p>
                  <p class="card-subtext">{{webinar.Startdate | momentDate}}</p>
                  <p class="card-text">Начнется через</p>
                  <p class="card-subtext">{{startsInDays(webinar.Startdate)}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div>
      <h3>Прошедшие вебинары</h3>
      <div id="accordion" v-for="(webinar,index) in pastWebinars" :key="webinar.ID">
        <div class="card production-card">
          <!-- <div class="card-header"> -->
            <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="`#collapse3${index}`">
              {{webinar.Webinarname}}
              <span v-if="webinar.MessageStatus">1</span>
            </a>
            <!-- </div> -->
            <div :id="`collapse3${index}`" class="collapse" data-parent="#accordion">
              <div class="card-body">
                <div class="card-content">
                  <div class="card-inside">
                    <p class="card-text">Дата вебинара</p>
                    <p class="card-subtext">{{webinar.Startdate | momentDate}}</p>
                    <!--    <button class="btn btn-start">Посмотреть запись</button> -->
                    <button class="btn btn-ask" @click="webinarQuestions(webinar.ID)">Задать вопрос</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="face" v-if="faceSuccess">
        <div :class="[(videoError) ? 'img error':'img']">
          <vue-web-cam
          ref="webcam"
          :device-id="deviceId"
          width="100%"
          height="100%"
          @started="onStarted"
          @stopped="onStopped"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
          />
          <p class="error" v-if="videoError" style="color:darkred; text-align:center; margin-bottom:15px;">
          {{ $t('face_not_recognized') }}</p>
        </div>
        <div class="face-content">
          <button class="btn btn-cancel" @click="faceClose">Отмена</button>
          <p>Важно!</p>
          <ol>
            <li>Убедитесь что камера работает</li>
            <li>Посмотрите ровно на камеру</li>
            <li>Ждите пока вас распознает</li>
          </ol>
        </div>
      </div>
    </div>
  </template>

  <script>
    import moment from 'moment'
    import {WebCam} from 'vue-web-cam'

    export default {
      name: 'Webinars',
      components: {
        'vue-web-cam': WebCam,
        loader: () => import('../components/Template/Loader')
      },
      data () {
        return {
          current: true,
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
          isMainPage: window.location.href.includes('/main'),
          faceSuccess: false
        }
      },
      created () {
        setInterval(() => this.now = moment(), 1000);
        this.getWebinars();
      },
      mounted () {
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
methods:{
  getWebinars () {
    this.$axios.get(this.$axios.baseURL + '/api/web/getuserweb')
    .then(response => {
      this.webinars = response.data.data
    })
  },
  faceClose(){
this.faceSuccess = false;
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
    return diff < 0 ? '-' : this.timeFormatted(diff)
  },
  timeToEnd (date, duration) {
    date = moment(date).add(duration, 'minutes')
    let diff = date.diff(this.now, 'seconds')
    return diff < 0 ? '-' : this.timeFormatted(diff)
  },
  startsInDays (date) {
    date = moment(date)
    let days = date.diff(this.now, 'days')
    let hours = date.diff(this.now, 'hours')
    var minutes = date.diff(this.now, 'minutes')

    hours -= days * 24
    minutes = minutes - days * 24 * 60 - hours * 60
    return `${days} д. | ${hours} ч. | ${minutes} м.`
  },
  webinarView(id){
    this.activeWebID = id;
    this.faceSuccess = true;
    // location.replace('/webinar-view/' + id)
  },
  webinarQuestions(id){
    location.replace('/webinar-chatquestions/' + id)
  },
  routerPage () {
    this.opened = false
    this.$axios.post(this.$axios.baseURL + '/api/web/setattend', {WebID: this.activeWebID})
    .then(response => {
      this.$router.push('/webinar-view/' + this.activeWebID)
    })
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
            location.replace('/webinar-view/' + obj.activeWebID)
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
        location.replace('/webinar-view/' + obj.activeWebID)
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
}
}
</script>
