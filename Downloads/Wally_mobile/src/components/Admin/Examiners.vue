<template>
  <div class="examiners padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('examiners') }}</div>
      <router-link to="/admin/create-examiner" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')"
                                                                        alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="examiners-box" v-for="examiner in examiners" :key="examiner.ID">
      <div class="examiners-1">
        <div class="ex-img"><img :src="getImgPath(examiner.Photos)" alt=""></div>
        <div class="ex-text">
          <div class="ex-1">
            <span>{{ $t('nomination') }}</span>
            <p>{{examiner.Fullname}}</p>
          </div>
          <div class="ex-1">
            <span>{{ $t('every_auth_date') }}</span>
            <!--<p>03.09.19 | 10:20</p>-->
          </div>
        </div>
        <div class="ex-text">
          <div class="ex-1">
            <span>{{ $t('registration_datetime') }}</span>
            <p>{{examiner.Date | momentDate}}</p>
          </div>
          <div class="ex-1">
            <span>{{ $t('list_attached_exams') }}</span>
           <!-- <p>Экзамен 1</p>-->
          </div>
        </div>
        <div class="ex-text">
          <div class="ex-1">
            <span>{{ $t('iin') }}</span>
            <p>{{examiner.IIN}}</p>
          </div>
        </div>
      </div>
      <div class="examiners-2">
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/download.svg')" alt=""> {{ $t('download') }} {{ $t('ecp') }}</a>
        <router-link tag="button" :to="'/admin/edit-examiner/' + examiner.ID" class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt="">{{ $t('change') }}</router-link>
        <button @click="deleteExaminer(examiner.ID)" class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt="">{{ $t('remove') }}</button>
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Examiners',
  data () {
    return {
      examiners: [],
      page: 1,
      pageCount: 1
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  methods: {
    getExaminers () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?role=2&page=' + this.page)
        .then(response => {
          this.examiners = response.data.data
          this.pageCount = response.data.pages
        })
    },
    deleteExaminer (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/user/deleteuser/' + id)
        .then(() => {
          this.examiners = this.examiners.filter(e => e.ID !== id)
        })
    },
    getImgPath (imgs) {
      if (imgs && imgs.length) {
        return this.$axios.baseOriginURL + '/' + imgs[0].Path
      } else {
        return require('@/assets/img/pros.svg')
      }
    },
    onPageChange () {
      this.getExaminers()
    }
  },
  mounted () {
    this.getExaminers()
  }
}
</script>
