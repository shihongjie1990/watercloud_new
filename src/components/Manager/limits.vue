<template>
  <el-table :data="tableData"
            style="width: 100%"
            size="mini"
            border
            ref="thisTable"
            :row-class-name="isShowIcon"
            @expand-change="expandChange"
            @selection-change="handlSelectionChange">
    <el-table-column type="expand">
      <template slot-scope="props"
                v-if="props.row.children && props.row.children.length > 0">
        <own-table :tableData="props.row.children"
                   :permissionIds="permissionIds"
                   name="tableown"
                   ref="selftTable"
                   @modifyPermission="modifyPermission"
                   @handleDelete="handleDelete"></own-table>
      </template>
    </el-table-column>
    <el-table-column type="selection"
                     width="55"
                     align="center">
    </el-table-column>
    <el-table-column prop="name"
                     label="权限点"
                     align="center">
    </el-table-column>
    <el-table-column prop="permission"
                     label="权限接口"
                     align="center">
    </el-table-column>
    <el-table-column prop="requestMethod"
                     label="请求方式"
                     align="center">
    </el-table-column>
    <el-table-column label="操作"
                     align="center"
                     show-overflow-tooltip>
      <template slot-scope="scope"><a class='table-a'
           @click="modifyPermission(scope.row)" v-if="isModify">修改</a> <a class='table-a'
           @click="deletePermission(scope.row.permissionId)" v-if="isDelete">删除</a></template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ownTable',
  props: ['tableData', 'permissionIds'],
  data() {
    return {
      permissions: [],
      expands: []
    }
  },
  computed: {
    isModify() {
      return this.$store.state.MANAGER_MENU.indexOf('1202') > -1
    },
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('1204') > -1
    }
  },
  methods: {
    // 修改权限
    modifyPermission(row) {
      this.$emit('modifyPermission', row)
    },
    handleDelete(permissionIds) {
      this.$emit('handleDelete', permissionIds)
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
    // 单一删除
    deletePermission(permissionId) {
      this.handleDelete([permissionId])
    },
    // 多选事件
    handlSelectionChange(rows) {
      let permissionIds = []
      rows.map(permission => {
        permissionIds.push(permission.permissionId)
      })
      this.permissions = permissionIds
    },
    getAllPermissionIds() {
      Array.prototype.push.apply(this.permissionIds, this.permissions)
      let getAllIds =
        this.$refs.selftTable && this.$refs.selftTable.getAllPermissionIds
      getAllIds && typeof getAllIds === 'function' && getAllIds()
    }
  }
}
</script>
