<template>
  <div id="market">
    <!-- <remote-js src="static/html/js/tween.min.js"></remote-js>
    <remote-js src="static/html/js/TrackballControls.js"></remote-js>
    <remote-js src="static/html/js/CSS3DRenderer.js"></remote-js> -->
    <div id="container">
      <!-- <div>
        <div>
          <div class="element"
               v-for="(item, index) in nodes"
               :key="index">
            <div class="number">{{ index }}</div>
            <div class="symbol">{{ item[0] }}</div>
            <div class="details">{{ item[1] }}<br/>{{ item[2] }}</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import RemoteJs from '@/widgets/remote-js.vue'

export default {
  props: {
    apps: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    RemoteJs
  },
  data() {
    return {
      table: [
        'H', 'Hydrogen', '1.00794', 1, 1,
        'He', 'Helium', '4.002602', 18, 1,
        'Li', 'Lithium', '6.941', 1, 2,
        'Be', 'Beryllium', '9.012182', 2, 2,
        'B', 'Boron', '10.811', 13, 2,
        'C', 'Carbon', '12.0107', 14, 2,
        'N', 'Nitrogen', '14.0067', 15, 2,
        'O', 'Oxygen', '15.9994', 16, 2,
        'F', 'Fluorine', '18.9984032', 17, 2,
        'Ne', 'Neon', '20.1797', 18, 2,
        'Na', 'Sodium', '22.98976...', 1, 3,
        'Mg', 'Magnesium', '24.305', 2, 3,
        'Al', 'Aluminium', '26.9815386', 13, 3,
        'Si', 'Silicon', '28.0855', 14, 3,
        'P', 'Phosphorus', '30.973762', 15, 3,
        'S', 'Sulfur', '32.065', 16, 3,
        'Cl', 'Chlorine', '35.453', 17, 3,
        'Ar', 'Argon', '39.948', 18, 3,
        'K', 'Potassium', '39.948', 1, 4,
        'Ca', 'Calcium', '40.078', 2, 4,
        'Sc', 'Scandium', '44.955912', 3, 4,
        'Ti', 'Titanium', '47.867', 4, 4,
        'V', 'Vanadium', '50.9415', 5, 4,
        'Cr', 'Chromium', '51.9961', 6, 4,
        'Mn', 'Manganese', '54.938045', 7, 4,
        'Fe', 'Iron', '55.845', 8, 4,
        'Co', 'Cobalt', '58.933195', 9, 4,
        'Ni', 'Nickel', '58.6934', 10, 4,
        'Cu', 'Copper', '63.546', 11, 4,
        'Zn', 'Zinc', '65.38', 12, 4,
        'Ga', 'Gallium', '69.723', 13, 4,
        'Ge', 'Germanium', '72.63', 14, 4,
        'As', 'Arsenic', '74.9216', 15, 4,
        'Se', 'Selenium', '78.96', 16, 4,
        'Br', 'Bromine', '79.904', 17, 4,
        'Kr', 'Krypton', '83.798', 18, 4,
        'Rb', 'Rubidium', '85.4678', 1, 5,
        'Sr', 'Strontium', '87.62', 2, 5,
        'Y', 'Yttrium', '88.90585', 3, 5,
        'Zr', 'Zirconium', '91.224', 4, 5,
        'Nb', 'Niobium', '92.90628', 5, 5,
        'Mo', 'Molybdenum', '95.96', 6, 5,
        'Tc', 'Technetium', '(98)', 7, 5,
        'Ru', 'Ruthenium', '101.07', 8, 5,
        'Rh', 'Rhodium', '102.9055', 9, 5,
        'Pd', 'Palladium', '106.42', 10, 5,
        'Ag', 'Silver', '107.8682', 11, 5,
        'Cd', 'Cadmium', '112.411', 12, 5,
        'In', 'Indium', '114.818', 13, 5,
        'Sn', 'Tin', '118.71', 14, 5,
        'Sb', 'Antimony', '121.76', 15, 5,
        'Te', 'Tellurium', '127.6', 16, 5,
        'I', 'Iodine', '126.90447', 17, 5,
        'Xe', 'Xenon', '131.293', 18, 5,
        'Cs', 'Caesium', '132.9054', 1, 6,
        'Ba', 'Barium', '132.9054', 2, 6,
        'La', 'Lanthanum', '138.90547', 4, 9,
        'Ce', 'Cerium', '140.116', 5, 9,
        'Pr', 'Praseodymium', '140.90765', 6, 9,
        'Nd', 'Neodymium', '144.242', 7, 9,
        'Pm', 'Promethium', '(145)', 8, 9,
        'Sm', 'Samarium', '150.36', 9, 9,
        'Eu', 'Europium', '151.964', 10, 9,
        'Gd', 'Gadolinium', '157.25', 11, 9,
        'Tb', 'Terbium', '158.92535', 12, 9,
        'Dy', 'Dysprosium', '162.5', 13, 9,
        'Ho', 'Holmium', '164.93032', 14, 9,
        'Er', 'Erbium', '167.259', 15, 9,
        'Tm', 'Thulium', '168.93421', 16, 9,
        'Yb', 'Ytterbium', '173.054', 17, 9,
        'Lu', 'Lutetium', '174.9668', 18, 9,
        'Hf', 'Hafnium', '178.49', 4, 6,
        'Ta', 'Tantalum', '180.94788', 5, 6,
        'W', 'Tungsten', '183.84', 6, 6,
        'Re', 'Rhenium', '186.207', 7, 6,
        'Os', 'Osmium', '190.23', 8, 6,
        'Ir', 'Iridium', '192.217', 9, 6,
        'Pt', 'Platinum', '195.084', 10, 6,
        'Au', 'Gold', '196.966569', 11, 6,
        'Hg', 'Mercury', '200.59', 12, 6,
        'Tl', 'Thallium', '204.3833', 13, 6,
        'Pb', 'Lead', '207.2', 14, 6,
        'Bi', 'Bismuth', '208.9804', 15, 6,
        'Po', 'Polonium', '(209)', 16, 6,
        'At', 'Astatine', '(210)', 17, 6,
        'Rn', 'Radon', '(222)', 18, 6,
        'Fr', 'Francium', '(223)', 1, 7,
        'Ra', 'Radium', '(226)', 2, 7,
        'Ac', 'Actinium', '(227)', 4, 10,
        'Th', 'Thorium', '232.03806', 5, 10,
        'Pa', 'Protactinium', '231.0588', 6, 10,
        'U', 'Uranium', '238.02891', 7, 10,
        'Np', 'Neptunium', '(237)', 8, 10,
        'Pu', 'Plutonium', '(244)', 9, 10,
        'Am', 'Americium', '(243)', 10, 10,
        'Cm', 'Curium', '(247)', 11, 10,
        'Bk', 'Berkelium', '(247)', 12, 10,
        'Cf', 'Californium', '(251)', 13, 10,
        'Es', 'Einstenium', '(252)', 14, 10,
        'Fm', 'Fermium', '(257)', 15, 10,
        'Md', 'Mendelevium', '(258)', 16, 10,
        'No', 'Nobelium', '(259)', 17, 10,
        'Lr', 'Lawrencium', '(262)', 18, 10,
        'Rf', 'Rutherfordium', '(267)', 4, 7,
        'Db', 'Dubnium', '(268)', 5, 7,
        'Sg', 'Seaborgium', '(271)', 6, 7,
        'Bh', 'Bohrium', '(272)', 7, 7,
        'Hs', 'Hassium', '(270)', 8, 7,
        'Mt', 'Meitnerium', '(276)', 9, 7,
        'Ds', 'Darmstadium', '(281)', 10, 7,
        'Rg', 'Roentgenium', '(280)', 11, 7,
        'Cn', 'Copernicium', '(285)', 12, 7,
        'Nh', 'Nihonium', '(286)', 13, 7,
        'Fl', 'Flerovium', '(289)', 14, 7,
        'Mc', 'Moscovium', '(290)', 15, 7,
        'Lv', 'Livermorium', '(293)', 16, 7,
        'Ts', 'Tennessine', '(294)', 17, 7,
        'Og', 'Oganesson', '(294)', 18, 7
      ],
      camera: '',
      scene: '',
      renderer: '',
      objects: [],
      targets: {
        table: [],
        sphere: [],
        helix: [],
        grid: []
      }
    }
  },
  computed: {
    parentHeight() {
      return document.getElementById('market').clientHeight
    },
    nodes() {
      let table = this.table
      let data = []
      for (let i = 0; i < table.length; i += 5) {
        let items = []
        for (let j = 0; j < 5; j++) {
          let item = table[i + j]
          if (!item) {
            break
          }
          items.push(table[i + j])
        }
        data.push(items)
      }
      return data
    }
  },
  /* eslint-disable */
  methods: {
    init() {
      let camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / this.parentHeight,
        1,
        10000
      )
      camera.position.z = 3000

      let scene = new THREE.Scene()

      this.camera = camera
      this.scene = scene
      let table = this.table
      let objects = this.objects
      let targets = this.targets
      // table

      for (var i = 0; i < table.length; i += 5) {
        var element = document.createElement('div')
        element.className = 'element'
        if (table[i + 1]) {
          element.style.backgroundColor = 'rgba(107, 177, 215, 1)' // rgb(50, 149, 193)
        } else {
          element.style.backgroundColor = 'rgba(107, 177, 215, 0.3)'
        }
        // element.style.backgroundColor = "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

        var number = document.createElement('div')
        number.className = 'number'
        number.textContent = i / 5 + 1
        element.appendChild(number)

        var symbol = document.createElement('div')
        symbol.className = 'symbol'

        var node = table[i]
        if (node.indexOf('iconfont') > -1) {
          var iconSymbol = document.createElement('i')
          iconSymbol.className = 'iconfont ' + node.substring(9)
          symbol.appendChild(iconSymbol)
        } else {
          symbol.textContent = table[i]
        }

        element.appendChild(symbol)

        var details = document.createElement('div')
        details.className = 'details'
        details.innerHTML = table[i + 1] + '<br>' + table[i + 2]
        element.appendChild(details)

        // 添加点击事件
        let _this = this
        element.addEventListener('click', function (e) {
          let currentNode = e.target;
          let node = currentNode
          if (node.className !== 'element') {
            node = node.parentElement
            if (node.className !== 'element') {
              node = node.parentElement
            }
          }
          let text = node.children[2].textContent
          let nodes = _this.apps
          let data = {}
          for (var j = 0; j < nodes.length; j++) {
            if (nodes[j].clientName === text) {
              data = nodes[j]
              break
            }
          }
          _this.$emit('showAppDetail', data)
          // if (data) {
          //   let dataStr = encodeURIComponent(_this.base64.encode(JSON.stringify(data)))
          //   window.open('/#/appdetail?app=' + dataStr)
          // }
        })

        var object = new THREE.CSS3DObject(element)
        object.position.x = Math.random() * 4000 - 2000
        object.position.y = Math.random() * 4000 - 2000
        object.position.z = Math.random() * 4000 - 2000
        scene.add(object)

        objects.push(object)

        //

        var object1 = new THREE.Object3D()
        object1.position.x = table[i + 3] * 140 - 1330
        object1.position.y = -(table[i + 4] * 180) + 990

        targets.table.push(object1)
      }

      // sphere

      var vector = new THREE.Vector3()

      for (var j = 0, l = objects.length; j < l; j++) {
        var phi = Math.acos(-1 + (2 * j) / l)
        var theta = Math.sqrt(l * Math.PI) * phi

        var object2 = new THREE.Object3D()

        object2.position.setFromSphericalCoords(800, phi, theta)

        vector.copy(object2.position).multiplyScalar(2)

        object2.lookAt(vector)

        targets.sphere.push(object2)
      }

      // helix

      var vector3 = new THREE.Vector3()

      for (var k = 0, l3 = objects.length; k < l3; k++) {
        var theta3 = k * 0.175 - Math.PI / 4
        var y = -(k * 8) + 450

        var object3 = new THREE.Object3D()

        object3.position.setFromCylindricalCoords(900, theta3, y)

        vector3.x = object3.position.x * 2
        vector3.y = object3.position.y
        vector3.z = object3.position.z * 2

        object3.lookAt(vector3)

        targets.helix.push(object3)
      }

      // grid

      for (var m = 0; m < objects.length; m++) {
        var object4 = new THREE.Object3D()

        object4.position.x = (m % 5) * 400 - 800
        object4.position.y = -(Math.floor(m / 5) % 5) * 400 + 800
        // object.position.z = Math.floor(i / 25) * 1000 - 2000;
        object4.position.z = Math.floor((objects.length - 1 - m) / 25) * 1000 - 2000

        targets.grid.push(object4)
      }

      //

      let renderer = new THREE.CSS3DRenderer()
      renderer.setSize(window.innerWidth, this.parentHeight)
      document.getElementById('container').appendChild(renderer.domElement)
      this.renderer = renderer

      //

      let controls = new THREE.TrackballControls(camera, renderer.domElement)
      controls.rotateSpeed = 0.5
      controls.minDistance = 500
      controls.maxDistance = 6000
      controls.addEventListener('change', this.render)
      this.controls = controls

      this.transform(targets.table, 2000)

      this.animation()

      //

      window.addEventListener('resize', this.onWindowResize, false)
    },
    transform(targets, duration) {
      TWEEN.removeAll()
      let objects = this.objects
      for (var i = 0; i < objects.length; i++) {
        var object = objects[i]
        var target = targets[i]

        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
      }

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    },
    onWindowResize() {
      let camera = this.camera
      let parentHeight = this.parentHeight
      let renderer = this.renderer
      camera.aspect = window.innerWidth / parentHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, parentHeight)

      this.render()
    },
    animate() {
      requestAnimationFrame(this.animate)

      TWEEN.update()

      this.controls.update()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    animation() {
      let type = ['table', 'sphere', 'helix', 'grid']
      let num = 1
      let targets = this.targets
      this.transform(targets[type[0]], 2000)
      let _this = this
      setInterval(function () {
        let times = num % 4
        _this.transform(targets[type[times]], 2100)
        num++
      }, 5000)
    },
    addPageEvent(pageData) {
      let nodes = document.getElementById('container').children[0].children[0].children
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('click', function (e) {
          let currentNode = e.target
          let node = currentNode.className === 'element' ? currentNode : currentNode.parentElement
          // let appName = node.children[2].textContent.trim()
          // window.open("/#/appdetail")

          let index = -1
          for (let j = 0; j < nodes.length; j++) {
            if (nodes[j] === node) {
              index = j
              break
            }
          }
          let data = pageData[index]
          if (data) {
            let dataStr = encodeURIComponent(this.base64.encode(JSON.stringify(data)))
            window.open('/#/appdetail?app=' + dataStr)
          }
          // window.open("/#/appdetail?" + JSON.stringify(data))
        })
      }
    }
  },
  /* eslint-enable */
  mounted() {
    let apps = this.apps
    let table = []
    for (let i = 0; i < apps.length; i++) {
      table = table.concat('iconfont icon-zhanghao', apps[i].clientName, '')
      table.push(Math.floor(i / 5) + 1, i % 5 + 1)
    }
    var emptyJson = ['水', '利', '云', '智', '慧', '水', '利', '务', '大', '坝', '安', '全']
    var emptySize = emptyJson.length
    for (let i = 0; i < 80; i++) {
      table = table.concat([emptyJson[(i + 1) % emptySize], '', ''])
      table.push(Math.floor((20 + i) / 5) + 1, (i + 20) % 5 + 1)
    }
    this.table = table
    this.init()
    this.animate()
    // this.addPageEvent(apps)
  }
}
</script>

<style>
#market {
  height: 5.85rem;
}
#market a {
  color: #ffffff;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  text-align: center;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
  cursor: pointer;
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .symbol > i {
  font-size: 60px;
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: rgba(0, 255, 255, 0.5);
}
button:active {
  color: #000000;
  background-color: rgba(0, 255, 255, 0.75);
}
</style>
