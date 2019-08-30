<template>
  <div class="user-notice">
    <div class="title">
      <div><span @click="$router.push('/home/oneMap')">公告</span></div>
      <div>
        <a>更多></a>
      </div>
    </div>
    <div class="tab">
      <a>组内公告</a>
      <a>站内公告</a>
    </div>
    <div class="content">
      <ul>
        <li v-for="index in 5"
            :key="index">
          <span>{{ index }}</span>
          <a>集团公司召开2018年度党员领导干部民主生活会</a>
        </li>
      </ul>
    </div>
    <!-- <div class="mask"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.user-notice {
  .title {
    & > div {
      & > span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
