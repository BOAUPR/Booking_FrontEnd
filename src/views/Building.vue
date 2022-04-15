<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-3" v-for="item in buildings" :key="item.id">
        <div class="card">
          <img :src="getImgUrl(item.code)" class="card-img-top" />
          <div class="card-body">
            <h4 class="card-title">{{ item.name }}</h4>
            <router-link :to="'/building/' + item._id + '/room'"><button class="btn btn-primary">ดูรายละเอียด</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'
export default {
  data () {
    return {
      buildings: [],
      building: []
    }
  },
  methods: {
    getImgUrl (pic) {
      return require('../assets/' + pic + '.jpg')
    },
    getBuildings () {
      const self = this
      api.get('http://localhost:3000/building').then((response) => {
        // console.log(response)
        self.buildings = response.data
      })
    },
    getBuilding (itembd) {
      const self = this
      api.get('http://localhost:3000/building/' + itembd).then((response) => {
        // console.log(response)
        self.building = response.data
      })
    }
  },
  mounted () {
    this.getBuildings()
  }
}
</script>
<style></style>
