<template>
  <div class="gov-index">
    <div class="gov-top">
      <img src="static/images/gov_bg.jpg"
           alt=""
           class="gov-image">
      <img src="static/images/bg_title.png"
           alt=""
           class="bg-title">
    </div>
    <div class="gov-menu">
      <ul>
        <li v-for="(node, index) in menuNodes.data"
            :key="index">
          <a @click="hrefTo(node.url, node.id)"
             :class="(menuNodes.activeNode === node.id) ? 'active' : ''">{{ node.node }}</a>
        </li>
      </ul>
    </div>
    <div class="gov-content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuNodes: {
        data: [{
          node: '首页',
          url: '/home/user',
          id: 'my_home'
        }, {
          node: '应用商店',
          url: '/home/appShop',
          id: 'app_shop'
        }, {
          node: '水利数据库',
          url: '/home/staticData',
          id: 'data_source'
        }, {
          node: '水利一张图',
          url: '/home/oneMap',
          id: 'one_map'
        }],
        activeNode: 'my_home'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gov-index {
  height: 100%;
  width: 100%;
  .gov-top {
    position: relative;
    z-index: -1;
    .gov-image {
      width: 100%;
      height: 200px;
    }
    .bg-title {
      height: 30px;
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
    }
  }
  .gov-menu {
    width: 100%;
    height: 48px;
    background: #57aeff;
    margin-top: -10px;
    ul {
      width: 1200px;
      display: flex;
      margin: auto;
      font-size: 0.12rem;
      li {
        width: 16.66%;
        text-align: center;
        line-height: 48px;
        a {
          color: #fff;
        }
        &:hover {
          background: rgba(26, 95, 189, .6);
          cursor: pointer;
          a {
            text-decoration: none;
          }
        }
      }
    }
  }
  .gov-content {
    width: 1200px;
    min-height: 500px;
    background: #eaeaea;
    margin: auto;
  }
}
</style>
