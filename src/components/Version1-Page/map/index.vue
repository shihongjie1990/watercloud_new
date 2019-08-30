<template>
  <div class="one-map">
    <div id='allmap'></div>
  </div>
</template>

<script>
import BMap from 'BMap'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
// import BMapLib from 'BMapLib'

export default {
  data() {
    return {
      reservoirMap: {},
      showReservoirDetail: false,
      showFilterBlock: false,
      infoData: {},
      selectTypes: {
        'filter': '筛选',
        'search': '搜索'
      },
      selectType: '搜索',
      citys: [],
      countrys: [],
      reservoirs: [],
      city: '请选择',
      country: '请选择',
      reservoir: '请选择',
      reservoirName: '',
      oldPoint: {},
      allReservoirInfo: []
    }
  },
  watch: {
    showReservoirDetail(curValue, oldValue) {
      if (curValue) {
        let _this = this
        _this.$nextTick(() => {
          _this.getAllRainFallData(_this.infoData.baseInfoId).then(res => {
            let rainData = res.data
            let thisRainData = _this.rainSituationDataFun(rainData, 'tm', 'drp')
            _this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')
          })
          _this.getAllWaterLevelData(_this.infoData.baseInfoId).then(res => {
            let waterData = res.data
            let thisWaterData = _this.otherDataFun(waterData)
            _this.initRainChart(thisWaterData.waterHeightData, 'water_height', '水位', '水位(m)')
            _this.initRainChart(thisWaterData.waterFlowData, 'water_flow', '流量', '流量(m3/s)')
          })
        })
      }
    },
    city(curValue, oldValue) {
      this.country = '请选择'
    },
    country(curValue, oldValue) {
      this.reservoir = '请选择'
    }
  },
  methods: {
    switchSelect(command) {
      this.selectType = this.selectTypes[command]
      if (command === 'filter') {
        this.showFilterBlock = true
        this.city = '请选择'
        this.selectFilter(1)
      } else {
        this.showFilterBlock = false
      }
    },
    selectFilter(regionId) {
      let _this = this
      // 获取市(州)级别区域数据
      _this.getRegionInfo(1).then(res => {
        let cities = res.data.children
        _this.citys = cities
      })
    },
    /**
     *  选择市(州)区域
     */
    selectCity(command, vueObj) {
      let _this = this
      _this.city = vueObj.$el.textContent
      _this.getRegionInfo(command).then(res => {
        let countries = res.data.children
        _this.countrys = countries
      })
      _this.getBoundary(_this.city)
    },
    /**
     *  选择县(区)区域
     */
    selectCountry(command, vueObj) {
      let _this = this
      _this.country = vueObj.$el.textContent
      /* _this.getReservoirs(command).then(res => {
          let reservoirs = res.data
          _this.reservoirs = reservoirs
      }) */
      let reservoirs = this.filterReservoir(command)
      _this.reservoirs = reservoirs
      _this.getBoundary(_this.country)
    },
    // 筛选地区水库
    filterReservoir(regionId) {
      let allData = this.allReservoirInfo
      let regionReservoir = []
      allData.map(item => {
        if (item.regionId === regionId) {
          regionReservoir.push(item)
        }
      })
      return regionReservoir
    },
    /**
     *  选择水库
     */
    selectReservoir(command, vueObj) {
      let _this = this
      _this.reservoir = vueObj.$el.textContent
      // _this.getBoundary(_this.reservoir)
    },
    /**
     *  地图打点
     */
    createMarker(data, icon) {
      if (!data.longitude || !data.latitude || isNaN(data.longitude) || isNaN(data.latitude) || Number.isInteger(parseFloat(data.longitude)) || Number.isInteger(parseFloat(data.latitude))) {
        return false
      }
      let map = this.reservoirMap
      let img = './static/icon/reservoir.png'
      icon && (img = icon)
      let myIcon = new BMap.Icon(img, new BMap.Size(25, 25), {
        imageSize: new BMap.Size(25, 25)
      })
      let pointItem = new BMap.Point(data.longitude, data.latitude)
      let marker = new BMap.Marker(pointItem, { icon: myIcon })
      marker.disableMassClear()
      map.addOverlay(marker)
      // 定义展示数据
      let str = [
        '<div class="map-tips"><label>水库：</label><span class="plant-name">' + data.plantName + '</span></div>',
        '<div class="map-tips"><label>位置：</label><span>' + data.location + '</span></div>',
        '<div class="map-tips"><label>规模：</label><span>' + data.scale + '</span></div>',
        '<div class="map-tips"><label>等级：</label><span>' + data.level + '</span></div>'
      ]
      let detail = str.join('')
      let _this = this
      // 设置鼠标hover事件
      marker.addEventListener('mouseover', (e) => {
        let label = new BMap.Label(detail, { offset: new BMap.Size(20, 20) })
        label.setStyle({
          width: 'auto',
          color: '#000',
          background: '#fff',
          border: '1px solid "#fff"',
          borderRadius: '3px',
          height: 'auto',
          textAlign: 'left',
          padding: '5px'
        })
        marker.setLabel(label)
        marker.setTop(true, 5000)
      })

      // 设置鼠标离开事件
      marker.addEventListener('mouseout', (e) => {
        let label = this.getLabel()
        label.setContent('')
        label.setStyle({ border: 'none', width: '0px', padding: '0px' })
        marker.setTop(false)
      })

      // 设置点击事件
      marker.addEventListener('click', () => {
        _this.$parent.$refs.header.showOverviewContent = false // 关闭总概览信息
        _this.infoData = data
        map.panTo(pointItem) //  移动地图
        if (!Object.is(pointItem, _this.oldPoint)) { //  判断与之前点击点是否一致
          _this.showReservoirDetail = false
          setTimeout(() => { //  地图动画
            map.setZoom(13)
          }, 800)
          setTimeout(() => {
            _this.showReservoirDetail = true
          }, 1000)
        } else {
          if (_this.showReservoirDetail) {
            _this.showReservoirDetail = false
          } else {
            _this.showReservoirDetail = true
          }
        }
        _this.oldPoint = pointItem
      })
      return pointItem
    },
    getBoundary(regionName) {
      let bdary = new BMap.Boundary()
      let map = this.reservoirMap
      bdary.get(regionName, (rs) => { // 获取行政区域
        map.clearOverlays()// 清除地图覆盖物
        let count = rs.boundaries.length// 行政区域的点有多少个
        let path = []
        for (let i = 0; i < count; i++) {
          let ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 1, strokeColor: '#1ab394', fillColor: '#fff' })// 建立多边形覆盖物
          map.addOverlay(ply)// 添加覆盖物
          path = path.concat(ply.getPath())
        }
        map.setViewport(path)// 调整视野
      })
    }
  },
  mounted() {
    // 百度地图API功能
    let map = new BMap.Map('allmap', { mapType: BMAP_HYBRID_MAP })
    let point = new BMap.Point(106.630905, 26.674511)
    map.centerAndZoom(point, 8) // 初始化地图，设置中心店坐标和地图级别
    /* map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            // BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
            // BMAP_SATELLITE_MAP,
            // B_EARTH_MAP
        ]}
    )) */

    //  向地图中添加缩放控件
    /* let ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE })
    map.addControl(ctrl_nav) */

    // map.setCurrentCity('贵阳')
    map.enableScrollWheelZoom(true)

    //  控制地图的最大和最小缩放级别
    map.setMinZoom(8)
    // 限定区域--------------------------------------------------------     有点问题
    /* let b = new BMap.Bounds(new BMap.Point(100.971724, 22.841621), new BMap.Point(112.240069, 30.343001))
    try {
        BMapLib.AreaRestriction.setBounds(map, b)
    } catch (e) {
        // 捕获错误异常
        alert(e)
    } */
    this.reservoirMap = map
    this.$nextTick(() => {
      this.getBoundary('贵州省')
    })
    // ------------------地图描点-------------------
    /* let init = (allData) => {
      this.allReservoirInfo = allData
      this.$store.dispatch('setReservoirList', allData)
      let points = []
      for (let i = 0; i < allData.length; i++) {
        let point = this.createMarker(allData[i])
        if (point) {
          points.push(point)
        }
      }
      map.setViewport(points)
    }
    this.getAllBaseInfo().then(res => {
      let allData = res.data
      init(allData)
    }) */
  }
}
</script>

<style>
#allmap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  font-size: 14px;
}
#allmap label {
  max-width: none;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.filter-block .el-dropdown-link {
  color: #666;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper > .el-dropdown-menu__item {
  font-size: 12px;
}
</style>
