<template>
  <div class='notice notice-preview' v-show="isShow">
    <div class='title-block'>
      <div>{{form.title}}</div>
      <div class='time-block'>
        <span>发布时间：</span>
        <span class='notice-time'>{{ timeString || form.time}}</span>
      </div>
    </div>
    <hr>
    <div class='content-block'
         v-html='form.content'>
    </div>
    <div class="notice-attachment">
      <span>附件：</span>
      <div v-if="fileList.length > 0">
        <!-- <a>飞洒及撒娇佛按实际个三国杀</a>
                <a>飞洒及撒娇佛按实际个三国杀</a>
                <a>飞洒及撒娇佛按实际个三国杀</a>
                <a>飞洒及撒娇佛按实际个三国杀</a> -->
        <!-- <a v-for="(item, index) in fileList" :key="index" @click="downloadFiles(item.fileAddr || '')">{{item.name}}</a> -->
        <a v-for="(item, index) in fileList"
           :key="index"
           :href="item.fileAddr ? '/api/files/' + item.fileAddr:'#'">{{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['noticeData', 'announcementId'],
  props: {
    noticeData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    announcementId: {
      type: String,
      default: ''
    }
  },
  computed: {
    isShow() {
      let form = this.form
      return form && Object.keys(form).length > 0
    }
  },
  watch: {
    announcementId(curValue, oldValue) {
      if (curValue) {
        this.getNoticeByAnnouncementId(curValue)
      }
    }
  },
  data() {
    return {
      form: {
        title: 'XXXXXXXXXXXXXX',
        time: '2018-10-11 11:02',
        content: '书法家哦啊截稿时间告诉结果偶是的感觉哦啊是贡萨的结构ii啊宏大飞机扫附件开票我看培根爱神的箭破桑普收集卡片管家婆微积分拍摄平方根沙盘更加迫切渴望反贫困判决书对方桑普看WOPFJSDJGIODJSPGJKWPJ建瓯市的结构i就受到攻击到国家殴打'
      },
      timeString: '',
      fileList: [],
      preview: false
    }
  },
  methods: {
    pushAttachment(data) {
      let files = []
      data.map(item => {
        let url = item.fileAddr
        let file = {}
        if (url) {
          let nameString = url.substring(url.lastIndexOf('/') + 1)
          let name = nameString.replace(/-[0-9]{1,}/, '')
          file = {
            name: name,
            fileAddr: url
            //   fileAddr: url
          }
        }
        files.push(file)
      })
      return files
    },
    downloadFiles(url) {
      if (url) {
        let Base64 = require('js-base64').Base64
        // let str = 'upload\\announcement\\2018-10\\1540968483980-timg4.jpg'
        let strBase = Base64.encode(Base64.encode(url))
        let urlStr = location.host + '/api/download/' + strBase
        window.open(urlStr, '_self')
        // window.location.href = urlStr
      }
    },
    getNoticeByAnnouncementId(announcementId) {
      this.$http.get(`/api/announcement/detail/${announcementId}`).then(res => {
        // 填充数据
        this.form = res.data
        let files = res.data.announcementFiles
        if (files && files.length > 0) {
          let fileList = this.pushAttachment(files)
          this.fileList = fileList
          console.log(this.fileList)
          // this.$set(this.fileList, fileList)
        } else {
          this.fileList = []
        }
        if (res.data.updateTime) {
          // let date = new Date(res.data.updateTime.replace('-', '/'))
          this.timeString = res.data.updateTime
        }
      })
    },
    returnPublish() {
      this.$router.push({ name: '发布公告', params: { formData: this.form } })
    }
  },
  mounted() {
    let announcementId = this.$route.params.announcementId || this.announcementId
    if (announcementId) {
      this.getNoticeByAnnouncementId(announcementId)
    } else {
      let data = this.noticeData
      this.form = data
      this.fileList = data.fileList || []
      this.preview = true
      let nowDate = new Date()
      if (data.updateTime) {
        this.timeString = data.updateTime
      } else {
        this.timeString = nowDate.toISOString().substr(0, 10) + ' ' + nowDate.toTimeString().substr(0, 8)
      }
    }
  }
}
</script>
