<template>

<div>
     <div class="tests-web" v-if="tests">
     <router-link :to="'/webinar-view/' + id" class="btn btn-close">Закрыть</router-link>
        <div class="container production" style="margin-top: 0;">
            <div id="accordion" v-for="(test, index) in tests" :key="index">
                <div class="card production-card">
                            <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="`#collapse12${index}`">
                                {{test.Test}}
                            </a>
                        <div :id="`collapse12${index}`"class="collapse" data-parent="#accordion">
                            <div class="card-body">
                                <div class="card-content">
                                    <div class="card-inside">
                                        <p class="card-text">Наименование темы</p>
                                        <p class="card-subtext">{{test.Topic}}</p>
                                        <p class="card-text">Длительность</p>
                                        <p class="card-subtext">{{test.Duration}} {{ $t('min') }}</p>
                                        <p class="card-text">Вопросов</p>
                                        <p class="card-subtext">{{test.Questions}}</p>
                                        <p class="card-text">Статус</p>
                                        <p class="card-subtext">{{test.Status}}</p>
                                        <p class="card-text">Результат</p>
                                        <p class="card-subtext" v-if="test.Status === 'Ожидается' || test.Status === 'В процессе'">-</p>
                                        <p class="card-subtext" v-if="test.Status === 'Пройден' || test.Status === 'Не пройден'">100% : {{test.Result}}+ / {{test.Questions - parseInt(test.Result)}}-</p>
                                        <button v-if="test.Status === 'В процессе'" class="btn btn-start" data-toggle="modal" data-target="#Modal2" @click="activeTest = test">Начать тестирование</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div class="modal-testlist">
      <div id="Modal2" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="title-m">{{ $t('testing_time') }}</div>
              <button class="button-blue" @click="startTest()">{{ $t('start_testing') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="!tests" />

  </div>
</template>

<script>
export default {
  name: 'testList',
  components: {
    loader: () => import('../components/Template/Loader')
  },
  data () {
    return {
      id: this.$route.params.id,
      tests: null,
      activeTest: {},
      exam: null
    }
  },
  methods: {
    routerPage () {
      location.replace('/testing')
    },
    getWebinarTests () {
      this.$axios.get(this.$axios.baseURL + '/api/test/webinar/id:' + this.id)
        .then(response => {
          this.tests = response.data.data
          let exam = response.data.exam
          if (exam.ID) {
            this.exam = exam
          }
        })
    },
    statusClass (test) {
      if (test.Status === 'Ожидается') {
        return 'blue'
      } else if (test.Status === 'Не пройден') {
        return 'pink'
      } else if (test.Status === 'Пересдача') {
        return 'orange'
      } else {
        return 'green'
      }
    },
    startTest () {
      this.$router.push({name: 'testingMob', params: {id: this.activeTest.ID, testInfo: this.activeTest}})
    },
    testResult (test) {
      let result = parseInt(test.Result)
      return Math.round((result * 100 / test.Questions) * 100) / 100
    }
  },
  mounted () {
    this.getWebinarTests()
  }
}
</script>


<style scoped="">
    .btn-close{
        color: #000;
    }
    .production{
    min-height: calc(100vh - 50px);
    overflow-y: auto;
    }
    .tests-web{
position: absolute;
    top: 0;
    z-index: 111;
    left: 0;
    right: 0;
    bottom: 0;
    }
    </style>



