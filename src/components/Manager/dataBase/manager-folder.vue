<template>
  <div class="database-type-folder">
    <type-folder @getAllStaticData="getAllStaticData"></type-folder>
    <file-list ref="list"
               :files="files"
               :isEdit="isEdit"
               :isSelectAll="isSelectAll"
               @changeIsSelectAll="changeIsSelectAll"></file-list>
  </div>
</template>

<script>
import typeFolder from './type/typeFolder/folderMenu'
import fileList from './type/typeFolder/fileList'

export default {
  components: {
    typeFolder,
    fileList
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isSelectAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    getAllStaticData(condition) {
      let param = condition || { group: 0, type: '', keyword: '', rootId: '00000000000000000000000000000000' }
      this.$http.post('/api/resource/query', param).then(res => {
        this.files = res.data
      })
    },
    getIds() {
      return this.$refs.list.checkList
    }
  },
  created() {
    this.getAllStaticData()
  }
}
</script>

<style lang="scss" scoped>
.database-type-folder {
  display: flex;
  height: 5.5rem;
  & > div {
    width: 50%;
  }
}
</style>
