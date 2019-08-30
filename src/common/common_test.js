import Vue from 'vue'

/**
 *
 * @param {url, type, param} ajax
 *  url: 请求接口
 *  type: 请求方式
 *  param: 请求参数
 * @param {*} method
 *  参数：add、modify、delete
 * @param {message, refreshMethod, closeMethod} options
 *  message: 提示信息
 *  refreshMethod: 刷新函数  function
 *  closeMethod: 关闭函数  function
 */
var operation = function(ajax, method, options) {
  let _this = this
  _this.ajax = ajax
  _this.method = method
  _this.options = options
}

operation.prototype.$http = function() {
  var ajax = this.ajax
  var type = ajax.type || 'get'
  var allTypes = ['get', 'post', 'delete', 'put']
  if (allTypes.indexOf(type.toLowerCase()) > -1) {
    if (type === 'get') {
      var $ajax = Vue.$http.get(ajax.url, {
        params: ajax.param
      })
      return $ajax
    }
  } else {
    console.error('指定类型有误！错误类型：', type)
  }
}

operation.prototype.handle = function(msg) {
  var options = this.options
  //   var method = this.method
  var $ajax = this.$http()
  $ajax.then(res => {
    if (res.code === 1002) {
      Vue.$message.success(msg || '操作成功！')
      options.closeMethod()
      options.closeMethod()
    }
  })
}

export default operation
