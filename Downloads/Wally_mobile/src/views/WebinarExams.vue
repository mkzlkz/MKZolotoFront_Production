<template>
    <div>
      <div class="tests-web" v-if="tests">
        <router-link :to="'/webinar-start/' + id" class="btn btn-close">Закрыть</router-link>
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
                      <p class="card-subtext" v-if="test.Status === 'Пройден'"><span>{{ $t('completed_exam') }}</span><span>20 {{ $t('of') }} 30</span></p>

                      <p class="card-subtext" v-if="test.Status === 'Ожидается'">
                        <span>-</span>
                        <button class="button-blue" data-toggle="modal" data-target="#Modal2" @click="startTest(test.ID)">{{ $t('start_testing') }}</button>
                      </p>

                      <p class="card-subtext"  v-if="test.Status !== 'Ожидается'"><span class="empty">-</span></p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="modal-window">
      <div id="Modal2" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
              <div class="md-title">{{ $t('testing_started') }}</div>
              <button class="button-blue" data-dismiss="modal">Ок</button>
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
    name: 'WebinarExams',
    data () {
      return {
        id: this.$route.params.id,
        tests: []
      }
    },
    methods: {
      getWebinarTest () {
        this.$axios.get(this.$axios.baseURL + '/api/test/webinar/id:' + this.id)
        .then(response => {
          this.tests = response.data.data
        })
      },
      startTest (id) {
        this.$axios.post(this.$axios.baseURL + '/api/test/starttest', {TestID: id})
        .then(response => {
          this.getWebinarTest()
        })
      }
    },
    mounted () {
      this.getWebinarTest()
    }
  }
</script>

<style scoped>
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
