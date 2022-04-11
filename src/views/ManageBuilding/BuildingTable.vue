<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table :items="numBuilding" :fields="fields">
            <template #cell(operators)="{ item }">
              <b-button variant="danger" @click="editBuilding(item)"
                >แก้ไข</b-button
              >
            </template>
            <!-- <template #cell(building)="{ item }">
              {{ getBuilding(item.building) }}
            </template> -->
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      fields: [
        // { key: '_id', label: 'ไอดี' },
        { key: 'code', label: 'รหัส' },
        { key: 'name', label: 'ชื่ออาคาร' },
        { key: 'floor', label: 'จำนวนชั้น' },
        { key: 'rooms', label: 'ห้อง' },
        { key: 'institution', label: 'หน่วยงาน' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      numBuilding: [],
      roomSelect: {},
      institutionSelect: {}
    }
  },
  methods: {
    getRooms (item, i, j) {
      axios.get('http://localhost:3000/room/' + item).then((response) => {
        this.roomSelect = response.data
        console.log('Name :' + this.roomSelect.name + ' J = ' + j)
        this.numBuilding[i].rooms[j] = this.roomSelect.name
        console.log(this.numBuilding[i].rooms[j])
        return this.roomSelect.name
      })
    },
    getInnstitution (item, i, j) {
      axios.get('http://localhost:3000/institution/' + item).then((response) => {
        this.institutionSelect = response.data
        console.log('Name :' + this.institutionSelect.name + ' J = ' + j)
        this.numBuilding[i].institution[j] = this.institutionSelect.name
        console.log(this.numBuilding[i].institution[j])
        console.log('Nooooooo')
        return this.institutionSelect.name
      })
    },
    getBuilding () {
      axios.get('http://localhost:3000/building').then((response) => {
        console.log(response)
        this.numBuilding = response.data
        for (let i = 0; i < this.numBuilding.length; i++) {
        //   this.getBuilding(this.numRoom[i].building, i)
          for (let j = 0; j < this.numBuilding[i].rooms.length; j++) {
            console.log(j)
            this.getRooms(this.numBuilding[i].rooms[j], i, j)
          }
          for (let j = 0; j < this.numBuilding[i].institution.length; j++) {
            console.log(j)
            this.getInnstitution(this.numBuilding[i].institution[j], i, j)
          }
        }
      })
      console.log(this.fields)
    }
  },
  mounted () {
    this.getBuilding()
  }
}
</script>
<style>

</style>
