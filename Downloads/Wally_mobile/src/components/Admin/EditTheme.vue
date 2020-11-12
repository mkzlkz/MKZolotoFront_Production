<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/themes"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('change_theme') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('theme_number') }}</span>
          <input type="text" :placeholder="$t('theme_number')" v-model="IDNumber">
        </div>
        <div class="form-1">
          <span>{{ $t('timetable') }}</span>
          <select name="" id="PlanID" v-model="PlanID">
            <option :value="plan.ID" v-for="plan in plans" :key="plan.ID">{{plan.Plan}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_theme') }}</span>
          <input type="text" :placeholder="$t('name')" v-model="Name">
        </div>

        <div class="form-1">
          <span>{{ $t('education_type') }}</span>
          <select name="" id="TypeID" v-model="TypeID">
            <option :value="type.ID" v-for="type in types" :key="type.ID">{{type.Name}}</option>
          </select>
        </div>

        <div class="form-1">
          <span>{{ $t('education_type_1') }}</span>
          <select name="eduType" id="EduTypeID" v-model="EduType">
            <option :value="type.ID" v-for="type in eduTypes" :key="type.ID">{{type.Name}}</option>
          </select>
        </div>

        <div class="form-1">
          <span>{{ $t('training_number') }}</span>
          <input type="text" :placeholder="$t('serial_number')" v-model="Position">
        </div>
        <div class="form-1">
          <span>{{ $t('theme_description') }}</span>
          <textarea :placeholder="$t('short_description')" v-model="Description"></textarea>
        </div>
        <div class="form-1">
          <span>{{ $t('theme_1') }}</span>
          <input type="text" :placeholder="$t('theme_1')" v-model="Thematic">
        </div>
        <div class="form-1">
          <span>{{ $t('lesson_plan') }}</span>
          <input type="text" :placeholder="$t('lesson_plan')" v-model="TextOne">
        </div>
        <div class="form-1">
          <span>{{ $t('new_material_outline') }}</span>
          <input type="text" :placeholder="$t('new_material_outline')" v-model="TextTwo">
        </div>
        <div class="form-1">
          <span>{{$t('list_equipment_used')}}</span>
          <input type="text" :placeholder="$t('list_equipment_used')"  v-model="TextThree">
        </div>
        <div class="form-1">
          <span>{{ $t('list_educational_aids') }}</span>
          <input type="text" :placeholder="$t('list_educational_aids')"  v-model="TextFour">
        </div>
        <div class="form-1">
          <span>{{ $t('count_hours_study') }}</span>
          <input type="text" :placeholder="$t('count_hours_study')" v-model="TotalHour">
        </div>
        <button class="button-blue" @click="editTheme">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditTheme',
  data () {
    return {
      PlanID: null,
      Name: '',
      Position: 0,
      Description: '',
      IDNumber: '',
      Thematic: '',
      TextOne: '',
      TextTwo: '',
      TextThree: '',
      TotalHour: 0,
      error: '',
      TextFour: '',
      plans: [],
      themeId: this.$route.params.id,
      TypeID: null,
      types: [],
      eduTypes: [],
      EduType: null
    }
  },
  mounted () {
    this.getTheme()
    this.getPlansList()
    this.getThemeTypes()
    this.getEduTypes()
  },
  methods: {
    getPlansList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplans')
        .then(response => {
          this.plans = response.data.data
        })
    },
    getTheme () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopic/' + this.themeId)
        .then(response => {
          let theme = response.data.data
          this.IDNumber = theme.IDNumber
          this.PlanID = theme.PlanID
          this.Name = theme.Name
          this.Position = theme.Position
          this.Description = theme.Description
          this.Thematic = theme.Thematic
          this.TextOne = theme.TextOne
          this.TextTwo = theme.TextTwo
          this.TextThree = theme.TextThree
          this.TotalHour = theme.TotalHour
          this.TypeID = theme.TypeID
          this.EduType = theme.EduType
        })
    },
    editTheme () {
      let formData = {
        PlanID: this.PlanID,
        Name: this.Name,
        Position: parseInt(this.Position, 10),
        Description: this.Description,
        IDNumber: this.IDNumber,
        Thematic: this.Thematic,
        TextOne: this.TextOne,
        TextTwo: this.TextTwo,
        TextThree: this.TextThree,
        TotalHour: parseInt(this.TotalHour, 10),
        TextFour: this.TextFour,
        TypeID: this.TypeID,
        EduType: this.EduType
      }
      this.$axios.put(this.$axios.baseURL + '/api/subject/updatetopic/' + this.themeId, formData)
        .then(r => {
          if (!r.data.status) {
            this.error = r.data.message
          } else {
            this.$router.push('/admin/themes')
          }
        })
    },
    getThemeTypes () {
      this.$axios.get(this.$axios.baseURL + '/api/gettopictype')
        .then(response => {
          this.types = response.data.data
        })
    },
    getEduTypes () {
      this.$axios.get(this.$axios.baseURL + '/api/gettopicedutype')
        .then(response => {
          this.eduTypes = response.data.data
        })
    }
  }
}
</script>
