const permission = [
  { name: '身份管理', code: '1100', id: '1100' },
  { name: '创建身份', code: '1101', id: '1101' },

  { name: '用户管理', code: '1300', id: '1300' },
  { name: '添加用户', code: '1301', id: '1301' },
  { name: '删除用户', code: '1302', id: '1302' },
  { name: '用户列表', code: '1303', id: '1303' },
  { name: '更新密码', code: '1304', id: '1304' },
  { name: '自我身份', code: '1305', id: '1305' },
  { name: '查询用户', code: '1306', id: '1306' },
  { name: 'Oauth用户身份信息', code: '1307', id: '1307' },
  { name: '锁定用户', code: '1308', id: '1308' },
  { name: '关联用户', code: '1309', id: '1309' },

  { name: '角色管理', code: '1400', id: '1400' },
  { name: '添加角色', code: '1401', id: '1401' },
  { name: '修改角色', code: '1402', id: '1402' },
  { name: '删除角色', code: '1403', id: '1403' },
  { name: '角色列表', code: '1404', id: '1404' },
  { name: '查询角色', code: '1405', id: '1405' },
  { name: '分配角色', code: '1406', id: '1406' },

  { name: '权限管理', code: '1200', id: '1200' },
  { name: '权限列表', code: '1201', id: '1201' },
  { name: '修改权限', code: '1202', id: '1202' },
  { name: '添加权限', code: '1203', id: '1203' },
  { name: '删除权限', code: '1204', id: '1204' },
  { name: '权限查询', code: '1205', id: '1205' },
  { name: '权限节点', code: '1206', id: '1206' },
  { name: '可分配权限列表', code: '1207', id: '1207' },
  { name: '分配可分配权限', code: '1208', id: '1208' },

  { name: '分组管理', code: '1500', id: '1500' },
  { name: '创建分组', code: '1501', id: '1501' },
  { name: '分组列表', code: '1502', id: '1502' },
  { name: '删除分组', code: '1503', id: '1503' },
  { name: '修改分组', code: '1504', id: '1504' },

  { name: '应用管理', code: '2100', id: '2100' },
  { name: '新增应用', code: '2101', id: '2101' },
  { name: '应用列表', code: '2102', id: '2102' },
  { name: '应用分配', code: '2103', id: '2103' },
  { name: '删除应用', code: '2104', id: '2104' },
  { name: '应用关系', code: '2105', id: '2105' },
  { name: '重置应用密码', code: '2106', id: '2106' },
  { name: '查询单个应用所有权', code: '2107', id: '2107' },
  { name: 'access申请', code: '2108', id: '2108' },
  { name: '解除绑定', code: '2109', id: '2109' },

  { name: '网关API', code: '1600', id: '1600' },
  { name: '申报API', code: '1601', id: '1601' },
  { name: '起停API', code: '1602', id: '1602' },
  { name: '删除API', code: '1603', id: '1603' },
  { name: 'API列表', code: '1604', id: '1604' },

  { name: '资源管理', code: '2200', id: '2200' },
  { name: '新增资源', code: '2201', id: '2201' },
  { name: '资源列表', code: '2202', id: '2202' },
  { name: '资源下载', code: '2203', id: '2203' },
  { name: '资源锁定/解锁', code: '2204', id: '2204' },
  { name: '资源删除', code: '2205', id: '2205' },

  { name: '公告管理', code: '1700', id: '1700' },
  { name: '新增公告', code: '1701', id: '1701' },
  { name: '删除公告', code: '1702', id: '1702' },
  { name: '更改公告', code: '1703', id: '1703' },
  { name: '全部公告列表', code: '1704', id: '1704' },
  { name: '公告分页列表', code: '1705', id: '1705' },
  { name: '获去具体公共', code: '1706', id: '1706' },

  { name: '消息管理', code: '1800', id: '1800' },

  { name: '上传管理', code: '1900', id: '1900' },
  { name: '临时文件上传', code: '1901', id: '1901' },
  { name: '文本编辑器上传', code: '1902', id: '1902' },

  { name: '监控管理', code: '2300', id: '2300' },
  { name: '平台监控', code: '2301', id: '2301' }
]

export default permission
