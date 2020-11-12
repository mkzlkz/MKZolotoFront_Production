<template>
     <div>
        <a class="btn btn-close" href="/webinar-main">Закрыть</a>
        <div class="container production production-2" style="margin-top: 0;">
            <div id="accordion" v-for="(test, index) in tests">
                <div class="card production-card">
                    <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="'#collapseThree'+index">
                        {{test.Test}}
                    </a>
                    <div :id="'collapseThree'+index" class="collapse" data-parent="#accordion">
                        <div class="card-body">
                            <div class="card-content">
                                <div class="card-inside">
                                    <p class="card-text">Наименование темы</p>
                                    <p class="card-subtext">{{test.Topic}}</p>
                                    <p class="card-text">Длительность</p>
                                    <p class="card-subtext">{{test.Duration}}</p>
                                    <p class="card-text">Вопросов</p>
                                    <p class="card-subtext">{{test.Questions}}</p>
                                    <p class="card-text" v-if="test.Status!=='done'">Статус</p>
                                    <p class="card-subtext" v-if="test.Status!=='done'">{{test.Status}}</p>
                                    <p class="card-text">Результат</p>
                                    <p class="card-subtext" v-if="start===false">-</p>
                                    <p class="card-subtext" v-if="start===true">{{test.Result}}</p>
                                    <p class="card-subtext" v-if="test.Status === 'Пройден'">20 из 30</p>
                                    <button class="btn btn-start" v-if="start===false" @click="started()">Начать тестирование</button>
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
    name: 'WebinarTest',
    data () {
        return {
            start: false,
            status: 'Ожидается',
            webinars: [],
            tests: [],
            id: 244 //тут должен быть $route.params.id для вывода вебинара по его id
        }
    },
    created () {
        this.getWebinarTest()
    },
    methods: {
        getWebinarTest () { //вывод экзаменов по webinar id
            this.$axios.get(this.$axios.baseURL + '/api/test/webinar/id:' + this.id)
            .then(response => {
                this.tests = response.data.data
            })
        },
        started () {
            this.start = true
            this.status = 'done'
        }
    }
}
</script>