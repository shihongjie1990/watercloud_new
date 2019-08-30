<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addRole"
                 v-if="$store.state.MANAGER_MENU.indexOf('1401') > -1">新增角色</el-button>
      <!-- <el-button type="warning"
                 icon="el-icon-edit"
                 @click="modifyRole">修改角色</el-button> -->
      <el-button icon="el-icon-delete"
                 size="small"
                 @click="deleteRoles"
                 v-if="$store.state.MANAGER_MENU.indexOf('1403') > -1">删除角色</el-button>
    </el-row>
    <roles :tableData="tableData"
           ref="roleOperation"
           @assignLimit="assignLimit"
           @giveLimit="giveLimit"
           @modifyRole="modifyRole"
           @handleDelete="handleDelete"></roles>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="600px">
      <add-role @closeDialog="closeDialog"
                @getAllRoles="getAllRoles"
                v-if="dialogVisible"
                :role="role"></add-role>
    </el-dialog>
    <el-dialog title="分配权限"
               :visible.sync="limitVisible"
               width="50%">
      <assign-limit @closeLimit="closeLimit"
                    @getAllRoles="getAllRoles"
                    v-if="limitVisible"
                    :roleId="roleId"></assign-limit>
    </el-dialog>
    <el-dialog title="下发权限"
               :visible.sync="permissionVisible"
               width="50%">
      <give-limit @closePermission="closePermission"
                  @getAllRoles="getAllRoles"
                  v-if="permissionVisible"
                  :roleId="giveRoleId"></give-limit>
    </el-dialog>
  </div>
</template>

<script>
import roles from './roles'
import addrole from './addRole'
import assignLimit from './role/assignLimits'
import giveLimit from './role/giveLimits'

export default {
  components: {
    'add-role': addrole,
    roles,
    'assign-limit': assignLimit,
    'give-limit': giveLimit
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      title: '新增角色',
      role: {},
      limitVisible: false,
      roleId: '',
      giveRoleId: '',
      permissionVisible: false
    }
  },
  methods: {
    // 获取所有角色信息
    getAllRoles() {
      this.$http.get('/api/role/list').then(res => {
        if (res.code === 1002) {
          //   this.tableData = res.data
          let dataDef = this.$store.dispatch('buildTreeData', {
            data: res.data,
            id: 'roleId',
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
    // 关闭弹出框
    closeDialog() {
      this.dialogVisible = false
    },
    closeLimit() {
      this.limitVisible = false
    },
    closePermission() {
      this.permissionVisible = false
    },
    assignLimit(id) {
      this.roleId = id
      this.$nextTick(() => {
        this.limitVisible = true
      })
    },
    giveLimit(id) {
      this.giveRoleId = id
      this.$nextTick(() => {
        this.permissionVisible = true
      })
    },
    // 新增角色
    addRole() {
      this.role = {}
      this.title = '新增角色'
      this.dialogVisible = true
    },
    // 弹出修改角色弹出框
    modifyRole(data) {
      this.title = '修改角色'
      this.role = data
      this.dialogVisible = true
    },
    // 删除角色
    handleDelete(roleId) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/role?roleId=${roleId}`, { loading: { operation: true } }).then(res => {
          if (res.code === 1002) {
            // 提示信息
            this.$message.success('删除成功！')
            // 关闭弹出框
            this.dialogVisible = false
            // 刷新
            this.getAllRoles()
          }
        })
      })
    },
    // 批量删除
    deleteRoles() {
      let roleIds = this.$refs.roleOperation.roleIds
      this.handleDelete(roleIds)
    }
  },
  mounted() {
    this.getAllRoles()
  }
}
</script>
