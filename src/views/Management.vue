<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col class="text-right">
          <b-button @click="newProduct()" variant="primary">เพิ่มใหม่</b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table :items="users" :fields="fields">
            <template #cell(operators)="{ item }">
              Product {{ item.productId }}
              <b-button @click="editProduct(item)">แก้ไข</b-button
              ><b-button
                class="ml-1"
                variant="danger"
                @click="deleteProduct(item)"
                >ลบ</b-button
              >
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  methods: {
    editProduct (item) {},
    deleteProduct (item) {},
    newProduct () {}
  },
  data () {
    return {
      fields: [
        { key: 'userId', label: 'ลำดับ' },
        { key: 'name', label: 'ชื่อ-นามสกุล' },
        { key: 'status', label: 'สถานะ' },
        { key: 'userName', label: 'USERNAME' },
        { key: 'password', label: 'PASSWORD' }
      ],
      users: [
        { userId: 1, name: 'Puchong sumalanukun', status: 'นักศึกษา', userName: '62160294', password: '*********' },
        { userId: 2, name: 'Test1', status: 'นักศึกษา', userName: '62160294', password: '*********' },
        { userId: 3, name: 'Test2', status: 'นักศึกษา', userName: '62160294', password: '*********' },
        { userId: 4, name: 'Test3', status: 'นักศึกษา', userName: '62160294', password: '*********' },
        { userId: 5, name: 'Test4', status: 'นักศึกษา', userName: '62160294', password: '*********' }
      ]
    }
  }
}
</script>
<style></style>
