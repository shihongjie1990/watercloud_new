<template>
  <el-table :data="tableData"
            style="width: 100%"
            border
            size="mini"
            @selection-change="handleSelectionChange">
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <own-table :tableData="props.row.children"
                   name="tableown"
                   ref="selftTable"></own-table>
      </template>
    </el-table-column> -->
    <el-table-column type="selection"
                     width="55"
                     align="center">
    </el-table-column>
    <el-table-column prop="role"
                     label="角色"
                     align="center">
    </el-table-column>
    <el-table-column prop="description"
                     label="角色名"
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
    <el-table-column prop="description"
                     label="角色描述"
                     align="center">
    </el-table-column>
    <el-table-column label="操作"
                     align="center"
                     show-overflow-tooltip>
      <template slot-scope="scope"><a class='table-a'
           @click="modify(scope.row)" v-if="isModify">修改</a> <a class='table-a'
           @click="deleteRole(scope.row.roleId)" v-if="isDelete">删除</a> <a class='table-a'
           @click="assignLimits(scope.row)" v-if="isAssign">分配权限</a> <a class='table-a'
           @click="giveLimits(scope.row)" v-if="isGive">下发权限</a></template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  // name: 'ownTable',
  props: ['tableData'],
  data() {
    return {
      roleIds: []
    }
  },
  computed: {
    isAssign() {
      return this.$store.state.MANAGER_MENU.indexOf('1207') > -1
    },
    isGive() {
      return this.$store.state.MANAGER_MENU.indexOf('1208') > -1
    },
    isModify() {
      return this.$store.state.MANAGER_MENU.indexOf('1402') > -1
    },
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('1403') > -1
    }
  },
  methods: {
    // 修改角色
    modify(data) {
      this.$emit('modifyRole', data)
    },
    // 单一删除
    deleteRole(roleId) {
      this.$emit('handleDelete', roleId)
    },
    handleSelectionChange(rows) {
      let roleIds = []
      if (rows.length > 0) {
        rows.map(role => {
          roleIds.push(role.roleId)
        })
        this.roleIds = roleIds
      }
    },
    assignLimits(rowData) {
      this.$emit('assignLimit', rowData.roleId)
    },
    giveLimits(rowData) {
      this.$emit('giveLimit', rowData.roleId)
    }
  }
}
</script>
