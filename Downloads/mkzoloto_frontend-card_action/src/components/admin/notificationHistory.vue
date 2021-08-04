<template>
    <div class="notificationHistory">
        <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
        <div class="errorsServer" v-if="errorsServer">
            {{errorsServer}}
        </div>
        <div v-if="!errorsServer">
            <div class="title">{{$t('notification_history')}}</div>
            <div class="height-mk">
                <div v-for="(push, index) in push_list" :key="push.id" class="not-his">
                    <div class="push-1">
                        <div class="push1-title">
                            <div class="date">{{push.created_at_with_time}}</div>
                            <div class="push-2">
                                <button @click="activateReadMore(index); getPushRead(push);" v-if="!readMoreActivated.includes(index)">{{$t('in_detail')}}</button>
                                <button @click="closeReadMore(index)" v-if="readMoreActivated.includes(index)"><img :src="require('@/assets/img/icon/right-arrow.svg')" alt=""></button>
                            </div>
                        </div>

                        <div v-if="!readMoreActivated.includes(index)" class="text" v-bind:class="{'read' : push.read== false}">{{push.text.slice(0, 20)}}</div>
                        <div class="text" v-if="readMoreActivated.includes(index)">{{push.text}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "notificationHistory",
        data (){
            return{
                push_list: '',
                readMoreActivated: [],
                loader: true,
                errorsServer: '',
                // date_time: ''
            }
        },
        created(){
            this.getPush();
        },
        methods: {
            getPush () {
                this.$axios.get('/auth/push-list')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.push_list = $response.data
                        // for(var i=0; i<this.push_list.length;i++){
                        //     this.push_list[i].date_time = moment(this.push_list[i].created_at_with_time,"DD.MM.YYYY HH:mm:ss").format('DD.MM.YYYY HH:mm')
                        // }
                        this.loader = false
                    }
                })
                .catch((e) => {
                    this.errorLog = e.response.status;
                    if(this.errorLog == 401){
                        localStorage.clear()
                        window.location.reload()
                    }
                    console.log(e)
                })
            },
            getPushRead (push) {
                if(push.read == false) {
                this.$axios.get('/auth/push-read/'+ push.id)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.getPush();
                    }
                })
                .catch((e) => {
                    this.errorLog = e.response.status;
                    if(this.errorLog == 401){
                        localStorage.clear()
                        window.location.reload()
                    }
                    console.log(e)
                })
            }
            },
            activateReadMore(index){
                const inx = this.readMoreActivated.indexOf(index);
                if (inx > -1) {
                    this.readMoreActivated.splice(inx, 1)
                } else {
                    this.readMoreActivated=[index]
                }
            },
            closeReadMore(index){
                const inx = this.readMoreActivated.indexOf(index);
                this.readMoreActivated.splice(inx, 1)
            }
        }
    }
</script>

<style scoped>

</style>
