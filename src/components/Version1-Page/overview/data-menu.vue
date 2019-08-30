<template>
  <div class="overview-data-menu lg-block">
    <div class="title">数据目录</div>
    <div>
      <!-- <div>
        <div v-for="(item, index) in Object.keys(treeData)"
             :key="index">

        </div>
      </div> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in names"
                            :key="index">
          <a @click.stop="returnNode(item)"
             v-if="names.length > index + 1">{{item.nodeName}}</a>
          <a v-else>{{item.nodeName}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="data-block"
           :style="'margin-left:-' + distance + 'px'">
        <div>
          <ul class="data-menu-list">
            <li v-for="(item, index) in menuData.subNodes"
                :key="index"
                :title="item.nodeName">
              <a @click.stop="showChildren(item)">{{ item.nodeName }}</a>
            </li>
          </ul>
        </div>
        <div>
          <ul class="data-menu-list">
            <li v-for="(item, index) in menuData.subNodes"
                :key="index"
                :title="item.nodeName">
              <a @click.stop="showChildren(item)">{{ item.nodeName }}</a>
            </li>
          </ul>
        </div>
        <div>
          <ul class="data-menu-list">
            <li v-for="(item, index) in menuData.subNodes"
                :key="index"
                :title="item.nodeName">
              <a @click.stop="showChildren(item)">{{ item.nodeName }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ajaxUrl'],
  data() {
    return {
      treeData: [],
      testData: {},
      menuData: [],
      distance: 0,
      url: [],
      rootPath: [],
      filePath: [],
      names: []
    }
  },
  methods: {
    getDataNodes(params) {
      return new Promise((resolve, reject) => {
        let data = []
        // ajaxUrl: /resource/shared/public
        this.$http
          .get('/api' + this.ajaxUrl.url, { params: params })
          .then(res => {
            if (res.code === 1002) {
              data = res.data
            }
            resolve(data)
          })
      })
    },
    showChildren(node) {
      this.getDataNodes({ nodeId: node.nodeId }).then(res => {
        this.filePath.push(res.nodePath)
        if (res && res.subNodes && res.subNodes.length > 0) {
          this.menuData = res
          this.distance += 1200
          this.names.push(node)
        } else {
          // console.log('https://view.officeapps.live.com/op/view.aspx?src=http://watercloud.natapp1.cc/portal-server/' + this.rootPath.join('') + this.filePath.join(''))
          /* window.open(
            'https://view.officeapps.live.com/op/view.aspx?src=http://watercloud.natapp1.cc/portal-server/' +
            this.rootPath.join('') +
            this.filePath.join('')
          ) */
          window.open(location.origin + this.$store.state.BASE_URL + '/api' + this.rootPath.join('') + this.filePath.join(''))
        }
      })
    },
    returnNode(node) {
      let names = this.names
      let index = -1
      for (let i = 0; i < names.length; i++) {
        if (node.nodeId === names[i].nodeId) {
          index = i
        }
      }
      this.names.splice(index + 1)
      this.getDataNodes({ nodeId: node.nodeId }).then(res => {
        this.menuData = res
      })
      this.distance = index * 1200
    }
  },
  mounted() {
    let treeData = this.treeData
    let menuData = []
    for (let i = 0; i < 5; i++) {
      menuData = menuData.concat(JSON.parse(JSON.stringify(treeData)))
    }
    this.menuData = menuData
    let loopAjax = (nodeId, times, def) => {
      let param = nodeId ? { nodeId: nodeId } : ''
      this.getDataNodes(param).then(res => {
        times--
        this.rootPath.push(res.nodePath)
        let itemNodeId = res.subNodes[0].nodeId
        let findData = res.subNodes.find(item => {
          return item.nodePath === this.ajaxUrl.type + '/'
        })
        if (findData && Object.keys(findData).length > 0) {
          itemNodeId = findData.nodeId
        }
        if (times === 0) {
          this.names.push({ nodeName: '绿色静态数据目录', nodeId: res.nodeId })
          this.menuData = res
        } else {
          loopAjax(itemNodeId, times)
        }
      })
    }
    loopAjax('', 2)
  }
}
</script>
