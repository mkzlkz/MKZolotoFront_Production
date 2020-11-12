<template>
  <div class="webinars webinarView padding-30">
    <div class="bg-white padding-20 mb-10">
      <div class="title-n">{{ $t('webinar_name') }}</div>
      <div class="table-responsive">
        <table class="table">
          <tr>
            <th class="width-1">{{ $t('description') }}</th>
            <th class="width-2">{{ $t('webinar_start_date') }}</th>
            <th class="width-3">{{ $t('webinar_beginner_time') }}</th>
            <th class="width-4">{{ $t('until_webinar') }}</th>
          </tr>
          <tr>
            <td class="width-1">{{webinar.Teacher}}</td>
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
          <video controls>
            <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4">
            <p>Sorry, there's a problem playing this video. Please try using a different browser.</p>
          </video>
        </div>
      </div>
      <div class="webinarView-right">
        <div class="bg-white mb-10 box-6">
          <div class="text" @scroll="onScroll">
            <div class="bx6" v-for="(msg, index) in messages" :key="index">
              <span>{{msg.CreatedAt | momentTime}}</span>
              <p>{{msg.Message}}</p>
            </div>
          </div>
        </div>
        <div class="bg-white mb-10 box-7" v-if="webinar.Docs">
          <div class="bx7" v-for="(doc, index) in webinar.Docs" :key="index">
            <div class="bx7-1">
              <img :src="require('@/assets/img/icon/file.svg')" alt="">
              <p><span>{{doc.Name}}</span> <span>{{doc.CreatedAt | momentTime}}</span></p>
            </div>
            <div class="bx7-2">
              <p>{{doc.Size | size}}</p>
              <a download :href="doc.Path" target="_blank"><img :src="require('@/assets/img/icon/save.svg')"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'WebinarViewAdmin',
  data () {
    return {
      last: 0,
      id: this.$route.params.id,
      webinar: {},
      now: moment(),
      chatMessages: [],
      timeFunc: null,
      loading: false,
      chatPage: 1,
      chatPagesCount: 1,
      loadingMsg: false
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
      return diff < 0 ? '-' : this.timeFormatted(diff)
    },
    timeToEnd () {
      let date = moment(this.webinar.Startdate).add(this.webinar.Duration, 'minutes')
      let diff = date.diff(this.now, 'seconds')
      return diff < 0 ? '-' : this.timeFormatted(diff)
    },
    messages () {
      return [].concat.apply([], this.chatMessages)
    }
  },
  methods: {
    getWebinar () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + this.id)
        .then(response => {
          this.webinar = response.data.data
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
    getChatMessages () {
      //      this.chatMessages = []
      this.loadingMsg = true
      for (let i = 1; i <= this.chatPage; i++) {
        this.$axios.get(this.$axios.baseURL + '/api/chat/get?web=' + this.id + '&id=' + i)
          .then(response => {
            if (this.chatMessages.length == 0) {
              this.chatMessages.push(response.data.data)
            } else {
              var obj = this
              console.log('last', obj.last)
              response.data.data.map(function (item) {
                console.log('current', item)
                if (item.ID > obj.last) {
                  obj.chatMessages.push(item)
                  obj.last = item.ID
                }
              })
            }
            this.chatPagesCount = response.data.pages
            if (i === this.chatPage) {
              this.loadingMsg = false
            }
          })
      }
    },
    onChatPageChange () {
      this.getChatMessages()
    },
    onStart () {
      this.timeFunc = setInterval(() => {
        this.getWebinar()
        this.getChatMessages()
      }, 5000)
    }
  },
  mounted () {
    this.onStart()
  },
  created () {
    setInterval(() => this.now = moment(), 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeFunc)
  }
}
</script>
