<template>
  <div>
    <el-row class="assign-user">
      <el-col :span="12">
        <label>所有用户：</label>
        <el-tree :data="users"
                 show-checkbox
                 node-key="userId"
                 :props="defaultProps"
                 :default-checked-keys="checkedKeys"
                 :check-strictly="true"
                 :expand-on-click-node="true"
                 @check="handlerCheck"
                 ref="tree">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="data.children && data.children.length > 0">
              <el-checkbox @change="getLabel($event, data)"
                           v-model="checkedUser[data.userId]">全选</el-checkbox>
            </span>
            <!-- <span>{{ node.label }}</span> -->
          </span>
        </el-tree>
      </el-col>
      <el-col :span="12"
              class="user-list"
              v-if="$refs.tree">
        <label>已授权用户：</label>
        <ul>
          <li v-for="user in nodes"
              :key="user.userId">{{ user.username }}</li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="tool-bar">
      <el-button type="primary"
                 @click="onConfirm">确认</el-button>
      <el-button @click="$emit('closeUsers')">取消</el-button>
      <!-- <el-button @click="testFun">测试</el-button> -->
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['clientId'],
  data() {
    return {
      users: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'username'
      },
      checkedUser: {}
    }
  },
  computed: {
    nodes: {
      get() {
        return this.$refs.tree.getCheckedNodes()
      },
      set(newValue) {
        return newValue
      }
    }
  },
  methods: {
    testFun() {
      this.checkedUser['3dad5d6546f54488bfaa0259f9409234'] = true
    },
    getLabel(flag, data) {
      let widget = this.$refs.tree
      let setChecked = function(data) {
        widget.setChecked(data, flag, false)
        let children = data.children
        if (children && children.length > 0) {
          children.map(item => {
            setChecked(item, flag, false)
          })
        }
      }
      setChecked(data)
      this.nodes = widget.getCheckedNodes()
    },
    getAllUsers() {
      return this.$http.get(`/api/user/list?type=all`)
    },
    hanlderAllData(res, selectedRes) {
      if (res.code === 1002) {
        let dataDef = this.$store.dispatch('buildTreeData', {
          data: res.data,
          id: 'userId',
          parentId: 'parentId'
        })
        dataDef.then(users => {
          this.users = users
          // 添加全选按钮的响应式属性
          users.map(item => {
            if (item.children && item.children.length > 0) {
              this.$set(this.checkedUser, item.userId, false)
              // this.checkedUser[item.userId] = false
            }
          })
          this.$nextTick(() => {
            // 设置选中节点
            this.handlerSelectedUser(selectedRes, users)
          })
        })
      }
    },
    getSelectedUsers() {
      return this.$http.get(`/api/client/relations?clientId=${this.clientId}`)
    },
    handlerSelectedUser(res, users) {
      if (res.code === 1002) {
        let data = res.data
        let keys = []
        data.map(node => {
          keys.push(node.userId)
        })
        this.checkedKeys = keys
        // 设置已选中节点
        let findNodeFun = function(nodes, selectedNode) {
          let findData = null
          let userId = selectedNode.userId
          let loopFun = function(nodes, userId) {
            for (let i = 0; i < nodes.length; i++) {
              let item = nodes[i]
              if (item.userId !== userId) {
                if (item.children && item.children.length > 0) {
                  loopFun(item.children, userId)
                }
              } else {
                findData = item
                break
              }
            }
          }
          loopFun(nodes, userId)
          return findData
        }
        data.map(item => {
          let findData = findNodeFun(users, item)
          this.setCheckNode(findData, data)
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    handlerCheck(node, treeState) {
      let selectNodes = treeState.checkedNodes
      // 作为父节点
      if (node.children && node.children.length > 0) {
        this.setCheckNode(node, selectNodes)
      }
      // 作为子节点
      let parentNode = selectNodes.find(item => {
        return item.userId === node.parentId
      })
      if (parentNode) {
        this.setCheckNode(parentNode, selectNodes)
      }
    },
    setCheckNode(parentNode, selectedNodes) {
      let childrenNodes = selectedNodes.filter(item => {
        return item.parentId === parentNode.userId || item.userId === parentNode.userId
      })
      if (childrenNodes.length === parentNode.children.length + 1) {
        this.checkedUser[parentNode.userId] = true
      } else {
        this.checkedUser[parentNode.userId] = false
      }
    },
    onConfirm() {
      this.$store.dispatch('SET_USER_FLAG', true)
      let selectedNodes = this.$refs.tree.getCheckedNodes()
      if (selectedNodes.length > 0) {
        let ids = []
        selectedNodes.map(item => {
          ids.push(item.userId)
        })
        this.$http
          .post('/api/client/assign', { userIds: ids, clientId: this.clientId, operatorCode: 1 })
          .then(res => {
            if (res.code === 1002) {
              this.$message.success('分配成功！')
              this.$emit('closeUsers')
              this.$emit('getApps')
            } else {
              this.$message.error(res.msg)
            }
          })
      } else {
        this.$message.error('请至少选择一个用户！')
      }
    }
  },
  created() {
    Promise.all([this.getAllUsers(), this.getSelectedUsers()]).then(datas => {
      this.hanlderAllData(datas[0], datas[1])
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
