<template>
  <div style="height: 100%;">
    <div class="webinar-heigth" v-if="webinar">
      <div class="timer">
        <p class="name">
          Прошло: <span class="color-text">{{ timeFromStart }}</span>
        </p>
        <p class="date">
          До окончания: <span class="color-text">{{ timeToEnd }}</span>
        </p>
      </div>
      <div class="webinarStart">
        <!-- <div class="webinarStart__video_small" v-if="on===true">
<video autoplay>
<source src="../assets/img/video.mp4" type='video/mp4'>
</video>
</div> -->
        <div class="webinarStart__video">
          <!-- <video controls="controls">
<source src="../assets/img/video.mp4" type='video/mp4'>
</video> -->
          <iframe
            allow="camera;microphone;autoplay"
            :src="urlStream"
            style="width:100%; height:100%; border:none!important"
          ></iframe>
        </div>
        <!--  <div class="webinarStart__buttons">
<button @click="active()" :class="startVideo()">Включить видео</button>
<button class="active">Выключить аудио</button>
</div> -->
      </div>
      <div class="webinarStart__menu">
        <ul>
          <li>
            <p v-on:click="showChat = true">
              <img src="../assets/img/icon/ic-chat.svg" alt="" />
              <span>Чат</span>
            </p>
          </li>
          <li>
            <p v-on:click="showFile = true">
              <img src="../assets/img/icon/ic-files.svg" alt="" />
              <span>Файлы</span>
            </p>
          </li>
          <li>
            <router-link :to="'/webinar-chatquestions/'+webinar.ID"
              ><img src="../assets/img/icon/ic-question.svg" alt="" />
              <span>Вопрос</span></router-link
            >
          </li>
          <li>
            <router-link :to="'/test-list/'+webinar.ID"
              ><img src="../assets/img/icon/ic-tests.svg" alt="" />
              <span>Тесты</span></router-link
            >
          </li>
        </ul>
      </div>
      <WebinarModals></WebinarModals>

      <div class="webinar-chat" v-if="showChat">
        <div class="btn-close" v-on:click="showChat = false">Закрыть</div>
        <div class="chat">
          <div class="text" @scroll="onScroll" ref="chatBody">
            <p v-if="!messages.length" class="text-p">{{ $t("no_message") }}</p>
            <div class="bx6" v-for="(msg, index) in messages" :key="index">
              <p>{{ msg.Message }}</p>
              <span>{{ msg.CreatedAt | chatDate }}</span>
            </div>
          </div>

          <div class="send">
            <textarea-autosize
              placeholder="Сообщение"
              :disabled="loading"
              @keyup.enter="sendChatMessage"
              v-model="newMessage"
              :min-height="32"
              :max-height="64"
            />
            <button :disabled="loading" @click="sendChatMessage">
              <img :src="require('@/assets/img/icon/ic_send.svg')" alt="" />
            </button>
          </div>
        </div>
      </div>

      <div class="webinar-chat" v-if="showFile">
        <div class="btn-close" v-on:click="showFile = false">Закрыть</div>
        <div class="box-7" v-if="webinar.Docs">
          <div class="bx7" v-for="(doc, index) in webinar.Docs" :key="index">
            <div class="bx7-1">
              <img :src="require('@/assets/img/icon/file.svg')" alt="" />
              <p>
                <span
                  style="text-overflow: ellipsis; max-width: 153px; overflow-x: hidden;"
                  >{{ doc.Name }}</span
                >
                <span>{{ doc.CreatedAt | momentTime }}</span>
              </p>
            </div>
            <div class="bx7-2">
              <p>{{ doc.Size | size }}</p>
              <a download target="_blank" :href="doc.Path"
                ><img :src="require('@/assets/img/icon/save.svg')" alt=""
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import WebinarModals from "../components/WebinarModals";
import $ from "jquery";
import moment from "moment";
import WebRTC from "../components/webrtc.vue";
import { find, head } from "lodash";
import * as io from "socket.io-client";
window.io = io;

