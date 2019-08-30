<template>
  <div class="user-tree">
    <!-- <el-tree :data="users"
             show-checkbox
             node-key="id"
             :props="defaultProps"
             ref="tree">
    </el-tree> -->
    <ul v-for="item in users"
        :key="item.userId">
      <li>
        <input type="radio"
               name="parentId"
               :value="item.userId"
               v-model="userId">
        <span>{{ item.username }}</span>
        <div v-if="item.children && item.children.length > 0">
          <ul>
            <li v-for="child in item.children"
                :key="child.userId">
              <span>{{child.username}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <el-button type="primary"
               @click="onConfirm">确认</el-button>
    <el-button @click="$emit('closeGroup')">取消</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['groupId', 'users'],
  data() {
    return {
      // users: [],
      userId: '',
      defaultProps: {
        children: 'children',
        label: 'username'
      },
      selectedData: []
    }
  },
  methods: {
    ...mapActions(['buildTreeData']),
    /* getAllUnbindUser() {
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
        }
      })
    }, */
    onConfirm() {
      // let selectedNodes = this.$refs.tree.getCheckedNodes()
      // console.log('选中数据：', selectedNodes)
      let userId = this.userId
      this.$http
        .post(`/api/group/assign?userId=${userId}&groupId=${this.groupId}`, { loading: { operation: true } })
        .then(res => {
          if (res.code === 1002) {
            this.$message.success('绑定成功！')
            this.$emit('closeGroup')
            this.$emit('getAllGroups')
          } else {
            this.$message.error(res.msg)
          }
        })
    }
  },
  mounted() {
    // this.getAllUnbindUser()
  }
}
</script>
