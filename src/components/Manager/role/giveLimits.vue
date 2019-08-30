<template>
  <div>
    <el-row class="assign-user">
      <el-col :span="12">
        <label>所有可分配权限点：</label>
        <el-tree :data="limits"
                 show-checkbox
                 node-key="permissionId"
                 :props="defaultProps"
                 @check="handlerCheck"
                 :default-checked-keys="checkedKeys"
                 ref="tree">
        </el-tree>
      </el-col>
      <el-col :span="12"
              class="user-list">
        <label>已有可分配权限：</label>
        <!-- <ul>
          <li v-for="limit in nodes"
              :key="limit.permissionId">{{ limit.name }}</li>
        </ul> -->
        <el-tree :data="treeNodes"
                 :props="defaultProps"
                 default-expand-all></el-tree>
      </el-col>
    </el-row>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="onConfirm">确认</el-button>
      <el-button @click="$emit('closePermission')">取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['roleId'],
  data() {
    return {
      limits: [],
      nodes: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeNodes: []
    }
  },
  methods: {
    /* getAllUsers() {
      this.$http.get(`/api/user/list?type=all`).then(res => {
        if (res.code === 1002) {
          let dataDef = this.$store.dispatch('buildTreeData', {
            data: res.data,
            id: 'userId',
            parentId: 'parentId'
          })
          dataDef.then(users => {
            console.log(users)
            this.users = users
          })
          // this.roles = res.data
        }
      })
    }, */
    // 获取所有权限点
    getAllLimits() {
      this.$http.get('/api/permission/listAllocatables').then(res => {
        if (res.code === 1002) {
          this.tableData = res.data
          let dataDef = this.$store.dispatch('buildTreeData', {
            data: res.data,
            id: 'permissionId',
            parentId: 'parentId'
          })
          dataDef.then(tableData => {
            this.limits = tableData
          })
        }
      }, err => {
        this.$message.error(err.message || err.content)
      })
    },
    getSelectedUsers() {
      this.$http
        .get(`/api/permission/listAllocatables?roleId=${this.roleId}`)
        .then(res => {
          if (res.code === 1002) {
            if (res.data && Object.keys(res.data).length > 0) {
              let data = res.data
              let keys = []
              data.map(node => {
                let filterData = data.filter(item => {
                  return item.parentId === node.permissionId
                })
                if (!filterData || filterData.length === 0) {
                  keys.push(node.permissionId)
                }
              })
              this.checkedKeys = keys
              // 生成树结构
              let nodes = res.data
              this.nodes = nodes
              let dataDef = this.$store.dispatch('buildTreeData', {
                data: nodes,
                id: 'permissionId',
                parentId: 'parentId'
              })
              dataDef.then(treeData => {
                this.treeNodes = treeData
              })
            }
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    handlerCheck(node, treeState) {
      let halfCheckedNodes = treeState.halfCheckedNodes
      let nodes = []
      if (halfCheckedNodes && halfCheckedNodes.length > 0) {
        /*  let findData = halfCheckedNodes.find(item => {
           return item.permissionId === node.parentId
         })
         if (findData && Object.keys(findData).length > 0) {
           this.nodes.push(findData)
         } */
        nodes = JSON.parse(JSON.stringify(treeState.checkedNodes.concat(halfCheckedNodes)))
      } else {
        nodes = JSON.parse(JSON.stringify(treeState.checkedNodes))
      }
      this.nodes = nodes
      let dataDef = this.$store.dispatch('buildTreeData', {
        data: nodes,
        id: 'permissionId',
        parentId: 'parentId'
      })
      dataDef.then(treeData => {
        this.treeNodes = treeData
      })
    },
    onConfirm() {
      // let selectedNodes = this.$refs.tree.getCheckedNodes()
      let selectedNodes = this.nodes
      if (selectedNodes.length > 0) {
        let ids = []
        selectedNodes.map(item => {
          /* let filterData = selectedNodes.filter(node => {
            return item.permissionId === node.parentId
          })
          if (filterData.length === 0) {
            ids.push(item.permissionId)
          } */
          ids.push(item.permissionId)
        })
        this.$http
          .post('/api/permission/assignAllocation', { allocatablePermissionIds: ids, roleId: this.roleId })
          .then(res => {
            if (res.code === 1002) {
              this.$message.success('下发成功！')
              this.$emit('closePermission')
              this.$emit('getAllRoles')
            } else {
              this.$message.error(res.msg)
            }
          })
      } else {
        this.$message.error('请至少选择一个用户！')
      }
    }
  },
  mounted() {
    this.getAllLimits()
    this.getSelectedUsers()
  }
}
</script>
