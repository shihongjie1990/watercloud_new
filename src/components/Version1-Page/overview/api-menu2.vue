<template>
  <div class="api-menu-oveview">
    <el-tabs v-model="activeName">
      <el-tab-pane label="绿色公开数据接口"
                   name="first">
        <div>
          <ul class="list-block">
            <li v-for="(node, i) in pageData.outside"
                :key="i">
              <a @click.stop="skipTo(node)">{{ node.apiName }}</a>
              <div>
                <div>{{ node.provider}}</div>
                <div>{{ node.updateTime | formatDate }}</div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="水利云公开数据接口"
                   name="second">
        <div class="inside-list">
          <div v-for="(item, index) in pageData.inside"
               :key="index"
               class="api-block">
            <p class="title">{{ item.app }}</p>
            <ul class="list-block">
              <li v-for="(node, i) in item.data"
                  :key="i">
                <a @click.stop="skipTo(node)">{{ node.apiName }}</a>
                <div>
                  <div>{{ node.provider}}</div>
                  <div>{{ node.updateTime | formatDate }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      data: {
        outside: [
          {
            name: '测试接口1',
            openLevel: '对外全公开'
          },
          {
            name: '测试接口2',
            openLevel: '对外全公开'
          },
          {
            name: '测试接口3',
            openLevel: '对外全公开'
          },
          {
            name: '测试接口4',
            openLevel: '对外全公开'
          },
          {
            name: '测试接口5',
            openLevel: '对外全公开'
          }
        ],
        inside: [
          {
            app: '测试应用1',
            data: [
              {
                name: '测试接口11',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口12',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口13',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口14',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口15',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口16',
                openLevel: '对外全公开'
              }
            ]
          },
          {
            app: '测试应用2',
            data: [
              {
                name: '测试接口21',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口22',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口23',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口24',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口25',
                openLevel: '对外全公开'
              },
              {
                name: '测试接口26',
                openLevel: '对外全公开'
              }
            ]
          }
        ]
      },
      pageData: {
        outside: [],
        inside: []
      }
    }
  },
  methods: {
    getAllApis() {
      this.$http.get('/api/api/listPublic').then(res => {
        if (res.code === 1002) {
          let data = res.data
          let outside = data.filter(item => {
            return !item.clientId
          })
          let insideData = data.filter(item => {
            return item.clientId
          })
          let inside = this.buildData(insideData)
          this.pageData = {
            outside: outside,
            inside: inside
          }
        } else {
          this.$message.error(res.msg || res.content || res.error)
        }
      })
    },
    // 根据应用归类数据
    buildData(data) {
      let parentIds = []
      let treeData = []
      data.map(item => {
        let index = parentIds.indexOf(item.clientId)
        if (index > -1) {
          treeData[index].data.push(item)
        } else {
          parentIds.push(item.clientId)
          treeData.push({
            app: item.clientBriefName,
            data: [item]
          })
        }
      })
      return treeData
    },
    skipTo(rowData) {
      this.$router.push({ name: 'apidesc', params: rowData })
    }
  },
  mounted() {
    this.getAllApis()
  }
}
</script>
