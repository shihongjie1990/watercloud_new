<template>
  <div class="padding-page">
    <el-row class="table-tool">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addStaticData"
                 v-if="$store.state.MANAGER_MENU.indexOf('2201') > -1">新增静态数据</el-button>
      <!-- <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addDynamicApi">新增动态API</el-button> -->
      <!-- <el-button type="primary"
                 size="small"
                 icon="el-icon-plus"
                 @click="addModel">新增模型</el-button> -->
      <!-- 切换按钮 -->
      <div class="type-icon">
        <i class="iconfont icon-liebiao"
           :class="{active: activePage === 1}"
           @click="activePage = 1"></i>
        <i class="iconfont icon-wenjian1"
           :class="{active: activePage === 2}"
           @click="activePage = 2"></i>
      </div>
      <!-- 搜索区域 -->
      <div class="operation-search"
           v-if="activePage === 1">
        <el-input placeholder="请输入资源名称"
                  v-model="resourceName"
                  @keyup.native.enter="searchResources">
          <i slot="suffix"
             class="el-input__icon el-icon-search"
             @click="searchResource"></i>
        </el-input>
      </div>
      <div class="operation-edit"
           v-else>
        <!-- 操作区 -->
        <transition name="el-fade-in-linear">
          <!-- 全选 -->
          <div class="operation-btn"
               v-if="isEdit">
            <span @click="setSelectType">
              <i class="iconfont icon-check"
                 v-if="isSelectAll"></i>
              <i class="iconfont icon-check05"
                 v-else></i>
              全选
            </span>
            <!-- 删除 -->
            <el-button icon="el-icon-delete"
                       size="small"
                       title="删除"
                       @click="deleteFiles"
                       v-if="$store.state.MANAGER_MENU.indexOf('2205') > -1"
                       circle></el-button>
          </div>
        </transition>
        <!-- 可编辑 -->
        <el-switch v-model="isEdit"
                   active-color="#13ce66"
                   active-text="编辑"
                   inactive-text="">
        </el-switch>
      </div>
    </el-row>
    <manager-list ref="list"
                  :groupOptions="groupOptions"
                  :resourceName="resourceName"
                  v-if="activePage === 1"></manager-list>
    <manager-folder ref="folder"
                    :isEdit="isEdit"
                    :isSelectAll="isSelectAll"
                    v-else></manager-folder>
    <el-dialog :title="title"
               :visible.sync="staticDataVisible"
               width="70%">
      <add-data v-if="staticDataVisible && groupOptions.length > 0"
                :groupOptions="groupOptions"
                @closeDialog="staticDataVisible = false"
                @getAllStaticData="getAllStaticData"></add-data>
      <!-- <add-data :groupOptions="groupOptions"
                @closeDialog="staticDataVisible = false"
                @getAllStaticData="getAllStaticData"></add-data> -->
      <!-- <add-api></add-api> -->
    </el-dialog>
  </div>
</template>

<script>
import managerList from './manager-list'
import managerFolder from './manager-folder'
import addData from './operation/addStaticData'

export default {
  components: {
    managerList,
    managerFolder,
    addData
  },
  data() {
    return {
      staticDataVisible: false,
      groupOptions: [],
      activePage: 1,
      title: '新增',
      resourceName: '',
      isEdit: false,
      isSelectAll: false
    }
  },
  watch: {
    isEdit(curValue, oldValue) {
      if (!curValue) {
        this.isSelectAll = false
      }
    }
  },
  methods: {
    addStaticData() {
      this.staticDataVisible = true
    },
    // 获取领域数据
    getGroups() {
      this.$http.get('/api/resource/listAvailableGroup').then(res => {
        let data = res.data
        this.groupOptions = data
      })
    },
    getAllStaticData() {
      this.$refs.list.getAllStaticData()
    },
    formatType(row) {
      return row.type === 'public' ? '公开' : '私有'
    },
    searchResource() {
      this.$refs.list.searchResource()
    },
    setSelectType() {
      // 当前全选按钮
      this.isSelectAll = !this.isSelectAll
    },
    deleteFiles() {
      let ids = this.$refs.folder.getIds()
      this.$confirm(`确认删除这些文件？删除后将无法恢复！`, '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/resource/delete', ids).then(res => {
          // 按照搜索条件在过滤
          this.$refs.folder.getAllStaticData()
        })
      })
    }
  },
  mounted() {
    this.getGroups()
  }
}
</script>

<style lang="scss" scoped>
.table-tool {
  .operation-search {
    width: 3rem;
    float: right;
    height: 40px;
    line-height: 40px;
  }
  .type-icon {
    float: right;
    display: flex;
    margin-left: 0.2rem;
    & > i {
      padding: 8px 12px;
      border: 1px solid #ddd;
      &:first-child {
        border-right: none;
      }
      &:hover {
        cursor: pointer;
      }
      &.active {
        background: #409eff;
        color: #fff;
        border: 1px solid #409eff;
      }
    }
  }
  .operation-edit {
    float: right;
    height: 40px;
    line-height: 40px;
  }
  .operation-btn {
    display: inline-block;
    width: 150px;
    overflow: hidden;
    text-align: right;
    vertical-align: top;
    & > button {
      margin: 0 6px;
    }
    span {
      &:hover {
        cursor: pointer;
      }
      i {
        color: #ddd;
        &.icon-check {
          color: #409eff;
        }
      }
    }
  }
}
.slide-zoom-enter-active {
  transition: width 0.3s ease;
}
.slide-zoom-leave-active {
  transition: width 0.3s ease;
}
.slide-zoom-enter,
.slide-zoom-leave-to {
  width: 0;
}
</style>
