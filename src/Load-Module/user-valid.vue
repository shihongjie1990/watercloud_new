<template>
  <el-dialog title="请完善个人身份信息"
             :visible.sync="$store.state.VALID_USER_FLAG"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             width="50%">
    <complete-person v-if="$store.state.VALID_USER_FLAG"></complete-person>
  </el-dialog>
</template>

<script>
import completePerson from '@/components/Manager/appManager/completeUserInfo'

export default {
  components: {
    completePerson
  },
  data() {
    return {}
  },
  mounted() {
    // 获取用户信息
    this.$http.get('/api/user/me')
  }
}
</script>
