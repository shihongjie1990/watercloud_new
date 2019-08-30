<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addGroup"
                 v-if="$store.state.MANAGER_MENU.indexOf('1501') > -1">新增分组</el-button>
      <!-- <el-button type="warning"
                 icon="el-icon-edit"
                 @click="modifyUser">修改用户</el-button> -->
      <!-- <el-button icon="el-icon-delete"
                 @click="deleteGroups">删除用户</el-button> -->
      <!-- <el-button icon="el-icon-delete"
                 size="small"
                 @click="assignMainUser">绑定主管理员</el-button> -->
    </el-row>
    <el-table :data="tableData"
              style="width: 100%"
              border
              size="mini"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"
                       align="center"></el-table-column>
      <el-table-column prop="name"
                       label="组名"
                       align="center">
      </el-table-column>
      <el-table-column prop="groupAdmin.username"
                       label="主管理员"
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
      <el-table-column label="操作"
                       align="center"
                       show-overflow-tooltip>
        <template slot-scope="scope"><a class='table-a'
             @click="modifyGroup(scope.row)" v-if="isModify">修改</a> <a class='table-a'
             @click="deleteGroup(scope.row.groupId)" v-if="isDelete">删除</a> <a class='table-a'
             @click="unbindUserData(scope.row.groupId)" v-if="isRelated">关联用户</a></template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title"
               :visible.sync="groupVisible"
               width="600px">
      <add-group @refreshGroupList="getAllGroups"
                 @assignMainUser="assignMainUser"
                 v-if="groupVisible"
                 :group="group"></add-group>
    </el-dialog>
    <el-dialog title="关联用户"
               :visible.sync="userVisible"
               width="50%">
      <assign-users @closeGroup="closeUsers"
                    @getAllGroups="getAllGroups"
                    v-if="userVisible"
                    :groupId="groupId"
                    :users="users"
                    ref="assignuser"></assign-users>
    </el-dialog>
    <el-dialog title="绑定主管理员"
               :visible.sync="mainUserDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="400px">
      <el-tree :data="mainUserTree"
               show-checkbox
               node-key="id"
               ref="userTree"
               :default-expanded-keys="[2, 3]"
               :default-checked-keys="[5]"
               :props="defaultProps">
      </el-tree>
      <div class="tool-bar">
        <el-button size="mini"
                   type="primary"
                   @click="confirmMainUser">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addGroup from './addGroup'
import assignUser from './assignUser'

export default {
  components: {
    'add-group': addGroup,
    'assign-users': assignUser
  },
  computed: {
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('1503') > -1
    },
    isModify() {
      return this.$store.state.MANAGER_MENU.indexOf('1504') > -1
    },
    isRelated() {
      return this.$store.state.MANAGER_MENU.indexOf('1309') > -1
    }
  },
  data() {
    return {
      tableData: [],
      groupVisible: false,
      userVisible: false,
      title: '新增分组',
      group: {},
      groupId: '',
      users: [],
      mainUserDialog: false,
      mainUserTree: [],
      defaultProps: {
        children: 'children',
        label: 'username'
      }
    }
  },
  methods: {
    assignMainUser() {
      this.$http.get('/api/user/list/unAffiliatedUsers').then(res => {
        if (res.code === 1002) {
          let dataDef = this.$store.dispatch('buildTreeData', {
            data: res.data,
            id: 'userId',
            parentId: 'parentId'
          })
          dataDef.then(treeData => {
            this.mainUserTree = treeData
          })
        }
      })
      this.$nextTick(() => {
        this.mainUserDialog = true
      })
    },
    confirmMainUser() {
    },
    getAllGroups() {
      this.$http.get('/api/group/list').then(res => {
        if (res.code === 1002) {
          this.tableData = res.data
        }
      }, err => {
        this.$message.error(err.message || err.content)
      })
    },
    modifyGroup(row) {
      this.title = '修改分组信息'
      this.group = row
      this.groupVisible = true
    },
    deleteGroup(groupId) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/group?groupId=${groupId}`, { loading: { operation: true } }).then(res => {
          if (res.code === 1002) {
            this.$message.success('删除成功！')
            // 刷新表格
            this.getAllGroups()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 操作
    addGroup() {
      this.title = '新增分组信息'
      this.group = {}
      this.groupVisible = true
    },
    // 表格选中
    handleSelectionChange(rows) { },
    // 弹出框操作
    /* closeGroup() {
      this.groupVisible = false
    }, */
    closeUsers() {
      this.userVisible = false
    },
    unbindUserData(groupId) {
      this.groupId = groupId
      this.$http.get('/api/user/ungrouped').then(res => {
        if (res.code === 1002) {
          let data = res.data
          let treeData = []
          data.map(item => {
            var parentData = JSON.parse(JSON.stringify(item.groupAdmin))
            parentData.children = item.groupMembers
            treeData.push(parentData)
          })
          treeData.map(item => {
            if (item.children && item.children.length > 0) {
              let children = item.children
              children.map(child => {
                child.disabled = true
              })
            }
          })
          this.users = treeData
          this.$nextTick(() => {
            this.userVisible = true
          })
        }
      })
    }
  },
  mounted() {
    this.getAllGroups()
  }
}
</script>
