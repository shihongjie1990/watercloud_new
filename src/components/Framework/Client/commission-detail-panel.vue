<template>
  <div class="commission-detail-panel">
    <a @click="$emit('closePanel')"
       class="narrow-expand-commission">
      <!-- <i class="iconfont icon-ziyuanldpi"></i> -->
      <i class="iconfont icon-shouqikuaijin"></i>
      <!-- <i class="iconfont icon-xiangqing"></i> -->
    </a>
    <el-card class="box-card"
             shadow="hover">
      <div class="commission-detail-title">
        <label>标题：</label>
        <span>{{ commission.messageType | typeToWord }}</span>
      </div>
      <div>
        <label>申请类别：</label>
        <span>{{ commission.messageType | typeToWord }}</span>
      </div>
      <div class="commission-detail-app">
        <label>所属应用：</label>
        <span>{{ commission.clientName }}</span>
      </div>
      <div>
        <label>申请时间：</label>
        <span>2019-07-30</span>
      </div>
      <div>
        <label>事由：</label>
        <span>{{ commission.reason }}</span>
      </div>
    </el-card>
    <el-card class="box-card"
             shadow="hover">
      <div>
        <label>申请人：</label>
        <span>{{ commission.name }}</span>
      </div>
      <div>
        <label>公司：</label>
        <span>{{ commission.orgName }}</span>
      </div>
      <div>
        <label>部门：</label>
        <span>{{ commission.orgName }}</span>
      </div>
      <div>
        <label>职位：</label>
        <span>{{ commission.title }}</span>
      </div>
    </el-card>
    <el-card class="box-card"
             shadow="hover">
      <div class="commission-operation">
        <el-button type="primary" @click="agreeApplication">同意</el-button>
        <el-button type="info" @click="refuseApplication">驳回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    commission: Object
  },
  filters: {
    typeToWord(value) {
      let text = ''
      if (value === 'appApp') {
        text = '应用申请'
      }
      return text
    }
  },
  data() {
    return {}
  },
  methods: {
    // 同意
    agreeApplication() {
      let data = this.commission
      this.$emit('agreeApplication', data)
    },
    // 拒绝
    refuseApplication() {
      let data = this.commission
      this.$emit('refuseApplication', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.commission-detail-panel {
  position: relative;
  & > div:nth-of-type(1) {
    height: 70%;
    margin-bottom: 10px;
    overflow: auto;
  }
  & > div:nth-of-type(2) {
    height: 16%;
    overflow: auto;
    margin-bottom: 10px;
  }
  .commission-operation {
    display: flex;
    height: auto;
    button {
      width: 50%;
    }
  }
  .narrow-expand-commission {
    position: absolute;
    top: 50%;
    right: -16px;
    color: #fff;
    font-size: 22px;
    &:hover {
      text-decoration: none;
      color: #00ceff;
    }
  }
  .commission-detail-title {
    span {
      font-size: 0.18rem;
    }
  }
  .commission-detail-app {
    span {
      color: #f5ba0d;
    }
  }
}
</style>
