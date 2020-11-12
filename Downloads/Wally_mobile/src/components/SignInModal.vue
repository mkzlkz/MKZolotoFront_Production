<template>
    <div class="modal" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                <form class="form-group" @submit.prevent="updatePassword()">
                    <label>Текущий пароль</label>
                    <input class="form-control" placeholder="Текущий пароль" v-model="old_password" type="password">
                    <label>Новый пароль</label>
                    <input class="form-control" placeholder="Текущий пароль" v-model="new_password" type="password">
                    <label>Повторите новый пароль</label>
                    <input class="form-control" placeholder="Текущий пароль" v-model="password_check" type="password">
                    <div class="row">
                        <button class="btn mx-auto btn-submit" type="submit">Cохранить</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignInModal',
    data () {
        return {
            error: '',
            user: [],
            old_password: '',
            new_password: '',
            password_check: ''
        }
    },
    created () {
        this.getUser() 
    },
    methods: {
        getUser () { //данные о current пользователе
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        updatePassword () { 
            if (this.new_password !== this.password_check) { //если два введеных пароля не совпадають, выводит ошибку
                this.error = 'password_mismatch'
                return
            }
            let data = {
                Password: this.old_password,
                Newpassword: this.new_password
            }
            this.$axios.put(this.$axios.baseURL + '/api/user/changepass', data)
                .then(response => {
                if (response.data.status) {
                    this.error = ''
                    this.new_password = ''
                    this.old_password = ''
                    this.passwordCheck = ''
                } else {
                    this.error = response.data.message
                }
            })
        }
    }
}
</script>