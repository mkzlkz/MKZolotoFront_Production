<template>
    <div class="container production">
        <h2>Экзамены и тесты</h2>
        <div id="accordion" v-for="(test,index) in testsList" :key="index">
            <div class="card production-card">
                    <a class="card-link collapsed link-1" data-toggle="collapse" :href="`#collapse1${index}`">
                        {{test.Topic}}
                    </a>
                <div :id="`collapse1${index}`" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        <div class="card-content">
                            <div class="card-inside">
                                <p class="card-text">№</p>
                                <p class="card-subtext">{{test.ID}}</p>
                                <p class="card-text">Часов</p>
                                <p class="card-subtext">{{test.Duration}}</p>
                                <p class="card-text">Подразделение</p>
                                <p class="card-subtext">№943</p>
                                <p class="card-text">Дата</p>
                                <p class="card-subtext">{{test.Date | formatDate2}}</p>
                                <p class="card-text">Время</p>
                                <p class="card-subtext">{{test.Date | formatDate}}</p>
                                <p class="card-text">Статус</p>
                                <p class="card-subtext">{{test.Status}}</p>
                                <!-- <button class="btn btn-start" v-if="start===false" @click="startBtn()">Начать тестирование</button> -->
                                <div id="accordion2" v-if="start===true">
                                    <div class="card analytics-card">
                                            <a class="card-link btn collapsed btn-analytics" data-toggle="collapse" href="#collapseFour">
                                                Аналитика
                                            </a>
                                        <div id="collapseFour" class="collapse" data-parent="#accordion2">
                                            <div class="card-body">
                                                <div class="card-content">
                                                        <p class="test-text">Неправильные ответы по темам</p>
                                                        <p class="test-subtext" v-for="(item, index) in getFormattedAnalytics(test.Analytics)">{{item[0].Number}} - {{item[0].Name}}</p>
                                                        <p class="test-text">Правильные ответы по темам</p>
                                                        <p class="test-subtext" v-for="(item, index) in getFormattedAnalytics(test.Analytics)">{{item[1].Number}} - {{item[1].Name}}</p>
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'Test',
    data () {
        return {
            start: false,
            testsList: [],
            userInfo: []
        }
    },
    created () {
        this.getUser()
        this.getExams()
    },
    methods: {
        getUser () {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.$axios.get(this.$axios.baseURL + '/api/userinfo')
            .then(response => {
                this.userInfo = response.data.data
            })
        },
        getExams () { //вывод листа с тестами
            this.$axios.get(this.$axios.baseURL + '/api/exam/user/test')
            .then(response => {
                this.testsList = response.data.data
            })
        },
        getFormattedAnalytics (analytics) { //форматируем аналитикс
            let result = []
            for (let i = 0; i < analytics.length / 2; i++) {
                if (i === 0) { //если длина <= 2, записываем их в result
                    result[i] = [
                        analytics[0],
                        analytics[1]
                    ]
                } else if (i === 1) { //если длина <= 4, записываем дальше в result
                    result[i] = [
                        analytics[2],
                        analytics[3]
                    ]
                } else { //если длина >4 , записываем дальше
                    result[i] = [
                        analytics[(i * 2) - 2],
                        analytics[(i * 2) - 1]
                    ]
                }
            }
            console.log(result)
            return result
        },
        startBtn () {
            this.start = true
        }
    }
}
</script>