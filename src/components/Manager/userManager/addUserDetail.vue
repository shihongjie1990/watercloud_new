<template>
  <div class="add-user-detail">
    <div class="title">已通过并录入<span>{{uploadResult.passNum || 0}}</span>条数据</div>
    <div class="unpass-detail-panel">
      <div class="unpassed-users">
        <div class="detail-item-title">身份信息不匹配</div>
        <ul v-if="uploadResult.veriUnpassedUsers && uploadResult.veriUnpassedUsers.length > 0">
          <li v-for="item in uploadResult.veriUnpassedUsers"
              :key="item.idNum">
            <span>{{ item.name }}</span>
            <span>{{ item.idNum }}</span>
          </li>
        </ul>
        <div class="detail-none"
             v-else>(无)</div>
      </div>
      <div class="duplicated-users">
        <div class="detail-item-title">重复的身份信息</div>
        <ul v-if="uploadResult.duplicatedIDUsers && uploadResult.duplicatedIDUsers.length > 0">
          <li v-for="item in uploadResult.duplicatedIDUsers"
              :key="item.idNum">
            <span>{{ item.name }}</span>
            <span>{{ item.idNum }}</span>
          </li>
        </ul>
        <div class="detail-none"
             v-else>(无)</div>
      </div>
      <div class="duplicated-usernames">
        <div class="detail-item-title">重复的账号信息</div>
        <ul v-if="uploadResult.duplicatedUsernameUsers && uploadResult.duplicatedUsernameUsers.length > 0">
          <li v-for="item in uploadResult.duplicatedUsernameUsers"
              :key="item.idNum">
            <span>{{ item.name }}</span>
            <span>{{ item.idNum }}</span>
          </li>
        </ul>
        <div class="detail-none"
             v-else>(无)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uploadResult: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.add-user-detail {
  & > .title {
    font-size: 0.16rem;
    font-weight: 700;
    span {
      margin: 0 10px;
      color: #f5ba0d;
      font-size: 0.2rem;
    }
  }
  .unpass-detail-panel {
    display: flex;
    margin: 20px 0;
    & > div {
      width: 33.33%;
      &:not(last-child) {
        border-right: 1px dashed #999;
      }
      .detail-item-title {
        font-size: 0.12rem;
        font-weight: 700;
        margin-bottom: 20px;
        text-align: center;
        color: #709297;
      }
      ul {
        line-height: 0.24rem;
        li {
          &:nth-child(odd) {
            background: rgba(69, 123, 134, 0.8);
            color: #fff;
          }
          span {
            display: inline-block;
            text-align: center;
            &:first-child {
              width: 30%;
            }
            &:last-child {
              width: 68%;
            }
          }
        }
      }
      .detail-none {
        font-size: 0.14rem;
        text-indent: 0.12rem;
        color: #999;
      }
    }
  }
}
</style>
