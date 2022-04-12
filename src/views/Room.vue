<template>
  <div>
    {{ isBuilding(buildingid) }}
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
              - จำนวนห้อง {{ building.rooms.length }} ชั้น
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
      <b-table :items="building" :fields="fields">
        <template #cell(action)="{ item }">
          <b-button variant="danger" @click="editRoom(item)">แก้ไข</b-button>
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
        { key: '_id', label: 'id' },
        { key: 'name', label: 'name' },
        { key: 'floor', label: 'floor' },
        { key: 'equipment', label: 'equipment' },
        { key: 'action', label: 'action' }
      ],
      building: []
    }
  },
  methods: {
    async isBuilding (itemid) {
      const self = this
      await axios.get('http://localhost:3000/building/' + itemid).then((response) => {
        console.log(response)
        self.building = response.data
      })
    },
    editRoom (item) {}
  },
  mounted () {
    // this.isBuilding()
  }
}
</script>
<style></style>
