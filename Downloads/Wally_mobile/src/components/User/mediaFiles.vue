<template>
  <div class="padding-30">
    <div class="title">{{ $t('mediafiles') }}</div>
    <div class="mediaFiles clearfix" v-if="files">
      <div class="bx7" v-for="file in files" :key="file.ID">
        <div class="bx7-1">
          <img :src="require('@/assets/img/icon/file.svg')" alt="">
          <p><span>{{file.Name}}</span> <span>{{file.CreatedAt | momentDate}}</span></p>
        </div>
        <div class="bx7-2">
          <p>{{file.Size | size}}</p>
          <a download target="_blank" :href="file.Path"><img :src="require('@/assets/img/icon/save.svg')" alt=""></a>
        </div>
      </div>
    </div>
    <paginate
      v-model="page"
      :pageCount="pageCount"
      :clickHandler="onPageChange"
      :prevText="$t('prev')"
      :nextText="$t('next')"
      :containerClass="'pagination'"
      v-if="pageCount > 1"
    >
    </paginate>
    <loader v-if="!files" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'mediaFiles',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      page: 1,
      filesList: null,
      pageCount: 1
    }
  },
  filters: {
    momentDate (date) {
      return moment(date).format('DD.MM.YY HH:mm')
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
    files () {
      const list = this.filesList
      if (!list) {
        return null
      }
      return list.sort((a, b) => b.ID - a.ID)
    }
  },
  methods: {
    getMediaFiles () {
      this.$axios.get(this.$axios.baseURL + '/get/media?id=' + this.page)
        .then(response => {
          this.filesList = response.data.data
          this.pageCount = response.data.pages
        })
    },
    onPageChange () {
      this.getMediaFiles()
    }
  },
  mounted () {
    this.getMediaFiles()
  }
}
</script>

<style scoped>

</style>
