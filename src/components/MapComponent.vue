<template>
  <div>
    <banner-component></banner-component>
    <div class="tab-pane1">
<!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt="">
</router-link> -->
<div class="dflex-cont">
  <div class="map-wrapper">
    <div class="tab-text">
      <div class="title-flex">
        <h1 class="title">Загляни к нам</h1>
        <div class="map-select">
          <select v-model="selectedCity" name="" id="">
            <option v-for="(city, index) in allCity" :key="city.id" :value="city">{{city.city}}
            </option>
          </select>
        </div>
        <div class="map-search">
          <span><img :src="require('@/assets/img/circle.png')" alt="">Ближайший к вам офис в радиусе</span>
          <select v-bind:disabled="disableSelect" v-model="selected" name="" id="">
            <option value="1">1 км</option>
            <option value="2">2 км</option>
            <option value="5">5 км</option>
            <option value="10">10 км</option>
            <option value="all">Все</option>
          </select>
          <!-- <div class="nen"> -->
            <!-- <select v-if="show" disabled name="" id="">
              <option value="all">Все</option>
            </select> -->
            <!-- </div> -->
          </div>
        </div>
        <div class="content_block content-block1">
          <div class="map">
            <gmap-map :options="{
            streetViewControl: false,
            fullscreenControl: false}" :center="center" :zoom="10.5" style="width:100%;  height: 100%;"
            ref="gmap" class="map">
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
            @closeclick="infoWinOpen=false">

            <div class="marker-modal">
              <div class="mm-1">
                <!-- <h4>{{infoContent.text}}</h4> -->
                <h4>{{ infoContent.alias }}</h4>
                <p>{{ infoContent.address }}</p>
                <p class="tel-m">{{ infoContent.phone }}</p>
                <p v-if="infoContent.RezhimRaboty">{{infoContent.RezhimRaboty}}, <br> {{infoContent.Vyhodnye}}</p>
                <!--<p style="margin-bottom: 0; max-width: 115px;">{{infoContent.Uslugi}}</p>-->
              </div>
              <div class="mm-2" v-if="infoContent.image">
                <img v-img :src="infoContent.image" alt="">
              </div>
            </div>
          </gmap-info-window>
          <gmap-marker v-for="(my, index) in myMarkers" :icon="{ url: require('@/assets/img/Artboard.png')}"
          :position="my.position" :key="index" :clickable="true" @click="toggleInfoWindow(my, index)">
        </gmap-marker>
        <div>
          <gmap-marker v-for="( closest, index) in closestPoint"
          :icon="{ url: require('@/assets/img/circle.png')}" :position=" closest.position" :key="index"
          :clickable="true" @click="toggleInfoWindow(closest, index)"></gmap-marker>
        </div>

        <div v-for="(m, index) in markers" class="oki" :key="m.id">
          <gmap-marker v-if="m.infoText.VIP == true" :icon="{ url: require('@/assets/img/icon/loc-vip.png')}"
          :position="m.position" :key="index" :clickable="true" @click="toggleInfoWindow(m, index)">
        </gmap-marker>
        <gmap-marker v-if="m.infoText.VIP == false" :icon="{ url: require('@/assets/img/icon/loc.png')}"
        :position="m.position" :key="index" :clickable="true" @click="toggleInfoWindow(m, index)">
      </gmap-marker>

    </div>
  </gmap-map>
</div>
</div>
</div>
<div class="box box10" v-if="visible">
  <div class="closes_box closes_box10" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')"
    alt=""></div>
    <img :src="require('@/assets/img/10.png')" alt="" class="img">
  </div>
</div>
<div class="new-cont">
  <img :src="require('@/assets/img/logo.svg')" alt="" class="logo-cont img-responsive">
  <div class="cont-11" itemscope="" itemtype="http://schema.org/Organization">
    <p class="address" itemprop="name">{{contacts.name}}</p>
    <div itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress">
      <p class="address">{{contacts.address}}</p>
      <a v-bind:href="'mailto:' + contacts.email" itemprop="email">{{contacts.email}}</a>
      <a v-bind:href="'tel:' + contacts.phone" itemprop="telephone">{{contacts.phone}}</a>
    </div>
  </div>
</div>

</div>
</div>
</div>
</template>