export default {
  name: "WebinarOnline",
  components: {
    WebRTC,
    WebinarModals
  },
  data() {
    return {
      showChat: false,
      showFile: false,
      last: 0,
      urlStream:
        "https://stream.mars.studio/user.html?wid=" +
        this.$route.params.id +
        "&username=" +
        btoa(
          encodeURIComponent(JSON.parse(localStorage.getItem("user")).Fullname)
        ) +
        "&teacher=0&hideconnect=false",
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
      newMessage: "",
      streamName: "test",
      url:
        "wss://ec2-35-177-164-154.eu-west-2.compute.amazonaws.com:8443/52c8a538",

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
          color: "#0056E0",
          backgroundColor: "#EDEEF2"
        },
        layout: {
          height: 6,
          width: 230,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: "line"
        }
      },
      barValue: 0
    };
  },
  props: {
    socketURL: {
      type: String,
      default: "https://rtcmulticonnection.herokuapp.com:443/"
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
      default: "image/jpeg"
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
    momentDate(date) {
      let q = moment(date);
      return q.format("DD.MM.YY") + " | " + q.format("HH:mm");
    },
    chatDate(date) {
      let q = moment(date);
      return q.format("DD.MM.YY") + " " + q.format("HH:mm");
    },
    momentTime(date) {
      let q = moment(date);
      return q.format("DD.MM.YY HH:mm");
    },
    size(size) {
      let q = Math.round(size / 1000);
      if (q < 1000) {
        return `${q}кб`;
      } else {
        q = Math.round(q / 1000);
        return `${q}мб`;
      }
    }
  },
  computed: {
    timeFromStart() {
      let date = moment(this.webinar.Startdate);
      let diff = this.now.diff(date, "seconds");
      return diff < 0 ? "-" : this.timeFormatted(diff);
    },
    timeToEnd() {
      let date = moment(this.webinar.Startdate).add(
        this.webinar.Duration,
        "minutes"
      );
      let diff = date.diff(this.now, "seconds");
      return diff < 0 ? "-" : this.timeFormatted(diff);
    },
    isWebinarFinished() {
      if (!this.webinar) return false;
      return this.webinar.Status === "Завершен";
    },
    mainTest() {
      return this.webinar ? this.webinar.MainTest : null;
    },
    activeTest() {
      return this.webinar && this.webinar.ActiveTest
        ? this.webinar.ActiveTest
        : null;
    },
    previewLink() {
      if (this.webinar && this.webinar.Preview && this.webinar.Preview.ID) {
        return this.webinar.Preview.Path;
      } else {
        return "";
      }
    },
    messages() {
      return [].concat.apply([], this.chatMessages);
    }
  },
  watch: {
    isWebinarFinished(newVal) {
      if (newVal && this.mainTest) {
        this.$router.push({
          name: "testingMob",
          params: { id: this.mainTest.ID, testInfo: this.mainTest }
        });
      } else if (newVal && this.mainTest) {
        this.$router.push("/webinars");
      } else if (newVal && !this.mainTest) {
        this.$router.push("/webinars");
      }
    }
  },
  methods: {
    chatClose() {
      this.showChat = false;
    },
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onJoin() {
      // StreamFL.connect()
      setTimeout(function() {
        //  StreamFL.play()
        // console.log('start play')
      }, 5000);

      // this.$refs.webrtc.join()
    },
    onLeave() {
      // this.$refs.webrtc.leave()
    },
    onShareScreen() {
      this.img = this.$refs.webrtc.shareScreen();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
    getWebinar() {
      this.$axios
        .get(this.$axios.baseURL + "/api/web/getweb/" + this.id)
        .then(response => {
          this.webinar = response.data.data;
          if (
            this.webinar.Preview &&
            this.webinar.Preview.ID &&
            !this.isSeenPreview &&
            !this.isWebinarFinished
          ) {
            this.isSeenPreview = true;
            this.showPreview();
          }
        });
    },
    timeFormatted(time) {
      let result = "";
      let h = Math.floor(time / 3600);
      h = h < 10 ? "0" + h : h;
      let m = Math.floor((time - h * 3600) / 60);
      m = m < 10 ? "0" + m : m;
      let s = time - h * 3600 - m * 60;
      s = s < 10 ? "0" + s : s;
      result += h ? h + ":" : "";
      result += m ? m + ":" : "";
      result += s;
      return result;
    },
    async getChatMessages() {
      //      this.chatMessages = []
      this.loadingMsg = true;
      // for (let i = 1; i <= this.chatPage; i++) {
      //
      // }
      await this.$axios
        .get(this.$axios.baseURL + "/api/chat/get?web=" + this.id)
        .then(response => {
          if (this.chatMessages.length === 0) {
            for (const item of response.data.data) {
              this.chatMessages.push(item);
              this.last = item.ID;
            }
          } else {
            const obj = this;
            for (const item of response.data.data) {
              if (item.ID > obj.last) {
                obj.chatMessages.push(item);
                obj.last = item.ID;
              }
            }
          }
          this.chatPagesCount = response.data.pages;
          // if (i === this.chatPage) {
          //   this.loadingMsg = false
          // }
        });
      this.scrollDown();
      // this.$refs.write.focus()
    },

    sendChatMessage() {
      this.loading = true;
      if (!this.newMessage) {
        this.loading = false;
      } else {
        this.$axios
          .post(this.$axios.baseURL + "/api/chat/message", {
            Message: this.newMessage,
            WebID: parseInt(this.id)
          })
          .then(response => {
            this.loading = false;
            this.newMessage = "";
            // this.$refs.write.focus()
            this.getChatMessages();
          });
      }
    },
    onStart() {
      this.timeFunc = setInterval(() => {
        this.getWebinar();
        this.getChatMessages();
      }, 5000);
    },
    showPreview() {
      this.$refs.preview.click();
    },
    showActiveTestModal() {
      this.$refs.activeTestModal.click();
    },
    startActiveTest() {
      this.$router.push({
        name: "testingMob",
        params: { id: this.activeTest.ID, testInfo: this.activeTest }
      });
    },

    publishStream() {
      // StreamFL.connect()
      // StreamFL.publish('test1')
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (!this.messages.length) {
        return;
      }
      if (scrollTop + clientHeight >= scrollHeight) {
        this.getChatMessages();
      } else if (scrollTop === 0 && !this.loadingMsg) {
        if (this.chatPage < this.chatPagesCount) {
          this.chatPage++;
        }
        this.getChatMessages();
      }
    },
    scrollDown() {
      let scrollingElement = this.$refs.chatBody;
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }
  },
  mounted() {
    this.onStart();
    this.onJoin();
    this.onLeave();
  },
  created() {
    setInterval(() => (this.now = moment()), 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeFunc);
  }
};
</script>
<style>
.notteacher .video-item video[datatype="local"] {
  display: none !important;
}
.btn-primary {
  margin: 16px !important;
}
</style>
