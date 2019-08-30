<template>
  <div class="client-notice">
    <div class="notice-list">
      <notice-list @showNoticeDetail="showNoticeDetail"></notice-list>
    </div>
    <div class="notice-desc-block">
      <notice-detail :announcementId="announcementId"></notice-detail>
    </div>
  </div>
</template>

<script>
import noticeDetail from '@/components/Manager/notice/notice-preview.vue'
import noticeList from './list'

export default {
  components: {
    noticeDetail,
    noticeList
  },
  data() {
    return {
      announcementId: ''
    }
  },
  methods: {
    showNoticeDetail(data) {
      let announcementId = data.id
      this.announcementId = announcementId
    }
  }
}
</script>

<style lang="scss" scoped>
.client-notice {
  position: relative;
  height: calc(100vh - 0.9rem);
  & > .notice-desc-block {
    position: absolute;
    height: 100%;
    overflow: auto;
    left: 50%;
    transform: translateX(-40%);
  }
  & > .notice-list {
    width: 300px;
    height: 99%;
    /* max-height: 100%;
    overflow: auto;
    box-shadow: 0px 0px 20px 1px #607c80;
    border-radius: 10px; */
  }
}
</style>
