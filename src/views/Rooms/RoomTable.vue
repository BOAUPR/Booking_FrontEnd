<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table :items="numRoom" :fields="fields">
           <template #cell(operators)="{ item }">
             <b-button variant="danger" @click="editRoom(item)">แก้ไข</b-button>
           </template>
           <template #cell(building)="{ item }">
             {{ getBuilding(item.building) }}
           </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {

  },
  methods: {
    async getBuilding (item) {
      const self = this
      console.log('.')
      await axios.get('http://localhost:3000/building/' + item).then(
        (response) => {
          // const building = response.data.map(function (items) {
          //   return {
          //     name: items.name
          //   }
          // })
          // this.buildingSelect = building
          self.buildingSelect = response.data
        }
      )
      return self.buildingSelect.name
    },
    editRoom (item) {

    },
    getRooms () {
      const self = this
      axios.get('http://localhost:3000/room').then(
        (response) => {
          console.log(response)
          self.numRoom = response.data
        }
      )
      console.log(this.fields)
    }
  },
  data () {
    return {
      fields: [
        { key: '_id', label: 'ไอดี' },
        { key: 'capacity', label: 'ความจุ' },
        { key: 'floor', label: 'จำนวนชั้น' },
        { key: 'building', label: 'อาคาร' },
        { key: 'approveres', label: 'ผู้พิจารณา' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      numRoom: [],
      selectedItem: null,
      buildingSelect: {}
    }
  },
  mounted () {
    this.getRooms()
    this.getBuilding()
  }
}
</script>
<style></style>
