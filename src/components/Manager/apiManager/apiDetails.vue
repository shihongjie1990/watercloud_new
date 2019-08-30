<template>
  <div class="padding-page">
    <el-row :gutter="20"
            class="api-detail">
      <el-col :span="24">
        <span>API名称</span>
        <p><span>{{ pageData.apiName }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>域</span>
        <p><span>{{ pageData.url }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>接口</span>
        <p><span>{{ pageData.path }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>所属应用</span>
        <p><span>{{ pageData.clientBriefName }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>描述：</span>
        <div>{{ pageData.apiDesc }}</div>
      </el-col>
      <el-col :span="24">
        <span>请求方式</span>
        <p><span>{{ pageData.method }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>交互格式</span>
        <p><span>{{ pageData.format }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>数据提供方</span>
        <p><span>{{ pageData.provider }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>公开范围</span>
        <p><span>{{ pageData.openLevel }}</span></p>
      </el-col>
      <el-col :span="24">
        <span>请求参数</span>
        <div>{{ pageData.requestParam }}</div>
      </el-col>
      <el-col :span="24">
        <span>返回参数</span>
        <div>{{ pageData.responseParam }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['itemData'],
  data() {
    return {
      pageData: {
        apiName: '中小型骨干水源工程',
        url: 'http://www.baidu.com',
        path: '/test',
        apiDesc: '副书记奥该几个骚速剑大概几点扫IG就度搜感觉哦isad勾搭上发哈分就是佛骄傲进度搜房祭扫放假哦圣诞节狗年靳绥东国际私爱打架偶读数据佛菩萨及附加扫派件佛寺骄傲佛山金佛ID数据澳机构嗲奇偶积分搜地激发哦你傻大个哦is金佛is大家佛散打狗该祭扫金佛山机电工的撒个哦is金佛是奇偶发圣诞节哦狗is导购该接收到IG酒叟IG啊搜该啊还涉及到结构偶奇偶第四高级',
        clientBriefName: '应用A',
        provider: '水利云',
        openLevel: '对外全部公开',
        openIps: 'http://123.41.52.65;http://192.1624.100.191',
        method: 'POST',
        format: 'JSON',
        requestParam: '{data: {a:1,b:1,c:1}}',
        responseParam: '{data: {a:1,b:1,c:1}}'
      }
    }
  },
  methods: {

  },
  mounted() {
    let pageData = this.itemData || this.$route.params || {}
    if (Object.keys(pageData).length > 0) {
      for (let key in pageData) {
        if (key === 'openLevel') {
          pageData[key] = pageData[key] ? '对指定IP公开' : '对外完全公开'
        } else if (key === 'format') {
          pageData[key] = pageData[key] ? 'XML' : 'JSON'
        }
      }
    }
    this.pageData = pageData
  }
}
</script>
