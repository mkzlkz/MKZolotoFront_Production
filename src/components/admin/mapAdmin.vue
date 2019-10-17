<template>
    <div class="map map-admin">
        <router-link to="/admin/my-loans" class="title"><img :src="require('@/assets/img/icon/exit.svg')" alt=""> Карта</router-link>
        <gmap-map :options="{
        streetViewControl: false,
        fullscreenControl: false}" :center="center" :zoom="14" style="width:100%;  height: 100%;"
        ref="gmap" class="map">
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
        @closeclick="infoWinOpen=false">
        <div class="marker-modal">
            <div class="mm-1">
                <h4>{{ alias }}</h4>
                <p>{{ address }}</p>
                <p class="tel-m">{{ phone }}</p>
                <p v-if="RezhimRaboty">{{RezhimRaboty}}, <br> {{Vyhodnye}}</p>
            </div>
            <div class="mm-2" v-if="image">
                <img v-img :src="image" alt="">
            </div>
        </div>
    </gmap-info-window>
    <div v-for="(m, index) in markers" class="oki" :key="m.id">
        <gmap-marker v-if="m.VIP == true" :icon="{ url: require('@/assets/img/icon/loc-vip.png')}"
        :position="m.position" :key="index" :clickable="true" @click="toggleInfoWindow(m, index)">
    </gmap-marker>
    <gmap-marker v-if="m.VIP == false" :icon="{ url: require('@/assets/img/icon/loc.png')}"
    :position="m.position" :key="index" :clickable="true" @click="toggleInfoWindow(m, index)">
</gmap-marker>
</div>
</gmap-map>
</div>
</template>

<script>
    export default {
        name: "mapAdmin",
        data(){
            return{
                markers: "",
                center: {
                    lat: 43.231907,
                    lng: 76.951847
                },
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                infoWindowPos: null,
                infoWinOpen: false,
                alias: '',
                address: '',
                phone: '',
                RezhimRaboty: '',
                Vyhodnye: '',
                image: ''
            }
        },
        created(){
            this.getPoints(this.$route.query.branch);
            //console.log(this.$route.query.branch)


        },
        methods: {
            getPoints (branch) {
                this.$axios.get('/points')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.markers = $response.data
                        for(var i=0; i<this.markers.length;i++){
                            var lat = this.markers[i].lat;
                            var lng = this.markers[i].lng
                            this.markers[i].position = {
                                lat: parseFloat(lat),
                                lng: parseFloat(lng)
                            }
                            if (this.markers[i].id==branch) {
                                this.center = {
                                lat: parseFloat(lat),
                                lng: parseFloat(lng)

                                }
                                this.toggleInfoWindow(this.markers[i],i)

                            }
                        }
                    }
                })
                .catch((e) => console.log(e))
            },
            toggleInfoWindow: function (marker, index) {
                this.infoWindowPos = marker.position
                this.alias = marker.alias
                this.address =marker.address
                this.phone = marker.phone
                this.RezhimRaboty = marker.RezhimRaboty
                this.Vyhodnye= marker.Vyhodnye
                this.image = marker.image
                if (this.currentMidx == index) {
                    this.infoWinOpen = !this.infoWinOpen
                } else {
                    this.infoWinOpen = true
                    this.currentMidx = index
                }
            }
        }
    }
</script>

<style scoped>

</style>
