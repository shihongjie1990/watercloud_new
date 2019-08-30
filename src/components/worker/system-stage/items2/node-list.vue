<template>
  <div class="stage-nodes">
    <table>
      <thead>
        <tr>
          <td>节点</td>
          <td>CPU</td>
          <td>CPU 平均负载</td>
          <td>内存</td>
          <td>本地存储</td>
          <td>inode 使用率</td>
          <td>容器组</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in nodes"
            :key="item.ip">
          <td>
            <div>
              <label>{{ item.name }}</label>
              <span>{{ item.ip }}</span>
            </div>
          </td>
          <td>
            <div class="cpu">
              <label>{{ (parseFloat(item['node_cpu_utilisation'] || 0) * 100).toFixed(2) }}%</label>
              <span>{{ parseFloat(item['node_cpu_usage'] || 0).toFixed(2) }} / {{ item['node_cpu_total'] }} core</span>
            </div>
          </td>
          <td>
            <div>
              <label>{{ item['node_load1'] }}</label>
            </div>
          </td>
          <td>
            <div>
              <label>{{ (parseFloat(item['node_memory_utilisation'] || 0) * 100).toFixed(2) }}%</label>
              <span>{{ item['node_memory_usage_wo_cache'] | filterGB }} / {{ item['node_memory_available'] | filterGB }} GiB</span>
            </div>
          </td>
          <td>
            <div>
              <label>{{ (parseFloat(item['node_disk_size_utilisation'] || 0) * 100).toFixed(2) }}%</label>
              <span>{{ item['node_disk_size_usage'] | filterGB }} / {{ item['node_disk_size_capacity'] | filterGB }} GB</span>
            </div>
          </td>
          <td>
            <div>
              <label>{{ (parseFloat(item['node_disk_inode_utilisation'] || 0) * 100).toFixed(2) }}%</label>
              <span>{{ item['node_disk_inode_usage'] }} / {{ item['node_disk_inode_total'] }}</span>
            </div>
          </td>
          <td>
            <div>
              <label>{{ (parseFloat(item['node_pod_utilisation'] || 0) * 100).toFixed(2) }}%</label>
              <span>{{ item['node_pod_running_count'] }} / {{ item['node_pod_quota'] }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  filters: {
    filterGB(value) {
      let num = 0
      if (value) {
        num = (value / 1024 / 1024 / 1024).toFixed(2)
      }
      return num
    }
  },
  data() {
    return {
      nodes: []
    }
  },
  methods: {
    getNodes() {
      this.$http.get('/api/monitor/node_level_metric_data_of_all_nodes').then(res => {
        let nodesAllData = res.data.body.results
        // 重组nodesAllData，Array => Object
        let nodesMapData = this.dataArr2Obj(nodesAllData)
        this.nodes = nodesMapData
        // 获取cpu使用率
        /* let cpuUtilisation = nodesMapData['node_cpu_utilisation']
        // cpu用量
        let cpuUsage = nodesMapData['node_cpu_usage']
        // cpu总量
        let cpuTotal = nodesMapData['node_cpu_total']
        // 每分钟cpu平均负载
        let load1 = nodesMapData['node_load1']
        // 5分钟cpu平均负载
        let load5 = nodesMapData['node_load5']
        // 15分钟cpu平均负载
        let load15 = nodesMapData['node_load15']
        // 节点内存使用率
        let memoryUtilisation = nodesMapData['node_memory_utilisation']
        // 内存使用量
        let memoryUsageWoCache = nodesMapData['node_memory_usage_wo_cache']
        // 可用内存
        let memoryAvailable = nodesMapData['node_memory_available']
        // 内存总量
        let memoryTotal = nodesMapData['node_memory_total']
        // 本地存储，磁盘使用率
        let diskSizeUtilisation = nodesMapData['node_disk_size_utilisation']
        // 本地存储，磁盘可用大小
        let diskSizeAvailable = nodesMapData['node_disk_size_available']
        // 本地存储，磁盘使用量
        let diskSizeUsage = nodesMapData['node_disk_size_usage']
        // inode使用率
        let diskInodeUtilisation = nodesMapData['node_disk_inode_utilisation']
        // inode已使用数
        let diskInodeUsage = nodesMapData['node_disk_inode_usage']
        // inode总数
        let diskInodeTotal = nodesMapData['node_disk_inode_total']
        // 容器组，pod最大容量使用率
        let podUtilisation = nodesMapData['node_pod_utilisation']
        // 容器组，调度完成的pod数量
        let podCount = nodesMapData['node_pod_count']
        // 容器组，pod最大容纳量
        let podQuota = nodesMapData['node_pod_quota'] */
      })
    },
    dataArr2Obj(arr) {
      let obj = []
      let names = []
      arr.map(item => {
        // obj[item.metric_name] = item.data
        let data = item.data.result
        let key = item.metric_name
        data.map(node => {
          let name = node.metric.resource_name
          let index = names.indexOf(name)
          if (index < 0) {
            index = names.length
            names.push(name)
          }
          let value = node.value[1]
          if (!obj[index]) {
            obj[index] = {
              name: name,
              ip: node.metric.address[0].address
            }
          }
          obj[index][key] = value
        })
      })
      return obj
    }
  },
  mounted() {
    this.getNodes()
  }
}
</script>

<style lang="scss" scoped>
.stage-nodes {
  table {
    width: 100%;
    text-indent: 14px;
    tbody {
      tr div {
        background: rgba(68, 93, 141, 0.3);
        margin: 5px 0;
        height: 0.4rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        label {
          display: block;
          width: 100%;
        }
        &.cpu {
          background: rgba(105, 219, 115, 0.3);
        }
      }
    }
  }
}
</style>
