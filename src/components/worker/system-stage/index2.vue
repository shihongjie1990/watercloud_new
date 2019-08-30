<template>
  <div class="stage-data">
    <div>
      <div class="stage-overview">
        <node-status :nodesStatus="nodesStatus"></node-status>
        <!-- <parts-panel v-bind="kubesphere"></parts-panel>
        <parts-panel v-bind="kubernetes"></parts-panel>
        <parts-panel v-bind="openpitrix"></parts-panel> -->
        <div class="statics-item">
          <parts-panel v-for="item in nodeComponents"
                       :key="item.name"
                       v-bind="item"></parts-panel>
        </div>
      </div>
      <!-- <div>
        <resource-panel></resource-panel>
        <resource-panel></resource-panel>
        <resource-panel></resource-panel>
        <resource-panel></resource-panel>
      </div> -->
      <div class="stage-statics">
        <total-statics></total-statics>
      </div>
    </div>
    <div class="stage-list">
      <node-list></node-list>
      <work-space class="stage-two-list"></work-space>
    </div>
  </div>
</template>

<script>
import nodeStatus from './items2/node-status'
import partsPanel from './items2/parts-panel'
import resourcePanel from './items2/resource-panel2'
import totalStatics from './items2/total-statics'
import nodeList from './items2/node-list'
import workSpace from './items2/workspace-list'

export default {
  components: {
    nodeStatus,
    partsPanel,
    resourcePanel,
    totalStatics,
    nodeList,
    workSpace
  },
  data() {
    return {
      kubesphere: {
        name: 'KUBESPHERE',
        currentNum: 6,
        totalNum: 6
      },
      kubernetes: {
        name: 'kubernetes',
        currentNum: 3,
        totalNum: 3
      },
      openpitrix: {
        name: 'OPENPITRIX',
        currentNum: 13,
        totalNum: 13
      },
      nodesStatus: {
        healthyNodes: 0,
        totalNodes: 0
      },
      nodeComponents: []
    }
  },
  methods: {
    getComponentHealthy() {
      this.$http.get('/api/monitor/the_health_status_of_system_components').then(res => {
        let data = res.data.body
        let nodesStatus = data.nodeStatus
        let kubernetesStatus = data.kubernetesStatus // 长度代表kubernetes的数量
        let kubesphereStatus = data.kubesphereStatus
        // 节点状态
        this.nodesStatus = nodesStatus
        let nodeComponents = []
        // kubernetes组件数
        nodeComponents.push({
          name: 'kubernetes',
          currentNum: kubernetesStatus.length,
          totalNum: kubernetesStatus.length
        })
        // kubesphere组件数
        let kubesphereComponents = this.handlerKubesphereStatus(kubesphereStatus)
        // nodeComponents = nodeComponents.concat(kubesphereComponents)
        this.nodeComponents = kubesphereComponents
      })
    },
    handlerKubesphereStatus(data) {
      let nameArr = []
      let nameCount = []
      data.map(item => {
        let name = item.namespace
        let index = nameArr.indexOf(name)
        if (index < 0) {
          nameArr.push(name)
          name = name.substring(0, name.lastIndexOf('-'))
          name = name.substring(name.indexOf('-') + 1)
          let humpName = name.slice(0, 1).toUpperCase() + name.slice(1)
          nameCount.push({
            name: humpName,
            currentNum: 1,
            totalNum: 1
          })
        } else {
          nameCount[index].currentNum += 1
          nameCount[index].totalNum += 1
        }
      })
      return nameCount
    }
  },
  mounted() {
    this.getComponentHealthy()
  }
}
</script>

<style lang="scss" scoped>
.stage-data {
  color: #fff;
  .stage-overview {
    border: 5px solid #165176;
    border-radius: 10px;
    width: 2.8rem;
  }
  .stage-statics {
    margin-top: 0.1rem;
  }
  .stage-list {
    width: 9.3rem;
    .stage-two-list {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #999;
    }
    & > div {
      height: 3rem;
      overflow: auto;
    }
  }
  .statics-item {
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 50%;
    }
    & > div:first-child {
      width: 100%;
    }
  }
}
</style>
