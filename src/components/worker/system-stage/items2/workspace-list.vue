<template>
  <div class="stage-workspace">
    <table>
      <thead>
        <tr>
          <td>企业空间</td>
          <td>CPU使用量</td>
          <td>内存使用量</td>
          <td>容器组数量</td>
          <td>网络流出速率</td>
          <td>网络流入速率</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in workspace"
            :key="item.ip">
          <td>
            <div>
              <label>{{ item.name }}</label>
            </div>
          </td>
          <td>
            <div class="cpu">
              <label>{{ item['workspace_cpu_usage'] }} core</label>
            </div>
          </td>
          <td>
            <div>
              <label>{{ item['workspace_memory_usage_wo_cache'] | filterGB }} Gib</label>
            </div>
          </td>
          <td>
            <div>
              <label>{{ item['workspace_pod_count'] }}</label>
            </div>
          </td>
          <td>
            <div>
              <label>{{ item['workspace_net_bytes_transmitted'] | filterBps }}</label>
            </div>
          </td>
          <td>
            <div>
              <label>{{ item['workspace_net_bytes_received'] | filterBps }}</label>
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
    },
    filterBps(value) {
      let valueKbps = value * 8 / 1024
      let valueMbps = valueKbps / 1024
      if (valueMbps < 1) {
        return valueKbps.toFixed(2) + ' Kbps'
      } else {
        return valueMbps.toFixed(2) + ' Mbps'
      }
    }
  },
  data() {
    return {
      workspace: []
    }
  },
  methods: {
    getWorkspace() {
      this.$http.get('/api/monitor/workspace_level_metric_data_of_all_workspaces').then(res => {
        if (res.code !== 1002) {
          return
        }
        let data = res.data.body.results
        if (data) {
          let workspaceData = this.dataArr2Obj(data)
          this.workspace = workspaceData
        }
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
              id: node.metric.workspace
            }
          }
          obj[index][key] = value
        })
      })
      return obj
    }
  },
  mounted() {
    this.getWorkspace()
  }
}
</script>

<style lang="scss" scoped>
.stage-workspace {
  table {
    width: 100%;
    text-indent: 14px;
    tbody {
      tr div {
        background: rgba(68, 93, 141, 0.3);
        margin: 5px 0;
        height: 0.3rem;
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
