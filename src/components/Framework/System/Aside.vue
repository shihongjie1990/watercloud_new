<template>
  <el-menu class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           router>
    <div v-for="item in menus"
         :key="item.code">
      <el-submenu :index="item.code" v-if="item.ignore || myMenuCodes.indexOf(item.code) > -1">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <div v-for='node in item.children'
             :key="node.code">
          <el-menu-item :index="node.code"
                        :route="node.url" v-if="myMenuCodes.indexOf(node.code) > -1">
            <i :class="node.icon"></i>
            <span slot="title">{{ node.name }}</span>
          </el-menu-item>
        </div>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
export default {
  computed: {
    myMenuCodes() {
      return this.$store.state.MANAGER_MENU
    }
  },
  data() {
    return {
      menus: [{
        name: '系统管理',
        code: '0',
        icon: 'el-icon-setting',
        ignore: true,
        children: [{
          name: '用户管理',
          code: '1300',
          url: 'users',
          icon: 'iconfont icon-yonghuguanli'
        }, {
          name: '角色管理',
          code: '1400',
          url: 'roles',
          icon: 'iconfont icon-jiaoseguanli3'
        }, {
          name: '分组管理',
          code: '1500',
          url: 'groups',
          icon: 'iconfont icon-navicon-jsgl'
        }, {
          name: '权限管理',
          code: '1200',
          url: 'limits',
          icon: 'iconfont icon-quanxianguanli1'
        }, {
          name: '应用管理',
          code: '2100',
          url: 'apps',
          icon: 'iconfont icon-applications'
        }, {
          name: 'API管理',
          code: '1600',
          url: 'apis',
          icon: 'iconfont icon-api'
        }, {
          name: '静态资源数据管理',
          code: '2200',
          url: 'database',
          icon: 'iconfont icon-shuju'
        }]
      }, {
        name: '公告管理',
        code: '1700',
        icon: 'iconfont icon-gonggao',
        children: [{
          name: '发布公告',
          code: '1701',
          url: 'publishnotice',
          icon: 'iconfont icon-gonggao1'
        }, {
          name: '公告管理',
          code: '1704',
          url: 'noticelist',
          icon: 'iconfont icon-gonggao2'
        }]
      }]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
