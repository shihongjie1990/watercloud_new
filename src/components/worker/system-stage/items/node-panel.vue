<template>
  <div class="node-detail">
    <div class="row1">
      <div>
        <img :src="`static/images/overview/system/${server.img}`"
             alt="图片">
      </div>
      <div>
        <div>
          <span>{{ server.name }}</span>
          <span>
            <i class="pilot-lamp"></i>
            {{ server.isUsing | formatUse }}
          </span>
        </div>
        <div>{{ server.time }}</div>
      </div>
    </div>
    <div class="row2">
      <div>
        <span>{{ server.role }}</span>
        <span>角色</span>
      </div>
      <div>
        <span>{{ server.cpu | formatNum }}</span>
        <span>CPU(Core)</span>
      </div>
      <div>
        <span>{{ server.gib | formatNum }}</span>
        <span>内存(GiB)</span>
      </div>
      <div>
        <span>{{ server.group }}</span>
        <span>容器组</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    server: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  filters: {
    formatUse(flag) {
      return flag ? '已启用' : '未启用'
    },
    formatNum(num) {
      return num.toFixed(2)
    }
  },
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.node-detail {
  width: 3rem;
  border: 1px solid #fff;
  color: #fff;
  & > div {
    display: flex;
  }
  & > div.row1 {
    border-bottom: 1px solid #999;
    //   line-height: 0.28rem;
    & > div:first-child {
      text-align: center;
    }
    & > div:last-child {
      width: 100%;
      & > div > span:first-child {
        font-size: 0.18rem;
      }
      & > div > span:last-child {
        float: right;
      }
    }
  }
  & > div.row2 {
    text-align: center;
    padding: 5px 0;
    & > div {
      width: 25%;
    }
    span {
      display: block;
    }
  }
}
</style>
