import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    uploadedFile: () => import('../components/Template/uploadedFiles'),
    Button: () => import('../components/Template/Button')
  },
  computed: {
    ...mapGetters(['getFileModule']),
    file: {
      get () {
        return this.getFileModule('singleFile')
      },
      set (value) {
        this.setFileModule({ type: 'singleFile', data: value })
      }
    }
  },
  methods: {
    ...mapMutations(['setFileModule']),
    photoDetect () {
      const _file = this.$refs.file.files[0]
      this.file = _file
      this.photosTitle = _file.name
      this.$refs.file.value = ''
    },
    clearUpload () {
      this.file = null
    },
    fileUpload (AnswerID, redirectPath = null) {
      return new Promise(resolve => {
        let formData = new FormData()
        formData.append('file', this.file)
        formData.append('AnswerID', AnswerID)
        this.$axios.post(this.$axios.baseURL + '/uploadF', formData)
          .then(() => {
            if (redirectPath) {
              this.$router.push(redirectPath)
            }
            this.file = null
            resolve()
          })
      })
    }
  }
}
