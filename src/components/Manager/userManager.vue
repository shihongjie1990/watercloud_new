<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 icon="el-icon-plus"
                 size="small"
                 @click="addUser"
                 v-if="$store.state.MANAGER_MENU.indexOf('1301') > -1">新增用户</el-button>
      <el-button type="primary"
                 icon="el-icon-plus"
                 size="small"
                 @click="addUsers"
                 v-if="$store.state.MANAGER_MENU.indexOf('1301') > -1">批量新增</el-button>
      <el-button icon="el-icon-delete"
                 size="small"
                 @click="deleteUser"
                 v-if="$store.state.MANAGER_MENU.indexOf('1302') > -1">删除用户</el-button>
    </el-row>
    <users :tableData="tableData"
           ref="operateUser"
           @modifyUser="simpleModifyUser"
           @getAllUsers="getAllUsers"
           @modifyRole="modifyRole"
           @assignRole="assignRole"></users>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="600px">
      <add-user @closeDialog="closeDialog"
                @getAllUsers="getAllUsers"
                @addGroup="addGroup"
                :user="user"
                :modifyFlag="modifyFlag"
                v-if="dialogVisible"
                ref="addUser"></add-user>
    </el-dialog>
    <el-dialog title="新增分组"
               :visible.sync="groupVisible"
               width="600px">
      <add-group v-if="groupVisible"
                 @closeDialog="closeDialog"
                 @closeGroup="closeGroup"
                 @refreshGroupList="refreshGroupList"></add-group>
    </el-dialog>
    <el-dialog title="分配角色"
               :visible.sync="roleVisible"
               width="400px">
      <assign-role v-if="roleVisible"
                   @closeDialog="closeDialog"
                   @getAllUsers="getAllUsers"
                   :role="roles"
                   :userId="userId"></assign-role>
    </el-dialog>
    <el-dialog title="批量添加用户"
               :visible.sync="addUsersVisible"
               width="400px">
      <div class="user-excel-panel"
           v-if="addUsersVisible">
        <a href="static/file/UsersExp.xlsx">水利云用户批量导入模版.xlsx</a>
        <div class="parent-user">
          <label>父节点：</label>
          <!-- <el-cascader :options="managerUsers"
                       :props="userProps"
                       clearable></el-cascader> -->
          <el-select v-model="parentId"
                     placeholder="请选择">
            <el-option v-for="item in managerUsers"
                       :key="item.userId"
                       :label="item.username"
                       :value="item.userId">
            </el-option>
          </el-select>
        </div>
        <el-upload class="dialog-upload"
                   ref="upload"
                   list-type="picture-card"
                   action=""
                   :limit='2'
                   :auto-upload="false"
                   :on-change="changeFiles">
          <i class="el-icon-plus"></i>
          <!-- <el-button slot="trigger"
                   size="small"
                   type="primary">选取文件</el-button> -->
          <!-- <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </div>
      <div class="tool-bar">
        <el-button type="primary"
                   @click="uploadExcel"
                   size="medium">导入</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入结果一览"
               :visible.sync="uploadUserVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="60%">
      <add-user-detail :uploadResult="uploadResult"></add-user-detail>
    </el-dialog>
  </div>
</template>

<script>
import users from './users'
import addUser from './addUser'
import addGroup from './group/addGroup'
import assignRole from './role/assignRole'
import { mapActions } from 'vuex'
import addUserDetail from './userManager/addUserDetail'

export default {
  components: {
    'add-user': addUser,
    users,
    'add-group': addGroup,
    'assign-role': assignRole,
    addUserDetail
  },
  data() {
    return {
      dialogVisible: false,
      groupVisible: false,
      roleVisible: false,
      tableData: [],
      title: '新增用户',
      user: {},
      selectDatas: [],
      operation: false,
      userId: '',
      modifyFlag: false,
      roles: [],
      addUsersVisible: false,
      uploadUserVisible: false,
      userProps: {
        checkStrictly: true,
        label: 'username',
        value: 'userId',
        expandTrigger: 'hover',
        multiple: true
      },
      managerUsers: [],
      parentId: '',
      uploadResult: {}
    }
  },
  watch: {
    '$ref.operateUser.selectedRows': {
      handler(curData, oldData) {
        this.selectDatas = curData
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['buildTreeData']),
    getAllUsers() {
      this.$http
        .get('/api/user/list', { params: { type: 'all' } })
        .then(res => {
          if (res.code === 1002) {
            let dataDef = this.buildTreeData({
              data: res.data,
              id: 'userId',
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
    addUser() {
      this.title = '新增用户'
      this.user = {}
      this.modifyFlag = false
      this.dialogVisible = true
    },
    addUsers() {
      this.addUsersVisible = true
      this.$http.get('/api/user/adminInferiors').then(res => {
        this.managerUsers = res.data
      })
    },
    changeFiles(thisFile, files) {
      thisFile.url = 'static/images/excel.jpg?time=' + new Date().getTime()
      let upload = this.$refs.upload
      if (files.length > 1) {
        upload.handleRemove(files[0])
      }
    },
    uploadExcel() {
      let parentId = this.parentId
      if (!parentId) {
        this.$message.warning('选择父节点用户！')
        return
      }
      // 上传excel文件
      let files = this.$refs.upload.uploadFiles
      if (!files || files.length === 0) {
        this.$message.warning('请上传用户Excel!')
        return
      }
      this.$common.uploadFile(files).then(res => {
        this.$http.post('/api/user/batchCreateThroughExcel', { parentId: this.parentId, tempFolderRelativePath: res }).then(res => {
          if (res.code === 1002) {
            let data = res.data
            if (data.veriUnpassedUsers.length > 0 || data.duplicatedIDUsers.length > 0 || data.duplicatedUsernameUsers.length > 0) {
              this.uploadResult = res.data
              this.uploadUserVisible = true
            } else {
              this.$message.success('导入成功！')
            }
            // 刷新
            this.addUsersVisible = false
            this.getAllUsers()
          } else {
            this.$message.error(res.msg || res.message || res.data)
          }
        })
      })
    },
    modifyUser() {
      let users = this.selectDatas
      if (users && users.length === 1) {
        this.user = users[0]
        this.title = '修改用户'
        this.dialogVisible = true
      } else {
        this.$message.error('必须且只能选择一条数据！')
      }
    },
    simpleModifyUser(row) {
      this.user = row
      this.title = '修改用户'
      this.modifyFlag = true
      this.dialogVisible = true
    },
    deleteUser() { },
    deleteRows(rows) { },
    closeDialog() {
      this.dialogVisible = false
      this.groupVisible = false
      this.roleVisible = false
    },
    closeGroup() {
      this.groupVisible = false
    },
    addGroup() {
      this.groupVisible = true
    },
    assignRole(userId) {
      this.userId = userId
      this.roleVisible = true
    },
    modifyRole(rowData) {
      this.userId = rowData.userId
      this.roles = rowData.roles
      this.$nextTick(() => {
        this.roleVisible = true
      })
    },
    // 新增用户中的信息
    // 刷新分组信息
    refreshGroupList() {
      this.$refs.addUser.getGroup()
    }
  },
  mounted() {
    this.getAllUsers()
  }
}
</script>

<style lang="scss" scoped>
.user-excel-panel {
  & > a {
    display: block;
    margin-bottom: 20px;
  }
  & > .parent-user {
    margin-bottom: 16px;
  }
}
</style>
