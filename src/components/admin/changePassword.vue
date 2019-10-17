<template>
    <div class="editMyData">
        <div class="emd">
            <div class="title">{{$t('change_password')}}</div>
            <div class="form-1">
                <p>{{$t('current_password')}}</p>
                <div class="input-1">
                    <input type="password" name="input_vtp" v-model="old_pwd" :placeholder="$t('enter_current_password')">
                </div>
            </div>
            <div class="form-1">
                <p>{{$t('new_password')}}</p>
                <div class="input-1">
                    <input type="password" name="input_vnp" v-model="new_pwd" :placeholder="$t('enter_new_password1')">
                </div>
            </div>
            <div class="form-1">
                <p>{{$t('new_password_again')}}</p>
                <div class="input-1">
                    <input type="password" name="input_vnpp" v-model="repeat_new_pwd" :placeholder="$t('re_enter_new_password')">
                </div>
            </div>
            <button class="button-yellow" :class="(this.old_pwd!='' && this.old_pwd.length >= 8 && this.new_pwd!='' && this.new_pwd.length >= 8 && this.repeat_new_pwd!='' && this.repeat_new_pwd.length >= 8) ? 'button-orange':'button-orange disabled'" data-toggle="modal" data-target="#modal-edit-password" @click="changePassword">{{$t('save')}}</button>
        </div>
        <div class="modal-edit2">
            <div id="modal-edit-password" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="cont-3">
                                <div class="text" v-if="errorNewPas">{{errorNewPas}}</div>
                                <div class="text" v-if="errorPassword">{{errorPassword}}</div>
                                <div class="text" v-if="change_pwd">{{change_pwd}}</div>
                                <button class="button-yellow"  type="button" data-dismiss="modal" aria-hidden="true">ok</button>
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
        name: "changePassword",
        data(){
            return{
                old_pwd: '',
                new_pwd: '',
                repeat_new_pwd: '',
                errorPassword: '',
                errorNewPas: '',
                change_pwd: ''
            }
        },
        mounted () {
            var obj = this;
            $('#modal-edit-password').on('hidden.bs.modal', function () {
                obj.old_pwd = '';
                obj.new_pwd = '';
                obj.repeat_new_pwd = '';
                obj.errorPassword = '';
                obj.errorNewPas = '';
                obj.change_pwd = '';
            });
        },
        methods: {
            changePassword(){
                if(this.new_pwd != this.repeat_new_pwd){
                    this.errorNewPas = this.$t('password_error')
                }
                if(this.old_pwd!='' && this.old_pwd.length >= 8 && this.new_pwd!='' && this.new_pwd.length >= 8 && this.repeat_new_pwd!='' && this.repeat_new_pwd.length >= 8) {
                    this.loader = true
                    let obj = {}
                    obj['old_pwd'] = this.old_pwd
                    obj['new_pwd'] = this.new_pwd
                    this.$axios.post('/auth/password_change', obj)
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            this.errorPassword = $response.error
                            console.log($response.error)
                        } else {
                            this.change_pwd = $response.data
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        this.errorLog = e.response.status;
                        if(this.errorLog == 401){
                            localStorage.clear()
                            window.location.reload()
                        }
                        console.log(e)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
