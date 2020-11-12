<template>
    <div class="container production">
        <div style="display:flex">
            <router-link to="/main">
                <img src="../assets/img/icon/path-2@2x.png" class="arrow">
            </router-link>
            <h1>{{currentType.Name}}</h1>
        </div>    
        <div id="accordion" v-for="(theme, index) in  themeType">
            <div class="card production-card">
                    <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="'#collapseOne' + index">
                        {{theme.Topic}}
                    </a>
                <div :id="'collapseOne' + index" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        <div class="card-content">
                            <div class="card-inside">
                                <p class="card-text">№</p>
                                <p class="card-subtext">{{theme.ID}}</p>
                                <p class="card-text">Часов</p>
                                <p class="card-subtext">{{theme.Studyhour}}</p>
                                <p class="card-text">Подразделение</p>
                                <p class="card-subtext">№943</p>
                                <p class="card-text">Дата</p>
                                <p class="card-subtext">{{theme.Date | formatDate2}}</p>
                                <p class="card-text">Время</p>
                                <p class="card-subtext">{{theme.Date | formatDate}}</p>
                                <p class="card-text">Статус</p>
                                <p class="card-subtext">Не пройден</p>
                                <div id="accordion2">
                                    <div class="card production-card-2">
                                        <a class="btn collapsed card-link" data-toggle="collapse" :href="'#collapseTwo' + index" aria-expanded="true">О теме</a>
                                        <div :id="'collapseTwo' + index" class="collapse" data-parent="#accordion2">
                                            <div class="card-body">
                                                <p class="card-text-2">План обучения</p>
                                                <p class="card-subtext-2">{{plan.Name}}</p>
                                                <p class="card-text-2">Тип урока</p>
                                                <p class="card-subtext-2">{{theme.TextOne}}</p>
                                                <p class="card-text-2">Тип урока</p>
                                                <p class="card-subtext-2">{{theme.TextTwo}}</p>
                                                <p class="card-text-2">План изложения</p>
                                                <p class="card-subtext-2">{{theme.TextThree}}</p>
                                                <p class="card-text-2">Пособия</p>
                                                <p class="card-subtext-2">{{theme.Thematic}}</p>
                                                <p class="card-text-2">Оборудование</p>
                                                <p class="card-subtext-2">{{theme.TextOne}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="accordion3">
                                    <div class="card production-card-2">
                                            <a class="btn collapsed card-link" data-toggle="collapse" :href="'#collapseThree' + index">
                                                О тесте 
                                            </a>
                                        <div :id="'collapseThree' + index" class="collapse" data-parent="#accordion3">
                                            <div class="card-body">
                                                <p class="card-text-2">Наименование</p>
                                                <p class="card-subtext-2">{{theme.Tests[0].Name}}</p>
                                                <p class="card-text-2">Условия прохождения</p>
                                                <p class="card-subtext-2">{{theme.Tests[0].PassMarks}}</p>
                                                <p class="card-text-2">Продолжительность</p>
                                                <p class="card-subtext-2">{{theme.Tests[0].Duration}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <a class="btn btn-box" href="/test">Экзамен</a> -->
    </div>
</template>

<script>
export default {
    name: 'Production',
    data () {
        return {
            opened: [],
            user: {},
            userInfo: [],
            plans: [],
            plan: {},
            themes: [],
            totalHours: 0,
            types: [],
            type: {},
            tests: [],
            isExamPassed: false
        }
    },
    mounted () {
        this.getThemeTypes()
        this.getUser()
    },
    computed: {
        themeType () { //вывод тем по секции
            let theme = []
            for(let i=0; i<this.themes.length; i++) {
                if (this.themes[i].TypeID == this.$route.params.id) {
                    theme[i] = this.themes[i]
                }
            }
            return theme
            
        },
        currentType () { //вывод секции по id
            for (let i=0;i<this.types.length; i++){
                if(this.types[i].ID == this.$route.params.id) {
                    this.type = this.types[i]
                }
            }            
            return this.type
        }
    },
    methods: {
        getUser () {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.$axios.get(this.$axios.baseURL + '/api/userinfo')
            .then(response => {
                this.userInfo = response.data.data
                this.plan = this.userInfo.Plans[0]
                this.getThemes()
            })
        },
        getThemes () {
            this.$axios.get(this.$axios.baseURL + '/api/subject/plantopics')
            .then(response => {
                let exam = response.data.exam
                this.themes = response.data.data                
                if (exam.PassMarks) {
                    this.isExamPassed = true
                }
            })
        },
        getThemeTypes () {
            this.$axios.get(this.$axios.baseURL + '/api/gettopictype')
                .then(response => {
                    this.types = response.data.data
                    
            })
        }
    }

}
</script>