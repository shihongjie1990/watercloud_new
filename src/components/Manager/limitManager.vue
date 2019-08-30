<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addPermission"
                 v-if="$store.state.MANAGER_MENU.indexOf('1203') > -1">新增权限</el-button>
      <el-button icon="el-icon-delete"
                 size="small"
                 @click="deletePermissions"
                 v-if="$store.state.MANAGER_MENU.indexOf('1204') > -1">批量删除</el-button>
    </el-row>
    <limits :tableData="tableData"
            :permissionIds="permissionIds"
            ref="limitTable"
            @modifyPermission="modifyPermission"
            @handleDelete="handleDelete"></limits>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="600px">
      <add-limit @closeDialog="closeDialog"
                 @getAllLimits="getAllLimits"
                 v-if="dialogVisible"
                 :permission="permission"></add-limit>
    </el-dialog>
  </div>
</template>

<script>
import limits from './limits'
import addlimit from './addLimit'

export default {
  components: {
    'add-limit': addlimit,
    limits
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      title: '新增权限',
      permission: {},
      permissionIds: []
    }
  },
  methods: {
    // 获取所有权限点
    getAllLimits() {
      this.$http.get('/api/permission/list').then(res => {
        if (res.code === 1002) {
          this.tableData = res.data
          let dataDef = this.$store.dispatch('buildTreeData', {
            data: res.data,
            id: 'permissionId',
            parentId: 'parentId'
          })
          dataDef.then(tableData => {
            this.tableData = tableData
          })
        }
      }, err => {
        this.$message.error(err.message || err.content)
      })
    },
    // 删除权限
    handleDelete(permissionIds) {
      let msg = permissionIds.length === 1 ? '当前数据' : `选中的${permissionIds.length}项数据`
      this.$confirm(`确认删除${msg}？`, '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .delete(`/api/permission`, { data: permissionIds }, { loading: { operation: true } })
          .then(res => {
            if (res.code === 1002) {
              // 提示信息
              this.$message.success('删除成功！')
              // 关闭弹窗
              this.dialogVisible = false
              // 刷新表格
              this.getAllLimits()
            }
          })
      })
    },
    // 批量删除
    deletePermissions() {
      this.$refs.limitTable.getAllPermissionIds()
      /* let permissionIds = this.refs.limitTable.permissionIds
      this.handleDelete(permissionIds) */
      this.handleDelete(this.permissionIds)
    },
    // 关闭弹出框
    closeDialog() {
      this.title = '添加权限'
      this.permission = {}
      this.dialogVisible = false
    },
    // 点开修改弹出框
    modifyPermission(data) {
      this.title = '修改权限'
      this.permission = data
      this.dialogVisible = true
    },
    // 新增权限
    addPermission() {
      this.title = '新增权限'
      this.permission = {}
      this.dialogVisible = true
    }
  },
  mounted() {
    this.getAllLimits()
  }
}
</script>