<script>
  import BannerComponent from '@/components/BannerComponent.vue'
  export default {
    name: 'map-component',
    components: {
      BannerComponent
    },
    data() {
      return {
        title_page: '',
        title_page_default: '',
        description_page: '',
        description_page_default: '',
        title_city: '',
        contacts: '',
        center: {
          lat: 43.231907,
          lng: 76.951847
        },
        markers: [],
        myMarkers: [],
        selectedCity: '',
        allCity: '',
        myLocation: {
          lat: null,
          lng: null
        },
        myCity: '',
        selected: '10',
        places: [],
        infoWinOpen: false,
        currentMidx: null,
        infoText: '',
        infoContent: '',
        locations: '',
        disableSelect: false,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        infoWindowPos: null,
        currentPlace: null,
        visible: true,
        // show: false,
        closestPoint: [],
        mapDisable: ''
      }
    },
    metaInfo() {
      return {
        title: this.title_page,
        meta: [
        { name: 'description', content: this.description_page}
        ]
      }
    },
    mounted() {
      if (this.$route.path === '/location/' + this.$route.params.city_name) {
        this.getTitle();
        this.title_page = this.title_page_default.replace("[CITY]", this.title_city);
        this.description_page = this.description_page_default.replace("[CITY]", this.title_city);
      }
      this.getAllCities()
      this.getMyLocation()
      this.reloadPage()
      this.getMenus()
    },
    watch: {
      selected: function () {
        if (this.selected == 'all') {
          this.getMyLocation()
        } else {
          this.getCurrentLocations()
        }
      },
      $route: function () {
// console.log(this.$route);
if (this.$route.path === '/location/' + this.$route.params.city_name) {
    //alert(this.$route.params.city_name);

  this.getTitle();
  //this.title_page = this.title_page.replace("[CITY]", this.title_city);
}
},
selectedCity: function () {
  if (this.selectedCity.city != this.myCity.city) {
    this.disableSelect = true
    this.selected = 'all'
    this.getSelectedCity()
    // this.show = true
} else {
  if (!this.mapDisable) {
    this.selected = '10'
    this.getCurrentLocations()
    this.disableSelect = false
    this.getSelectedCity()
    // this.show = false
  } else {
    // this.show = false
    this.markers = []
    this.disableSelect = true
    this.selected = 'all'
    this.getSelectedCity()
}
}
},

markers(markers) {
  const bounds = new google.maps.LatLngBounds()
// console.log(bounds)
if (markers.length === 0) {
// for (let m of markers) {
//   bounds.extend(m.position)
// }
} else if (markers.length == 1) {
  for (let m of markers) {
    bounds.extend(m.position)
  }
  this.$refs.gmap.$mapObject.setCenter(bounds.getCenter())
  this.$refs.gmap.$mapObject.setZoom(15.5)
} else if (markers.length == 2) {
  for (let m of markers) {
    bounds.extend(m.position)
  }
  this.$refs.gmap.$mapObject.setCenter(bounds.getCenter())
  this.$refs.gmap.$mapObject.setZoom(13.5)
} else if (markers.length <= 5) {
  for (let m of markers) {
    bounds.extend(m.position)
  }
  this.$refs.gmap.$mapObject.setCenter(bounds.getCenter())
  this.$refs.gmap.$mapObject.setZoom(12.5)
} else if (markers.length <= 8) {
  for (let m of markers) {
    bounds.extend(m.position)
  }
  this.$refs.gmap.$mapObject.setCenter(bounds.getCenter())
  this.$refs.gmap.$mapObject.setZoom(12.5)
} else if (markers.length > 8) {
  for (let m of markers) {
    bounds.extend(m.position)
  }
  this.$refs.gmap.$mapObject.setCenter(bounds.getCenter())
  this.$refs.gmap.$mapObject.setZoom(10.5)
}
}
},
created() {
  this.getContacts();
},
methods: {
  getMenus () {
    this.$axios.get('/menus')
    .then((response) => {
      let $response = response.data
      if ($response.code === 0) {
        console.log($response)
      } else {
        this.title_page = $response.data[12].title_page
        this.title_page_default = $response.data[12].title_page
        this.description_page = $response.data[12].description
        this.description_page_default = $response.data[12].description
      }
    })
    .catch((e) => console.log(e))
  },
  getTitle() {
    let obj = {}
    obj.city = this.$route.params.city_name
    this.$axios.post('/title_city', obj)
    .then((response) => {
      let $response = response.data
      if ($response.code === 0) {
        console.log($response)
      } else {
        //alert()
        this.title_city = $response.data.city
        this.title_page = this.title_page_default.replace("[CITY]", this.title_city);
        this.description_page = this.description_page_default.replace("[CITY]", this.title_city);
      }
    })
    .catch((e) => console.log(e))
  },
  getContacts () {
    this.$axios.get('/contact_details')
    .then((response) => {
      let $response = response.data
      if ($response.code === 0) {
        console.log($response)
      } else {
        this.contacts = $response.data
      }
    })
    .catch((e) => console.log(e))
  },
  getclosestPoint() {
    let obj = {}
    obj.lat = this.myLocation.lat
    obj.lng = this.myLocation.lng
    this.$axios.post('/closestPoint', obj)
    .then(response => {
      let closest = response.data.data
      let closestMarker = {}
      closestMarker.position = {
        lat: parseFloat(closest.lat),
        lng: parseFloat(closest.lng)
      }
      closestMarker.text = closest
      this.closestPoint.push({
        position: closestMarker.position,
        infoText: closestMarker.text
      })
    })
  },
  getSelectedCity() {
    this.$router.push({
      path: '/location/' + this.selectedCity.city_eng
    })
    let obj = {}
    obj.city = this.selectedCity.city
// if (this.selectedCity != this.myCity) {
  this.$axios.post('/getPointsByCity', obj)
  .then(response => {
    let selCit = response.data.data
    this.markers = []
    this.addMarker(selCit)
  }).catch((err) => {
    console.log(err)
  })

// }
},
getAllCities() {
  this.$axios.get('/cities')
  .then(response => {
    this.allCity = response.data.data

  })
},
getCurrentLocations() {
  let body = {}
  body.lat = this.myLocation.lat
  body.lng = this.myLocation.lng
  body.limit = this.selected
  this.$axios.post('/closestPoints', body)
  .then(response => {
    this.markers = []
    let $response = response.data.data
// console.log($response)
this.addMarker($response)
}).catch((err) => {
  console.log(err)
})
},
getCity(error) {
  let body = {}
  if (this.myLocation.lat && this.myLocation.lng) {
    body.lat = this.myLocation.lat
    body.lng = this.myLocation.lng
  } else {
    body.lat = 0
    body.lng = 0
  }
  this.$axios.post('/getCityByCoordinates', body)
  .then(response => {
// console.log(response);
if (this.$route.path === '/location') {

  this.myCity = response.data.data
  this.selectedCity = response.data.data
// console.log("selectedCity",this.selectedCity);

if (this.myCity.city) {
  if (this.selected == 'all') {
    let obj = {}
    obj.city = this.myCity.city
    this.$axios.post('/getPointsByCity', obj)
    .then(response => {
      let $response = response.data.data
      this.addMarker($response)
// console.log($response)
}).catch((err) => {
  console.log(err)
})
}
if (this.selected != 'all') {
  this.getCurrentLocations()
}

}
} else if (this.$route.path === '/location/' + this.$route.params.city_name) {
  let params = this.$route.params.city_name
  if (this.allCity) {
    for (let i = 0; i < this.allCity.length; i++) {
      if (params === this.allCity[i].city_eng) {
// console.log("city name", this.allCity[i].city_eng);
this.selectedCity = this.allCity[i]
break
}
}
let obj = {}
obj.city = this.selectedCity.city
this.$axios.post('/getPointsByCity', obj)
.then(response => {
  let $response = response.data.data
  this.addMarker($response)
// console.log($response)
}).catch((err) => {
  console.log(err)
})
}
}
}).catch((err) => {
  console.log(err)
})
},
getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.showPosition, this.cannotShowPosition)
  }
},
cannotShowPosition(error) {
// console.log(error)
this.getCity(error)
this.mapDisable = true

},
showPosition(position) {
  this.mapDisable = false
  this.myLocation.lat = position.coords.latitude
  this.myLocation.lng = position.coords.longitude
  let myMarker = {}
  myMarker.position = {
    lat: this.myLocation.lat,
    lng: this.myLocation.lng
  }
  myMarker.text = "Ты здесь"
  this.myMarkers.push({
    position: myMarker.position,
    infoText: myMarker
  })
  setTimeout(this.getclosestPoint(), 1000)
  this.getCity()

},
addMarker(locations) {
  for (let i = 0; i < locations.length; i++) {
    let marker = {}
    marker = {
      lat: parseFloat(locations[i].lat),
      lng: parseFloat(locations[i].lng)
    }
    this.markers.push({
      position: marker,
      infoText: locations[i]
    })
  }
  for (let i = 0; i < this.markers.length; i++) {

    if (this.markers[i].infoText.id == this.closestPoint[0].infoText.id) {

      this.markers.splice(i, 1)
      break
    }

  }
},
toggleInfoWindow: function (marker, index, txt) {
  this.infoWindowPos = marker.position
  this.infoContent = marker.infoText
  if (this.currentMidx == index) {
    this.infoWinOpen = !this.infoWinOpen
  } else {
    this.infoWinOpen = true
    this.currentMidx = index
  }
},
reloadPage() {
  if (navigator.userAgent.search(/Safari/) > 0) {
// alert('safari')
};
},
}
}

</script>

<style scoped>

</style>
