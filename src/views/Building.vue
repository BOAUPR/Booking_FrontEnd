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
            <div class="row justify-content-center">
              <button class="btn btn-primary">ดูรายละเอียด</button>
            </div>
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
      forSale: [
        { invId: 1, name: 'An Item', image: '' },
        { invId: 2, name: 'Thing', image: '' },
        { invId: 3, name: 'Doo-dad', image: '' },
        { invId: 4, name: 'Thing', image: '' },
        { invId: 5, name: 'Doo-dad', image: '' }
      ],
      buildings: []
    }
  },
  methods: {
    getBuilding () {
      const self = this
      axios.get('http://localhost:3000/building').then((response) => {
        console.log(response)
        self.buildings = response.data
      })
    }
  },
  mounted () {
    this.getBuilding()
  }
}
</script>
<style></style>
