<template>
  <div class="type-menu">
    <div class="type-title">
      <i class="iconfont icon-yanzhengma2"></i>
      {{ panel.title }}
      <span @click="expandPanel">{{ expand ? '-' : '+' }}</span>
    </div>
    <div class="menu-content" :class="{narrow: !expand}">
      <ul>
        <li v-for="item in panel.nodes"
            :key="item.code" @click="handlerActive(item)" :class="{active: item.code === activeNode}">
          <span>{{ item.name }}</span>
          <span class="type-number">{{ item.number }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    panel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expand: true,
      activeNode: ''
      /* panel: {
        title: '类型',
        nodes: [{ name: '全部', number: 60 }, { name: '文件', number: 50 }, { name: '接口', number: 40 }, { name: '应用', number: 30 }]
      } */
    }
  },
  methods: {
    expandPanel() {
      this.expand = !this.expand
    },
    handlerActive(data) {
      this.$emit('menuClick', data)
      this.activeNode = data.code
    }
  }
}
</script>

<style lang="scss">
.type-menu {
  width: 2rem;
  color: #fff;
  .type-title {
    padding: 6px 10px;
    font-size: 0.14rem;
    background: rgba(20, 112, 150, 0.6);
    span {
      float: right;
      &:hover {
          cursor: pointer;
      }
    }
  }
  .menu-content {
    box-shadow: 0px 2px 3px 0px #051620;
    overflow: hidden;
    max-height: 3rem;
    transition: all 0.3s linear;
    &.narrow {
        max-height: 0;
    }
    ul {
        height: 100%;
        overflow: auto;
    }
    li {
      line-height: 0.24rem;
      padding: 0 10px;
      .type-number {
        float: right;
      }
      &:hover {
        cursor: pointer;
        //   background: rgba(22, 176, 173, 0.6);
        background: rgba(5, 81, 106, 0.6);
      }
      &.active {
        background: rgba(5, 81, 106, 0.6);
      }
    }
  }
}
</style>
