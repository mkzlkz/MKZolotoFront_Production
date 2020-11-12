<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/users"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('new_user') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('fio_small') }}</span>
          <input type="text" :placeholder="$t('user_fio')" v-model="fullname">
        </div>
        <div class="form-1">
          <span>{{ $t('subdivision') }}</span>
          <select name="dept" id="dept" v-model="deptId">
            <option :value="item.ID" v-for="(item, index) in depts" :key="index">{{item.Name}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('position') }}</span>
          <select name="" id="duty" v-model="positionID">
            <option selected disabled>{{ $t('select_position') }}</option>
            <option :value="item.ID" v-for="(item, index) in dutys" :key="index">{{item.Name}}</option>
          </select>
        </div>
        <div class="form-1" v-if="userTypes">
          <span>{{ $t('user_type') }}</span>
          <select name="type" id="name" v-model="TypeID">
            <option v-for="(item, index) in userTypes" :key="index" :value="item.ID">{{item.Name}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('iin') }}</span>
          <input type="text" :placeholder="$t('user_iin')" v-model="iin">
        </div>
        <div class="form-1">
          <span>{{ $t('personnel_number') }}</span>
          <input type="text" :placeholder="$t('personnel_number')" v-model="tabel">
        </div>

        <uploadFiles
          v-model="photos"
          title="Фотографии"
          :multiple="true"
          :uploadFileSize="1000000"
          :mimeType="['image/jpeg', 'image/png']"
          help="Файл не должен превышать 1 Мегабайта"
        />


        <div class="form-1">
          <span>{{ $t('timetable') }}</span>
          <select name="" id="planId" v-model="planID">
            <option :value="item.ID" v-for="(item, index) in plans" :key="index">{{item.Plan}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('login') }}</span>
          <input type="text" :placeholder="$t('user_name')" v-model="username">
        </div>

        <div class="form-1">
          <span>{{ $t('password') }}</span>
          <input type="password" :placeholder="$t('password')" v-model="password">
        </div>
        <p class="error" v-if="error">{{error}}</p>
        <Button :text="$t('create')" @click="createUser" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'CreateUser',
  components: {
    uploadFiles: () => import('../Template/uploadFile'),
    Button: () => import('../Template/Button')
  },
  data: function () {
    return {
      plans: [],
      depts: [],
      dutys: [],
      photos: [],
      userTypes: [],
      fullname: '',
      deptId: 1,
      dutyId: 1,
      typeID: 1,
      tabel: '',
      iin: '',
      password: '',
      error: '',
      planID: null,
      username: '',
      loading: false,
      positionID:1
    }
  },
  mounted: function () {
    this.getPlansList()
    this.getDeptList()
    this.getDutyList()
    this.getUserTypeList()
  },
  methods: {
    createUser: function () {
      var formData = {
        'fullname': this.fullname,
        'deptId': this.deptId,
        'positionID': this.positionID,
        'IDNumber': this.tabel,
        'Plans': [{
          'ID': this.planID
        }],
        'username': this.username,
        'password': this.password,
        'iin': this.iin,
        'TypeID': this.TypeID

      }
      console.log(formData)
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/user/new', formData).then(response => {
        if (response.data.status) {
          const userID = response.data.user.ID
          this.uploadFiles(userID, 0)
        } else {
          this.loading = false
          this.error = response.data.message
        }
      })
    },
    uploadFiles (userID, index) {
      const file = this.photos[index]
      if (file) {
        let formData = new FormData()
        formData.append('file', file)
        formData.append('UserID', userID)
        this.$axios.post(this.$axios.baseURL + '/uploadI', formData)
          .then(() => this.uploadFiles(userID, ++index))
      } else {
        this.$router.push( '/admin/users')
      }
    },

    getPlansList: function () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplans')
        .then(response => {
          this.plans = response.data.data
        })
    },
    getDeptList: function () {
      this.$axios.get(this.$axios.baseURL + '/dictionary/get/dept')
        .then(response => {
          this.depts = response.data.items
        }).catch(e => {
          alert(e.message)
          this.error = e.message
        })
    },
    getDutyList: function () {
      this.$axios.get(this.$axios.baseURL + '/dictionary/get/duty')
        .then(response => {
          this.dutys = response.data.items
          this.dutyID = this.dutys[0].ID
        }).catch(e => {
          this.error = e.message
        })
    },
    getUserTypeList () {
      this.$axios.get(this.$axios.baseURL + '/api/getusertype')
        .then(response => {
          this.userTypes = response.data.data
          this.TypeID = this.userTypes[0].ID
        })
    },
    photoDetect: function () {
      this.photos = this.$refs.photos.files
      this.photosTitle = ''
      for (let i = 0; i < this.$refs.photos.files.length; i++) {
        this.photosTitle += this.$refs.photos.files[i].name + ' '
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color: #b40000;
  }

</style>
