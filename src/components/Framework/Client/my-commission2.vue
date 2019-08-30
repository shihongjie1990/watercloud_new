<template>
  <div class="my-commission">
    <!-- 待办详情展现区域 -->
    <transition name="expand-detail">
      <commission-panel class="commission-detail"
                        v-if="isShowDetail"
                        :commission="commissionData"
                        @refuseApplication="refuseApplication"
                        @agreeApplication="agreeApplication"
                        @closePanel="isShowDetail = false"></commission-panel>
    </transition>
    <!-- 待办列表区域 -->
    <div>
      <div class="operation-filter">
        <el-input placeholder="请输入待办名称"
                  v-model="commission"
                  @keyup.native.enter="handlerSearch">
          <i class="el-icon-search el-input__icon"
             slot="suffix"
             @click="handlerSearch">
          </i>
        </el-input>
        <div class="filter-area">
          <el-select v-model="client"
                     placeholder="请选择应用"
                     @change="handlerSearch">
            <el-option v-for="item in appSelectOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="type"
                     placeholder="请选择类型"
                     @change="handlerSearch">
            <el-option v-for="item in typeSelectOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="time"
                          type="date"
                          placeholder="选择日期"
                          @change="handlerSearch">
          </el-date-picker>
        </div>
      </div>
      <div class="commission-content">
        <ul>
          <li v-for="item in showCommissions"
              :key="item.messageId">
            <div class="commission-node">
              <div class="commission-icon">
                <img :src="`/api/files/${item.icon}`"
                     alt="图标">
              </div>
              <div class="commission-content">
                <div>
                  <p class="commission-title">{{ item.clientName }}</p>
                  <span>应用申请</span>
                </div>
                <div>
                  <label>申请人：</label>
                  <span class="application-user">{{ item.name }}</span>
                  <span class="org-name">{{ item.orgName }}</span>
                  <span>{{ item.updateTime | formatDate }}</span>
                </div>
              </div>
            </div>
            <div class="commission-operaion">
              <div class="commission-detail-btn"
                   @click="showDeitalPanel(item)"><a><i class="iconfont icon-xiangqing"></i> 详情</a></div>
              <div><a title="同意" @click="agreeApplication(item)"><i class="iconfont icon-duigou"></i></a></div>
              <div><a title="驳回" @click="refuseApplication(item)"><i class="iconfont icon-icon1"></i></a></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import commissionPanel from './commission-detail-panel'

export default {
  components: {
    commissionPanel
  },
  props: {
    commissions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      data: {
        'appAppId': '0e52363c998a4af3a08e0053fdd52c96', 'userId': 'a4140248eb8540d1896860943a676a96', 'username': 'slt-ysaqc-lisi', 'name': '李四', 'orgName': '智慧水利', 'department': '水利云大数据中心', 'title': '牛人', 'clientId': 'c990c095fbdc467b9b5b053095a212e3', 'clientBriefName': 'ysaq1', 'clientName': '饮水安全', 'clientDesc': '为落实省委、省政府关于全面加快解决农村饮水安全问题指示，积极响应省委、省政府提出的大扶贫、大数据发展战略，水利厅开发了饮水安全云用以支撑和管理全省全面解决农村饮水工作。在“云上贵州”和“水利云”的基础上整合海量的数据信息资源，以管理需求为导向，最终形成包含所有农村饮水安全业务的系统平台，为全面解决农村饮水安全问题攻坚决战行动提供数据支持和决策支撑，以便精准掌控，逐步实现我省农村供水建设过程的监督和建后精准管护、科学管理。\n该云平台依托互联网、云计算、大数据等先进的技术手段搭建农村饮水安全信息化综合体系，一是实现全省饮水安全工程的建设管理。对饮水安全工程采用信息化手段，进行一工程一对策的精细化管理；二是全省农村饮水安全核查工作的监督管理。利用互联网手段实时跟踪饮水安全核查工作，掌握核查进度、核查数据，实现动态与普查数据的对比分析；三是饮水安全工程的运行监管。对千吨万人以上、百吨千人以上及以下农村饮水工程的分级动态管理和调度；四是农村饮水安全大数据分析。在通过一段时间的数据积累后，开展贵州农村饮水安全大数据分析，为下一步的农村饮水安全（供水）工作提供决策支撑。', 'icon': 'client/icon/饮水安全/upload-1556528001235.png', 'userGroupId': '567b49e0fa20440798ffca22cc1eaea9', 'userGroupName': '水利厅', 'clientGroupId': '567b49e0fa20440798ffca22cc1eaea9', 'clientGroupName': '水利厅', 'notice': '申请人和拟获取使用权的应用并不在同一个组别，建议不要允许该请求！'
      },
      isShowDetail: false,
      commission: '',
      appSelectOptions: [{
        value: 'app1',
        label: '应用1'
      }, {
        value: 'app2',
        label: '应用2'
      }, {
        value: 'app3',
        label: '应用3'
      }],
      typeSelectOptions: [{
        value: 'type1',
        label: '类型1'
      }, {
        value: 'type2',
        label: '类型2'
      }, {
        value: 'type3',
        label: '类型3'
      }],
      client: '',
      type: '',
      time: '',
      showCommissions: [],
      commissionData: {}
    }
  },
  watch: {
    commissions: {
      handler(curData, oldData) {
        // this.showCommissions = curData
        this.handlerSearch()
        this.getFilterCondition(curData)
      },
      deep: true
    }
  },
  methods: {
    handlerSearch() {
      // 搜索、过滤条件
      let condition = this.commission
      let type = this.type
      let client = this.client
      let time = this.time
      // 过滤数据
      let commissions = this.commissions
      let filterCommissions = commissions.filter(item => {
        let flag1 = condition ? item.clientName.indexOf(condition) > -1 : true
        let flag2 = type ? item.messageType === type : true
        let flag3 = client ? item.clientId === client : true
        let flag4 = time ? this.$moment(time).format('YYYY-MM-DD') === this.$moment(item.updateTime).format('YYYY-MM-DD') : true
        return flag1 && flag2 && flag3 && flag4
      })
      this.showCommissions = filterCommissions
    },
    showDeitalPanel(data) {
      this.commissionData = data
      this.$nextTick(() => {
        this.isShowDetail = true
      })
    },
    // 同意
    agreeApplication(data) {
      let param = {
        userIds: [data.userId],
        clientId: data.clientId,
        operatorCode: 1,
        messageId: data.messageId
      }
      this.$http.post('/api/client/assign', param).then(res => {
        console.log('申请应用权限——————已通过')
        if (res.code === 1002) {
          this.$emit('getMyCommission')
          this.isShowDetail = false
        }
        this.$message.success(res.data)
      })
    },
    // 拒绝
    refuseApplication(data) {
      let param = {
        userIds: [data.userId],
        clientId: data.clientId,
        operatorCode: 2,
        messageId: data.messageId
      }
      this.$http.post('/api/client/assign', param).then(res => {
        console.log('申请应用权限————已拒绝')
        if (res.code === 1002) {
          this.$emit('getMyCommission')
          this.isShowDetail = false
        }
        this.$message.warning(res.data)
      })
    },
    getFilterCondition(commission) {
      let messageTypes = []
      let types = []
      let clientIds = []
      let clients = []
      commission.map(item => {
        let messageType = item.messageType
        let clientId = item.clientId
        // 判断、组合数据
        let messageIndex = messageTypes.indexOf(messageType)
        if (messageIndex === -1) {
          messageTypes.push(messageType)
          types.push({value: messageType, label: item.messageType})
        }
        let clientIndex = clientIds.indexOf(clientId)
        if (clientIndex === -1) {
          clientIds.push(clientId)
          clients.push({value: clientId, label: item.clientName})
        }
      })
      this.appSelectOptions = [{value: '', label: '所有'}].concat(clients)
      this.typeSelectOptions = [{value: '', label: '所有'}].concat(types)
      /* return {
        appSelectOptions: clients,
        typeSelectOptions: types
      } */
    }
  },
  mounted() {
    // this.showCommissions = this.commissions
    this.handlerSearch()
    this.getFilterCondition(this.commissions)
  }
}
</script>

