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
              <b-button variant="danger" @click="editRoom(item)"
                >แก้ไข</b-button
              >
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
  components: {},
  methods: {
    getBuilding (item, i) {
      console.log(item)
      axios.get('http://localhost:3000/building/' + item).then((response) => {
        this.buildingSelect = response.data
        console.log('Name :' + this.buildingSelect.name)
        this.numRoom[i].building = this.buildingSelect.name
        return this.buildingSelect.name
      })
    },
    getApprover (item, i, j) {
      console.log(item)
      axios.get('http://localhost:3000/users/' + item).then((response) => {
        this.approverSelect = response.data
        console.log('Name :' + this.approverSelect.name + ' J = ' + j)
        this.numRoom[i].approveres[j] = this.approverSelect.name + ' ' + this.approverSelect.surname
        return this.approverSelect.name
      })
    },
    editRoom (item) {},
    getRooms () {
      axios.get('http://localhost:3000/room').then((response) => {
        console.log(response)
        this.numRoom = response.data
        for (let i = 0; i < this.numRoom.length; i++) {
          this.getBuilding(this.numRoom[i].building, i)
          for (let j = 0; j < this.numRoom[i].approveres.length; j++) {
            console.log(j)
            this.getApprover(this.numRoom[i].approveres[j], i, j)
          }
        }
      })
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
      buildingSelect: {},
      approverSelect: {}
    }
  },
  mounted () {
    this.getRooms()
  },
  computed: {
  }
}
</script>
<style></style>
