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
        { key: '_id', label: 'ไอดี' },
        { key: 'code', label: 'รหัส' },
        { key: 'name', label: 'ชื่ออาคาร' },
        { key: 'floor', label: 'จำนวนชั้น' },
        { key: 'rooms', label: 'ห้อง' },
        { key: 'institution', label: 'หน่วยงาน' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      numBuilding: []
    }
  },
  methods: {
    getBuilding () {
      axios.get('http://localhost:3000/building').then((response) => {
        console.log(response)
        this.numBuilding = response.data
        // for (let i = 0; i < this.numRoom.length; i++) {
        //   this.getBuilding(this.numRoom[i].building, i)
        //   for (let j = 0; j < this.numRoom[i].approveres.length; j++) {
        //     console.log(j)
        //     this.getApprover(this.numRoom[i].approveres[j], i, j)
        //   }
        // }
      })
    }
  },
  mounted () {
    this.getBuilding()
  }
}
</script>
<style>

</style>
