<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addApiInfo"
                 v-if="$store.state.MANAGER_MENU.indexOf('1601') > -1">新增API</el-button>
      <!-- <el-button type="warning"
                 icon="el-icon-edit"
                 @click="modifyUser">修改用户</el-button> -->
      <!-- <el-button icon="el-icon-delete"
                 @click="deleteGroups">删除用户</el-button> -->
    </el-row>
    <el-collapse v-model="activeName"
                 accordion>
      <el-collapse-item v-for="(item, index) in pageData"
                        :key="index"
                        :title="item.name"
                        :name="item.name">
        <el-table :data="item.data"
                  style="width: 100%"
                  border
                  size="mini"
                  @selection-change="handleSelectionChange">

          <el-table-column type="selection"
                           width="55"
                           align="center"></el-table-column>
          <el-table-column label="API别名"
                           align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <a @click="skipTo(scope.row)"
                 class="link-a">{{ scope.row.apiName }}</a>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="apiName"
                           label="API别名"
                           align="center">
          </el-table-column> -->
          <el-table-column prop="url"
                           label="域"
                           align="center">
          </el-table-column>
          <el-table-column prop="path"
                           label="接口"
                           align="center">
          </el-table-column>
          <el-table-column prop="freshFrequency"
                           label="更新频率"
                           align="center">
          </el-table-column>
          <el-table-column prop="apiDesc"
                           label="描述"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="clientBriefName"
                           label="应用名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="provider"
                           label="数据提供方"
                           align="center">
          </el-table-column>
          <el-table-column prop="openLevel"
                           label="公开范围"
                           align="center"
                           :formatter="formatLevel">
          </el-table-column>
          <el-table-column prop="method"
                           label="请求方式"
                           align="center">
          </el-table-column>
          <el-table-column prop="format"
                           label="交互格式"
                           align="center"
                           :formatter="formatFormat">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间"
                           align="center"
                           :formatter="formatDate">
          </el-table-column>
          <el-table-column prop="updateTime"
                           label="更新时间"
                           align="center"
                           :formatter="formatDate">
          </el-table-column>
          <el-table-column label="启停操作"
                           align="center"
                           show-overflow-tooltip
                           v-if="$store.state.MANAGER_MENU.indexOf('1602') > -1">
            <template slot-scope="scope">
              <el-tag type="warning"
                      v-if="scope.row.enabled"
                      class="click-tag"
                      @click="startStop(scope.row)">停用</el-tag>
              <el-tag type="success"
                      class="click-tag"
                      v-else
                      @click="startStop(scope.row)">启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <a class='table-a'
                 @click="modifyApi(scope.row)"
                 v-if="isModify">修改</a> -->
              <a class='table-a'
                 @click="deleteApi(scope.row.groupId)"
                 v-if="isDelete">删除</a></template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-dialog :title="title"
               :visible.sync="apiVisible"
               width="600px">
      <add-api @closeApi="closeApi"
               @getAllApis="getAllApis"
               :api="api"></add-api>
      <!-- <add-api></add-api> -->
    </el-dialog>
  </div>
</template>

<script>
import addApi from './addApi'

export default {
  components: {
    'add-api': addApi
  },
  data() {
    return {
      message: 'hello world',
      tableData: [],
      apiVisible: false,
      title: '新增API',
      api: {},
      activeName: '',
      pageData: []
    }
  },
  computed: {
    isModify() {
      return this.$store.state.MANAGER_MENU.indexOf('1605') > -1
    },
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('1603') > -1
    }
  },
  methods: {
    getAllApis() {
      this.$http.get('/api/api/list').then(res => {
        if (res.code === 1002) {
          let data = res.data
          let clientIds = []
          let pageData = []
          data.map(item => {
            let index = clientIds.indexOf(item.clientId)
            if (index > -1) {
              pageData[index].data.push(item)
            } else {
              clientIds.push(item.clientId)
              pageData.push({
                name: item.clientBriefName || '第三方接口',
                data: [item]
              })
            }
          })
          //   this.tableData = res.data
          this.pageData = pageData
        }
      })
    },
    modifyApi(row) {
      this.title = '修改API信息'
      this.api = row
      this.apiVisible = true
    },
    deleteApi(apiId) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/api?apiId=${apiId}`, { loading: { operation: true } }).then(res => {
          if (res.code === 1002) {
            this.$message.success('删除成功！')
            // 刷新表格
            this.getAllGroups()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 操作
    addApiInfo() {
      this.title = '新增API信息'
      this.api = {}
      this.apiVisible = true
    },
    closeApi() {
      this.apiVisible = false
    },
    // 表格选中
    handleSelectionChange(rows) { },
    startStop(rowData) {
      let flag = rowData.enabled
      let msg = ''
      if (flag) {
        msg = '停用'
      } else {
        msg = '启用'
      }
      this.$confirm(`确定${msg}该API？`, '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http.post('/api/api/toggleEnabled', { id: rowData.id }).then(res => {
          if (res.code === 1002) {
            this.$message.success(`已${msg}`)
            this.getAllApis()
          } else {
            this.$message.error(res.msg || res.content)
          }
        }, thisErr => {
          this.$message.error(thisErr.content)
        })
      })
    },
    formatLevel(row, cellOption, value, index) {
      let text = ''
      if (value) {
        text = '对指定IP公开'
      } else {
        text = '对外完全公开'
      }
      return text
    },
    formatFormat(row, cellOption, value, index) {
      let text = ''
      if (value) {
        text = 'XML'
      } else {
        text = 'JSON'
      }
      return text
    },
    formatDate(row, cellOption, value, index) {
      return this.$moment(value).format('YYYY-MM-DD')
    },
    skipTo(rowData) {
      this.$router.push({ name: 'apiDetail', params: rowData })
    }
  },
  mounted() {
    this.getAllApis()
  }
}
</script>
