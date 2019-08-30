<template>
  <div class="worker-api-detail">
    <div class="api-name">
      {{ data.apiName }}
    </div>
    <div class="worker-api-content">
      <ul>
        <li>
          <div>
            <span>域：</span>
            <p><span>{{ data.url }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>接口：</span>
            <p><span>{{ data.path }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>所属应用：</span>
            <p><span>{{ data.clientBriefName }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>描述：</span>
            <div>{{ data.apiDesc }}</div>
          </div>
        </li>
        <li>
          <div>
            <span>请求方式：</span>
            <p><span>{{ data.method }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>交互格式：</span>
            <p><span>{{ data.format | formatFormat }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>数据提供方：</span>
            <p><span>{{ data.provider }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>公开范围：</span>
            <p><span>{{ data.openLevel | formatRange }}</span></p>
          </div>
        </li>
        <li>
          <div>
            <span>请求参数：</span>
            <div>{{ data.requestParam }}</div>
          </div>
        </li>
        <li>
          <div>
            <span>返回参数：</span>
            <div>{{ data.responseParam }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  filters: {
    formatRange(value) {
      let text = ''
      if (value) {
        text = '对指定IP公开'
      } else {
        text = '对外完全公开'
      }
      return text
    },
    formatFormat(value) {
      let text = ''
      if (value) {
        text = 'XML'
      } else {
        text = 'JSON'
      }
      return text
    }
  },
  data() {
    return {
      /* data: {
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
      } */
    }
  }
}
</script>

<style lang="scss" scoped>
.worker-api-detail {
  color: #fff;
  .api-name {
    font-size: 0.22rem;
    margin: 0.2rem 0;
    margin-left: 0.1rem;
    color: #f5ba0d;
  }
  .worker-api-content {
    // border: 1px solid #000;
    box-shadow: 0px 0px 15px 0px #607c80;
    li:last-child > div {
      border-bottom: none;
    }
    li > div {
      display: flex;
      border-bottom: 1px solid #999;
      font-size: 0.14rem;
      & > span {
        display: inline-block;
        width: 1rem;
        background: rgba(19, 96, 131, 0.3);
        text-align: right;
        padding: 0.06rem;
        box-sizing: border-box;
        color: #ccc;
      }
      & > p {
        display: inline-block;
        margin: 0;
        padding: 0.06rem;
      }
      & > div {
        width: calc(100% - 1rem);
        padding: 0.06rem;
        box-sizing: border-box;
      }
    }
  }
}
</style>
