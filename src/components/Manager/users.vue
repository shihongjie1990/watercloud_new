<template>
  <el-table :data="tableData || []"
            style="width: 100%"
            border
            size="mini"
            ref="thisTable"
            :row-class-name="isShowIcon"
            @expand-change="expandChange"
            @selection-change="handleSelectionChange">
    <el-table-column type="expand">
      <template slot-scope="props">
        <own-table :tableData="props.row.children"
                   name="tableown"
                   ref="selftTable"
                   @modifyUser="modifyUser"
                   @assignRole="assignRole"
                   @modifyRole="modifyRole"
                   @getAllUsers="getAllUsers"></own-table>
      </template>
    </el-table-column>
    <el-table-column type="selection"
                     width="55"
                     align="center"></el-table-column>
    <el-table-column prop="username"
                     label="用户名"
                     align="center">
    </el-table-column>
    <el-table-column prop="name"
                     label="所在分组"
                     align="center">
    </el-table-column>
    <el-table-column prop="createTime"
                     label="创建时间"
                     align="center">
    </el-table-column>
    <el-table-column prop="updateTime"
                     label="更新时间"
                     align="center">
    </el-table-column>
    <el-table-column label="锁定"
                     align="center"
                     show-overflow-tooltip
                     v-if="$store.state.MANAGER_MENU.indexOf('1308') > -1">
      <template slot-scope="scope">
        <el-tag type="warning"
                v-if="scope.row.accountNonLocked"
                class="click-tag"
                @click="lockUser(scope.row)">锁定</el-tag>
        <el-tag type="success"
                class="click-tag"
                v-else
                @click="lockUser(scope.row)">解锁</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作"
                     align="center"
                     show-overflow-tooltip>
      <template slot-scope="scope"><a class='table-a'
           @click="modifyUser(scope.row)">修改</a> <a class='table-a'
           @click="assignRole(scope.row.userId)"
           v-if="(!scope.row.roles || scope.row.roles.length === 0) && assignRoles">分配角色</a> <a class='table-a'
           @click="modifyRole(scope.row)"
           v-if="scope.row.roles && scope.row.roles.length > 0 && assignRoles">更改角色</a> <a class='table-a'
           @click="deleteRow(scope.row.userId)" v-if="deleteUser">删除</a></template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ownTable',
  props: ['tableData'],
  data() {
    return {
      selectedRows: []
    }
  },
  computed: {
    assignRoles() {
      return this.$store.state.MANAGER_MENU.indexOf('1406') > -1
    },
    deleteUser() {
      return this.$store.state.MANAGER_MENU.indexOf('1302') > -1
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    isShowIcon(row, index) {
      if (row.row.children.length > 0) {
        return ''
      } else {
        return 'hiderow'
      }
    },
    expandChange(row, expandedRows) {
      if (row.children.length === 0) {
        this.$refs.thisTable.toggleRowExpansion(row, false)
      }
    },
    deleteRow(userId) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: '/api/user',
          method: 'delete',
          data: [userId],
          loading: { operation: true }
        }).then(res => {
          if (res.code === 1002) {
            this.$message.success('角色删除成功！')
            this.getAllUsers()
          }
        })
      })
    },
    getAllUsers() {
      this.$emit('getAllUsers')
    },
    modifyUser(row) {
      let data = JSON.parse(JSON.stringify(row))
      this.$emit('modifyUser', data)
    },
    assignRole(userId) {
      this.$emit('assignRole', userId)
    },
    modifyRole(rowData) {
      this.$emit('modifyRole', rowData)
    },
    lockUser(rowData) {
      let flag = rowData.accountNonLocked
      let msg = ''
      if (flag) {
        msg = '锁定'
      } else {
        msg = '解锁'
      }
      this.$confirm(`确定${msg}该用户？`, '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http.post('/api/user/toggleLock', { userId: rowData.userId }).then(res => {
          if (res.code === 1002) {
            this.$message.success(`${msg}成功！`)
            this.getAllUsers()
          } else {
            this.$message.error(res.message || res.content)
          }
        }, thisErr => {
          this.$message.error(thisErr.content)
        })
      })
    }
  }
}
</script>
