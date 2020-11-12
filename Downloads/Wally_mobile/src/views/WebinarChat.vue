<template>
  <div>
    <a class="btn btn-close" href="/webinars">Закрыть</a>
      <div class="chat">
          <basic-vue-chat :initial-feed="feed" />
      </div>
  </div>
</template>

<script>

import basicVueChat from 'basic-vue-chat'

export default {
    name: 'WebinarChat',
    data () {
        return {
          feed: [
            {
              id: 0,//сообщение от второго лица
              author: 'Me',
              contents: 'hi there',
              date: '16:30'
            },
            {
              id: 0,//сообщение от первого лица
              author: 'Me',
              contents: 'hello',
              date: '16:30'
            }
          ]
        }
    },
    components: {
        basicVueChat //чат
    }
}
</script>
