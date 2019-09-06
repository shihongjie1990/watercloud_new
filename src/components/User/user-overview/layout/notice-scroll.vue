<template>
  <div class="user-notice">
    <!-- <div>
      <p class="notice-title">组内公告</p>
      <div class="content">
        <ul>
          <li v-for="index in 5"
              :key="index">
            <a>集团公司召开2018年度党员领导干部民主生活会</a>
          </li>
        </ul>
      </div>
    </div> -->
    <div>
      <p class="notice-title"
         @click="$router.push('/home/notice')">站内公告</p>
      <div class="content">
        <ul :class="'animation-' + notices.length">
          <li v-for="item in notices"
              :key="item.id">
            <a :title="item.title"
               @click.prevent="hrefToNotice(item)">{{ item.title }}</a>
          </li>
          <li v-for="(item, index) in notices"
              :key="index">
            <a :title="item.title"
               @click.prevent="hrefToNotice(item)">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: []
    }
  },
  methods: {
    getAllNotices() {
      let param = {
        pageNum: 1,
        pageSize: 5
      }
      this.$http.get('/api/announcement/page', { params: param }).then(res => {
        if (res.code === 1002) {
          this.notices = res.data.list
        } else {
          this.$message.error(res.msg || res.content || res.error)
        }
      })
    },
    hrefToNotice(data) {
      this.$router.push({ name: 'notice', params: { announcementId: data.id } })
    }
  },
  created() {
    this.getAllNotices()
  }
}
</script>

<style lang="scss" scoped>
.user-notice {
  .notice-title:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
