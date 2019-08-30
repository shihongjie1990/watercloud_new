<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addAppInfo"
                 v-if="$store.state.MANAGER_MENU.indexOf('2101') > -1">新增应用</el-button>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%"
              border
              size="mini"
              @selection-change="handleSelectionChange">
      <el-table-column type="index"
                       width="55"
                       align="center"></el-table-column>
      <el-table-column prop="clientBriefName"
                       label="英文简称"
                       align="center">
      </el-table-column>
      <el-table-column prop="clientName"
                       label="中文名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="webServerRedirectUri"
                       label="地址"
                       align="center">
      </el-table-column>

      <el-table-column prop="clientDesc"
                       label="描述"
                       align="center"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="clientId"
                       label="应用ID"
                       align="center">
      </el-table-column>
      <el-table-column prop="clientSecret"
                       label="应用秘钥"
                       align="center">
      </el-table-column>
      <el-table-column label="图标"
                       align="center">
        <template slot-scope="scope">
          <a class=""
             @click="viewPic(scope.row.icon)">查看</a>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       show-overflow-tooltip>
        <template slot-scope="scope"><a class='table-a'
             @click="assignUsers(scope.row.clientId)" v-if="isApportion">分配</a> <a class='table-a'
             @click="deleteApp(scope.row.clientId)" v-if="isDelete">删除</a> <a class='table-a'
             @click="showConfirmInfo(scope.row.clientId)" v-if="isResetPassword">重置应用密码</a></template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title"
               :visible.sync="appVisible"
               width="600px">
      <add-app @closeGroup="closeGroup"
               @getApps="getApps"
               v-if="appVisible"
               :appInfo="appInfo"></add-app>
    </el-dialog>
    <!--  <el-dialog title="完善信息"
               :visible.sync="personVisible"
               width="50%">
      <complete-person v-if="personVisible"
                       @colseCompletePerson="colseCompletePerson"
                       @getApps="getApps"></complete-person>
    </el-dialog> -->
    <el-dialog title="分配用户"
               :visible.sync="usersVisible"
               width="50%">
      <assign-users @closeUsers="closeUsers"
                    @getApps="getApps"
                    v-if="usersVisible"
                    :clientId="clientId"></assign-users>
    </el-dialog>
    <el-dialog title="请输入认证信息"
               :visible.sync="userInfoVisible"
               width="500px">
      <el-form :model="userForm"
               :rules="rules"
               label-width="80px">
        <el-form-item label="用户名："
                      prop="username">
          <el-input placeholder="请输入用户名"
                    v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码："
                      prop="password">
          <el-input placeholder="请输入密码"
                    type="password"
                    v-model="userForm.password"></el-input>
        </el-form-item>
        <div class="tool-bar">
          <el-button type="primary"
                     @click="userSubmit">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import addApp from './addApp'
import completePerson from './completeUserInfo'
import assignUsers from './assignUser'

export default {
  components: {
    'add-app': addApp,
    'complete-person': completePerson,
    'assign-users': assignUsers
  },
  computed: {
    isApportion() {
      return this.$store.state.MANAGER_MENU.indexOf('2103') > -1
    },
    isDelete() {
      return this.$store.state.MANAGER_MENU.indexOf('2104') > -1
    },
    isResetPassword() {
      return this.$store.state.MANAGER_MENU.indexOf('2106') > -1
    }
  },
  data() {
    return {
      appVisible: false,
      personVisible: false,
      usersVisible: false,
      tableData: [],
      appInfo: {},
      clientId: '',
      title: '新增应用',
      userForm: {},
      userInfoVisible: false,
      selectedId: '',
      rules: {
        username: [
          { required: true, message: '用户名未填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码未填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSelectionChange() { },
    userSubmit() {
      this.userForm.clientId = this.selectedId
      this.$http.post('/api/client/resetPwd', this.userForm).then(res => {
        if (res.code === 1002) {
          this.$alert(`重置后的应用密码是<span style="color:#ff5555;font-size: 18px;">${res.data}</span>，请牢记！`, '提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            callback: action => {
              this.$message.success('重置成功！')
              this.userInfoVisible = false
            }
          })
        } else {
          this.$message.error(res.msg || res.error || res.content)
        }
      })
    },
    showConfirmInfo(id) {
      this.userInfoVisible = true
      this.selectedId = id
    },
    addAppInfo() {
      this.appInfo = {}
      this.title = '新增应用'
      this.appVisible = true
    },
    getApps() {
      this.$http.get('/api/client/list').then(res => {
        if (res.code === 1002) {
          this.tableData = res.data
        } else if (res.code === 9987) {
          this.personVisible = true
        } else {
          this.personVisible = true
        }
      }, err => {
        this.$message.error(err.message || err.content)
      })
    },
    closeGroup() {
      this.appVisible = false
    },
    colseCompletePerson() {
      this.personVisible = false
    },
    closeUsers() {
      this.usersVisible = false
    },
    modifyApp(rowData) {
      this.title = '修改应用'
      this.appInfo = rowData
      this.appVisible = true
    },
    deleteApp(clientId) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/client?clientId=${clientId}`, { loading: { operation: true } }).then(res => {
          if (res.code === 1002) {
            this.$message.success('删除成功！')
            this.getApps()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    assignUsers(clientId) {
      this.clientId = clientId
      this.usersVisible = true
    }
  },
  mounted() {
    this.getApps()
  }
}
</script>
