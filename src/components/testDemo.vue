<template>
  <div>
    <el-button type="primary"
               @click="testNotify">测试弹出</el-button>
  </div>
</template>

<script>
// import buildWebsocket from '../Load-Module/application-websocket'

export default {
  data() {
    return {
      data: { 'messageId': '4c18022ebab5413dab73d01240ed421e', 'type': '应用使用权申请', 'data': { 'appAppId': '0e52363c998a4af3a08e0053fdd52c96', 'userId': 'a4140248eb8540d1896860943a676a96', 'username': 'slt-ysaqc-lisi', 'name': '李四', 'orgName': '智慧水利', 'department': '水利云大数据中心', 'title': '牛人', 'clientId': 'c990c095fbdc467b9b5b053095a212e3', 'clientBriefName': 'ysaq1', 'clientName': '饮水安全', 'clientDesc': '为落实省委、省政府关于全面加快解决农村饮水安全问题指示，积极响应省委、省政府提出的大扶贫、大数据发展战略，水利厅开发了饮水安全云用以支撑和管理全省全面解决农村饮水工作。在“云上贵州”和“水利云”的基础上整合海量的数据信息资源，以管理需求为导向，最终形成包含所有农村饮水安全业务的系统平台，为全面解决农村饮水安全问题攻坚决战行动提供数据支持和决策支撑，以便精准掌控，逐步实现我省农村供水建设过程的监督和建后精准管护、科学管理。\n该云平台依托互联网、云计算、大数据等先进的技术手段搭建农村饮水安全信息化综合体系，一是实现全省饮水安全工程的建设管理。对饮水安全工程采用信息化手段，进行一工程一对策的精细化管理；二是全省农村饮水安全核查工作的监督管理。利用互联网手段实时跟踪饮水安全核查工作，掌握核查进度、核查数据，实现动态与普查数据的对比分析；三是饮水安全工程的运行监管。对千吨万人以上、百吨千人以上及以下农村饮水工程的分级动态管理和调度；四是农村饮水安全大数据分析。在通过一段时间的数据积累后，开展贵州农村饮水安全大数据分析，为下一步的农村饮水安全（供水）工作提供决策支撑。', 'icon': 'client/icon/饮水安全/upload-1556528001235.png', 'userGroupId': '567b49e0fa20440798ffca22cc1eaea9', 'userGroupName': '水利厅', 'clientGroupId': '567b49e0fa20440798ffca22cc1eaea9', 'clientGroupName': '水利厅', 'notice': '申请人和拟获取使用权的应用并不在同一个组别，建议不要允许该请求！' } }
    }
  },
  methods: {
    testjs() {
      // let data = JSON.stringify(this.data)
      // console.log('测试运行js', buildWebsocket(data))
    },
    testNotify() {
      let data = this.data
      let domHtml = [
        `<div class="application-message"><span>${data.data.name}</span>正在申请<span>《${data.data.clientName}》</span>应用</div>`,
        '<div class="application-detail">',
        `<div><label>申请应用：</label><span>${data.data.clientName}</span></div>`,
        `<div><label>申请人账号：</label><span>${data.data.username}</span></div>`,
        `<div><label>申请人姓名：</label><span>${data.data.name}</span></div>`,
        `<div><label>单位：</label><span>${data.data.orgName}</span></div>`,
        `<div><label>部门：</label><span>${data.data.department}</span></div>`,
        `<div><label>职位：</label><span>${data.data.title}</span></div>`,
        `<div><label>系统提示：</label><span>${data.data.notice}</span></div>`,
        '</div>',
        '<div class="application-operation"><a class="notify-btn-a" mark="agree">同意</a><a class="notify-btn-a" mark="refuse">驳回</a><a class="notify-btn-a" mark="detail">详情</a></div>'
      ]
      let notify = this.$notify({
        customClass: 'webscoket-tips',
        title: `${data.type}`,
        dangerouslyUseHTMLString: true,
        message: domHtml.join(''),
        type: 'info',
        duration: 0
      })
      let doms = document.getElementsByClassName('notify-btn-a')
      let _this = this
      for (let dom of doms) {
        dom.addEventListener('click', function() {
          let mark = event.target.getAttribute('mark')
          switch (mark) {
            case 'agree':
              console.log('同意')
              _this.agreeApplication(data, notify)
              break
            case 'refuse':
              console.log('拒绝')
              _this.refuseApplication(data, notify)
              break
            case 'detail':
              console.log('详情')
              _this.detailApplication(data, notify)
              break
          }
          console.log(_this)
        })
      }
    },
    agreeApplication(data, notify) {
      let param = {
        userIds: data.data.userId,
        clientId: data.data.clientId
      }
      notify.close()
      this.$http.post('/api/client/assign', param).then(res => {
        console.log('申请应用权限——————已通过')
      })
    },
    refuseApplication(data) {
      console.log('提示拒绝')
    },
    detailApplication(data) {
      console.log('提示详情')
      let dom = event.target.parentElement.previousElementSibling
      let domClassName = dom.className
      if (domClassName.indexOf('show-detail') > -1) {
        dom.className = dom.className.replace('show-detail', '')
      } else {
        dom.className = domClassName + ' show-detail'
      }
    }
  }
}
</script>
