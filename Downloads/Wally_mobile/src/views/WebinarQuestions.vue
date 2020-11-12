<template>
    <div class="container questions">
        <div class="header">
            <h1>Наименование теста</h1>
            <p>До окончания теста: <span>10:15</span></p>
        </div>
        <div class="question-box">
            <h2>10 из 20</h2>
            <p>Promotional advertising specialty you ve waited long enough
                <br>Profiles Of The Powerful Advertising Exec Steve Grasse?</p>
            <img v-if="show===true" src="../assets/img/icon/rectangle2@2x.png" class="img-questions">
        </div>
        
        <div class="answer-box">
            <tr>
                <td>
                    <label class="container">
                        <input type="radio" checked="checked" name="ans">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <span> Profiles Of The Powerful Advertising Exec Steve Grasse</span>
                </td>
            </tr>
        </div>
        <div class="answer-box box-2">
           <tr>
                <td>
                    <label class="container">
                        <input type="radio" checked="checked" name="ans">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <span> Profiles Of The Powerful Advertising Exec Steve Grasse</span>
                </td>
            </tr>
        </div>
        <div class="answer-box box-2">
            <tr>
                <td>
                    <label class="container">
                        <input type="radio" checked="checked" name="ans">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <span> Profiles Of The Powerful Advertising Exec Steve Grasse</span>
                </td>
            </tr>
        </div>
        <div class="answer-box box-2">
            <tr>
                <td>
                    <label class="container">
                        <input type="radio" checked="checked" name="ans">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <span> Profiles Of The Powerful Advertising Exec Steve Grasse</span>
                </td>
            </tr>
        </div>
        <div class="btn-box-2">
            <button class="btn btn-next" @click="change()">далее</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebinarQuestions',
    data () {
        return {
            show: false
        }
    },
    methods: {
        change () {
            this.show = true
        }
    }
}
</script>