<template>
  <div>
    <div>
      <el-steps direction="vertical"
                process-status="wait"
                finish-status="finish"
                space="20vh"
                :active="activeNode">
        <el-step v-for="(item, index) in folders"
                 :key="index"
                 :title="item.name">
          <template slot="icon">
            <i class="iconfont icon-folder-open"
               v-if="activeNode > index"></i>
            <i class="iconfont icon-folder"
               v-else></i>
          </template>
          <template slot="title">
            <div class="step-selection">
              <a>{{ item.name }}</a>
              <ul class="selection-item">
                <li v-for="radio in nodes[index]"
                    :key="radio.id">
                  <a @click="handlerSelect(radio, index)">
                    <i class="iconfont "
                       :class="folders[index] && folders[index].id === radio.id ? 'icon-folder-open' : 'icon-folder'"></i>
                    <div>{{radio.name}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNode: 0,
      value: '',
      radio1: '上海',
      folders: [{ name: '', id: '' }],
      nodes: []
    }
  },
  methods: {
    getFolder(node) {
      let param = node ? `/${node.id}` : ''
      return this.$http.get(`/api/resource/folder${param}`)
    },
    handlerSelect(data, index) {
      this.getFolder(data).then(res => {
        this.nodes.splice(index + 1)
        this.nodes.push(res.data)
        this.folders[index] = data
        this.folders.splice(index + 1)
        this.folders.push({
          value: '',
          label: ''
        })
        this.activeNode = index + 1
        this.$emit('getAllStaticData', { group: 0, type: '', keyword: '', rootId: data.id })
      })
    }
  },
  mounted() {
    this.getFolder().then(res => {
      this.nodes.push(res.data)
    })
  }
}
</script>

<style lang="scss" scoped>
ul.selection-item {
  display: flex;
  flex-wrap: wrap;
  float: right;
  max-width: 80%;
  /* transform: translateX(-50%); */
  position: absolute;
  left: 20%;
  top: 0;
  text-align: center;
  height: 19vh;
  overflow: auto;
  font-weight: normal;
  margin-top: 20px;
  a {
    i {
      font-size: 0.42rem;
      margin: 0.2rem 0.3rem 0.1rem;
      display: inline-block;
      color: #d9b95c;
    }
    div {
      max-width: 100px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: auto;
      color: #2c3e50;
    }
  }
}
</style>