<style lang="scss" scoped>
.my-commission {
  display: flex;
  & > div {
    padding: 6px;
    height: 100%;
    margin-right: 20px;
  }
  li {
    margin-bottom: 10px;
    position: relative;
    &:hover {
      .commission-operaion {
        width: 100%;
      }
    }
  }
  .commission-content {
    height: calc(100% - 0.8rem);
    overflow: auto;
    padding: 10px 0;
  }
  .commission-node {
    display: flex;
    background: #527288;
    border-radius: 6px;
    color: #fff;
    padding: 6px;
    .commission-icon {
      height: 0.6rem;
      width: 0.6rem;
      padding: 6px;
      box-sizing: border-box;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .commission-content {
      width: 2.5rem;
      & > div:first-child {
        line-height: 0.36rem;
        p {
          margin: 0;
          display: inline-block;
          font-size: 0.12rem;
          font-weight: 600;
        }
        span {
          float: right;
          //   color: #639cb8;
          color: #00ceff;
        }
      }
      & > div:last-child {
        color: #ccc;
        .org-name {
          margin-left: 0.2rem;
        }
        .application-user {
          color: #f5ba0d;
        }
        & > span:last-child {
          float: right;
          color: #ddd;
        }
      }
    }
  }
  .commission-operaion {
    display: flex;
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    // background: rgba(255, 255, 255, 0.6);
    background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2));
    align-items: center;
    text-align: center;
    overflow: hidden;
    transition: width 0.2s ease;
    .commission-detail-btn {
      font-size: 0.2rem;
      width: 60%;
      text-align: left;
      a {
        display: flex;
        align-items: center;
        padding-left: 10px;
        text-decoration: none;
        i {
          transform: rotate(180deg);
          display: inline-block;
        }
        &:hover {
          color: #fff;
        }
      }
    }
    & > div:not(.commission-detail-btn) {
      width: 20%;
      a {
        border-radius: 0.3rem;
        // font-size: 0.18rem;
        // width: 0.3rem;
        // height: 0.3rem;
        display: inline-block;
        &:hover {
          background: #55baff;
          color: #fff;
          text-decoration: none;
        }
        i {
          font-size: 0.28rem;
          padding: 10px;
        }
      }
    }
  }
}
.expand-detail-enter-active {
  transition: all 0.3s ease;
}
.expand-detail-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.expand-detail-enter,
.expand-detail-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<style lang="scss">
.operation-filter {
  border: 6px solid #4a6f85;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0;
  background: rgb(255, 255, 255);
  .el-input {
    input {
      background: transparent;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #ddd;
    }
  }
  .filter-area {
    display: flex;
    .el-select {
      width: 1rem;
      input {
        background: transparent;
        border: none;
        border-right: 1px solid #ddd;
        border-radius: 0;
      }
    }
    .el-date-editor {
      width: unset;
      input {
        background: transparent;
        border: none;
      }
    }
  }
}
.commission-detail-panel {
  width: 2.5rem;
}
</style>
