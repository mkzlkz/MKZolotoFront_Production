<template>
    <div>
        <a class="btn btn-close" href="/webinars">Закрыть</a>
        <div class="chat-instructor">
            <basic-vue-chat :initial-feed="feed" />
        </div>
  </div>
</template>

<script>
import basicVueChat from 'basic-vue-chat'

export default {
    name: 'InstructorChat',
    data () {
        return {
            feed: [
            {
              id: 1, //сообщения от второго лица
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
          ]
        }
    },
    components: {
        basicVueChat
    }
}
</script>