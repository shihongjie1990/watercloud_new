<template>
  <div class="user-index">
    <user-notice></user-notice>
    <one-map :class="type"></one-map>
    <data-menu :showTitle="true"
               :class="type"></data-menu>
    <my-app :have-btn="false"></my-app>
  </div>
</template>

<script>
export default {
  components: {
    'my-app': () => import('./layout/my-app'),
    'data-menu': () => import('./layout/data-menu'),
    'user-notice': () => import('./layout/notice-scroll'),
    'one-map': () => import('./layout/one-map')
  },
  data() {
    return {
      type: 'type2'
    }
  },
  methods: {
    changeType(type) {
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.user-index {
  & > div {
    margin: 0.15rem 0 0 0.25rem;
  }
}
</style>

<style lang="scss">
@import '../../../assets/overview-ui/overview-ui2.scss';
.title {
  display: flex;
  //   padding: 0.25rem 0.35rem 0; // 25px 35px 0;
  padding: 0.1rem;
  div:first-child {
    font-size: 0.2rem; // 20px;
    color: #2ac1db;
    width: 50%;
  }
  div:last-child {
    text-align: right;
    width: 50%;
    color: #e7e8e9;
    span:first-child {
      margin-right: 0.09rem; // 9px;
    }
    span:last-child {
      font-size: 0.2rem; // 20px;
      color: #f5ba0d;
      margin: 0 0.06rem; // 0 6px;
      font-weight: 700;
    }
  }
}
</style>
