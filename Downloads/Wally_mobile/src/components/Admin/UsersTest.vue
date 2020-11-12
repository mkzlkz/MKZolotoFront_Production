<template>
<div class="padding-30">
    <div class="title"><router-link to="/admin/tests"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>{{ $t('tests') }}</div>
    <div class="table-responsive">
        <table class="table table-main">
            <tr><th>{{ $t('nomination_test') }}</th><th>{{ $t('nomination_theme') }}</th><th>{{ $t('duration_1') }}</th><th>{{ $tc('question', 10) }}</th><th>{{ $t('status') }}</th><th>{{ $t('results') }}</th><th></th></tr>
            <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="green">Пройден</span></td><td><span class="result-text">Результат 80%</span><span class="result"><span class="green">+80</span><span class="purple">/</span><span class="pink">-20</span></span></td><td><div class="dropdown calendar"><button class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">Пересдача</button> <div class="dropdown-menu dropdown-menu-right"><button type="button" class="close" aria-hidden="true">x</button><div class="title-d">Назначить пересдачу</div><div class="calen"><div class="cal"><span>{{ $t('date') }}</span><date-picker v-model="value1" valueType="format" lang="ru" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker></div><div class="cal cal-time"><span>{{ $t('time') }}</span><date-picker v-model="value2" lang="ru" type="time" format="HH:mm" placeholder="15:00"></date-picker></div></div><button class="button-blue">Назначить</button></div></div></td></tr>
            <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="pink">Не пройден</span></td><td><span class="result-text">Результат 80%</span><span class="result"><span class="green">+80</span><span class="purple">/</span><span class="pink">-20</span></span></td><td><div class="dropdown calendar"><button class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">Пересдача</button> <div class="dropdown-menu dropdown-menu-right"><button type="button" class="close" aria-hidden="true">x</button><div class="title-d">Назначить пересдачу</div><div class="calen"><div class="cal"><span>{{ $t('date') }}</span><date-picker v-model="value1" valueType="format" lang="ru" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker></div><div class="cal cal-time"><span>{{ $t('time') }}</span><date-picker v-model="value2" lang="ru" type="time" format="HH:mm" placeholder="15:00"></date-picker></div></div><button class="button-blue">Назначить</button></div></div></td></tr>
            <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="green">Пройден</span></td><td><span class="result-text">Результат 80%</span><span class="result"><span class="green">+80</span><span class="purple">/</span><span class="pink">-20</span></span></td><td><div class="dropdown calendar"><button class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">Пересдача</button> <div class="dropdown-menu dropdown-menu-right"><button type="button" class="close" aria-hidden="true">x</button><div class="title-d">Назначить пересдачу</div><div class="calen"><div class="cal"><span>{{ $t('date') }}</span><date-picker v-model="value1" valueType="format" lang="ru" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker></div><div class="cal cal-time"><span>{{ $t('time') }}</span><date-picker v-model="value2" lang="ru" type="time" format="HH:mm" placeholder="15:00"></date-picker></div></div><button class="button-blue">Назначить</button></div></div></td></tr>
            <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="green">Пройден</span></td><td><span class="result-text">Результат 80%</span><span class="result"><span class="green">+80</span><span class="purple">/</span><span class="pink">-20</span></span></td><td><div class="dropdown calendar"><button class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">Пересдача</button> <div class="dropdown-menu dropdown-menu-right"><button type="button" class="close" aria-hidden="true">x</button><div class="title-d">Назначить пересдачу</div><div class="calen"><div class="cal"><span>{{ $t('date') }}</span><date-picker v-model="value1" valueType="format" lang="ru" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker></div><div class="cal cal-time"><span>{{ $t('time') }}</span><date-picker v-model="value2" lang="ru" type="time" format="HH:mm" placeholder="15:00"></date-picker></div></div><button class="button-blue">Назначить</button></div></div></td></tr>
             <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="gray">Ожидается</span></td><td></td><td></td></tr>
              <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="gray">Ожидается</span></td><td></td><td></td></tr>
               <tr><td>{{ $t('nomination_test') }}</td><td>{{ $t('nomination_theme') }}</td><td>120 мин</td><td>100</td><td><span class="gray">Ожидается</span></td><td></td><td></td></tr>
        </table>
    </div>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'UsersTest',
  components: { DatePicker },
  data () {
    return {
      value1: '',
      value2: ''
    }
  }
}
</script>

<style scoped>

</style>
