<template>
  <div class="tree-panel">
    <el-tree :data="roles"
             show-checkbox
             node-key="roleId"
             :default-checked-keys="checked"
             :props="defaultProps"
             ref="tree">
    </el-tree>
    <el-button type="primary"
               @click="onConfirm">确认</el-button>
    <el-button @click="$emit('closeDialog')">取消</el-button>
  </div>
</template>

<script>
export default {
  props: ['userId', 'role'],
  data() {
    return {
      roles: [],
      defaultProps: {
        children: 'children',
        label: 'description'
      },
      checked: []
    }
  },
  methods: {
    getAllRoles() {
      this.$http.get('/api/role/list').then(res => {
        if (res.code === 1002) {
          /*  let dataDef = this.$store.dispatch('buildTreeData', {
            data: res.data,
            id: 'roleId',
            parentId: 'parentId'
          })
          dataDef.then(roles => {
            this.roles = roles
          }) */
          this.roles = res.data
        }
      })
    },
    onConfirm() {
      let selectedNodes = this.$refs.tree.getCheckedNodes()
      if (selectedNodes.length > 0) {
        let roleIds = []
        selectedNodes.map(item => {
          roleIds.push(item.roleId)
        })
        this.$http
          .post('/api/role/assign', { userId: this.userId, roleIds: roleIds }, { loading: { operation: true } })
          .then(res => {
            if (res.code === 1002) {
              this.$message.success('角色分配成功！')
              this.$emit('getAllUsers')
              this.$emit('closeDialog')
            } else {
              this.$message.error(res.msg)
            }
          })
      } else {
        this.$message.error('请选择一个角色！')
      }
    }
  },
  mounted() {
    this.getAllRoles()
    let role = this.role
    if (role && role.length > 0) {
      let checked = []
      role.map(item => {
        checked.push(item.roleId)
      })
      this.checked = checked
    }
  }
}
</script>
