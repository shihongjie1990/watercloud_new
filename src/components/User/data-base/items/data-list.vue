<template>
  <div class="data-list">
    <dl v-for="(item, index) in listData"
        :key="index"
        :class="{'empty-resource': item.data.length === 0}">
      <dd v-for="(node, i) in item.data"
          :key="i">
        <div class="first-row">
          <p class="data-title"
             @click="showDetail(node, item)">{{ node[item.title] }}</p>
          <div>
            <span><i class="iconfont icon-yanzhengma2"></i>{{ item.type }}</span>
            <span><i class="iconfont icon-yanzhengma2"
                 v-if="item.group"></i>{{ node[item.group] }}</span>
          </div>
        </div>
        <div class="second-row">
          <span>{{ node[item.provider] }}</span>
          <span>更新：{{ node[item.updateDate] }}</span>
        </div>
        <div class="third-row">
          <div class="desc-content">
            {{ node[item.desc] }}
          </div>
        </div>
        <div class="last-row">
          <div class="tips">
            <span v-if="item.tips">www</span>
          </div>
          <div class="data-operation">
            <span class="download-number"
                  v-if="item.scan"><i class="iconfont icon-yanzhengma2"></i>155</span>
            <span class="browse-number"
                  v-if="item.download"><i class="iconfont icon-yanzhengma2"></i>66</span>
          </div>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      required: true
      /* default: function() {
        return {
          title: '',
          provider: '',
          type: '',
          group: '',
          updateDate: '',
          desc: '',
          tips: '',
          scan: '',
          download: '',
          data: []
        }
      } */
    }
  },
  data() {
    return {}
  },
  methods: {
    showDetail(data, type) {
      this.$router.push({ name: 'dataDetail', params: data })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-list {
  color: #fff;
  height: calc(100vh - 1rem);
  overflow: auto;
  margin: 0 0.6rem;
  .empty-resource {
    margin: 0;
    display: none;
  }
  dd {
    // width: 6.5rem;
    background: rgba(19, 96, 131, 0.3);
    padding: 16px;
    margin-bottom: 20px;
    position: relative;
    i {
      margin: 0 5px;
    }
    .first-row {
      line-height: 0.24rem;
      p {
        display: inline-block;
        margin: 0;
        font-size: 0.16rem;
        font-weight: 600;
        &:hover {
          cursor: pointer;
          color: #2a9cd3;
        }
      }
      div {
        float: right;
        span:last-child {
          margin-left: 16px;
        }
      }
    }
    .second-row {
      font-size: 0.1rem;
      color: #bbb;
      span:last-child {
        margin-left: 1rem;
      }
    }
    .third-row {
      padding: 0.12rem 0px;
      height: 0.6rem;
    }
    .last-row {
      .tips {
        display: inline-block;
        span {
          background: #fff;
          color: #000;
          padding: 1px 3px;
          border-radius: 3px;
        }
      }
      .data-operation {
        float: right;
        span:last-child {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>

<style>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /* background-color: transparent; */
  background-color: rgba(255, 255, 255, 0.3);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.3);
  /* background-color: transparent; */
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* background-color: #1ab394; */
  background-color: rgba(0, 36, 65, 0.5);
}
</style>
