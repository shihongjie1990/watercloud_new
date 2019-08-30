<template>
  <div class="logged-overview">
    <div class="user-bg">
      <video src="static/video/mhbg.mp4"
             poster="static/images/mhbg.png"
             width="100%"
             height="600"
             loop
             muted
             autoplay></video>
    </div>
    <div class="user-overview">
      <user-head @expandCommission="expandCommission"
                 :commissionCount="commissionCount"></user-head>
      <user-commission class="user-commission"
                       @getMyCommission="getMyCommission"
                       :class="{active: expand}"
                       :commissions="commissions"></user-commission>
      <div class="user-content">
        <keep-alive>
          <router-view ref='page' />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'user-head': () => import('./Header'),
    'user-commission': () => import('./my-commission2')
  },
  data() {
    return {
      menu: this.$store.state.LOGGED_MENU,
      expand: false,
      commissions: [],
      commissionCount: 0
    }
  },
  methods: {
    expandCommission() {
      this.expand = !this.expand
    },
    getMyCommission() {
      let param = {
        messageType: 'appApp',
        completed: false,
        pageSize: 50,
        pageNum: 1
      }
      this.$http.post('/api/message/getMessageByPage', param).then(res => {
        let data = res.data
        this.commissionCount = data.total
        let commissionArr = []
        if (data.list) {
          let list = data.list
          let commissions = list.map(item => {
            let commission = JSON.parse(item.messageContent)
            commission.messageType = item.messageType
            commission.messageId = item.messageId
            commission.updateTime = item.updateTime
            return commission
          })
          commissionArr = commissions
        }
        // this.$set('commissions', commissionArr)
        this.commissions = commissionArr
      })
    }
  },
  created() {
    this.getMyCommission()
  }
}
</script>

<style lang="scss" scoped>
.logged-overview {
  margin: auto;
  .user-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: -1;
    video {
      object-fit: fill;
      height: 100%;
      width: 100%;
    }
  }
  .user-overview {
    // height: 7.67rem;
    height: 100vh;
    position: relative;
    overflow: hidden;
    .user-content {
      overflow: hidden;
      & > div {
        display: flex;
        flex-wrap: wrap;
        width: 12.3rem; // 1230px;
        margin: auto;
        margin-top: 0.1rem; // 10px;
      }
    }
    .user-commission {
      position: absolute;
      top: 0.7rem;
      right: 0;
      height: 0;
      z-index: 100;
      background: rgba(31, 85, 123, 0.6);
      overflow: hidden;
      box-sizing: border-box;
      transition: height 0.3s linear;
      &.active {
        height: calc(100vh - 0.7rem);
      }
    }
  }
}
</style>
