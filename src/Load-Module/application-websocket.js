import Vue from 'vue'

const initWebsocket = {
  buildWebSocket(uri, callback) {
    // 获取链接
    const wsuri = `ws://${location.host}/socket${uri}`
    // const wsuri = `ws://192.168.100.147:8080${uri}`
    // socket接收参数
    var socket = null
    var initWebSocket = function() {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 初始化websocket
        socket = new WebSocket(wsuri)
        // 监听socket连接
        socket.onopen = webSocketOpen
        // 监听socket错误信息
        socket.onerror = webSocketError
        // 监听socket消息
        socket.onmessage = webSocketMessage
        // 关闭socket
        socket.onclose = webSocketClose
        // 放入全局socket
        Vue.prototype.$socket = socket
      }
    }
    // websocket连接
    var webSocketOpen = function() {
      websocketSend()
      console.log('socket连接成功')
    }
    // websocket错误
    var webSocketError = function() {
      // initWebSocket(wsuri)
      console.log('socket发生错误，重连')
    }
    var webSocketMessage = function(e) {
      if (e.data === '连接成功') {
        return false
      }
      callback(e.data)
    }
    var websocketSend = function(data) {
      socket.send(data)
    }
    var webSocketClose = function(e) {
      console.log('websocket断开连接', e)
      initWebSocket()
      console.log('websocket重连')
    }
    initWebSocket()
  }
}

// websocket通信————实时提醒应用申请
const userWebSocket = {
  vueObj: Vue.prototype,
  handlerResult(res) {
    let data = {}
    try {
      data = JSON.parse(res)
    } catch (e) {
      return
    }
    // 判断
    if (data.messageId === null) {
      this.showResultMessage(data)
    } else {
      this.showHandlerMessage(data)
    }
  },
  showResultMessage(data) {
    console.log('接收到的消息提示：', data)
    let operateName = data.data.operaterName
    let text = ''
    let type = ''
    if (operateName === 'approve') {
      text = '同意'
      type = 'success'
    } else if (operateName === 'reject') {
      text = '驳回'
      type = 'error'
    }
    this.vueObj.$notify({
      title: '提示',
      message: `已${text}《${data.data.clientNamed}》的应用申请！`,
      type: type,
      duration: 5000
    })
  },
  showHandlerMessage(data) {
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
    // 提示信息框
    let widget = this.vueObj.$notify({
      customClass: 'webscoket-tips',
      title: `${data.type}`,
      dangerouslyUseHTMLString: true,
      message: domHtml.join(''),
      type: 'info',
      duration: 5000
    })
    this.addHandlerClick(data, 'notify-btn-a', widget)
  },
  addHandlerClick(data, className, widget) {
    // 绑定点击事件
    let doms = document.getElementsByClassName(className)
    let _this = this
    for (let dom of doms) {
      dom.addEventListener('click', function() {
        let mark = event.target.getAttribute('mark')
        switch (mark) {
          case 'agree':
            _this.agreeApplication(data, widget)
            break
          case 'refuse':
            _this.refuseApplication(data, widget)
            break
          case 'detail':
            _this.detailApplication(data, widget)
            break
        }
      })
    }
  },
  // 同意
  agreeApplication(data, widget) {
    let param = {
      userIds: [data.data.userId],
      clientId: data.data.clientId,
      operatorCode: 1,
      messageId: data.messageId
    }
    this.vueObj.$http.post('/api/client/assign', param).then(res => {
      console.log('申请应用权限——————已通过')
      if (res.code === 1002) {
        widget.close()
        return
      }
      this.vueObj.$message.sucess(res.data)
    })
  },
  // 拒绝
  refuseApplication(data, widget) {
    let param = {
      userIds: [data.data.userId],
      clientId: data.data.clientId,
      operatorCode: 2,
      messageId: data.messageId
    }
    this.vueObj.$http.post('/api/client/assign', param).then(res => {
      console.log('申请应用权限————已拒绝')
      if (res.code === 1002) {
        widget.close()
        return
      }
      this.vueObj.$message.warning(res.data)
    })
  },
  // 详情
  detailApplication() {
    let dom = event.target.parentElement.previousElementSibling
    let domClassName = dom.className
    if (domClassName.indexOf('show-detail') > -1) {
      dom.className = dom.className.replace('show-detail', '')
    } else {
      dom.className = domClassName + ' show-detail'
    }
  }
}

const buildWebSocket = function(userData) {
  initWebsocket.buildWebSocket('/ws/' + userData.userId, (res) => {
    userWebSocket.handlerResult(res)
  })
  // userWebSocket.handlerResult(userData)
}

export default buildWebSocket
