<template>
  <div>
    <div class="system-info">
      <div v-for="item in system"
           :key="item.name">
        <main-system :system="item"></main-system>
      </div>
    </div>
    <div class="usage-rate">
      <bar-percent :percent="percent"></bar-percent>
    </div>
    <div class="server-info">
      <div v-for="item in data"
           :key="item.name">
        <node-panel :server="item"></node-panel>
      </div>
    </div>
  </div>
</template>

<script>
import nodePanel from './items/node-panel'
import mainSystem from './items/main-system'
import barPercent from './items/bar-percent'

export default {
  components: {
    nodePanel,
    mainSystem,
    barPercent
  },
  data() {
    return {
      data: [
        {
          name: 'master1',
          isUsing: 'true',
          role: 'node',
          cpu: NaN,
          gib: NaN,
          group: 28,
          time: '2019-01-29 06:48:10',
          img: 'Storage2.png'
        }, {
          name: 'master2',
          isUsing: 'true',
          role: 'node',
          cpu: 0.16,
          gib: 12.54,
          group: 30,
          time: '2019-01-29 06:47:12',
          img: 'Storage2.png'
        }, {
          name: 'node1',
          isUsing: 'true',
          role: 'node',
          cpu: 0.25,
          gib: 8.39,
          group: 18,
          time: '2019-01-29 06:48:52',
          img: 'app2_leave.png'
        }, {
          name: 'node2',
          isUsing: 'true',
          role: 'node',
          cpu: 2.1,
          gib: 17.44,
          group: 35,
          time: '2019-01-29 06:48:52',
          img: 'app2_leave.png'
        }, {
          name: 'node3',
          isUsing: 'true',
          role: 'node',
          cpu: 0.25,
          gib: 8.39,
          group: 18,
          time: '2019-01-29 06:48:52',
          img: 'app2_leave.png'
        }, {
          name: 'node4',
          isUsing: 'true',
          role: 'node',
          cpu: 2.1,
          gib: 17.44,
          group: 35,
          time: '2019-01-29 06:48:52',
          img: 'app2_leave.png'
        }
      ],
      system: [
        {
          name: 'kube-system',
          runTime: '0',
          serveNum: 3,
          server: 'coredns, metrics-server, tiller-deploy',
          icon: 'd-flow.png'
        }, {
          name: 'kubesphere-system',
          runTime: '0',
          serveNum: 6,
          server: 'ks-account, ks-apigateway, ks-apiserver, ks-console, openldap, redis',
          icon: 'icon_oparetor.png'
        }, {
          name: 'openpitrix-system',
          runTime: '0',
          serveNum: 13,
          server: 'openpitrix-api-gateway, openpitrix-app-manager, openpitrix-category-manager, openpitrix-cluster-manager, openpitrix-db, openpitrix-etcd, openpitrix-iam-service, openpitrix-job-manager, openpitrix-minio, openpitrix-repo-indexer, openpitrix-repo-manager, openpitrix-runtime-manager, openpitrix-task-manager',
          icon: 'icon_detector.png'
        }
      ],
      percent: 18
    }
  },
  methods: {
    getNodes() {
      this.$http.get('/api/monitor/node-level_metric_data_of_all_nodes').then(res => {
      })
    }
  },
  mounted() {
    this.getNodes()
  }
}
</script>

<style lang="scss" scoped>
.system-info > div,
.server-info > div {
  margin-bottom: 20px;
}
</style>
