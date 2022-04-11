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
            <template #cell(rooms)="{ item }">
              {{ getRooms(item.rooms) }}
            </template>

            <template #cell(institution)="{ item }">
              {{ item.institution.name }}
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
    getRooms (item) {
      var rooms = []
      for (let index = 0; index < item.length; index++) {
        rooms += item[index].code + ' ' + item[index].name + ''
        if (index !== item.length - 1) {
          rooms += ', '
        }
      }
      console.log(rooms)
      return rooms
    },
    getInnstitution (item) {

    },
    getBuilding () {
      axios.get('http://localhost:3000/building').then((response) => {
        console.log(response)
        this.numBuilding = response.data
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
