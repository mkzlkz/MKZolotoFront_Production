<template>
    <div class="themes padding-30">
        <div class="title-flex mb-20">
            <div class="title">{{ $t('themes') }}</div>
            <div class="dflex">
                <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('export') }}
                    SCORM</a>
                <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('import') }}
                    SCORM</a>
                <router-link to="/admin/create-themes" class="button-blue"><img
                        :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
                </router-link>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-main">
                <tr>
                    <th class="width-1">#</th>
                    <th class="width-2">{{ $t('nomination_theme') }}</th>
                    <th class="width-3">{{ $t('theme_type') }}</th>
                    <th class="width-4">{{ $t('timetable') }}</th>
                    <th class="width-5">{{ $t('verification_method') }}</th>
                    <th class="width-6">{{ $t('education_times') }}</th>
                    <!--<th class="width-7">{{ $t('date') }}</th>-->
                    <!--<th class="width-8">{{ $t('time') }}</th>-->
                    <th class="width-9"></th>
                    <th class="width-10"></th>
                    <th class="width-11"></th>
                </tr>
                <tr v-for="theme in themes">
                    <td class="width-1"><span class="number">{{theme.Number}}</span></td>
                    <td class="width-2">{{theme.Topic}}</td>
                    <td class="width-3">{{ $t('theoretical_1') }}</td>
                    <td class="width-4">{{theme.Plan}}</td>
                    <td class="width-5">{{ $t('testing') }}</td>
                    <td class="width-6">{{theme.Studyhour}} {{ $t('hrs') }}</td>
                    <!--<td class="width-7">01.01.18</td>-->
                    <!--<td class="width-8">18:00</td>-->
                    <td class="width-9">
                        <div class="dropdown">
                            <button class="dropdown-toggle button-blue-purple" data-toggle="dropdown"
                                    data-boundary="window" aria-haspopup="true" aria-expanded="false">{{ $t('more') }}
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button type="button" class="close" aria-hidden="true">x</button>
                                <div class="title-d">{{ $t('theme_info') }}</div>
                                <table>
                                    <tr>
                                        <th>{{ $t('theme_1') }}</th>
                                        <th>{{ $t('lesson_type') }}</th>
                                        <th>{{ $t('lesson_plan') }}</th>
                                    </tr>
                                    <tr>
                                        <td>{{theme.Thematic}}</td>
                                        <td>{{ $t('theoretical_1') }}</td>
                                        <td>{{theme.TextOne}}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ $t('outline') }}</th>
                                        <th>{{ $t('benefits') }}</th>
                                        <th>{{ $t('equipment') }}</th>
                                    </tr>
                                    <tr>
                                        <td>{{theme.TextTwo}}</td>
                                        <td>{{theme.TextThree}}</td>
                                        <td>-</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td class="width-10">
                        <router-link :to="'/admin/edit-theme/' + theme.ID">
                            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt="">
                            </button>
                        </router-link>
                    </td>
                    <td class="width-11">
                        <button @click="deleteTheme(theme.ID)" class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt="">
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Themes',
  data () {
    return {
      'themes': []
    }
  },
  mounted () {
    this.getThemes()
  },
  methods: {
    getThemes () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopics')
        .then(response => {
          this.themes = response.data.data
        })
    },
    deleteTheme (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/subject/deletetopic/' + id)
        .then(response => {
          this.themes = this.themes.filter(e => e.ID !== id)
        })
    }
  }
}
</script>

<style scoped>

</style>
