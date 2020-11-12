<template>
   <div>
        <a class="btn btn-close" href="/webinars">Закрыть</a>
        <div class="container mediafiles" style="margin-top:0;">
            <div class="doc-container" v-for="doc in docs">
                <img src="../assets/img/icon/ic_file.png" class="file">
                <div class="doc">
                    <p class="text">Документ 1</p>
                    <p class="subtext">09:09</p>
                </div>
                <div class="load">
                    <span>11мб</span>
                    <button class="btn btn-download"><img src="../assets/img/icon/ic-cancel.svg" class="img-load"></button>
                </div>
            </div>
            <div class="input-row">
                <input id="fileUpload" class="load-doc" placeholder="Выберите файл" v-if="loaded===false">
                <div class="file-loaded" v-if="loaded===true">
                    <img src="../assets/img/icon/ic_file.png" class="file-img">
                    <div class="doc-text">
                        <p class="text">Мой документ наименование</p>
                        <p class="subtext">6МБ</p>
                    </div>
                </div>
                <input class="btn-load" @click="chooseFiles()" type="file" v-if="loaded===false">
                <button class="btn-send" v-if="loaded===true"><img src="../assets/img/icon/ic_send.png"> </button>
                <button class="btn-send" v-if="loaded===true"><img src="../assets/img/icon/ic_calcel@1x.png"> </button>
                    <!-- <img src="../assets/img/icon/ic_attach@1x.png"> -->
            </div>
        </div>
    </div>
</template>

<script>
import basicVueChat from 'basic-vue-chat'

export default {
    name: 'InstructorDoc',
    data () {
        return {
            docs: [1,1,1],
            feed: [
            {
              id: 1,//сообщения от второго лица
              author: 'Person',
              contents: 'hi there',
              date: '16:30'
            },
            {
              id: 0,//сообщения от первого лица
              author: 'Me',
              contents: 'hello',
              date: '16:30'
            }
          ],
          loaded: false
        }
    },
    methods: {
        chooseFiles() { // метод для загрузки файла
            document.getElementById("fileUpload").click()
            this.loaded = true
        }
    },
    components: {
        basicVueChat
    }
}
</script>