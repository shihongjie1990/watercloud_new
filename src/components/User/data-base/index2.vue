<template>
  <div class="user-data-base">
    <div class="type-area">
      <data-menu :panel="dataTypes"
                 @menuClick="dataTypeChange"></data-menu>
      <data-menu :panel="groups"
                 @menuClick="groupChange"></data-menu>
    </div>
    <div class="table-list">
      <p>共有<span>{{ totalNum }}</span>数据</p>
      <data-list :listData="tableData"
                 v-if="tableData.length > 0"></data-list>
    </div>
    <div class="operation-area">
      <el-input placeholder="请输入资源名称"
                v-model="resourceName"
                @keyup.native.enter="searchResource">
        <i slot="suffix"
           class="el-input__icon el-icon-search"
           @click="searchResource"></i>
      </el-input>
      <data-menu :panel="types"
                 @menuClick="typeChange"
                 class="data-permission"></data-menu>
    </div>

  </div>
</template>

<script>
export default {
  components: {
    'data-menu': () => import('./items/menu'),
    'data-list': () => import('./items/data-list')
  },
  computed: {
    totalNum() {
      let tableData = this.tableData
      let totalLen = 0
      tableData.map(item => {
        let length = item.data.length
        totalLen += length
      })
      return totalLen
    }
  },
  data() {
    return {
      dataTypes: {
        title: '类型',
        nodes: [{ name: '全部', code: 0 }, { name: '静态数据目录', code: 2 }, { name: '动态API接口', code: 1 }]
      },
      groups: {
        title: '领域',
        nodes: [{ name: '防汛抗旱', number: 60 }, { name: '水资源', number: 50 }, { name: '水土保持', number: 40 }, { name: '水库管理', number: 30 }, { name: '河长', number: 60 }, { name: '农村水电', number: 50 }, { name: '饮水安全', number: 40 }, { name: '农业', number: 30 }, { name: '气象', number: 60 }, { name: '环保', number: 50 }, { name: '林业', number: 40 }, { name: '国土', number: 30 }]
      },
      types: {
        title: '公开范围',
        nodes: [{ name: '全部', code: '' }, { name: '公开', code: 'public' }, { name: '私有', code: 'private' }]
      },
      tableData: [],
      resourceName: '',
      baseData: [],
      dataGroup: '',
      dataType: 0,
      type: ''
    }
  },
  methods: {
    // 获取领域数据
    getGroups() {
      this.$http.get('/api/resource/listAvailableGroup').then(res => {
        let data = res.data
        let nodes = data.map(item => {
          return {
            name: item.desc,
            code: item.code,
            key: item.name
          }
        })
        // 去掉第一项——无分类
        // nodes.splice(0, 1)
        nodes = [{
          name: '所有',
          code: -1,
          key: ''
        }].concat(nodes)
        this.groups.nodes = nodes
      })
    },
    // 获取静态资源数据
    getAllStaticData(condition) {
      let param = condition || { group: 0, type: '', keyword: '' }
      return this.$http.post('/api/resource/query', param)
    },
    // 获取动态API接口数据
    getAllApis() {
      return this.$http.get('/api/api/list')
    },
    // 页面调用的服务
    pageServer() {
      this.getGroups()
      Promise.all([this.getAllApis(), this.getAllStaticData()]).then(res => {
        let apis = res[0]
        let dataResource = res[1]
        // 设置浏览数据的对应Key值
        let apiObj = {
          title: 'apiName',
          provider: 'provider',
          type: '接口',
          group: '',
          updateDate: 'updateTime',
          desc: 'apiDesc',
          tips: '',
          scan: '',
          download: '',
          data: apis.data
        }
        let dataResourceObj = {
          title: 'name',
          provider: 'owner',
          type: '文件',
          group: 'field',
          updateDate: 'updateTime',
          desc: 'desc',
          tips: '',
          scan: '',
          download: '',
          data: dataResource.data
        }
        // 赋值数据
        this.tableData = [apiObj, dataResourceObj]
        this.baseData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    // 从数据中过滤   原始数据data, 匹配值value, 需要匹配的字段key
    filterData(data, conditionObj) {
      return data.filter(item => {
        let flag = true
        for (let key in conditionObj) {
          let value = conditionObj[key]
          let fuzzy = value.fuzzy
          let itemFlag = false
          if (fuzzy !== undefined) {
            itemFlag = fuzzy === '' || item[key].indexOf(fuzzy) > -1
          } else {
            itemFlag = value !== '' ? item[key] === value : true
          }
          !itemFlag && (flag = itemFlag)
        }
        return flag
      })
    },
    // 通过过滤条件重组数据
    rebuildData() {
      let baseData = JSON.parse(JSON.stringify(this.baseData))
      // 动态API的搜索条件
      let type = this.type
      type && (type = type === 'public')
      let apiCondition = {
        group: this.dataGroup,
        openLevel: type,
        apiName: {fuzzy: this.resourceName}
      }
      let apiData = this.filterData(baseData[0].data, apiCondition)
      // 静态数据资源搜索条件
      let resourceCondition = {
        field: this.dataGroup,
        type: this.type,
        name: {fuzzy: this.resourceName}
      }
      let resourceData = this.filterData(baseData[1].data, resourceCondition)
      baseData[0].data = apiData
      baseData[1].data = resourceData
      let dataType = this.dataType
      if (dataType === 0) {
        this.tableData = baseData
      } else {
        this.tableData = [baseData[dataType - 1]]
      }
    },
    // 左侧领域栏点击事件
    groupChange(data) {
      if (data.code === -1) {
        this.dataGroup = ''
      } else {
        this.dataGroup = data.name
      }
      this.rebuildData()
    },
    // 左侧类型栏点击事件
    dataTypeChange(data) {
      this.dataType = data.code
      this.rebuildData()
    },
    // 右侧数据范围点击事件
    typeChange(data) {
      this.type = data.code
      this.rebuildData()
    },
    searchResource() {
      let condition = this.resourceName
      this.rebuildData()
      console.log('水利数据库搜索条件————————————', condition)
    }
  },
  mounted() {
    this.pageServer()
  }
}
</script>

<style lang="scss" scoped>
.type-area {
  & > div {
    margin-bottom: 0.2rem;
  }
}
.operation-area {
  .data-permission {
    margin-top: 0.2rem;
  }
}
.table-list {
  width: 7rem;
  p {
    margin: 0 0.6rem;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 0.16rem;
    background: rgba(19, 96, 131, 0.3);
    border-bottom: 2px solid #677e8c;
    text-indent: 10px;
    span {
      color: #f5ba0d;
      margin: 0 6px;
      font-weight: 600;
    }
  }
}
</style>

<style lang="scss">
@import '../../../assets/overview-ui/overview-ui2.scss';
.title {
  display: flex;
  //   padding: 0.25rem 0.35rem 0; // 25px 35px 0;
  padding: 0.1rem;
  div:first-child {
    font-size: 0.2rem; // 20px;
    color: #2ac1db;
    width: 50%;
  }
  div:last-child {
    text-align: right;
    width: 50%;
    color: #e7e8e9;
    span:first-child {
      margin-right: 0.09rem; // 9px;
    }
    span:last-child {
      font-size: 0.2rem; // 20px;
      color: #f5ba0d;
      margin: 0 0.06rem; // 0 6px;
      font-weight: 700;
    }
  }
}
</style>
