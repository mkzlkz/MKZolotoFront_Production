<template>
  <div class="usersAdmin padding-30">
    <div class="title-flex">
      <div class="title">{{ $t('users') }}</div>
      <div class="dflex">
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('import_database') }}</a>
        <router-link to="/admin/create-user" class="button-blue"><img
          :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create_user') }}
        </router-link>
      </div>
    </div>
    <div class="box-2">
      <div class="table-responsive">
        <table class="table table1">
          <tr>
            <th class="width-1">ID</th>
            <th class="width-2">{{ $t('FIO_long') }}</th>
            <th class="width-3">{{ $t('plan') }}</th>
            <th class="width-4">{{ $t('position') }}</th>
            <th class="width-5">{{ $t('iin') }}</th>
            <th class="width-6">{{ $t('time_sheet') }}</th>
            <th class="width-7">{{ $t('registration_date') }}</th>
            <th class="width-8">{{ $t('availability_photo') }}</th>
            <th class="width-9">{{ $t('timetable') }}</th>
            <th class="width-10"></th>
          </tr>
        </table>
      </div>
      <div class="table-content" v-for="user in users" :key="user.ID">
        <div class="table-responsive">
          <table class="table table3">
            <tr>
              <td class="width-1">{{user.ID}}</td>
              <td class="width-2">{{user.Fullname}}</td>
              <td class="width-3">{{user.Department}}</td>
              <td class="width-4">{{user.Duty}}</td>
              <td class="width-5">{{user.IIN}}</td>
              <td class="width-6">{{user.Tabel}}</td>
              <td class="width-7">{{user.Date | momentDate}}</td>
              <td class="width-8">
                <img :src="require('@/assets/img/icon/suc.svg')" alt="" v-if="user.PhotoStatus">
                <img :src="require('@/assets/img/icon/denied.svg')" alt="" v-else>
              </td>
              <td class="width-9">
                <img :src="require('@/assets/img/icon/suc.svg')" alt="" v-if="user.PlanStatus">
                <img :src="require('@/assets/img/icon/denied.svg')" alt="" v-else>
              </td>
              <td class="width-10">
                <button class="button-blue-purple" @click="toggle(user.ID)"
                        :class="{ opened: opened.includes(user.ID) }">{{ $t('more') }}
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div class="table3" v-if="opened.includes(user.ID)">
          <div class="users-admin-box">
            <div class="users-admin-box-title">
              <div class="dflex">
                <p>{{ $t('user_photos') }}</p>
                <div class="files">
                  <input type="file" :id="'file' + user.ID" :ref="'file' + user.ID" @change="addUserImage(user)">
                  <label :for="'file' + user.ID" class="button-blue-purple">{{ $t('upload_photo') }}</label>
                </div>
                <div class="files" style="margin-left: 12px">
                  <div class="dropdown calendar">
                    <button class="dropdown-toggle button-blue-purple" @click="changeNewPlan(user.PlanID)"
                            data-toggle="dropdown" data-boundary="window"
                            aria-haspopup="true" aria-expanded="false">{{ $t('attach_plan') }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" @click="preventClose($event)">
                      <button type="button" class="close" aria-hidden="true" >x</button>
                      <div class="title-d">{{ $t('attach_plan') }}</div>
                      <div class="name-test">
                        <span>{{ $t('nomination') }}</span>
                        <select style="cursor:pointer;" name="planName" :id="'planName' + user.ID" v-model="newPlan">
                          <option v-for="plan in plans" :key="plan.ID" :value="plan.ID">
                            {{plan.Plan}}
                          </option>
                        </select>
                      </div>
                      <button class="button-blue" @click="addNewPlan(user.ID)">{{ $t('attach') }}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  class="button-none-purple"
                  data-toggle="modal"
                  data-target="#modal-change-password"
                  @click="activeUser = user"
                >
                  {{ $t('change_password') }}
                </button>
                <button class="button-none-red" v-if="!user.IsBlocked" @click="blockUser(user.ID)">{{ $t('block') }}
                </button>
                <button class="button-none-red" v-if="user.IsBlocked" @click="unblockUser(user.ID)">{{ $t('unlock') }}
                </button>
              </div>
            </div>
            <div class="users-admin-box-img">

              <div v-for="(photo, index) in user.Photos" :key="index" class="img mr-2">
                <img :src="$axios.baseOriginURL + '/' + photo.Path" alt="" class="img-ps">
                <button @click="deleteUserImage(photo.ID)">
                  <img :src="require('@/assets/img/icon/delete-red.svg')" alt="">
                </button>
                <span>{{photo.Name}}</span>
              </div>
            </div>
            <div class="users-admin-box-journal">
              <div class="title-us"><span>{{ $t('gradebook') }}</span>
              </div>
              <div class="table-responsive">
                <table class="table table-main table-main-2" v-if="user.Journal && user.Journal.length">
                  <tr>
                    <th>{{ $t('nomination_test') }}</th>
                    <th>{{ $t('type') }}</th>
                    <th>{{ $t('number') }}</th>
                    <th>{{ $t('theme_1') }}</th>
                    <th>{{ $t('hours_cnt')}}</th>
                    <th>{{ $t('webinar') }}</th>
                    <th>{{ $t('result') }}</th>
                    <th></th>
                  </tr>
                  <tr v-for="(journal, index) in user.Journal" :key="index">
                    <td v-html="journal.Tests ? journal.Tests[0].Name : ''"></td>
                    <td>{{journal.Type}}</td>
                    <td>{{journal.Number}}</td>
                    <td>{{journal.Thematic}}</td>
                    <td>{{journal.Studyhour}}ч</td>
                    <td>Да</td>
                    <td>
                      {{journal.Results.Passed}} из {{journal.Results.Total}}
                      <router-link
                        tag="button" :to="'/admin/visitors-log-user/1/' + user.id"
                        v-if="journal.Tests && journal.Tests.length > 1" class="next">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                      </router-link>
                    </td>
                    <td>
                      <div class="dropdown calendar" v-if="journal.Tests">
                        <button class="dropdown-toggle button-blue-purple"
                                data-toggle="dropdown" data-boundary="window"
                                aria-haspopup="true" aria-expanded="false">{{ $t('assign_retake') }}
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" @click="preventClose($event)">
                          <button type="button" class="close" aria-hidden="true">x</button>
                          <div class="title-d">{{ $t('assign_retake') }}</div>
                          <div class="calen">
                            <div class="cal"><span>{{ $t('date') }}</span>
                              <date-picker v-model="value1" lang="ru"
                                           format="DD.MM.YYYY"
                                           placeholder="08.08.2019"></date-picker>
                            </div>
                            <div class="cal cal-time"><span>{{ $t('time') }}</span>
                              <date-picker v-model="value2" lang="ru" type="time"
                                           format="HH:mm"
                                           placeholder="15:00" :show-second="false"></date-picker>
                            </div>
                          </div>
                          <button class="button-blue" @click="createRetake(user, journal)">{{ $t('assign') }}</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="users-admin-box-list">
              <div class="title-us"><span>{{ $t('assign_retakes_list') }}</span></div>
              <div class="table-responsive">
                <table class="table table-main table-main-2" v-if="user.Retake && user.Retake.length">
                  <tr>
                    <th>{{ $t('theme') }}</th>
                    <th>{{ $t('type') }}</th>
                    <th>{{ $t('number') }}</th>
                    <th>{{ $t('theme_1') }}</th>
                    <th>{{ $t('date') }}</th>
                    <th>{{ $t('time') }}</th>
                    <th></th>
                  </tr>
                  <tr v-for="retake in user.Retake" :key="retake.ID">
                    <td>{{retake.Info.Plan}}</td>
                    <td>{{retake.Info.Type}}</td>
                    <td>{{retake.Info.Number}}</td>
                    <td>{{retake.Info.Thematic}}</td>
                    <td>{{retake.Date | momentDateRetake}}</td>
                    <td>{{retake.Date | momentTime}}</td>
                    <td>
                      <button class="button-blue-purple" @click="cancelRetake(retake.ID)">{{ $t('cancel') }}</button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
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
    <div class="modal-window">
      <div id="modal-change-password" class="modal fade">
        <div class="modal-dialog modal-dialog-10">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
              <div>
                <div class="form-1">
                  <p>{{ $t('new_password') }}</p>
                  <input type="password" :placeholder="$t('new_password')" v-model="password">
                </div>
                <div class="form-1">
                  <p>{{ $t('repeat_new_password') }}</p>
                  <input type="password" :placeholder="$t('repeat_new_password')" v-model="passwordCheck">
                </div>
                <button class="button-blue" @click="updatePassword">{{ $t('save') }}</button>
                <span class="small text-danger" v-if="passwordError">{{passwordError}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'

export default {
  name: 'UsersAdmin',
  components: {DatePicker},
  data () {
    return {
      opened: [],
      newPlan:0,
      users: [],
      value1: '',
      value2: '',
      file: null,
      activeUser: null,
      password: '',
      passwordCheck: '',
      passwordError: '',
      page: 1,
      pageCount: 1,
      error: null,
      plans: []
    }
  },
  mounted () {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation()
    })
    this.getUsers()
    this.getPlans()
  },
  filters: {
    momentDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    momentDateRetake (date) {
      return moment(date).format('DD.MM.YYYY')
    },
    momentTime (data) {
      return moment(data).format('HH:mm')
    }
  },
  computed: {
    beginTime () {
      return moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
    }
  },
  methods: {
    preventClose (e) {
      e.stopPropagation()
    },
    changeNewPlan(id) {
      console.log("chenged to the new plan ",id)
      this.newPlan = id;
    },
    getUsers () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?page=' + this.page)
        .then(response => {
          this.users = response.data.data
          this.pageCount = response.data.pages
        })
    },
    toggle (id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
    addUserImage (user) {
      this.file = this.$refs['file' + user.ID][0].files
      let formData = new FormData()
      formData.append('file', this.file[0])
      formData.append('UserID', user.ID)
      this.$axios.post(this.$axios.baseURL + '/uploadI', formData)
        .then(() => {
          this.file = null
          this.getUsers()
        })
    },
    deleteUserImage (id) {
      this.$axios.delete(this.$axios.baseURL + '/delete/image/id:' + id)
        .then(() => this.getUsers())
    },
    updatePassword () {
      if (this.password !== this.passwordCheck) {
        this.passwordError = 'Passwords are not matching'
      } else {
        this.$axios.put(this.$axios.baseURL + '/api/user/adminchangepass', {
          Newpassword: this.password,
          UserID: parseInt(this.activeUser.ID)
        })
          .then(() => {
            this.password = ''
            this.passwordCheck = ''
            this.activeUser = null
          })
      }
    },
    onPageChange () {
      this.getUsers()
    },
    blockUser (id) {
      this.$axios.put(this.$axios.baseURL + '/api/user/updateuser/' + id, {IsBlocked: true})
        .then(() => {
          this.getUsers()
        })
    },
    unblockUser (id) {
      this.$axios.put(this.$axios.baseURL + '/api/user/updateuser/' + id, {IsBlocked: false})
        .then(() => {
          this.getUsers()
        })
    },
    createRetake (user, journal) {
      let data = {
        UserID: user.ID,
        TestID: journal.Tests[0].ID,
        Date: this.beginTime
      }
      this.$axios.post(this.$axios.baseURL + '/api/retake/new', data)
        .then(response => {
          if (response.data.status) {
            this.value1 = ''
            this.value2 = ''
          } else {
            this.error = response.data.message
          }
        })
    },
    cancelRetake (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/retake/delete/id:' + id)
        .then(() => {
          this.getUsers()
        })
    },
    getPlans () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplans')
        .then(response => {
          this.plans = response.data.data
          this.newPlan = this.plans[0].ID
        })
    },
    addNewPlan (id) {

      this.$axios.put(this.$axios.baseURL + '/api/user/updateplanuser/' + id, {PlanID: this.newPlan})
        .then(response => {
          this.getUsers()
        })
    }
  }
}
</script>
