<template>
  <div class="notice-list-panel">
    <div class="list-title">公告</div>
    <ul>
      <li v-for="(item, index) in notices"
          :key="item.id">
        <a @click="showNotice(item)"
           :title="item.title">{{ index + 1 }}、{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: [{}]
    }
  },
  methods: {
    showNotice(data) {
      this.$emit('showNoticeDetail', data)
    },
    getNoticeList() {
      let param = {
        pageNum: 1,
        pageSize: 100
      }
      this.$http.get('/api/announcement/page', { params: param }).then(res => {
        if (res.code === 1002) {
          this.notices = res.data.list
        } else {
          this.$message.error(res.msg || res.content || res.error)
        }
      })
    }
  },
  created() {
    this.getNoticeList()
  }
}
</script>

<style lang="scss" scoped>
.notice-list-panel {
  box-shadow: 0px 0px 20px 1px #607c80;
  border-radius: 10px;
  max-height: 100%;
  overflow: auto;
  .list-title {
    padding: 20px;
    padding-bottom: 0;
    font-size: 0.14rem;
    color: #2ac1db;
  }
  ul {
    padding: 12px 20px;
    li {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 8px 0;
      a {
        color: #ddd;
      }
    }
  }
}
</style>
