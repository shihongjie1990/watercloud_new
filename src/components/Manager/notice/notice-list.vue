<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="$router.push('/publishnotice')"
                 v-if="$store.state.MANAGER_MENU.indexOf('1701') > -1">新增公告</el-button>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%"
              border
              size="mini"
              @selection-change="handleSelectionChange">
      <el-table-column type="index"
                       width="55"
                       align="center"></el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       align="center">
      </el-table-column>
      <el-table-column label="内容"
                       :show-overflow-tooltip="true"
                       align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.content"></span>
        </template>
      </el-table-column>
      <el-table-column prop="submitter"
                       label="提交者"
                       align="center">
      </el-table-column>
      <el-table-column prop="visits"
                       label="访问次数"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="更新时间"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       show-overflow-tooltip>
        <template slot-scope="scope"><a class='table-a'
             @click="modifyNotice(scope.row.id)" v-if="isModify">修改</a> <a class='table-a'
             @click="deleteNotice(scope.row.id)" v-if="isDelete">删除</a></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {
  },
  computed: {
    isModify() {
      return this.$store.state.MANAGER_MENU.indexOf('1703') > -1
    },
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('1702') > -1
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getAllNotices() {
      let param = {
        pageNum: 1,
        pageSize: 100
      }
      this.$http.get('/api/announcement/page', { params: param }).then(res => {
        if (res.code === 1002) {
          this.tableData = res.data.list
        } else {
          this.$message.error(res.msg || res.content || res.error)
        }
      })
    },
    modifyNotice(id) {

    },
    deleteNotice(id) {

    },
    handleSelectionChange() {

    }
  },
  mounted() {
    this.getAllNotices()
  }
}
</script>
