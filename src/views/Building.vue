<template>
  <div class="container my-5">
    <h1 align="left">ค้นหา</h1>
    <b-input class="m-3"></b-input>
    <div class="row">
      <div class="col-md-3" v-for="item in buildings" :key="item">
        <div class="card">
          <img src="../assets/chicken.jpg" class="card-img-top" />
          <div class="card-body">
            <h4 class="card-title">{{ item.name }}</h4>
            <!-- <div class="row justify-content-center">
              <a href="/room" class="router-link"
                ><button class="btn btn-primary">ดูรายละเอียด</button></a>
            </div> -->
            <router-link :to="'/building/' + item._id + '/room'">ดูรายละเอียด</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      buildings: [],
      building: []
    }
  },
  methods: {
    getBuildings () {
      const self = this
      axios.get('http://localhost:3000/building').then((response) => {
        console.log(response)
        self.buildings = response.data
      })
    },
    getBuilding (itembd) {
      const self = this
      axios.get('http://localhost:3000/building/' + itembd).then((response) => {
        console.log(response)
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
