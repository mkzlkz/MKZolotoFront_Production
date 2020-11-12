<template>
    <div>
        <a class="btn btn-close" href="/webinars">Закрыть</a>
        <div class="timer">
            <span class="name">Наименование вебинара</span>
            <span class="date">Дата вебинара: 28.09.19</span>
        </div>
        <div class="chat" id="chat-questions">
            <basic-vue-chat :initial-feed="feed" />
            <div class="loaded-file" id="loaded-file-ask">
              <img src="../assets/img/icon/ic_file.png" class="file-img">
              <div class="file-text">
                  <p class="text">Документ от учителя</p>
                  <p class="subtext">15:55 | 29.05.20</p>
              </div>
              <div class="load">
                <span>11мб</span>
                <button class="btn btn-download"><img src="../assets/img/icon/ic_download.png" class="img-load"></button>
            </div>
          </div>
          <div class="input-row">
                <input id="fileUpload" class="load-doc" placeholder="Задать вопрос" v-if="loaded===false">
                <div class="file-loaded" v-if="loaded===true">
                    <img src="../assets/img/icon/ic_file.png" class="file-img">
                    <div class="doc-text">
                        <p class="text">Мой документ наименование</p>
                        <p class="subtext">6МБ</p>
                    </div>
                </div>
                <button class="btn-send" v-if="loaded===false"><img src="../assets/img/icon/ic_send.png"> </button>
                <input class="btn-load" @click="chooseFiles()" type="file" v-if="loaded===false">
                <button class="btn-send-2" v-if="loaded===true"><img src="../assets/img/icon/ic_send.png"> </button>
                <button class="btn-send-2" v-if="loaded===true"><img src="../assets/img/icon/ic_calcel@1x.png"> </button>
            </div>
        </div>
  </div>
</template>

<script>
import basicVueChat from 'basic-vue-chat'

export default {
    name: 'WebinarAsk',
    data () {
        return {
            loaded: false,
            feed: [
            {
              id: 1, //сообщение от второго лица
              author: 'Person',
              contents: 'hi there',
              date: '16:30'
            },
            {
              id: 0, //сообщение от первого лица
              author: 'Me',
              contents: 'hello',
              date: '16:30'
            }
          ]
        }
    },
    methods: {
        chooseFiles() { //метод для загрузки файлов
            document.getElementById("fileUpload").click()
            this.loaded = true
        }
    },
    components: {
        basicVueChat //чат
    }
}
</script>