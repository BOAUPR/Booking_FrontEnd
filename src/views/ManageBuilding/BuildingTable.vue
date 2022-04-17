<template>
  <div>
    <b-container fluid>

      <header class="bd-content" align="left">
      <h1 class="bv-no-focus-ring">
        <span class="bd-content-title">จัดการข้อมูลตึก</span>
      </h1>
      </header>

      <b-row>
        <b-col>
          <BuildingForm :building="selectedItem"
            ref="buildingForm"
            @save="saveBuilding">
          </BuildingForm>
        </b-col>
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

import api from '../../services/api'
import BuildingForm from './BuildingForm.vue'
export default {
  components: {
    BuildingForm
  },
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
      selectedItem: null
    }
  },
  methods: {
    makeToast (title, message, variant = 'success', append = false) {
      this.toastCount++
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        autoHideDelay: 3000,
        appendToast: append
      })
    },
    saveBuilding (building) {
      api.put('http://localhost:3000/building/' + building._id, building).then(
        (response) => {
          const updateBuilding = response.data
          this.getBuilding()
          this.makeToast('แก้ไขสำเร็จ', 'อาคาร ' + updateBuilding.code + updateBuilding.name + ' แก้ไขแล้ว')
        }
      ).catch(() => {
        this.makeToast('ปรับปรุงไม่สำเร็จ', 'ไม่สามารถปรับปรุงอาคาร' + building.code + building.name, 'danger')
      })
    },
    getRooms (item) {
      var rooms = []
      for (let index = 0; index < item.length; index++) {
        rooms += item[index].code + ' ' + item[index].name + ''
        if (index !== item.length - 1) {
          rooms += ', '
        }
      }
      return rooms
    },
    editBuilding (item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.$nextTick(() => {
        this.$refs.buildingForm.show()
      })
    },
    getBuilding () {
      api.get('http://localhost:3000/building').then((response) => {
        this.numBuilding = response.data
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
