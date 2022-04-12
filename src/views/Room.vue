<template>
  <div>
    {{ isBuilding(buildingid) }}
    {{ getRooms(buildingid) }}
    <b-container fluid>
      <b-card align="left">
        <b-row>
          <b-col>
            <div class="col-md-7">
              <img src="../assets/chicken.jpg" class="card-img-top" />
            </div>
          </b-col>
          <b-col>
            <h4 class="card-title">{{ building.name }}</h4>
            <b-card-text>
              - จำนวนชั้น {{ building.floor }} ชั้น <br>
              - จำนวนห้อง {{ numRoom.length }} ห้อง
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
      <b-table :items="numRoom" :fields="fields">
        <template #cell(operators)="{ item }">
              <b-button variant="danger" @click="editRoom(item)"
                >จองห้อง</b-button
              >
            </template>
        <template> </template>
      </b-table>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['buildingid'],
  data () {
    return {
      fields: [
        { key: 'code', label: 'รหัส' },
        { key: 'name', label: 'ห้อง' },
        { key: 'floor', label: 'ชั้น' },
        { key: 'equipment', label: 'อุปกรณ์ภายในห้อง' },
        { key: 'operators', label: 'กระบวณการ' }
      ],
      building: [],
      numRoom: [],
      check: false,
      checkR: false
    }
  },
  methods: {
    isBuilding (items) {
      const self = this
      if (self.check === false) {
        axios.get('http://localhost:3000/building/' + items).then((response) => {
          console.log(response)
          self.building = response.data
        })
        self.check = true
      }
    },
    getRooms (itemid) {
      const self = this
      if (self.checkR === false) {
        axios.get('http://localhost:3000/room/building/' + itemid).then((response) => {
          console.log(response)
          this.numRoom = response.data
        })
        console.log(this.fields)
        self.checkR = true
      }
    },
    editRoom (item) {}
  },
  mounted () {
    // this.isBuilding()
    // this.getRooms()
  }
}
</script>
<style></style>
