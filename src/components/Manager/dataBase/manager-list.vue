<template>
  <div class="padding-page">
    <!-- <el-select v-model="conditionType"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select> -->
    <el-table :data="tableData"
              style="width: 100%"
              border
              size="mini"
              height="5.2rem"
              class="resouce-table">
      <el-table-column type="index"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column prop="name"
                       label="资源名称"
                       align="center">
      </el-table-column>
      <!-- <el-table-column prop="type"
                       label="资源类型"
                       align="center">
      </el-table-column> -->
      <el-table-column prop="type"
                       align="center"
                       :formatter="formatType">
        <template slot="header"
                  slot-scope="scope">
          <el-select v-model="conditionType"
                     placeholder="资源类型"
                     class="table-select"
                     @change="searchResource">
            <el-option v-for="item in typeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="field"
                       label="资源领域"
                       align="center"> -->
      <el-table-column prop="field"
                       align="center">
        <!-- <template slot="header"
                  slot-scope="scope">
          <el-input v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索" />
        </template> -->
        <template slot="header"
                  slot-scope="scope">
          <el-select v-model="conditionGroup"
                     placeholder="资源领域"
                     class="table-select"
                     @change="searchResource">
            <el-option v-for="item in groupOptions"
                       :key="item.code"
                       :label="item.desc"
                       :value="item.code">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="owner"
                       label="提供方"
                       align="center"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="desc"
                       label="摘要"
                       align="center"
                       show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column prop="desc"
                       label="摘要"
                       align="center">
      </el-table-column> -->
      <el-table-column prop="updateTime"
                       label="创建时间"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <a class='table-a'
             @click="downloadFile(scope.row.id)"
             v-if="isDownload">下载</a>
          <a class='table-a'
             v-if="isLock">
            <el-tag v-if="scope.row.resourceNonLocked"
                    @click="lockData(scope.row.id)"
                    type="danger">解锁</el-tag>
            <el-tag v-else
                    @click="lockData(scope.row.id)">锁定</el-tag>
          </a>
          <a class='table-a'
             @click="deleteData(scope.row)"
             v-if="isDelete">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    groupOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    resourceName: {
      type: String,
      required: true
    }
  },
  computed: {
    isDownload() {
      return this.$store.state.MANAGER_MENU.indexOf('2203') > -1
    },
    isLock() {
      return this.$store.state.MANAGER_MENU.indexOf('2204') > -1
    },
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('2205') > -1
    }
  },
  data() {
    return {
      tableData: [],
      staticDataVisible: false,
      typeOptions: [{
        value: 'public',
        label: '公开'
      }, {
        value: 'private',
        label: '私有'
      }],
      conditionType: '',
      conditionGroup: ''
    }
  },
  methods: {
    getAllStaticData(condition) {
      let param = condition || { group: 0, type: '', keyword: '' }
      this.$http.post('/api/resource/query', param).then(res => {
        this.tableData = res.data
      })
    },
    formatType(row) {
      return row.type === 'public' ? '公开' : '私有'
    },
    // 通过搜索条件查询
    searchResource() {
      let condition = this.resourceName
      this.getAllStaticData({
        type: this.conditionType,
        group: this.conditionGroup,
        keyword: condition
      })
    },
    // 下载文件
    downloadFile(id) {
      this.$http.get(`/api/resource/getRelativePaths/${id}`).then(res => {
        console.log('下载资源', res)
        let data = res.data
        let key = Object.keys(data)[0]
        let value = data[key]
        let param = this.base64.encode(this.base64.encode(`${key}|${value}`))
        window.open(`${location.origin}/api/resource/download/${param}`, '_blank')
      })
      // /resource/downloads
    },
    lockData(id) {
      this.$http.post('/api/resource/toggleLock', [id]).then(res => {
        // 按照搜索条件再过滤
        this.searchResource()
      })
    },
    deleteData(data) {
      this.$confirm(`确认删除《${data.name}》？删除后将无法恢复！`, '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/resource/delete', [data.id]).then(res => {
          // 按照搜索条件在过滤
          this.searchResource()
        })
      })
    }
  },
  mounted() {
    this.getAllStaticData()
  }
}
</script>

<style>
.resouce-table .el-table_1_column_3 {
  padding: 3px 0;
}

.resouce-table.el-table th .cell {
  line-height: 12px;
}

.resouce-table .table-select {
  padding: 0;
}

.resouce-table .table-select > div {
  padding: 0;
}
</style>
