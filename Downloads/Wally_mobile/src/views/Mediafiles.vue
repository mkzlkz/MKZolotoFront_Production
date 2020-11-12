<template>
    <div class="container mediafiles">
        <div class="doc-container" v-for="file in files">
            <img src="../assets/img/icon/ic_file.png" class="file">
            <div class="doc">
                <p class="text">{{file.Name}}</p>
                <p class="subtext">{{file.CreatedAt | formatDate}}</p>
            </div>
            <div class="load">
                <span>{{file.Size}}мб</span>
                <button class="btn btn-download" @click="download(file.Path, file.Name)"><img src="../assets/img/icon/ic_download.png" class="img-load"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mediafiles',
    data () {
        return {
            user: {},
            files: [],
            media: {}
        }
    },
    mounted () {
        this.getUser()
        this.getMedia()
    },
    methods: {
        getUser () { 
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        getMedia () { 
            this.$axios.get(this.$axios.baseURL + '/get/media')
                .then(response => {
                this.files = response.data.data
                })
        },
        download(download_link, document_name) { //метод для скачивания медиа
            this.$axios({
                url: this.$axios.baseCors + download_link,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]))
                var fileLink = document.createElement('a')
                fileLink.href = fileURL
                fileLink.setAttribute('download', document_name)
                document.body.appendChild(fileLink)
                fileLink.click()
            })
        }
    }
}
</script>