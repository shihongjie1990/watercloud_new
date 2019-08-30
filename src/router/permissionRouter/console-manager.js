// import overview from '@/components/index/OVERVIEW_INDEX'
// import HelloWorld from '@/components/HelloWorld'
import users from '@/components/Manager/userManager'
import roles from '@/components/Manager/roleManager'
import limits from '@/components/Manager/limitManager'
import groups from '@/components/Manager/group/groups'
import MainContent from '@/components/Framework/System/MainContent'
import apps from '@/components/Manager/appManager/manager'
import apis from '@/components/Manager/apiManager/apiList'
import addApi from '@/components/Manager/apiManager/addApi'
import dataBase from '@/components/Manager/dataBase/manager.vue'
import dataBaseFolder from '@/components/Manager/dataBase/manager-folder.vue'
// 公告
import publishNotice from '@/components/Manager/notice/publish-notice'
import noticePreview from '@/components/Manager/notice/notice-preview'
import noticeList from '@/components/Manager/notice/notice-list'
// api
import apiDetail from '@/components/Manager/apiManager/apiDetails'
// import apiDesc from '@/components/overview/Version1-Page/api-desc'
// 转发页面
import OAuthApproval from '@/components/OAuthApproval'
// 门户网站
// import overviewTest from '@/components/Version1-Page/overview'
// import overviewcontent from '@/version1/OverviewContent'
// import home from '@/components/Version1-Page/home'
// import overviewNew from '@/components/Version1-Page/overview_new'
// 监管云简要介绍
// import reservoir from '@/components/Version1-Page/apps/reservoir'
// 对外门户页与介绍页
// import publicContent from '@/version1/publicContent'
// 地图
// import map from '@/components/Version1-Page/map/index'
// 新首页
// import overview2 from '@/components/index/overview.vue'

const routes = [
  {
    path: '/OAuthApproval',
    name: 'OAuthApproval',
    component: OAuthApproval
  },
  {
    path: '/',
    name: 'MainContent',
    component: MainContent,
    children: [
      {
        path: '/users',
        name: 'users',
        component: users,
        code: '1300'
      },
      {
        path: '/roles',
        name: 'roles',
        component: roles,
        code: '1400'
      },
      {
        path: '/limits',
        name: 'limits',
        component: limits,
        code: '1200'
      },
      {
        path: '/groups',
        name: 'groups',
        component: groups,
        code: '1500'
      },
      {
        path: '/apps',
        name: 'apps',
        component: apps,
        code: '2100'
      },
      {
        path: '/database',
        name: 'dataBase',
        component: dataBase,
        code: '2200'
      },
      {
        path: '/dataBaseFolder',
        name: 'dataBaseFolder',
        component: dataBaseFolder,
        code: '2200'
      },
      {
        path: '/apis',
        name: 'apis',
        component: apis,
        code: '1600'
      },
      {
        path: '/publishnotice',
        name: 'publishNotice',
        component: publishNotice,
        code: '1701'
      },
      {
        path: '/noticepreview',
        name: '公告详情',
        component: noticePreview,
        code: '1700'
      },
      {
        path: '/noticelist',
        name: '公告列表',
        component: noticeList,
        code: '1705'
      },
      {
        path: '/notice',
        name: '公告列表（转向）',
        redirect: '/noticelist',
        code: '1705'
      },
      {
        path: '/apidetail',
        name: 'apiDetail',
        component: apiDetail,
        code: '1600'
      }
    ]
  },
  {
    path: '/addApi',
    name: 'addApi',
    component: addApi
  }
  /* {
    path: '/',
    name: 'overviewcontent',
    component: overviewcontent,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home
      }
    ]
  },
   {
    path: '/',
    name: 'publicContent',
    component: publicContent,
    children: [
      {
        path: '/overviewNew',
        name: 'overviewTest',
        component: overviewTest
      },
      {
        path: '/map',
        name: 'map',
        component: map
      },
      {
        path: '/overviewNew',
        name: 'overviewNew',
        component: overviewNew
      },
      {
        path: '/overview',
        name: 'overview',
        component: overview
      },
      {
        path: '/appdetail',
        name: 'appDetail',
        component: reservoir
      },
      {
        path: '/apidesc',
        name: 'apidesc',
        component: apiDesc
      }
    ]
  },
  {
    path: '/index',
    name: 'index',
    component: overview2
  }, */
]

export default routes
