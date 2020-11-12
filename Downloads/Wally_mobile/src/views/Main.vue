<template>
    <div class="container main">
        <h1>План обучения</h1>
        <div class="plan-box">
            <p class="plan-text">Наименование плана</p>
            <p class="plan-subtext">{{plan.Name}}</p>
            <p class="plan-text" style="margin-top: 24px;">Способ проверки</p>
            <p class="plan-subtext">Экзамен</p>
            <p class="plan-text">Подразделение</p>
            <p class="plan-subtext">{{userInfo.Position.Name}}</p>
            <p class="plan-text">Сертификат</p>
            <p class="plan-subtext">{{plan.Certificate.Name}}</p>
            <p class="plan-text">Перечень должностей</p>
            <p class="plan-subtext">{{plan.Duty.join(',')}}</p>
        </div>
        <router-link v-for="type in types" :to="`/type/${type.ID}`" :key="type.ID">
            <div class="main-box">
                    <p class="main-text">{{type.Name}}</p>
                    <p class="main-subtext" v-for="row in rows" v-if="row.Typeid === type.ID">Часов: {{row.hours}}<br>% прохождения: {{row.percent}}%</p>
            </div>
        </router-link>
        <!-- <router-link to="/">
            <div class="test-box">
                <p class="test-text">Экзамен</p>
            </div>
        </router-link> -->
    </div>
</template>
<script>
export default {
    name: 'Main',
    data () {
        return {
            user: {},
            userInfo: [],
            plans: [],
            plan: {},
            themes: [],
            types: [],
            tests: [],
            eduTypes: [],
            isExamPassed: false,
            rows: [
                {
                id: 1,
                Typeid: 0,
                hours: 0,
                percent: 0,
                themes: []
                },
                {
                id: 2,
                Typeid: 0,
                hours: 0,
                percent: 0,
                themes: []
                },
                {
                id: 3,
                Typeid: 0,
                hours: '-',
                percent: 0
                }
            ]
        }
    },
    mounted () {
        this.getThemeTypes()
        this.getUser()
    },
    methods: {
        getUser () { //данные о пользователе
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
                    this.sortStatistic(response.data.statistic)
                    this.rows[2].percent = exam.PassMarks
                    if (exam.PassMarks) {
                        this.isExamPassed = true
                    }
                })
            },
        sortStatistic (statistic) {
            for (let stat of statistic) {
                if (stat.Typeid === 9) {
                this.rows[0].hours = stat.Hour
                this.rows[0].Typeid = stat.Typeid
                this.rows[0].percent = Math.round(stat.Percent * 10) / 10
                } else if (stat.Typeid === 10) {
                this.rows[1].hours = stat.Hour
                this.rows[1].Typeid = stat.Typeid
                this.rows[1].percent = Math.round(stat.Percent * 10) / 10
                }
            }
        },
        getThemeTypes () { //типы тем "производственное" и тд
            this.$axios.get(this.$axios.baseURL + '/api/gettopictype')
                .then(response => {
                    this.types = response.data.data
            })
        }


    }

}
</script>